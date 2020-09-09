<?php
namespace Bookly\Backend\Modules\CloudProducts;

use Bookly\Lib;

/**
 * Class Page
 * @package Bookly\Backend\Modules\CloudProducts
 */
class Page extends Lib\Base\Component
{
    /**
     * Render page.
     */
    public static function render()
    {
        self::enqueueStyles( array(
            'frontend' => array( 'css/ladda.min.css' ),
            'backend'  => array( 'bootstrap/css/bootstrap.min.css', ),
        ) );

        self::enqueueScripts( array(
            'backend'  => array(
                'bootstrap/js/bootstrap.min.js' => array( 'jquery' ),
            ),
            'frontend' => array(
                'js/spin.min.js'  => array( 'jquery' ),
                'js/ladda.min.js' => array( 'jquery' ),
            ),
            'module'   => array(
                'js/cloud-products.js' => array( 'bookly-ladda.min.js', ),
            ),
        ) );

        $cloud = Lib\Cloud\API::getInstance();

        $products = array();
        foreach ( $cloud->general->getProducts() as $product ) {
            $products[ $product['id'] ] = array(
                'title'      => $product['texts']['title'],
                'info_title' => $product['texts']['info-title'],
            );
        }

        wp_localize_script( 'bookly-cloud-products.js', 'BooklyL10n', array(
            'csrfToken' => Lib\Utils\Common::getCsrfToken(),
            'products'  => $products,
        ) );

        self::renderTemplate( 'index', compact( 'cloud' ) );
    }
}