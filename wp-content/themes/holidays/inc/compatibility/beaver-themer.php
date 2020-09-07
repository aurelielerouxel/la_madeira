<?php
/**
 * Beaver Themer Compatibility File.
 *
 * @package holidays
 */

// If plugin - 'Beaver Themer' not exist then return.
if ( ! class_exists( 'FLThemeBuilderLoader' ) || ! class_exists( 'FLThemeBuilderLayoutData' ) ) {
	return;
}

/**
 * Beaver Themer Compatibility
 */
if ( ! class_exists( 'Holidays_Beaver_Themer' ) ) :

	/**
	 * Beaver Themer Compatibility
	 *
	 * @since 1.0.0
	 */
	class Holidays_Beaver_Themer {

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
		 */
		public function __construct() {
			add_action( 'after_setup_theme', array( $this, 'header_era_footer_support' ) );
			add_action( 'wp', array( $this, 'theme_header_footer_render' ) );
			add_action( 'fl_theme_builder_before_render_content', array( $this, 'builder_before_render_content' ), 10);
			add_action( 'fl_theme_builder_after_render_content', array( $this, 'builder_after_render_content' ), 10 );
		}

		/**
		 * Function to add Theme Support
		 *
		 * @since 1.0.0
		 */
		function header_footer_support() {

			add_theme_support( 'fl-theme-builder-headers' );
			add_theme_support( 'fl-theme-builder-footers' );
			add_theme_support( 'fl-theme-builder-parts' );
		}

		/**
		 * Function to update Atra header/footer with Beaver template
		 *
		 * @since 1.0.0
		 */
		function theme_header_footer_render() {

			// Get the header ID.
			$header_ids = FLThemeBuilderLayoutData::get_current_page_header_ids();

			// If we have a header, remove the theme header and hook in Theme Builder's.
			if ( ! empty( $header_ids ) ) {
				remove_action( 'holidays_action_header', 'holidays_top_header', 10 );
				remove_action( 'holidays_action_header', 'holidays_site_branding', 15 );
				remove_action( 'holidays_action_header', 'holidays_quick_info', 20 );
				remove_action( 'holidays_action_header', 'holidays_site_nav_menu', 25 );
				add_action( 'holidays_action_header', 'FLThemeBuilderLayoutRenderer::render_header' );
			}

			// Get the footer ID.
			$footer_ids = FLThemeBuilderLayoutData::get_current_page_footer_ids();

			// If we have a footer, remove the theme footer and hook in Theme Builder's.
			if ( ! empty( $footer_ids ) ) {
				remove_action( 'holidays_action_footer', 'holidays_top_footer', 10 );
				remove_action( 'holidays_action_footer', 'holidays_footer_widget', 15 );
				remove_action( 'holidays_action_footer', 'holidays_copyright', 20 );
				add_action( 'holidays_action_footer', 'FLThemeBuilderLayoutRenderer::render_footer' );
			}			

		}
	}

endif;

/**
 * Kicking this off by calling 'get_instance()' method
 */
Holidays_Beaver_Themer::get_instance();
