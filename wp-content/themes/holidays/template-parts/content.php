<?php
/**
 * Template part for displaying posts
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package holidays
 */

?>
<?php 
	global $holidays_post_count;	
	
	$layout_class = '';
	$default_layout = holidays_get_option('default_layout'); 
	if( 'list-opp' == $default_layout){
		
		if( $holidays_post_count%2 == 0 ){
			$layout_class = 'opp';
		}
	}

	$image_class = '';
	if( ! has_post_thumbnail() ){
		$image_class = 'no-image';
	}

?>
<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>

	<div class= "post-wrapper <?php echo esc_attr( $layout_class );?> <?php echo esc_attr( $image_class);?>" >

		<?php if( has_post_thumbnail() ): ?>

			<figure>
				<?php the_post_thumbnail();?>
			</figure>
		<?php endif;?>

		<div class="detail-content">

			<?php if ( 'post' === get_post_type() ) : ?>
				<div class="entry-meta">
					<?php holidays_entry_categories(); ?>
					<?php holidays_posted_on();?>
				</div><!-- .entry-meta -->
			<?php endif; ?>

			<header class="entry-header">
				<h2 class="entry-title"><a href="<?php the_permalink()?>"><?php the_title();?></a></h2>
			</header>

            <?php $excerpt = holidays_the_excerpt( 30 );
            if( !empty( $excerpt ) ) : ?>

                <div class="entry-content">

                    <?php echo wp_kses_post( $excerpt ) ; ?>
                </div>

            <?php endif;?> 

			<footer class="entry-footer">
				<?php holidays_entry_footer(); ?>
			</footer><!-- .entry-footer -->
			
		</div>

	</div>


	
</article><!-- #post-<?php the_ID(); ?> -->
