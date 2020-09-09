<?php
namespace Bookly\Backend\Components\Cloud\Recharge;

use Bookly\Lib;

/**
 * Class Dialog
 * @package Bookly\Backend\Components\Cloud\Recharge
 */
class Dialog extends Lib\Base\Component
{

    public static function render()
    {
        $cloud = Lib\Cloud\API::getInstance();
        if ( $cloud->account->loadProfile() ) {
            self::enqueueStyles( array(
                'frontend' => array( 'css/ladda.min.css', ),
                'backend'  => array( 'css/fontawesome-all.min.css', ),
            ) );

            self::enqueueScripts( array(
                'frontend' => array(
                    'js/spin.min.js'  => array( 'jquery', ),
                    'js/ladda.min.js' => array( 'jquery', ),
                ),
                'backend' => array( 'js/alert.js' => array( 'jquery' ), ),
                'module'  => array( 'js/recharge-dialog.js' => array( 'jquery' ), ),
            ) );

            $recharge = $cloud->account->getRechargeData();
            wp_localize_script( 'bookly-recharge-dialog.js', 'BooklyRechargeDialogL10n', array(
                'csrfToken' => Lib\Utils\Common::getCsrfToken(),
                'country' => $cloud->account->getCountry(),
                'no_card' => $recharge['no_card'],
                'payment' => array(
                    'manual' => array(
                        'action'    => __( 'Pay using', 'bookly' ),
                        'accepted'  => __( 'Your payment has been accepted for processing', 'bookly' ),
                        'cancelled' => __( 'Your payment has been cancelled', 'bookly' ),
                    ),
                    'auto' => array(
                        'action'    => __( 'Continue with', 'bookly' ),
                        'enabled'   => __( 'Auto-Recharge has been enabled', 'bookly' ),
                        'cancelled' => __( 'Auto-Recharge has been cancelled', 'bookly' ),
                    ),
                ),
            ) );

            self::renderTemplate( 'dialog', compact( 'cloud' ) );
        }
    }
}