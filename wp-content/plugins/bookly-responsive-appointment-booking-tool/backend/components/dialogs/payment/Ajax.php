<?php
namespace Bookly\Backend\Components\Dialogs\Payment;

use Bookly\Lib;

/**
 * Class Ajax
 * @package Bookly\Backend\Components\Dialogs\Payment
 */
class Ajax extends Lib\Base\Ajax
{
    /**
     * @inheritDoc
     */
    protected static function permissions()
    {
        return array(
            'completePayment'   => array( 'staff', 'supervisor' ),
            'getPaymentDetails' => array( 'customer' ),
            'getPaymentInfo'    => array( 'staff', 'supervisor' ),
        );
    }

    /**
     * Get payment details.
     */
    public static function getPaymentDetails()
    {
        $payment = Lib\Entities\Payment::find( self::parameter( 'payment_id' ) );
        if ( $payment && ! Lib\Utils\Common::isCurrentUserSupervisor() && ! Lib\Utils\Common::isCurrentUserStaff() ) {
            // Check if customer trying to get his own payment.
            $customer = Lib\Entities\Customer::query( 'c' )
                ->select( 'c.wp_user_id' )
                ->leftJoin( 'CustomerAppointment', 'ca', 'ca.customer_id = c.id' )
                ->where( 'ca.payment_id', $payment->getId() )
                ->fetchCol( 'wp_user_id' );
            if ( ! $customer || $customer[0] != get_current_user_id() ) {
                $payment = false;
            }
        }
        if ( $payment ) {
            $data = $payment->getPaymentData();
            $show_deposit = Lib\Config::depositPaymentsActive();
            if ( ! $show_deposit ) {
                foreach ( $data['payment']['items'] as $item ) {
                    if ( isset( $item['deposit_format'] ) ) {
                        $show_deposit = true;
                        break;
                    }
                }
            }

            $data['show'] = array(
                'coupons' => Lib\Config::couponsActive(),
                'customer_groups' => Lib\Config::customerGroupsActive(),
                'deposit' => (int) $show_deposit,
                'gateway' => \Bookly\Backend\Modules\Payments\Proxy\Shared::paymentSpecificPriceExists( $data['payment']['type'] ) === true,
                'taxes'   => (int) ( Lib\Config::taxesActive() || $data['payment']['tax_total'] > 0 ),
            );
            wp_send_json_success( array( 'html' => self::renderTemplate( 'details', $data, false ) ) );
        }

        wp_send_json_error( array( 'html' => __( 'Payment is not found.', 'bookly' ) ) );
    }

    /**
     * Complete payment.
     */
    public static function completePayment()
    {
        $payment = Lib\Entities\Payment::find( self::parameter( 'payment_id' ) );
        $details = json_decode( $payment->getDetails(), true );
        $details['tax_paid'] = $payment->getTax();
        $payment
            ->setPaid( $payment->getTotal() )
            ->setStatus( Lib\Entities\Payment::STATUS_COMPLETED )
            ->setDetails( json_encode( $details ) )
            ->save();

        $payment_title = Lib\Utils\Price::format( $payment->getPaid() );
        if ( $payment->getPaid() != $payment->getTotal() ) {
            $payment_title = sprintf( __( '%s of %s', 'bookly' ), $payment_title, Lib\Utils\Price::format( $payment->getTotal() ) );
        }
        $payment_title .= sprintf(
            ' %s <span%s>%s</span>',
            Lib\Entities\Payment::typeToString( $payment->getType() ),
            $payment->getStatus() == Lib\Entities\Payment::STATUS_PENDING ? ' class="text-danger"' : '',
            Lib\Entities\Payment::statusToString( $payment->getStatus() )
        );

        wp_send_json_success( array( 'payment_title' => $payment_title ) );
    }

    /**
     * Get payment info
     */
    public static function getPaymentInfo()
    {
        $payment = Lib\Entities\Payment::find( self::parameter( 'payment_id' ) );

        if ( $payment ) {
            $payment_title = Lib\Utils\Price::format( $payment->getPaid() );
            if ( $payment->getPaid() != $payment->getTotal() ) {
                $payment_title = sprintf( __( '%s of %s', 'bookly' ), $payment_title, Lib\Utils\Price::format( $payment->getTotal() ) );
            }
            $payment_title .= sprintf(
                ' %s <span%s>%s</span>',
                Lib\Entities\Payment::typeToString( $payment->getType() ),
                $payment->getStatus() == Lib\Entities\Payment::STATUS_PENDING ? ' class="text-danger"' : '',
                Lib\Entities\Payment::statusToString( $payment->getStatus() )
            );

            wp_send_json_success( array( 'payment_title' => $payment_title, 'payment_type' => $payment->getPaid() == $payment->getTotal() ? 'full' : 'partial' ) );
        }
    }
}