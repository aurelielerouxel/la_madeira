<?php
/**
 * The sidebar containing the home widget area
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package holidays
 */

if ( ! is_active_sidebar( 'home-sidebar' ) ) {
	return;
}
?>
<?php $home_layout_options = holidays_get_option('home_layout_options'); 

if ( 'no-sidebar' !== $home_layout_options ) : ?>

	<aside id="secondary" class="widget-area col-3">
		<?php dynamic_sidebar( 'home-sidebar' ); ?>
	</aside><!-- #secondary -->
<?php endif;?>

