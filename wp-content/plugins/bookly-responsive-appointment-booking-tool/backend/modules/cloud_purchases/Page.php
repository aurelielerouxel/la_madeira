<?php
namespace Bookly\Backend\Modules\CloudPurchases;

use Bookly\Lib;
use Bookly\Backend\Components;

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
        $cloud = Lib\Cloud\API::getInstance();
        if ( ! $cloud->account->loadProfile() ) {
            Components\Cloud\LoginRequired\Page::render( __( 'Bookly Cloud Purchases', 'bookly' ), self::pageSlug() );
        } else {
            self::enqueueStyles( array(
                'frontend' => array( 'css/ladda.min.css' ),
                'backend'  => array( 'bootstrap/css/bootstrap.min.css', ),
            ) );

            self::enqueueScripts( array(
                'backend'  => array(
                    'bootstrap/js/bootstrap.min.js' => array( 'jquery' ),
                    'js/datatables.min.js'          => array( 'jquery' ),
                    'js/moment.min.js',
                    'js/daterangepicker.js'         => array( 'jquery' ),
                ),
                'frontend' => array(
                    'js/spin.min.js'  => array( 'jquery' ),
                    'js/ladda.min.js' => array( 'jquery' ),
                ),
                'module'   => array(
                    'js/cloud-purchases.js' => array( 'bookly-ladda.min.js', ),
                ),
            ) );

            $datatables = Lib\Utils\Tables::getSettings( 'cloud_purchases' );

            $invoice_data = Lib\Cloud\API::getInstance()->account->getInvoiceData();

            wp_localize_script( 'bookly-cloud-purchases.js', 'BooklyL10n', array(
                'csrfToken'   => Lib\Utils\Common::getCsrfToken(),
                'zeroRecords' => __( 'No records for selected period.', 'bookly' ),
                'processing'  => __( 'Processing...', 'bookly' ),
                'datePicker'  => Lib\Utils\DateTime::datePickerOptions(),
                'dateRange'   => Lib\Utils\DateTime::dateRangeOptions( array( 'lastMonth' => __( 'Last month', 'bookly' ), ) ),
                'invoice'     => array(
                    'button' => __( 'Invoice', 'bookly' ),
                    'alert'  => __( 'To generate an invoice you should fill in company information in Bookly Cloud settings -> Invoice', 'bookly' ),
                    'link'   => $cloud->account->getInvoiceLink(),
                    'valid'  => isset ( $invoice_data['company_name'] ) && isset( $invoice_data['company_address'] ) && $invoice_data['company_name'] != '' && $invoice_data['company_address'] != '',
                ),
                'datatables'  => $datatables,
            ) );

            self::renderTemplate( 'index', compact( 'datatables' ) );
        }
    }
}