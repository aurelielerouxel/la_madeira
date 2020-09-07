<?php
/**
 * Template part for showing Popular Section
 *  @package Holidays
 */
?>
<?php $section_popular_title  = holidays_get_option( 'section_popular_title' );             
    $popular_category         = holidays_get_option( 'popular_category' ); 
    $popular_number           = holidays_get_option( 'popular_number' ); 
?>
<section class="popular-part padding-topbtn">
    <?php $args = array(
        'posts_per_page' => absint( $popular_number),                
        'post_type' => 'post',
        'post_status' => 'publish',
        'paged' => 1,
        );

    if ( absint( $popular_category ) > 0 ) {
        $args['cat'] = absint( $popular_category );
    }
    // Fetch posts.
    $query = new WP_Query( $args );
    $category_link = get_category_link( $popular_category ); 

    ?>

    <?php if ( $query->have_posts() ) : ?> 
        <div class="section-title">
            <?php if( !empty( $section_popular_title ) ) :?>

                <header class="entry-header">
                    <h2 class="entry-title"><?php echo esc_html( $section_popular_title );?></h2>
                </header>

            <?php endif;?>
            <?php if( !empty( $category_link) ) : ?>
                <a href="<?php echo esc_url( $category_link);?>" class="header-btn"><?php echo esc_html__( 'View All','holidays')?></a>
            <?php endif;?>

        </div>   
        <div class="popular-part-wrapper">
            <div class="row">

                <?php while ( $query->have_posts() ) : $query->the_post(); ?>     
                    <div class="col-4">
                        <div class="popular-detail">
                            <?php if ( has_post_thumbnail() ) :?>
                                <figure> 
                                    <?php the_post_thumbnail( 'holidays-popular' );?>
                                </figure>

                            <?php endif;?>

                            <div class="popular-caption">
                                <header class="entry-header">
                                    <h2 class="entry-title"><a href="<?php the_permalink()?>"><?php the_title();?></a></h2>
                                </header>

                                <div class="entry-meta">
                                   <?php holidays_entry_categories();?>
                                </div>

                                <?php $excerpt = holidays_the_excerpt( 20 );
                                if( !empty( $excerpt ) ) : ?>

                                    <div class="entry-content">

                                        <?php echo wp_kses_post( $excerpt ) ; ?>
                                    </div>

                                <?php endif;?>                                                        

                                <div class="popular-btn">
                                    <a href="<?php the_permalink();?>" class="view-btn"><?php echo esc_html__( 'Read More','holidays')?></a>
                                </div>
                            </div>
                        </div>
                    </div>
                <?php endwhile;
                wp_reset_postdata(); ?>
            </div>    
        </div>

    <?php endif;?>
</section>