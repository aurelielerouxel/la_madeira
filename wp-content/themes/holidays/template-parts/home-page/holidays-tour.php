<?php
/**
 * Template part for showing Tour Section
 *  @package Holidays
 */
?>
<?php $section_tour_title  = holidays_get_option( 'section_tour_title' );             
$tour_category         = holidays_get_option( 'tour_category' ); 
$tour_number           = holidays_get_option( 'tour_number' ); 
?>
<section class="package-part padding-topbtn">
    <?php $args = array(
        'posts_per_page' => absint( $tour_number),                
        'post_type' => 'post',
        'post_status' => 'publish',
        'paged' => 1,
        );

    if ( absint( $tour_category ) > 0 ) {
        $args['cat'] = absint( $tour_category );
    }
    // Fetch posts.
    $query = new WP_Query( $args );
    $category_link = get_category_link( $tour_category ); 

    ?>

    <?php if ( $query->have_posts() ) : $cn = 0;?> 
        <div class="section-title">
            <?php if( !empty( $section_tour_title ) ) :?>

                <header class="entry-header">
                    <h2 class="entry-title"><?php echo esc_html( $section_tour_title );?></h2>
                </header>

            <?php endif;?>

            <?php if( !empty( $category_link) ) : ?>
                <a href="<?php echo esc_url( $category_link);?>" class="header-btn"><?php echo esc_html__( 'View All','holidays')?></a>
            <?php endif;?>

        </div>   
        <div class="package-wrap">

            <?php while ( $query->have_posts() ) : $query->the_post(); $cn++; //var_dump($cn);  

            if( $cn == 2){  ?>

            <div class="package-right col-6">

                <?php } ?>
                

                <?php if( $cn == 1) { ?>
                <div class="package-left col-6">
                    <?php if ( has_post_thumbnail() ) : ?>

                        <figure class="package-img">
                            <?php the_post_thumbnail( 'holidays-tour' )?>
                            
                        </figure>

                    <?php endif;?>
                    <div class="package-offer"> 
                        <div class="package-offer-wrap">
                            <header class="entry-header">
                                <h2 class="entry-title"><a href="<?php the_permalink()?>"><?php the_title();?></a></h2>
                            </header>

                            <?php $excerpt = holidays_the_excerpt( 40 );
                            if( !empty( $excerpt ) ) : ?>

                                <div class="entry-content">

                                    <?php echo wp_kses_post( $excerpt ) ; ?>
                                </div>

                            <?php endif;?>

                        </div>
                    </div>                      
            </div>

            <?php } else{ ?>

            <div class="package-list">
                <?php if ( has_post_thumbnail() ) :?>
                    <figure>                                   

                        <?php the_post_thumbnail( 'holidays-tours' );?>
                        
                    </figure>

                <?php endif;?>

                <div class="package-list-detail">

                    <div class="entry-meta">
                       <?php holidays_entry_categories();?>
                   </div>

                   <header class="entry-header">
                    <h2 class="entry-title"><a href="<?php the_permalink()?>"><?php the_title();?></a></h2>
                </header>
                <a href="<?php the_permalink();?>" class="view-btn"><?php echo esc_html__( 'Read More','holidays')?></a>
                
            </div>
        </div>

        <?php } ?>
        <?php if( $cn == $tour_number){  ?>

    </div>

    <?php } ?>

<?php endwhile;
wp_reset_postdata(); ?>

</div>

<?php endif;?>
</section>
