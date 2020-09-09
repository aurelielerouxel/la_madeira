<?php
namespace Bookly\Backend\Components\Notices;

use Bookly\Lib;

/**
 * Class SmsPromotion
 * @package Bookly\Backend\Components\Notices
 */
class SmsPromotion extends Lib\Base\Component
{
    /**
     * Render collect stats notice.
     */
    public static function render()
    {
        if ( Lib\Utils\Common::isCurrentUserAdmin() && isset ( $_REQUEST['page'] ) && ( strncmp( $_REQUEST['page'], 'bookly-cloud', 12 ) === 0 ) ) {
            $promotion = Lib\Cloud\API::getInstance()->general->getPromotionForNotice( $type );
            if ( $promotion ) {
                self::enqueueStyles( array(
                    'frontend' => array( 'css/ladda.min.css', ),
                    'backend'  => array( 'bootstrap/css/bootstrap.min.css', ),
                ) );
                self::enqueueScripts( array(
                    'backend'  => array( 'bootstrap/js/bootstrap.min.js' => array( 'jquery' ), ),
                    'frontend' => array(
                        'js/spin.min.js'  => array( 'jquery' ),
                        'js/ladda.min.js' => array( 'jquery' ),
                    ),
                    'module'   => array( 'js/sms-promotion.js' => array( 'jquery' ), ),
                ) );

                wp_localize_script( 'bookly-sms-promotion.js', 'BooklySmsPromotionL10n', array(
                    'csrfToken' => Lib\Utils\Common::getCsrfToken(),
                ) );

                self::renderTemplate( 'sms_promotion', compact( 'type', 'promotion' ) );
            }
        }
    }
}