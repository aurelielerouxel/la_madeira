<?php
/**
 * Template part for showing Welcome Section
 *  @package Holidays
 */
?>
<?php $welcome_page = holidays_get_option('welcome_page');  
if ( !empty( $welcome_page ) ) : 
  	$args = array (	            		            
      	'page_id'			=> absint($welcome_page ),
    	'post_status'   	=> 'publish',
    	'post_type' 		=> 'page',
    );

    $loop = new WP_Query($args); 

    if ( $loop->have_posts() ) : ?>		        	

    	<section class="about-us padding-topbtn">

    		<?php while ($loop->have_posts()) : $loop->the_post();?>
	
			    <div class="container">
			        <div class="about-us-detail">
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

			<?php endwhile;
			wp_reset_postdata();?>

		</section>

	<?php endif;?>


<?php endif;?>