<?php
/**
 * The template for displaying all single posts
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/#single-post
 *
 * @package holidays
 */

get_header(); ?>
<div class="container">
	<div class="row">
		<?php 
			$layout_class ='col-9';
			$sidebar_layout = holidays_get_option( 'layout_options' ); 
			if( is_active_sidebar('sidebar-1') && 'no-sidebar' !==  $sidebar_layout){
				$layout_class = 'col-9';
			}
			else{
				$layout_class = 'col-12';
			}		
		?>	
			<div id="primary" class="content-area <?php echo esc_attr( $layout_class);?>">
				<main id="main" class="site-main">

					<?php
					while ( have_posts() ) : the_post();

					get_template_part( 'template-parts/content', 'single' );

					the_post_navigation();

					// If comments are open or we have at least one comment, load up the comment template.
					if ( comments_open() || get_comments_number() ) :
						comments_template();
					endif;

				endwhile; // End of the loop.
				?>

				</main><!-- #main -->
			</div><!-- #primary -->
	<?php get_sidebar();?>
	</div>
</div>

<?php
get_footer();
