<?php
/**
 * Default theme options.
 *
 * @package holidays
 */

if ( ! function_exists( 'holidays_get_default_theme_options' ) ) :

	/**
	 * Get default theme options.
	 *
	 * @since 1.0.0
	 *
	 * @return array Default theme options.
	 */
function holidays_get_default_theme_options() {

	$defaults = array();

/******************************** Header Section ********************************/
	$defaults['site_identity'] 						= 'title-text';
	$defaults['header_opening_time'] 				= '';
	$defaults['header_address'] 					= '';
	$defaults['header_number'] 						= '';
	$defaults['header_email'] 						= ''; 

/******************************** Slider Section ********************************/
	$defaults['enable_slider'] 						= false;
	$defaults['slider_category'] 					= 0;
	$defaults['slider_number'] 						= 2;	
	$defaults['featured_page_1'] 					= 0;
	$defaults['featured_page_2'] 					= 0;


/******************************** Home Page Section ********************************/
	$defaults['welcome_page'] 						= '';
	$defaults['enable_popular'] 					= false;
	$defaults['section_popular_title'] 				= '';
	$defaults['popular_category'] 					= 0;
	$defaults['popular_number'] 					= 3;
	$defaults['enable_tour'] 						= false;
	$defaults['section_tour_title'] 				= '';
	$defaults['tour_category'] 						= 0;
	$defaults['tour_number'] 						= 4;
	$defaults['enable_travel'] 						= false;
	$defaults['section_travel_title'] 				= '';
	$defaults['travel_category'] 					= 0;
	$defaults['travel_number'] 						= 4;


/******************************** Layout Setting ********************************/	
	$defaults['layout_options'] 					= 'right-sidebar'; 
	$defaults['default_layout'] 					= 'list-default';	
	
/******************************** General Setting ********************************/	
	$defaults['pagination_option'] 					= 'default';
	$defaults['enable_home_page'] 					= true;
	$defaults['enable_categories'] 					= true;
	$defaults['enable_tags'] 						= true;
	$defaults['enable_author'] 						= true;
	$defaults['enable_posted_date'] 				= true;
	


	
/******************************** Footer Section ********************************/	
	$defaults['footer_page'] 						= '';	
	$defaults['copyright_text'] 					= '';

	// Pass through filter.
	$defaults = apply_filters( 'holidays_filter_default_theme_options', $defaults );
	return $defaults;
}

endif;

/**
*  Get theme options
*/
if ( ! function_exists( 'holidays_get_option' ) ) :

	/**
	 * Get theme option
	 *
	 * @since 1.0.0
	 *
	 * @param string $key Option key.
	 * @return mixed Option value.
	 */
	function holidays_get_option( $key ) {

		$default_options = holidays_get_default_theme_options();

		if ( empty( $key ) ) {
			return;
		}

		$theme_options = (array)get_theme_mod( 'theme_options' );
		$theme_options = wp_parse_args( $theme_options, $default_options );

		$value = null;

		if ( isset( $theme_options[ $key ] ) ) {
			$value = $theme_options[ $key ];
		}

		return $value;
	}

endif;