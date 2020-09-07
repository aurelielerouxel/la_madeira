<?php
/**
 * Load files.
 *
 * @package holidays
 */

/**
 * Include default theme options.
 */
require_once trailingslashit( get_template_directory() ) . 'inc/customizer/default.php';


/**
 * Load hooks.
 */
require_once trailingslashit( get_template_directory() ) . 'inc/class-tgm-plugin-activation.php';
require_once trailingslashit( get_template_directory() ) . 'inc/hook/structure.php';
require_once trailingslashit( get_template_directory() ) . 'inc/customizer/basic.php';
require_once trailingslashit( get_template_directory() ) . 'inc/hook/custom.php';



/**
 * Implement the Custom Header feature.
 */
require trailingslashit( get_template_directory() ) . '/inc/custom-header.php';

/**
 * Custom template tags for this theme.
 */
require trailingslashit( get_template_directory() ) . '/inc/template-tags.php';

/**
 * Functions which enhance the theme by hooking into WordPress.
 */
require trailingslashit( get_template_directory() ) . '/inc/template-functions.php';

/**
 * Customizer additions.
 */
require trailingslashit( get_template_directory() ) . '/inc/customizer.php';

/**
 * Load Jetpack compatibility file.
 */
if ( defined( 'JETPACK__VERSION' ) ) {
	require trailingslashit( get_template_directory() ) . '/inc/jetpack.php';
}
/**
 *  Demo Import Post
 */
require_once trailingslashit( get_template_directory() ) . '/inc/hook/demo-import.php';

/** 
 * Add the Elementor compatibility file 
 */
require_once trailingslashit( get_template_directory() ) . '/inc/compatibility/elementor-pro.php';


/** 
 * Add the Header Footer Elementor compatibility file 
 */
require_once trailingslashit( get_template_directory() ) . '/inc/compatibility/elementor.php';

/**
 * Implement the Beaver Themer Hook.
 */
require_once trailingslashit( get_template_directory() ) . 'inc/compatibility/beaver-themer.php';