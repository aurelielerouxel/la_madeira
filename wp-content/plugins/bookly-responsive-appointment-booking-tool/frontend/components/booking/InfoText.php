<?php
namespace Bookly\Frontend\Components\Booking;

use Bookly\Lib;
use Bookly\Frontend\Modules\Booking\Proxy;
use Bookly\Frontend\Modules\Booking\Lib\Steps;

/**
 * Class InfoText
 * @package Bookly\Frontend\Components\Booking
 */
class InfoText
{
    /**
     * Render info text into a variable.
     *
     * @since 10.9 format codes {code}, [[CODE]] is deprecated.
     * @param integer             $step
     * @param string              $text
     * @param Lib\UserBookingData $userData
     * @return string
     */
    public static function prepare( $step, $text, Lib\UserBookingData $userData )
    {
        static $info_text_codes = array();
        if ( empty ( $info_text_codes ) ) {

            switch ( $step ) {
                case Steps::SERVICE:
                    break;
                case Steps::EXTRAS:
                case Steps::TIME:
                case Steps::REPEAT:
                    $data = array(
                        'appointment_date'    => array(),
                        'appointment_time'    => array(),
                        'category_names'      => array(),
                        'numbers_of_persons'  => array(),
                        'online_meeting_url'  => array(),  // @todo Remove it from here and adjust proxy methods so that codes can be processed for each step independently
                        'service_duration'    => array(),
                        'service_info'        => array(),
                        'service_names'       => array(),
                        'service_prices'      => array(),
                        'staff_info'          => array(),
                        'staff_names'         => array(),
                        'staff_photo'         => array(),
                        'total_deposit_price' => 0,
                        'total_price'         => 0,
                    );

                    /** @var Lib\ChainItem $chain_item */
                    foreach ( $userData->chain->getItems() as $num => $chain_item ) {
                        $data['numbers_of_persons'][] = $chain_item->getNumberOfPersons();
                        /** @var Lib\Entities\Service $service */
                        $service                  = Lib\Entities\Service::find( $chain_item->getServiceId() );
                        $data['service_names'][]  = $service->getTranslatedTitle();
                        $data['service_info'][]   = $service->getTranslatedInfo();
                        $data['category_names'][] = $service->getTranslatedCategoryName();
                        $duration = 0;
                        if ( $service->withSubServices() ) {
                            foreach ( $service->getSubServices() as $sub_service ) {
                                if ( $service->isCompound() ) {
                                    $duration += $sub_service->getDuration();
                                } else if ( $service->isCollaborative() ) {
                                    $duration = max( $duration, $sub_service->getDuration() );
                                }
                            }
                        } else {
                            $duration = $chain_item->getUnits() * $service->getDuration();
                        }

                        $data['service_duration'][] = Lib\Utils\DateTime::secondsToInterval( $duration );
                        /** @var Lib\Entities\Staff $staff */
                        $staff = null;
                        if ( $step == Steps::REPEAT ) {
                            $slot = $userData->getSlots();
                            list( $slot_service, $slot_staff, $slot_time ) = $slot[ $num ];
                            $staff = Lib\Entities\Staff::find( $slot_staff );

                            if ( $slot_time !== null ) {
                                $service_dp                 = Lib\Slots\DatePoint::fromStr( $slot_time )->toClientTz();
                                $data['appointment_date'][] = $service_dp->formatI18nDate();
                                $data['appointment_time'][] = $duration >= DAY_IN_SECONDS ? $service->getStartTimeInfo() : $service_dp->formatI18nTime();
                            } else {
                                $data['appointment_date'][] = __( 'N/A', 'bookly' );
                                $data['appointment_time'][] = __( 'N/A', 'bookly' );
                            }
                        } else {
                            $staff_ids   = $chain_item->getStaffIds();
                            $staff_photo = '';
                            if ( count( $staff_ids ) == 1 ) {
                                $staff = Lib\Entities\Staff::find( $staff_ids[0] );
                            }
                        }

                        if ( $staff ) {
                            $data['staff_names'][] = esc_html( $staff->getTranslatedName() );
                            $data['staff_info'][]  = esc_html( $staff->getTranslatedInfo() );
                            if ( $staff->getAttachmentId() && $img = wp_get_attachment_image_src( $staff->getAttachmentId(), 'full' ) ) {
                                $staff_photo = '<img src="' . $img[0] . '"/>';
                            }
                            if ( $service->withSubServices() ) {
                                $price         = $service->getPrice();
                                $deposit_price = $price;
                            } else {
                                $staff_service = new Lib\Entities\StaffService();
                                $staff_service->loadBy( array(
                                    'staff_id'    => $staff->getId(),
                                    'service_id'  => $service->getId(),
                                    'location_id' => $chain_item->getLocationId() ?: null,
                                ) );
                                if ( ! $staff_service->getId() ) {
                                    $staff_service->loadBy( array(
                                        'staff_id'    => $staff->getId(),
                                        'service_id'  => $service->getId(),
                                        'location_id' => null,
                                    ) );
                                }
                                $price = $staff_service->getPrice() * $chain_item->getUnits();
                                $price = Lib\Proxy\ServiceExtras::prepareServicePrice( $price * $chain_item->getNumberOfPersons(), $price, $chain_item->getNumberOfPersons(), $chain_item->getExtras() );
                                $deposit_price = Lib\Proxy\DepositPayments::prepareAmount( $price, $staff_service->getDeposit(), $chain_item->getNumberOfPersons() );
                            }
                        } else {
                            $data['staff_names'][] = __( 'Any', 'bookly' );
                            $price                 = Lib\Proxy\ServiceExtras::prepareServicePrice( $service->getPrice() * $chain_item->getNumberOfPersons(), $service->getPrice(), $chain_item->getNumberOfPersons(), $chain_item->getExtras() );
                            $deposit_price         = $price;
                        }
                        $data['service_prices'][]     = $price !== false ? Lib\Utils\Price::format( $price ) : '-';
                        $data['staff_photo'][]        = $staff_photo;
                        $data['total_price']         += $price;
                        $data['total_deposit_price'] += $deposit_price;

                        $data = Proxy\Shared::prepareChainItemInfoText( $data, $chain_item );
                    }

                    $info_text_codes = array(
                        '{amount_due}'        => '<b>' . Lib\Utils\Price::format( $data['total_price'] - $data['total_deposit_price'] ) . '</b>',
                        '{amount_to_pay}'     => '<b>' . Lib\Utils\Price::format( $data['total_deposit_price'] ) . '</b>',
                        '{appointment_date}'  => '<b>' . implode( ', ', $data['appointment_date'] ) . '</b>',
                        '{appointment_time}'  => '<b>' . implode( ', ', $data['appointment_time'] ) . '</b>',
                        '{category_name}'     => '<b>' . implode( ', ', $data['category_names'] ) . '</b>',
                        '{deposit_value}'     => '<b>' . Lib\Utils\Price::format( $data['total_deposit_price'] ) . '</b>',
                        '{number_of_persons}' => '<b>' . implode( ', ', $data['numbers_of_persons'] ) . '</b>',
                        '{service_date}'      => '<b>' . implode( ', ', $data['appointment_date'] ) . '</b>',  // deprecated
                        '{service_duration}'  => '<b>' . implode( ', ', $data['service_duration'] ) . '</b>',
                        '{service_info}'      => '<b>' . implode( ', ', $data['service_info'] ) . '</b>',
                        '{service_name}'      => '<b>' . implode( ', ', $data['service_names'] ) . '</b>',
                        '{service_price}'     => '<b>' . implode( ', ', $data['service_prices'] ) . '</b>',
                        '{service_time}'      => '<b>' . implode( ', ', $data['appointment_time'] ) . '</b>',  // deprecated
                        '{staff_info}'        => '<b>' . implode( ', ', $data['staff_info'] ) . '</b>',
                        '{staff_name}'        => '<b>' . implode( ', ', $data['staff_names'] ) . '</b>',
                        '{staff_photo}'       => '<b>' . implode( ', ', $data['staff_photo'] ) . '</b>',
                        '{total_price}'       => '<b>' . Lib\Utils\Price::format( $data['total_price'] ) . '</b>',
                    );
                    $info_text_codes = Proxy\Shared::prepareInfoTextCodes( $info_text_codes, $data );

                    break;
                default:
                    $data = array(
                        'appointment_date'   => array(),
                        'appointment_time'   => array(),
                        'booking_number'     => array(),
                        'category_name'      => array(),
                        'extras'             => array(),
                        'number_of_persons'  => array(),
                        'online_meeting_url' => array(),
                        'service'            => array(),
                        'service_duration'   => array(),
                        'service_info'       => array(),
                        'service_name'       => array(),
                        'service_price'      => array(),
                        'staff_info'         => array(),
                        'staff_name'         => array(),
                        'staff_photo'        => array(),
                    );
                    /** @var Lib\CartItem $cart_item */
                    foreach ( $userData->cart->getItems() as $cart_item ) {
                        $service    = $cart_item->getService();
                        $slots      = $cart_item->getSlots();
                        $service_dp = Lib\Slots\DatePoint::fromStr( $slots[0][2] )->toClientTz();

                        $data['appointment_date'][]  = $slots[0][2] !== null ? $service_dp->formatI18nDate() : __( 'N/A', 'bookly' );
                        $data['category_name'][]     = $service->getTranslatedCategoryName();
                        $data['number_of_persons'][] = $cart_item->getNumberOfPersons();
                        $data['service_info'][]      = $service->getTranslatedInfo();
                        $data['service_name'][]      = $service->getTranslatedTitle();
                        $data['service_price'][]     = Lib\Utils\Price::format( $cart_item->getServicePrice() );
                        if ( $cart_item->getService()->withSubServices() ) {
                            $duration = 0;
                            foreach ( $cart_item->getService()->getSubServices() as $sub_service ) {
                                if ( $cart_item->getService()->isCompound() ) {
                                    $duration += $sub_service->getDuration();
                                } else if ( $cart_item->getService()->isCollaborative() ) {
                                    $duration = max( $duration, $sub_service->getDuration() );
                                }
                            }
                            $data['appointment_time'][] = $slots[0][2] !== null ? ( $duration >= DAY_IN_SECONDS ? $service->getStartTimeInfo() : $service_dp->formatI18nTime() ) : __( 'N/A', 'bookly' );
                            $data['service_duration'][] = Lib\Utils\DateTime::secondsToInterval( $duration );
                        } else {
                            $data['appointment_time'][] = $slots[0][2] !== null ? ( $cart_item->getUnits() * $cart_item->getService()->getDuration() >= DAY_IN_SECONDS ? $service->getStartTimeInfo() : $service_dp->formatI18nTime() ) : __( 'N/A', 'bookly' );
                            $data['service_duration'][] = Lib\Utils\DateTime::secondsToInterval( $cart_item->getUnits() * $cart_item->getService()->getDuration() );
                        }
                        // For Task when time step can be skipped, staff can be false
                        $staff = $cart_item->getStaff();
                        $data['staff_info'][] = $staff ? esc_html( $staff->getTranslatedInfo() ) : '';
                        $data['staff_name'][] = $staff ? esc_html( $staff->getTranslatedName() ) : '';
                        if ( $staff && $staff->getAttachmentId() && $img = wp_get_attachment_image_src( $staff->getAttachmentId(), 'full' ) ) {
                            $data['staff_photo'][] = '<img src="' . $img[0] . '"/>';
                        } else {
                            $data['staff_photo'][] = '';
                        }

                        // If appointment exists, prepare some additional data.
                        if ( $cart_item->getAppointmentId() ) {
                            $data['booking_number'][] = $cart_item->getAppointmentId();
                        }

                        $data = Proxy\Shared::prepareCartItemInfoText( $data, $cart_item );
                    }

                    $with_coupon = $step == Steps::PAYMENT || $step == Steps::DONE; // >= step payment
                    $gateway     = $step == Steps::DONE ? $userData->getPaymentType() : null;
                    $cart_info   = $userData->cart->getInfo( $gateway, $with_coupon );
                    $data['_cart_info'] = $cart_info;
                    $info_text_codes = array(
                        '{amount_due}'         => '<b>' . Lib\Utils\Price::format( $cart_info->getDue() ) . '</b>',
                        '{amount_to_pay}'      => '<b>' . Lib\Utils\Price::format( $cart_info->getPayNow() ) . '</b>',
                        '{appointments_count}' => '<b>' . count( $userData->cart->getItems() ) . '</b>',
                        '{appointment_date}'   => '<b>' . implode( ', ', $data['appointment_date'] ) . '</b>',
                        '{appointment_time}'   => '<b>' . implode( ', ', $data['appointment_time'] ) . '</b>',
                        '{booking_number}'     => '<b>' . implode( ', ', $data['booking_number'] ) . '</b>',
                        '{category_name}'      => '<b>' . implode( ', ', $data['category_name'] ) . '</b>',
                        '{deposit_value}'      => '<b>' . Lib\Utils\Price::format( $cart_info->getDepositPay() ) . '</b>',
                        '{number_of_persons}'  => '<b>' . implode( ', ', $data['number_of_persons'] ) . '</b>',
                        '{service_date}'       => '<b>' . implode( ', ', $data['appointment_date'] ) . '</b>',  // deprecated
                        '{service_duration}'   => '<b>' . implode( ', ', $data['service_duration'] ) . '</b>',
                        '{service_info}'       => '<b>' . implode( ', ', $data['service_info'] ) . '</b>',
                        '{service_name}'       => '<b>' . implode( ', ', $data['service_name'] ) . '</b>',
                        '{service_price}'      => '<b>' . implode( ', ', $data['service_price'] ) . '</b>',
                        '{service_time}'       => '<b>' . implode( ', ', $data['appointment_time'] ) . '</b>',  // deprecated
                        '{staff_info}'         => '<b>' . implode( ', ', $data['staff_info'] ) . '</b>',
                        '{staff_name}'         => '<b>' . implode( ', ', $data['staff_name'] ) . '</b>',
                        '{staff_photo}'        => implode( ' ', $data['staff_photo'] ),
                        '{total_price}'        => '<b>' . Lib\Utils\Price::format( $cart_info->getTotal() ) . '</b>',
                    );
                    if ( $step == Steps::DETAILS ) {
                        $info_text_codes['{login_form}'] = ! get_current_user_id() && ! $userData->getFacebookId()
                            ? sprintf( '<a class="bookly-js-login-show" href="#">%s</a>', __( 'Log In' ) )
                            : '';
                    }
                    $info_text_codes = Proxy\Shared::prepareInfoTextCodes( $info_text_codes, $data );

                    break;
            }

            // Support deprecated codes [[CODE]]
            foreach ( array_keys( $info_text_codes ) as $code_key ) {
                if ( $code_key[1] == '[' ) {
                    $info_text_codes[ '{' . strtolower( substr( $code_key, 2, - 2 ) ) . '}' ] = $info_text_codes[ $code_key ];
                } else {
                    $info_text_codes[ '[[' . strtoupper( substr( $code_key, 1, - 1 ) ) . ']]' ] = $info_text_codes[ $code_key ];
                }
            }
        }

        return strtr( nl2br( $text ), $info_text_codes );
    }
}