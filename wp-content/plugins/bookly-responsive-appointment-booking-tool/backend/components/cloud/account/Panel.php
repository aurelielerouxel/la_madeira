<?php
namespace Bookly\Backend\Components\Cloud\Account;

use Bookly\Lib;
use Bookly\Backend\Modules;
use Bookly\Lib\Utils\Common;

/**
 * Class Panel
 * @package Bookly\Backend\Components\Cloud\Account
 */
class Panel extends Lib\Base\Component
{
    /**
     * Render panel
     */
    public static function render()
    {
        if ( Lib\Cloud\API::getInstance()->account->loadProfile() ) {
            self::renderPanel();
        } else {
            self::renderAuth();
        }
    }

    /**
     * Render registration/login panel
     */
    protected static function renderAuth()
    {
        self::enqueueStyles( array(
            'frontend' => array( 'css/ladda.min.css', 'css/intlTelInput.css' ),
            'backend'  => array(
                'css/fontawesome-all.min.css',
                'bootstrap/css/bootstrap.min.css',
            ),
        ) );

        self::enqueueScripts( array(
            'backend'  => array(
                'js/alert.js' => array( 'jquery' ),
                'bootstrap/js/bootstrap.min.js' => array( 'jquery' ),
                'js/select2.min.js' => array( 'jquery' ),
            ),
            'frontend' => array(
                'js/spin.min.js'  => array( 'jquery' ),
                'js/ladda.min.js' => array( 'jquery' ),
            ),
            'module' => array(
                'js/select-country.js' => array( 'jquery' ),
                'js/cloud-auth.js' => array( 'bookly-select-country.js', ),
            ),
        ) );

        wp_localize_script( 'bookly-cloud-auth.js', 'BooklyCloudAuthL10n', array(
            'csrfToken'           => Lib\Utils\Common::getCsrfToken(),
            'passwords_not_match' => __( 'Passwords don\'t match', 'bookly' ),
            'noResults'           => __( 'No records.', 'bookly' ),
        ) );

        $promotions = get_option( 'bookly_cloud_promotions', array() );
        if ( isset ( $promotions['registration'] ) ) {
            $promo_texts = $promotions['registration']['texts'];
        } else {
            $promo_texts = array( 'form' => null, 'button' => null );
        }

        self::renderTemplate( 'auth', compact( 'promo_texts' ) );
    }

    /**
     * Render panel for logged-in users
     */
    public static function renderPanel()
    {
        self::enqueueStyles( array(
            'frontend' => array( 'css/ladda.min.css' ),
            'backend'  => array(
                'css/fontawesome-all.min.css',
                'bootstrap/css/bootstrap.min.css',
            ),
        ) );

        self::enqueueScripts( array(
            'backend' => array(
                'bootstrap/js/bootstrap.min.js' => array( 'jquery' ),
            ),
            'frontend' => array(
                'js/spin.min.js'  => array( 'jquery' ),
                'js/ladda.min.js' => array( 'jquery' ),
            ),
            'module' => array(
                'js/cloud-panel.js' => array( 'bookly-ladda.min.js', ),
            ),
        ) );

        $cloud = Lib\Cloud\API::getInstance();

        if ( ! $cloud->account->getCountry() ) {
            self::enqueueStyles( array(
                'frontend' => array( 'css/intlTelInput.css' ),
            ) );
            self::enqueueScripts( array(
                'backend' => array(
                    'js/alert.js' => array( 'jquery' ),
                    'js/select2.min.js' => array( 'jquery' ),
                ),
                'module' => array(
                    'js/select-country.js' => array( 'jquery' ),
                    'js/cloud-setup-country.js' => array( 'bookly-select-country.js', 'bookly-alert.js', )
                ),
            ) );
        }
        if ( ! $cloud->account->getEmailConfirmed() ) {
            self::enqueueScripts( array(
                'module' => array( 'js/cloud-confirm-email.js' => array( 'jquery', ) )
            ) );
        }

        $l10n = array(
            'csrfToken' => Lib\Utils\Common::getCsrfToken(),
            'productsUrl' => Common::escAdminUrl( Modules\CloudProducts\Page::pageSlug() ),
        );
        if ( ! $cloud->account->getCountry() ) {
            $l10n += array(
                'noResults'     => __( 'No records.', 'bookly' ),
                'settingsSaved' => __( 'Settings saved.', 'bookly' ),
            );
        }
        if ( ! $cloud->account->getEmailConfirmed() ) {
            $l10n += array(
                'confirm_email_code_resent' => __( 'An email containing the confirmation code has been sent to your email address.', 'bookly' ),
                'show_confirm_email_dialog' => ! get_user_meta( get_current_user_id(), 'bookly_dismiss_cloud_confirm_email', true ),
            );
        }
        wp_localize_script( 'bookly-cloud-panel.js', 'BooklyCloudPanelL10n', $l10n );

        self::renderTemplate( 'panel', compact( 'cloud' ) );
    }
}