<?php
/**
 * The template for displaying the footer
 *
 * Contains the closing of the #content div and all content after.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package holidays
 */

?>
	<?php
	/**
	 * Hook - holidays_footer_top.
	 *
	 * @hooked holidays_footer_top -  10
	 */
	do_action( 'holidays_footer_top' );

	?>
	<?php
	/**
	 * Hook - holidays_action_after_content.
	 *
	 * @hooked holidays_content_end -  10
	 */
	do_action( 'holidays_action_after_content' );
	?>

	<?php
	/**
	 * Hook - holidays_action_before_footer.
	 *
	 * @hooked holidays_footer_start -  10
	 */
	do_action( 'holidays_action_before_footer' );
	?>
	<?php
	/**
	 * Hook - holidays_action_footer.
	 *
	 * @hooked holidays_footer -  10
	 */
	do_action( 'holidays_action_footer' );
	?>
	<?php
	/**
	 * Hook - holidays_action_after_content.
	 *
	 * @hooked holidays_footer_end -  10
	 */
	do_action( 'holidays_action_after_content' );
	?>
	<?php
	/**
	 * Hook - holidays_action_after.
	 *
	 * @hooked holidays_page_end -  10
	 */
	do_action( 'holidays_action_after' );
	?>

<?php wp_footer(); ?>

</body>
</html>
