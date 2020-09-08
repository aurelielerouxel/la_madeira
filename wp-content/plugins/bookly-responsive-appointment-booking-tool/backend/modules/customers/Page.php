<?php
namespace Bookly\Backend\Modules\Customers;

use Bookly\Lib;

/**
 * Class Page
 * @package Bookly\Backend\Modules\Customers
 */
class Page extends Lib\Base\Component
{
    /**
     * Render page.
     */
    public static function render()
    {
        if ( self::hasParameter( 'import-customers' ) ) {
            Proxy\Pro::importCustomers();
        }

        self::enqueueStyles( array(
            'backend'  => array( 'bootstrap/css/bootstrap.min.css', ),
            'frontend' => array( 'css/ladda.min.css', ),
        ) );

        self::enqueueScripts( array(
            'backend' => array(
                'bootstrap/js/bootstrap.min.js' => array( 'jquery' ),
                'js/datatables.min.js' => array( 'jquery' ),
            ),
            'frontend' => array(
                'js/spin.min.js' => array( 'jquery' ),
                'js/ladda.min.js' => array( 'jquery' ),
            ),
            'module' => array(
                'js/customers.js' => array( 'bookly-datatables.min.js', 'bookly-ng-customer.js' ),
            ),
        ) );

        $datatables = Lib\Utils\Tables::getSettings( 'customers' );
        if ( ! $datatables['customers']['exist'] ) {
            $datatables['customers']['settings']['columns']['full_name']  = ! Lib\Config::showFirstLastName();
            $datatables['customers']['settings']['columns']['first_name'] = Lib\Config::showFirstLastName();
            $datatables['customers']['settings']['columns']['last_name']  = Lib\Config::showFirstLastName();
        }

        $info_fields = (array) Lib\Proxy\CustomerInformation::getFieldsWhichMayHaveData();

        wp_localize_script( 'bookly-customers.js', 'BooklyL10n', array(
            'csrfToken'       => Lib\Utils\Common::getCsrfToken(),
            'infoFields'      => $info_fields,
            'edit'            => __( 'Edit', 'bookly' ),
            'are_you_sure'    => __( 'Are you sure?', 'bookly' ),
            'wp_users'        => get_users( array( 'fields' => array( 'ID', 'display_name' ), 'orderby' => 'display_name' ) ),
            'zeroRecords'     => __( 'No customers found.', 'bookly' ),
            'processing'      => __( 'Processing...', 'bookly' ),
            'edit_customer'   => __( 'Edit customer', 'bookly' ),
            'new_customer'    => __( 'New customer', 'bookly' ),
            'create_customer' => __( 'Create customer', 'bookly' ),
            'save'            => __( 'Save', 'bookly' ),
            'search'          => __( 'Quick search customer', 'bookly' ),
            'datatables'      => $datatables,
        ) );

        self::renderTemplate( 'index', compact( 'datatables' ) );
    }
}