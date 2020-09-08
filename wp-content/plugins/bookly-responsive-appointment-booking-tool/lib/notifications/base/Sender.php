<?php
namespace Bookly\Lib\Notifications\Base;

use Bookly\Lib\Config;
use Bookly\Lib\Entities\Notification;

/**
 * Class Sender
 * @package Bookly\Lib\Notifications\Base
 */
abstract class Sender extends Reminder
{
    /**
     * Get instant notifications of given type.
     *
     * @param string $type
     * @return array
     */
    protected static function getNotifications( $type )
    {
        $result = array(
            'client' => array(),
            'staff'  => array(),
        );

        $query = Notification::query( 'n' )
            ->where( 'n.type', $type )
            ->where( 'n.active', '1' )
        ;
        $notifications = array( 'sms' => Notification::getTypes( 'sms' ), 'email' => Notification::getTypes( 'email' ) );

        /** @var Notification $notification */
        foreach ( $query->find() as $notification ) {
            if ( in_array( $notification->getType(), $notifications[ $notification->getGateway() ] ) ) {
                $settings = $notification->getSettingsObject();
                if ( $settings->getInstant() ) {
                    if ( $notification->getToCustomer() ) {
                        $result['client'][] = $notification;
                    }
                    if ( $notification->getToStaff() || $notification->getToAdmin() ) {
                        $result['staff'][] = $notification;
                    }
                }
            }
        }

        return $result;
    }
}