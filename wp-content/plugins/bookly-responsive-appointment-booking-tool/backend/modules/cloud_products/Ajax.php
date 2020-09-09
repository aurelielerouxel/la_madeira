<?php
namespace Bookly\Backend\Modules\CloudProducts;

use Bookly\Backend\Modules\Settings\Page as SettingsPage;
use Bookly\Backend\Modules\CloudSMS\Page as CloudSMSPage;
use Bookly\Lib;
use Bookly\Lib\Cloud\Account;

/**
 * Class Ajax
 * @package Bookly\Backend\Modules\CloudProducts
 */
class Ajax extends Lib\Base\Ajax
{
    /**
     * @inheritdoc
     */
    protected static function permissions()
    {
        return array( '_default' => 'supervisor' );
    }

    /**
     * Get cloud products info.
     */
    public static function cloudGetProductInfo()
    {
        $info = Lib\Cloud\API::getInstance()->general->getProductInfo( self::parameter( 'product' ) );

        if ( $info ) {
            wp_send_json_success( array( 'html' => $info ) );
        }

        wp_send_json_error();
    }

    /**
     * Enable/disable SMS Notifications
     */
    public static function cloudSmsChangeStatus()
    {
        $status = self::parameter( 'status' );

        $cloud = Lib\Cloud\API::getInstance();
        if ( $cloud->sms->changeSmsStatus( $status ) ) {
            wp_send_json_success( array(
                'redirect_url' => add_query_arg(
                    array( 'page' => Page::pageSlug() ),
                    admin_url( 'admin.php' ) ) . '#cloud-product=sms&status=activated'
            ) );
        } else {
            wp_send_json_error( array( 'message' => current( $cloud->getErrors() ) ) );
        }
    }

    /**
     * Enable/disable Stripe Cloud
     */
    public static function cloudStripeChangeStatus()
    {
        $status  = self::parameter( 'status' );
        $api     = Lib\Cloud\API::getInstance();
        if ( $status ) {
            $redirect_url = $api->stripe->connect();
            if ( $redirect_url !== false ) {
                wp_send_json_success( compact( 'redirect_url' ) );
            } else {
                wp_send_json_error( array( 'message' => current( $api->getErrors() ) ) );
            }
        } else {
            if ( $api->stripe->disconnect() ) {
                wp_send_json_success();
            } else {
                wp_send_json_error( array( 'message' => current( $api->getErrors() ) ) );
            }
        }
    }

    /**
     * Get text for 'product activation' modal
     */
    public static function cloudGetProductActivationMessage()
    {
        $product = self::parameter( 'product' );
        $status  = self::parameter( 'status' );
        $api     = Lib\Cloud\API::getInstance();
        $texts   = $api->general->getProductActivationTexts( self::parameter( 'product' ) );

        if ( $texts ) {
            switch ( $product ) {
                case Account::PRODUCT_SMS_NOTIFICATIONS:
                    wp_send_json_success( array(
                        'content' => $texts['activation-message'],
                        'button'  => array(
                            'caption' => $texts['activation-button'],
                            'url'     => add_query_arg( array( 'page' => CloudSMSPage::pageSlug() ), admin_url( 'admin.php' ) )
                        )
                    ) );
                    break;
                case Account::PRODUCT_STRIPE:
                    if ( $status == 'activated' ) {
                        wp_send_json_success( array(
                            'content' => $texts['activation-message'],
                            'button'  => array(
                                'caption' => $texts['activation-button'],
                                'url'     => add_query_arg( array( 'page' => SettingsPage::pageSlug(), 'tab' => 'payments' ), admin_url( 'admin.php' ) )
                            )
                        ) );
                    } elseif ( $status == 'cancelled' ) {
                        wp_send_json_error( array( 'content' => __( 'Stripe activation was not completed', 'bookly' ) ) );
                    }
                    break;
            }
        } else {
            wp_send_json_error( array( 'content' => current( $api->getErrors() ) ) );
        }
    }
}