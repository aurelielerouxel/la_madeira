<?php
namespace Bookly\Backend\Components\Cloud\LoginRequired;

use Bookly\Lib;

/**
 * Class Page
 * @package Bookly\Backend\Modules\CloudProducts
 */
class Page extends Lib\Base\Component
{
    /**
     * Render page.
     *
     * @param string $title
     * @param string $slug
     */
    public static function render( $title, $slug )
    {
        self::enqueueStyles( array(
            'backend' => array( 'bootstrap/css/bootstrap.min.css', ),
        ) );

        self::enqueueScripts( array(
            'backend' => array(
                'bootstrap/js/bootstrap.min.js' => array( 'jquery' ),
            ),
        ) );

        self::renderTemplate( 'index', compact( 'title', 'slug' ) );
    }
}