<?php
/**
 * Template part for showing Travel Section
 *  @package Holidays
 */
?>
<?php $section_travel_title  = holidays_get_option( 'section_travel_title' );             
    $travel_category         = holidays_get_option( 'travel_category' ); 
    $travel_number           = holidays_get_option( 'travel_number' ); 
?>
<section class="holiday-package-part padding-topbtn">
    <?php $args = array(
        'posts_per_page' => absint( $travel_number),                
        'post_type' => 'post',
        'post_status' => 'publish',
        'paged' => 1,
        );

    if ( absint( $travel_category ) > 0 ) {
        $args['cat'] = absint( $travel_category );
    }
    // Fetch posts.
    $query = new WP_Query( $args );
    $category_link = get_category_link( $travel_category ); 

    ?>

    <?php if ( $query->have_posts() ) : $cn = 0;?> 
        <div class="section-title">
            <?php if( !empty( $section_travel_title ) ) :?>

                <header class="entry-header">
                    <h2 class="entry-title"><?php echo esc_html( $section_travel_title );?></h2>
                </header>

            <?php endif;?>

            <?php if( !empty( $category_link) ) : ?>
                <a href="<?php echo esc_url( $category_link);?>" class="header-btn"><?php echo esc_html__( 'View All','holidays')?></a>
            <?php endif;?>

        </div> 
        <div class="holiday-package-wrap">
            <div class="row">

                <?php while ( $query->have_posts() ) : $query->the_post(); $cn+2;  

                    $section_class= 'package-right';
                    if( $cn == 1){
                        $section_class = 'package-left';    
                    }?>  

                    <div class="col-6 holiday-col">
                        
                        <?php if ( has_post_thumbnail() ) :?>
                            <figure>

                                <?php the_post_thumbnail( 'holidays-travel' );?>
                                
                            </figure>

                        <?php endif;?>

                        <div class="holiday-package-caption">

                            <div class="entry-meta">
                                <?php holidays_entry_categories();?>
                            </div>                     

                            <header class="entry-header">
                                <h2 class="entry-title"><a href="<?php the_permalink()?>"><?php the_title();?></a></h2>
                            </header>

                            <?php $excerpt = holidays_the_excerpt( 15 );
                            if( !empty( $excerpt ) ) : ?>

                                <div class="entry-content">

                                    <?php echo wp_kses_post( $excerpt ) ; ?>
                                </div>

                            <?php endif;?>  
                                                  
                            <a href="<?php the_permalink();?>" class="view-btn"><?php echo esc_html__( 'Read More','holidays')?></a>
                            
                        </div>                    

                    </div>

                <?php endwhile;
                wp_reset_postdata(); ?>

            </div>

        </div>

    <?php endif;?>        
 
</section>
