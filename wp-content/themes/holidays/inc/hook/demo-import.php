<?php
/**
 * Functions to provide support for the One Click Demo Import plugin (wordpress.org/plugins/one-click-demo-import)
 *
 * @package holidays
 */
/**
* Remove branding
*/
add_filter( 'pt-ocdi/disable_pt_branding', '__return_true' );

/*Import demo data*/
if ( ! function_exists( 'holidays_demo_import_files' ) ) :
    function holidays_demo_import_files() {
        return array(
            
            array(
                'import_file_name'             => 'Holidays',  
                'import_file_url'            => 'http://demo.96themes.com/demo-content/holidays/holidays.wordpress.2018-02-21.xml',
                'import_widget_file_url'     => 'http://demo.96themes.com/demo-content/holidays/demo.96themes.com-holidays-widgets.wie',       
                'import_customizer_file_url' => 'http://demo.96themes.com/demo-content/holidays/holidays-export.dat',        
                      
                'import_notice'                => esc_html__( 'Please waiting for a few minutes, do not close the window or refresh the page until the data is imported.', 'holidays' ),
                'preview_url'                  => 'http://demo.96themes.com/holidays',
            ),                       

        );  
    }
    add_filter( 'pt-ocdi/import_files', 'holidays_demo_import_files' );
endif;

/**
 * Action that happen after import
 */
if ( ! function_exists( 'holidays_after_demo_import' ) ) :
function holidays_after_demo_import( $selected_import ) {
    
        //Set Menu
        $primary_menu = get_term_by('name', 'Menu 1', 'nav_menu');
        set_theme_mod( 'nav_menu_locations' , array( 
              'menu-1' => $primary_menu->term_id,
            ) 
        );

    // Set Up the Front page
        $front_page = get_page_by_title( 'Sample Page' );
        $blog_page  = get_page_by_title( 'Blog' );

        update_option( 'show_on_front', 'page' );
        update_option( 'page_on_front', $front_page -> ID );
        update_option( 'page_for_posts', $blog_page -> ID );
  
    
}
add_action( 'pt-ocdi/after_import', 'holidays_after_demo_import' );
endif;







