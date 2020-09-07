<?php
/**
 * The template for displaying search results pages
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/#search-result
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

		<section id="primary" class="content-area <?php echo esc_attr( $layout_class);?>">
			<main id="main" class="site-main">

			<?php
			if ( have_posts() ) : ?>

				<header class="page-header">
					<h1 class="page-title"><?php
						/* translators: %s: search query. */
						printf( esc_html__( 'Search Results for: %s', 'holidays' ), '<span>' . get_search_query() . '</span>' );
					?></h1>
				</header><!-- .page-header -->

				<?php
				/* Start the Loop */
				while ( have_posts() ) : the_post();

					/**
					 * Run the loop for the search to output the results.
					 * If you want to overload this in a child theme then include a file
					 * called content-search.php and that will be used instead.
					 */
					get_template_part( 'template-parts/content', 'search' );

				endwhile;

				the_posts_navigation();

			else :

				get_template_part( 'template-parts/content', 'none' );

			endif; ?>

			</main><!-- #main -->
		</section><!-- #primary -->
		<?php get_sidebar();?>
	</div>
</div>
<?php
get_footer();
