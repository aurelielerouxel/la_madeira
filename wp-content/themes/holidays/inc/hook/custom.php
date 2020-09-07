<?php
/**
 * Custom theme functions.
 *
 * This file contains hook functions attached to theme hooks.
 *
 * @package Holidays
 */
if ( ! function_exists( 'holidays_top_header' ) ) :
	/**
	 * Top Header
	 * @since 1.0.0
	 */
	function holidays_top_header() {
		$bg_image_url = get_header_image(); 
	?>
	<div class="top-heading"  style="background-image:url(<?php echo esc_url( $bg_image_url ); ?>);">
		<div class="container">

			<div class="quick-info-contact">
				<?php 
					$header_number = holidays_get_option('header_number');
					$header_email = holidays_get_option('header_email');
				?>
				<ul>
					<?php if(!empty($header_number)):?>
						<li>
							<a href="tel:<?php echo preg_replace( '/\D+/', '', esc_attr( $header_number ) ); ?>"><i class="fa fa-phone"></i><?php echo esc_attr($header_number);?></a>
						</li>
					<?php endif;?>

					<?php if(!empty($header_email)):?>
						<li>
							<a href="mailto:<?php echo esc_attr($header_email);?>"><i class="fa fa-envelope"></i><?php echo esc_attr( antispambot( $header_email ) ); ?></a>
						</li>
					<?php endif;?>

				</ul>
			</div>
	
	<?php }
	endif;
add_action( 'holidays_action_header', 'holidays_top_header', 10 );


if ( ! function_exists( 'holidays_site_branding' ) ) :
	/**
	 * Site Branding
	 * @since 1.0.0
	 */
function holidays_site_branding() {	
	?>
	<div class="site-branding">
		<?php $site_identity = holidays_get_option( 'site_identity' );
		$title = get_bloginfo( 'name', 'display' );
		$description    = get_bloginfo( 'description', 'display' );

		if( 'logo-only' == $site_identity){

			if ( has_custom_logo() ) {

				the_custom_logo();

			}
		} elseif( 'logo-text' == $site_identity){

			if ( has_custom_logo() ) {

				the_custom_logo();

			}

			if ( $description ) {
				echo '<p class="site-description">'.esc_attr( $description ).'</p>';
			}

		} elseif( 'title-only' == $site_identity && $title ){ ?>

			<h1 class="site-title"><a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a></h1>
		<?php 

		}elseif( 'title-text' == $site_identity){ 
		

			if( $title ){ ?>

				<h1 class="site-title"><a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a></h1>
			<?php 
			}

			if ( $description ) {

				echo '<p class="site-description">'.esc_attr( $description ).'</p>';

			}
			
		} ?> 
	</div>	
<?php
}
endif;
add_action( 'holidays_action_header', 'holidays_site_branding', 15 );

if ( ! function_exists( 'holidays_quick_info' ) ) :
	/**
	 * Nav Menu
	 * @since 1.0.0
	 */
	function holidays_quick_info() {
	?>
			<div class="quick-info">
			<?php $header_opening_time = holidays_get_option('header_opening_time');
				$header_address = holidays_get_option('header_address');
			?>
				<ul>
					
					<?php if(!empty($header_address)):?>
						<li><i class="fa fa-map-marker"></i><?php echo esc_html( $header_address );?></li>
					<?php endif;?>

					<?php if(!empty($header_opening_time)):?>
						<li><i class="fa fa-clock-o"></i><?php echo esc_html( $header_opening_time );?></li>
					<?php endif;?>

				</ul>
			</div>

		</div>

	</div>
	<?php }
	endif;
add_action( 'holidays_action_header', 'holidays_quick_info', 20 );


if ( ! function_exists( 'holidays_site_nav_menu' ) ) :
	/**
	 * Nav Menu
	 * @since 1.0.0
	 */
	function holidays_site_nav_menu() {
	?>
	<div class="main-menu-heading">
	
		<div class="container">

			<div class="menu-holder">		

				<nav id="site-navigation" class="main-navigation">
					<?php
						wp_nav_menu( array(
							'theme_location' => 'menu-1',
							'menu_id'        => 'primary-menu',
						) );
					?>
				</nav><!-- #site-navigation -->

			</div>

		</div>

	</div>
	<?php }
	endif;
add_action( 'holidays_action_header', 'holidays_site_nav_menu', 25 );

if ( ! function_exists( 'holidays_featured_slider' ) ) :
	/**
	 * Slider
	 * @since 1.0.0
	 */
