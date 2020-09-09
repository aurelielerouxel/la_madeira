<?php
namespace Bookly\Backend\Components\Cloud\Recharge\Amounts\Auto;

use Bookly\Backend\Components\Cloud\Recharge\Amounts;
use Bookly\Lib;

/**
 * Class Button
 * @package Bookly\Backend\Components\Cloud\Recharge\Amounts\Auto
 */
class Button extends Lib\Base\Component
{
    public static function renderSelector()
    {
        self::enqueueStyles( array(
            'frontend' => array( 'css/ladda.min.css', ),
            'backend'  => array( 'css/fontawesome-all.min.css', ),
        ) );

        self::enqueueScripts( array(
            'frontend' => array(
                'js/spin.min.js'  => array( 'jquery', ),
                'js/ladda.min.js' => array( 'jquery', ),
            ),
            'backend'  => array( 'js/alert.js' => array( 'jquery' ), ),
            'module'   => array( 'js/recharge-auto.js' => array( 'jquery' ), ),
        ) );

        $cloud = Lib\Cloud\API::getInstance();
        $auto_recharge = array(
            'enabled' => $cloud->account->autoRechargeEnabled(),
            'amount'  => $cloud->account->getAutoRechargeAmount(),
            'bonus'   => $cloud->account->getAutoRechargeBonus()
        );

        wp_localize_script( 'bookly-recharge-auto.js', 'BooklyAutoRechargeL10n', array(
            'csrfToken'     => Lib\Utils\Common::getCsrfToken(),
            'auto_recharge' => $auto_recharge,
        ) );

        self::renderTemplate( 'selector', array( 'recharges' => Amounts::getInstance()->getItems( Amounts::RECHARGE_TYPE_AUTO ) ) );
    }

    public static function renderRecharges()
    {
        self::renderTemplate( 'recharges' );
    }

    public static function renderConfirmModal()
    {
        self::renderTemplate( 'modal' );
    }
}