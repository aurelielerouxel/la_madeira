<?php 
/**
 * Theme functions related to structure.
 *
 * This file contains structural hook functions.
 *
 * @package Holidays
 */

if ( ! function_exists( 'holidays_doctype' ) ) :
	/**
	 * Doctype Declaration.
	 *
	 * @since 1.0.0
	 */
	function holidays_doctype() {
	?><!DOCTYPE html> <html <?php language_attributes(); ?>><?php
	}
endif;

add_action( 'holidays_action_doctype', 'holidays_doctype', 10 );

if ( ! function_exists( 'holidays_head' ) ) :
	/**
	 * Header Code.
	 *
	 * @since 1.0.0
	 */
	function holidays_head() {
	?>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="profile" href="http://gmpg.org/xfn/11">
    <link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">
    
	<?php
	}
endif;
add_action( 'holidays_action_head', 'holidays_head', 10 );

if ( ! function_exists( 'holidays_page_start' ) ) :
	/**
	 * Page Start.
	 *
	 * @since 1.0.0
	 */
	function holidays_page_start() {
	?>
    <div id="page" class="site">
    <a class="skip-link screen-reader-text" href="#content"><?php esc_html_e( 'Skip to content', 'holidays' ); ?></a>
    <?php
	}
endif;
add_action( 'holidays_action_before', 'holidays_page_start' );

if ( ! function_exists( 'holidays_page_end' ) ) :
	/**
	 * Page End.
	 *
	 * @since 1.0.0
	 */
	function holidays_page_end() {
	?></div><!-- #page --><?php
	}
endif;
add_action( 'holidays_action_after', 'holidays_page_end' );

if ( ! function_exists( 'holidays_header_start' ) ) :
	/**
	 * Header Start.
	 *
	 * @since 1.0.0
	 */
	function holidays_header_start() {
	?><header id="masthead" class="site-header" role="banner"><?php
	}
endif;
add_action( 'holidays_action_before_header', 'holidays_header_start' );

if ( ! function_exists( 'holidays_header_end' ) ) :
	/**
	 * Header End.
	 *
	 * @since 1.0.0
	 */
	function holidays_header_end() {
	?></header><!-- #masthead -->
	<?php
	}
endif;
add_action( 'holidays_action_after_header', 'holidays_header_end' );

if ( ! function_exists( 'holidays_content_start' ) ) :
	/**
	 * Content Start.
	 *
	 * @since 1.0.0
	 */
	function holidays_content_start() {
	?><div id="content" class="site-content"><?php
	}
endif;
add_action( 'holidays_action_before_content', 'holidays_content_start' );


if ( ! function_exists( 'holidays_content_end' ) ) :
	/**
	 * Content End.
	 *
	 * @since 1.0.0
	 */
	function holidays_content_end() {
	?></div><!-- #content --><?php
	}
endif;
add_action( 'holidays_action_after_content', 'holidays_content_end' );



if ( ! function_exists( 'holidays_footer_start' ) ) :
	/**
	 * Footer Start.
	 *
	 * @since 1.0.0
	 */
	function holidays_footer_start() {
	?><footer id="colophon" class="site-footer" role="contentinfo">
	<?php
	}
endif;
add_action( 'holidays_action_before_footer', 'holidays_footer_start' );


if ( ! function_exists( 'holidays_footer_end' ) ) :
	/**
	 * Footer End.
	 *
	 * @since 1.0.0
	 */
	function holidays_footer_end() {
	?></div><!-- .site-info --></footer><!-- #colophon -->
	<?php
	}
endif;
add_action( 'holidays_action_after_footer', 'holidays_footer_end' );
