<?php
/**
 * The template for displaying home page.
 * 
 * @package Holidays
 */

get_header(); ?>
<?php if ( 'posts' != get_option( 'show_on_front' ) ){?>
<?php

$welcome_page = holidays_get_option('welcome_page');  
if(  !empty( $welcome_page ) ):            
    get_template_part( 'template-parts/home-page/welcome', 'page' );
endif;

?>

    <div class="container">
        <div class="row">
        <?php 
            $layout_class ='col-9';
            $home_layout_options = holidays_get_option( 'home_layout_options' ); 
            if( is_active_sidebar('home-sidebar') && 'no-sidebar' !==  $home_layout_options){

                $layout_class = 'col-9';
            }
            else{
                $layout_class = 'col-12 home-page';
            }       
        ?>
            <div id="primary" class="content-area <?php echo esc_attr( $layout_class);?>">
                <main id="main" class="site-main">
                    <?php
                    $enable_popular = holidays_get_option('enable_popular');  
                    if( true == $enable_popular):            
                        get_template_part( 'template-parts/home-page/holidays', 'popular' );
                    endif; 

                    $enable_tour = holidays_get_option('enable_tour');  
                    if( true == $enable_tour):            
                        get_template_part( 'template-parts/home-page/holidays', 'tour' );
                    endif;  

                    $enable_travel = holidays_get_option('enable_travel');  
                    if( true == $enable_travel):            
                        get_template_part( 'template-parts/home-page/holidays', 'travel' );
                    endif;                       
                    ?>

                    <?php
                    $enable_home_page = holidays_get_option('enable_home_page'); 
                    if( true== $enable_home_page):
                        while ( have_posts() ) : the_post();

                            get_template_part( 'template-parts/content', 'page' );

                            // If comments are open or we have at least one comment, load up the comment template.
                            if ( comments_open() || get_comments_number() ) :
                                comments_template();
                            endif;

                        endwhile; // End of the loop.
                    endif;
                    ?>                    


                </main><!-- #main -->
            </div><!-- #primary -->

            <?php get_sidebar( 'home' );?>
            
        </div>
    </div>

<?php } else{ ?>  
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
                        $holidays_post_count= 0;

                        if ( is_home() && ! is_front_page() ) : ?>
                            <header>
                                <h1 class="page-title screen-reader-text"><?php single_post_title(); ?></h1>
                            </header>

                        <?php
                        endif;

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

<?php }?>
<?php 
get_footer();