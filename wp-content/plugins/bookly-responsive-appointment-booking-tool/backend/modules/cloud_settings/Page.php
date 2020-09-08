<?php
namespace Bookly\Backend\Modules\CloudSettings;

use Bookly\Lib;
use Bookly\Backend\Components;

/**
 * Class Page
 * @package Bookly\Backend\Modules\CloudSettings
 */
class Page extends Lib\Base\Component
{
    /**
     * Render page.
     */
    public static function render()
    {
        $cloud = Lib\Cloud\API::getInstance();
        if ( ! $cloud->account->loadProfile() ) {
            Components\Cloud\LoginRequired\Page::render( __( 'Bookly Cloud Settings', 'bookly' ), self::pageSlug() );
        } else {
            self::enqueueStyles( array(
                'frontend' => array( 'css/ladda.min.css', 'css/intlTelInput.css' ),
                'backend'  => array( 'bootstrap/css/bootstrap.min.css', ),
            ) );

            self::enqueueScripts( array(
                'backend'  => array(
                    'js/alert.js'                   => array( 'jquery' ),
                    'bootstrap/js/bootstrap.min.js' => array( 'jquery' ),
                    'js/select2.min.js'             => array( 'jquery' ),
                ),
                'frontend' => array(
                    'js/spin.min.js'  => array( 'jquery' ),
                    'js/ladda.min.js' => array( 'jquery' ),
                ),
                'bookly'   => array(
                    'backend/components/cloud/account/resources/js/select-country.js' => array( 'jquery' ),
                ),
                'module'   => array(
                    'js/cloud-settings.js' => array( 'bookly-select-country.js', ),
                ),
            ) );

            wp_localize_script( 'bookly-cloud-settings.js', 'BooklyL10n', array(
                'csrfToken'          => Lib\Utils\Common::getCsrfToken(),
                'country'            => $cloud->account->getCountry(),
                'noResults'          => __( 'No records.', 'bookly' ),
                'settingsSaved'      => __( 'Settings saved.', 'bookly' ),
                'passwords_no_match' => __( 'Passwords don\'t match', 'bookly' ),
            ) );

            self::renderTemplate( 'index', compact( 'cloud' ) );
        }
    }
}