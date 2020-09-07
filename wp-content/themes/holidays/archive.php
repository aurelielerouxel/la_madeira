<?php
/**
 * The template for displaying archive pages
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
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
			if ( have_posts() ) :  
				global $holidays_post_count;
				$holidays_post_count= 0;?>

				<header class="page-header">
					<?php
						the_archive_title( '<h1 class="page-title">', '</h1>' );
						the_archive_description( '<div class="archive-description">', '</div>' );
					?>
				</header><!-- .page-header -->

				<?php
				/* Start the Loop */
				while ( have_posts() ) : the_post(); $holidays_post_count++;

					/*
					 * Include the Post-Format-specific template for the content.
					 * If you want to override this in a child theme, then include a file
					 * called content-___.php (where ___ is the Post Format name) and that will be used instead.
					 */
					get_template_part( 'template-parts/content', get_post_format() );

				endwhile;

				do_action( 'holidays_action_posts_navigation' );

			else :

				get_template_part( 'template-parts/content', 'none' );

			endif; ?>

			</main><!-- #main -->
		</div><!-- #primary -->

		<?php get_sidebar(); ?>
	</div>
</div>

<?php
get_footer();
