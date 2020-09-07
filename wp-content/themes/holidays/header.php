<?php
/**
 * The header for our theme
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package holidays
 */

?><?php
	/**
	 * Hook - holidays_action_doctype.
	 *
	 * @hooked holidays_doctype -  10
	 */
	do_action( 'holidays_action_doctype' );

?>
<head>
	<?php
	/**
	 * Hook - holidays_action_head.
	 *
	 * @hooked holidays_head -  10
	 */
	do_action( 'holidays_action_head' );
	?>


	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
	<?php
	/**
	 * Hook - holidays_action_before.
	 *
	 * @hooked holidays_page_start -  10
	 */
	do_action( 'holidays_action_before' );
	?>
	<?php
	/**
	 * Hook - holidays_action_before_header.
	 *
	 * @hooked holidays_header_start -  10
	 */
	do_action( 'holidays_action_before_header' );
	?>	
	<?php
	/**
	 * Hook - holidays_action_header.
	 *
	 * @hooked holidays_header -  10
	 */
	do_action( 'holidays_action_header' );
	?>	
	<?php
	/**
	 * Hook - holidays_action_after_header.
	 *
	 * @hooked holidays_header_end -  10
	 */
	do_action( 'holidays_action_after_header' );
	?>	
	<?php
	/**
	 * Hook - holidays_action_before_content.
	 *
	 * @hooked holidays_content_start -  10
	 */
	do_action( 'holidays_action_before_content' );
	?>