function holidays_featured_slider() {

	if ( !is_front_page() ){
		return;
	}

	?>

	<?php $enable_slider 		= holidays_get_option( 'enable_slider' );				 
	$slider_category   			= holidays_get_option( 'slider_category' ); 
	$slider_number   			= holidays_get_option( 'slider_number' ); 
	if ( true == $enable_slider ) : ?>
		<section class="header-slider">
					<?php $slider_args = array(
						'posts_per_page' => absint( $slider_number),				
						'post_type' => 'post',
						'post_status' => 'publish',
						'paged' => 1,
						);

					if ( absint( $slider_category ) > 0 ) {
						$slider_args['cat'] = absint( $slider_category );
					}

								// Fetch posts.
					$slider_query = new WP_Query( $slider_args );

					?>

					<?php if ( $slider_query->have_posts() ) : ?>

						<div class="slider-part col-12">
							<div class="owl-carousel owl-theme banner-slider" id="banner-slider">
								<?php while ( $slider_query->have_posts() ) : $slider_query->the_post(); ?>	
										<?php  $image_class= '';
										if ( ! has_post_thumbnail() ) :

											$image_class= 'no-image';
											
										endif;?>			
										<div class="item <?php echo esc_attr( $image_class);?>">
											<?php if( has_post_thumbnail() ): ?>

												<figure>
													<?php the_post_thumbnail( 'holidays-slider' )?>
												</figure>

											<?php endif;?>

											<div class="slider-caption">
												<div class="slider-caption-wrapper">
													<div class="entry-meta">
														<?php holidays_entry_categories();?>
													</div>
													<header class="entry-header">
														<h2 class="entry-title"><a href="<?php the_permalink()?>" ><?php the_title();?></a></h2>
													</header>
													<?php $excerpt = holidays_the_excerpt( 20 );
													if( !empty( $excerpt ) ) : ?>
														<div class="entry-content">

															<?php echo wp_kses_post( $excerpt ) ; ?>
														</div>
													<?php endif;?>
												</div>
											</div>
										</div>
								<?php endwhile;

								wp_reset_postdata();?>

							</div>
						</div>

					<?php endif;?>

		</section>
	<?php endif;
}
endif;
add_action( 'holidays_action_header', 'holidays_featured_slider', 30 );

if ( ! function_exists( 'holidays_top_footer' ) ) :
	/**
	 * Top Footer 
	 * @since 1.0.0
	 */
function holidays_top_footer() {
	if ( !is_front_page() ){
		return;
	}
	?>
	<?php $footer_page = holidays_get_option('footer_page');  
	if ( !empty( $footer_page ) ) : 
	  	$args = array (	            		            
	      	'page_id'			=> absint($footer_page ),
	    	'post_status'   	=> 'publish',
	    	'post_type' 		=> 'page',
	    );

	    $loop = new WP_Query($args); 

	    if ( $loop->have_posts() ) : ?>		        	

	    	

	    		<?php while ($loop->have_posts()) : $loop->the_post();?>
	    			<?php $image_url = get_the_post_thumbnail_url(); ?>
	    			<section class="footer-top padding-topbtn" <?php if( !empty( $image_url) ) { ?> style="background-image:url( <?php echo esc_url( $image_url )?>);" <?php } ?> >
		
					    <div class="container">
					    	<div class="footer-top-wrapper">

					            <div class="section-title">
					                <header class="entry-header">
					                    <h2 class="entry-title"><?php the_title();?></h2>
					                </header>
					            </div>
					            <div class="entry-content">
					                <?php the_content();?>
					            </div>

				            </div>
					        
					    </div>

				    </section>

				<?php endwhile;
				wp_reset_postdata();?>

			

		<?php endif;?>


	<?php endif;?>
	<?php
}
endif;
add_action( 'holidays_action_footer', 'holidays_top_footer', 10 );


if ( ! function_exists( 'holidays_footer_widget' ) ) :
	/**
	 * Footer Widget
	 * @since 1.0.0
	 */
function holidays_footer_widget() {
	?>
	<div class="site-info bg-overlay">
	<?php if ( is_active_sidebar( 'footer-1' ) || is_active_sidebar( 'footer-2' ) || is_active_sidebar( 'footer-3' ) || is_active_sidebar( 'footer-4' ) ) : ?>

		<div class="top-footer">
			<div class="container">
				<div class="row">
					
					<?php
					$column_count = 0;
					$class_coloumn =12;
					for ( $i = 1; $i <= 4; $i++ ) {
						if ( is_active_sidebar( 'footer-' . $i ) ) {
							$column_count++;
							$class_coloumn = 12/$column_count;
						}
					} ?>

					<?php $column_class = 'col-' . absint( $class_coloumn );
					for ( $i = 1; $i <= 4 ; $i++ ) {
						if ( is_active_sidebar( 'footer-' . $i ) ) { ?>
						<div class="<?php echo esc_attr( $column_class ); ?>">
							<?php dynamic_sidebar( 'footer-' . $i ); ?>
						</div>
						<?php }
					} ?>
					
				</div>
			</div>
		</div> 

	<?php endif;?> 	  

	<?php
}
endif;
add_action( 'holidays_action_footer', 'holidays_footer_widget', 15 );

if ( ! function_exists( 'holidays_copyright' ) ) :
	/**
	 * Footer Copyright Section
	 * @since 1.0.0
	 */
function holidays_copyright() {
	?>  
	<?php 
	$copyright_footer = holidays_get_option('copyright_text'); 
	if ( ! empty( $copyright_footer ) ) {
		$copyright_footer = wp_kses_data( $copyright_footer );
	}
		// Powered by content.
	$powered_by_text = sprintf( __( 'Theme of %s', 'holidays' ), '<a target="_blank" rel="designer" href="http://96themes.com/">96 THEME.</a>' );
	?>
	<div class="bottom-footer">
		<div class="container">

			<span class="copy-right"><?php echo $powered_by_text;?><?php echo esc_html( $copyright_footer );?></span>
		</div>
		
	</div>
	<div class="back-to-top" style="display: block;">
   		<a href="#masthead" title="<?php echo esc_attr('Go to Top','holidays');?>" class="fa-angle-up"></a>       
 	</div>	
	<?php
}
endif;
add_action( 'holidays_action_footer', 'holidays_copyright', 20 );
