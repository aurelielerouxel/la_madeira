<?php
namespace Bookly\Backend\Components\Appearance;

use Bookly\Lib;
use Bookly\Backend\Modules\Appearance\Proxy;

/**
 * Class Editable
 * @package Bookly\Backend\Components\Appearance
 */
class Editable extends Lib\Base\Component
{
    /**
     * Render editable string (single line).
     *
     * @param array $options
     * @param bool $echo
     * @return string
     */
    public static function renderString( array $options, $title = '', $echo = true )
    {
        return self::_renderEditable( $options, 'span', $title, $echo );
    }

    /**
     * Render editable label.
     *
     * @param array $options
     * @param bool $echo
     * @return string
     */
    public static function renderLabel( array $options, $title = '', $echo = true )
    {
        return self::_renderEditable( $options, 'label', $title, $echo );
    }

    /**
     * Render editable text (multi-line).
     *
     * @param string $option_name
     * @param string $codes
     * @param string $placement
     * @param string $title
     */
    public static function renderText( $option_name, $codes = '', $placement = 'bottom', $title = '' )
    {
        $option_value = get_option( $option_name );

        printf( '<span class="bookly-editable bookly-js-editable bookly-js-option %s text-pre-wrap" data-type="bookly" data-fieldType="textarea" data-values="%s" data-codes="%s" data-title="%s" data-placement="%s" data-option="%s">%s</span>',
            $option_name,
            esc_attr( json_encode( array( $option_name => $option_value ) ) ),
            esc_attr( $codes ),
            esc_attr( $title ),
            $placement,
            $option_name,
            esc_html( $option_value )
        );
    }

    /**
     * Render editable number.
     *
     * @param string $option_name
     * @param int    $min
     * @param int    $step
     */
    public static function renderNumber( $option_name, $min = 1, $step = 1 )
    {
        $option_value = get_option( $option_name );

        printf( '<span class="bookly-editable bookly-js-editable bookly-js-option %s text-pre-wrap" data-type="bookly" data-fieldType="number" data-values="%s" data-min="%s" data-step="%s" data-option="%s">%s</span>',
            $option_name,
            esc_attr( json_encode( array( $option_name => $option_value ) ) ),
            esc_attr( $min ),
            esc_attr( $step ),
            $option_name,
            esc_html( $option_value )
        );
    }

    /**
     * Render editable element.
     *
     * @param array $options
     * @param string $tag
     * @param bool $echo
     * @return string|void
     */
    private static function _renderEditable( array $options, $tag, $title = '', $echo = true )
    {
        $data = array();
        foreach ( $options as $option_name ) {
            $data[ $option_name ] = get_option( $option_name );
        }

        $main_option = $options[0];
        $class       = implode( ' ', $options );
        $data_values = esc_attr( json_encode( $data ) );
        $content     = esc_html( $data[ $options[0] ] );
        $data_title = $title
            ? ' data-title="' .esc_attr__( $title ) . '"'
            : '';

        $template = '<{tag} class="bookly-editable bookly-js-editable bookly-js-option {class}" data-type="bookly" data-values="{data-values}" data-option="{data-option}"{data-title}>{content}</{tag}>';
        $html = strtr( $template, array(
            '{tag}'         => $tag,
            '{class}'       => $class,
            '{data-values}' => $data_values,
            '{data-option}' => $main_option,
            '{data-title}'  => $data_title,
            '{content}'     => $content,
        ) );

        if ( ! $echo ) {
            return $html;
        }

        echo $html;
    }

    /**
     * Render radio buttons for all payment gateways
     */
    public static function renderPaymentGateways()
    {
        $gateways = array(
            'local' => array(
                'label_option_name' => 'bookly_l10n_label_pay_locally',
                'title'             => __( 'Local', 'bookly' ),
                'with_card'         => false,
                'logo_url'          => null,
            ),
        );
        if ( Lib\Cloud\API::getInstance()->account->productActive( 'stripe' ) ) {
            $gateways['cloud_stripe'] = array(
                'label_option_name' => 'bookly_l10n_label_pay_cloud_stripe',
                'title'             => 'Stripe Cloud',
                'with_card'         => true,
                'logo_url'          => 'default',
            );
        }

        $gateways = array_map( function ( $gateway ) {
            if ( $gateway['logo_url'] === 'default' ) {
                $gateway['logo_url'] = plugins_url( 'frontend/resources/images/cards.png', Lib\Plugin::getMainFile() );
            }

            return $gateway;
        }, Proxy\Shared::paymentGateways( $gateways ) );

        $order = explode( ',', get_option( 'bookly_pmt_order' ) );
        $payment_options = array();

        if ( $order ) {
            foreach ( $order as $payment_system ) {
                if ( array_key_exists( $payment_system, $gateways ) ) {
                    $payment_options[] = $gateways[ $payment_system ];
                    unset( $gateways[ $payment_system ] );
                }
            }
        }
        $payment_options = array_merge( $payment_options, $gateways );

        foreach ( $payment_options as $gateway ) {
            self::renderTemplate( 'gateway_selector', $gateway );
        }
    }
}