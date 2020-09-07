<?php
/**
 * Elementor Compatibility File.
 *
 * @package holidays
 */
namespace Elementor;


if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

// If plugin - 'Elementor' not exist then return.
if ( ! class_exists( '\Elementor\Plugin' ) || ! class_exists( 'Header_Footer_Elementor' ) ) {
	return;
}

/**
 * Elementor Compatibility
 */
if ( ! class_exists( 'Holidays_Elementor' ) ) :

	/**
	 * Elementor Compatibility
	 *
	 * @since 1.0.0
	 */
	class Holidays_Elementor {

		/**
		 * Member Variable
		 *
		 * @var object instance
		 */
		private static $instance;

		/**
		 * Initiator
		 */
		public static function get_instance() {
			if ( ! isset( self::$instance ) ) {
				self::$instance = new self;
			}
			return self::$instance;
		}

		/**
		 * Constructor
		 *
		 * @since 1.0.0
		 */
		public function __construct() {
			// Add Theme Support for Header Footer Elementor
			add_action( 'after_setup_theme', array( $this, 'theme_support' ) );

			// Override Header  and Footer templates.
			add_action( 'init', array( $this, 'support' ) );
			
		}
		public function theme_support() {
			add_theme_support( 'header-footer-elementor' );
		}

		/**
		 * Add header and footer support
		 */
		public function support() {
			if ( hfe_header_enabled() ) {
				remove_action( 'holidays_action_header', 'holidays_top_header', 10 );
				remove_action( 'holidays_action_header', 'holidays_site_branding', 15 );
				remove_action( 'holidays_action_header', 'holidays_quick_info', 20 );
				remove_action( 'holidays_action_header', 'holidays_site_nav_menu', 25 );
				add_action( 'holidays_action_header', 'hfe_render_header' );
			}
			if ( hfe_footer_enabled() ) {
				remove_action( 'holidays_action_footer', 'holidays_top_footer', 10 );
				remove_action( 'holidays_action_footer', 'holidays_footer_widget', 15 );
				remove_action( 'holidays_action_footer', 'holidays_copyright', 20 );
				add_action( 'holidays_action_footer', 'hfe_render_footer' );
			}
		}			

	}
Holidays_Elementor::get_instance();	

endif;


