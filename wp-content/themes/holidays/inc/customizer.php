<?php
/**
 * holidays Theme Customizer
 *
 * @package holidays
 */

/**
 * Add postMessage support for site title and description for the Theme Customizer.
 *
 * @param WP_Customize_Manager $wp_customize Theme Customizer object.
 */
function holidays_customize_register( $wp_customize ) {
	$wp_customize->get_setting( 'blogname' )->transport         = 'postMessage';
	$wp_customize->get_setting( 'blogdescription' )->transport  = 'postMessage';
	$wp_customize->get_setting( 'header_textcolor' )->transport = 'postMessage';

	if ( isset( $wp_customize->selective_refresh ) ) {
		$wp_customize->selective_refresh->add_partial( 'blogname', array(
			'selector'        => '.site-title a',
			'render_callback' => 'holidays_customize_partial_blogname',
		) );
		$wp_customize->selective_refresh->add_partial( 'blogdescription', array(
			'selector'        => '.site-description',
			'render_callback' => 'holidays_customize_partial_blogdescription',
		) );
	}
	$wp_customize->register_section_type( 'Holidays_Customize_Section_Upsell' );
	// Register sections.
	$wp_customize->add_section(
		new Holidays_Customize_Section_Upsell(
			$wp_customize,
			'theme_upsell',
			array(
				'title'    => esc_html__( 'Holidays Pro', 'holidays' ),
				'pro_text' => esc_html__( 'Buy Pro', 'holidays' ),
				'pro_url'  => 'http://96themes.com/downloads/holidays-pro/',
				'priority' => 1,
			)
		)
	);

	// Load customize sanitize.
	require get_template_directory() . '/inc/customizer/sanitize.php';

	// Load customize callback.
	//require get_template_directory() . '/inc/customizer/callback.php';

	// Load header sections option.
	require get_template_directory() . '/inc/customizer/theme-section.php';

	// Load home page sections option.
	require get_template_directory() . '/inc/customizer/home-section.php';	

}
add_action( 'customize_register', 'holidays_customize_register' );

/**
 * Render the site title for the selective refresh partial.
 *
 * @return void
 */
function holidays_customize_partial_blogname() {
	bloginfo( 'name' );
}

/**
 * Render the site tagline for the selective refresh partial.
 *
 * @return void
 */
function holidays_customize_partial_blogdescription() {
	bloginfo( 'description' );
}

/**
 * Binds JS handlers to make Theme Customizer preview reload changes asynchronously.
 */
function holidays_customize_preview_js() {
	wp_enqueue_script( 'holidays-customizer', get_template_directory_uri() . '/assets/js/customizer.js', array( 'customize-preview' ), '20151215', true );
}
add_action( 'customize_preview_init', 'holidays_customize_preview_js' );


/**
 * Script for backend 
 */
function holidays_customize_backend_scripts() {

	wp_enqueue_style( 'holidays-admin-customizer-style', get_template_directory_uri() . '/inc/customizer/css/customizer-style.css' );

	wp_enqueue_script( 'holidays-admin-customizer', get_template_directory_uri() . '/inc/customizer/js/customizer-scipt.js', array( ), '20151215', true );
}
add_action( 'customize_controls_enqueue_scripts', 'holidays_customize_backend_scripts', 10 );

