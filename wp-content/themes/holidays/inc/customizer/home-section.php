<?php
/**
 * Home Page Options.
 *
 * @package Holidays
 */

$default = holidays_get_default_theme_options();

// Add Panel.
$wp_customize->add_panel( 'home_page_panel',
	array(
	'title'      => esc_html__( 'Home Page Options', 'holidays' ),
	'priority'   => 100,
	'capability' => 'edit_theme_options',
	)
);
/************************* Slider Section **********************************/
$wp_customize->add_section('section_featured_slider', 
	array(    
	'title'       => esc_html__('Slider Section', 'holidays'),
	'panel'       => 'home_page_panel'    
	)
);
/************************** Slider Section Enable  ******************************/
$wp_customize->add_setting('theme_options[enable_slider]', 
	array(
	'default' 			=> $default['enable_slider'],
	'type'              => 'theme_mod',
	'capability'        => 'edit_theme_options',
	'sanitize_callback' => 'holidays_sanitize_checkbox'
	)
);

$wp_customize->add_control('theme_options[enable_slider]', 
	array(		
	'label' 	=> esc_html__('Enable Slider Section', 'holidays'),
	'section' 	=> 'section_featured_slider',
	'settings'  => 'theme_options[enable_slider]',
	'type' 		=> 'checkbox',	
	)
);

/************************* Slider category **********************************/
$wp_customize->add_setting( 'theme_options[slider_category]',
	array(
	'default'           => $default['slider_category'],
	'capability'        => 'edit_theme_options',
	'sanitize_callback' => 'absint',
	)
);
$wp_customize->add_control(
	new Holidays_Dropdown_Taxonomies_Control( $wp_customize, 'theme_options[slider_category]',
		array(
		'label'    => esc_html__( 'Select Category', 'holidays' ),
		'section'  => 'section_featured_slider',
		'settings' => 'theme_options[slider_category]',
		
		)
	)
);
// Slider Number.
$wp_customize->add_setting( 'theme_options[slider_number]',
	array(
		'default'           => $default['slider_number'],
		'capability'        => 'edit_theme_options',
		'sanitize_callback' => 'holidays_sanitize_number_range',
		)
);
$wp_customize->add_control( 'theme_options[slider_number]',
	array(
		'label'       => esc_html__( 'No of Slider', 'holidays' ),
		'section'     => 'section_featured_slider',
		'type'        => 'number',
		'input_attrs' => array( 'min' => 1, 'max' => 5, 'step' => 1, 'style' => 'width: 115px;' ),
		
	)
);

/************************* Welcome Section **********************************/
$wp_customize->add_section('welcome_section', 
	array(    
	'title'       => esc_html__('Welcome Section', 'holidays'),
	'panel'       => 'home_page_panel'    
	)
);

/************************* Welcome Page Section  **********************************/
$wp_customize->add_setting('theme_options[welcome_page]', 
	array(
	'default'           => $default['welcome_page'],
	'type'              => 'theme_mod',
	'capability'        => 'edit_theme_options',	
	'sanitize_callback' => 'holidays_sanitize_dropdown_pages'
	)
);

$wp_customize->add_control('theme_options[welcome_page]', 
	array(
	'label'       => esc_html__('Select Welcome Page', 'holidays'),
    'description' => esc_html__( 'Select page from dropdown or leave blank if you want to hide this section.', 'holidays' ), 
	'section'     => 'welcome_section',   
	'settings'    => 'theme_options[welcome_page]',		
	'type'        => 'dropdown-pages'
	)
);

/************************* Popular Section **********************************/
$wp_customize->add_section('popular_section', 
	array(    
	'title'       => esc_html__('Popular Section ', 'holidays'),
	'panel'       => 'home_page_panel'    
	)
);

/************************** Popular Section Enable  ******************************/
$wp_customize->add_setting('theme_options[enable_popular]', 
	array(
	'default' 			=> $default['enable_popular'],
	'type'              => 'theme_mod',
	'capability'        => 'edit_theme_options',
	'sanitize_callback' => 'holidays_sanitize_checkbox'
	)
);

$wp_customize->add_control('theme_options[enable_popular]', 
	array(		
	'label' 	=> esc_html__('Enable Section', 'holidays'),
	'section' 	=> 'popular_section',
	'settings'  => 'theme_options[enable_popular]',
	'type' 		=> 'checkbox',	
	)
);

/********************** Popular Section *************************************/
$wp_customize->add_setting('theme_options[section_popular_title]', 
	array(
	'default'           => $default['section_popular_title'],
	'type'              => 'theme_mod',
	'capability'        => 'edit_theme_options',	
	'sanitize_callback' => 'sanitize_text_field'
	)
);

$wp_customize->add_control('theme_options[section_popular_title]', 
	array(
	'label'       => esc_html__('Section Title', 'holidays'),
	'section'     => 'popular_section',   
	'settings'    => 'theme_options[section_popular_title]',		
	'type'        => 'text'
	)
);

/************************* Popular category **********************************/
$wp_customize->add_setting( 'theme_options[popular_category]',
	array(
	'default'           => $default['popular_category'],
	'capability'        => 'edit_theme_options',
	'sanitize_callback' => 'absint',
	)
);
$wp_customize->add_control(
	new Holidays_Dropdown_Taxonomies_Control( $wp_customize, 'theme_options[popular_category]',
		array(
		'label'    => esc_html__( 'Select Category', 'holidays' ),
		'section'  => 'popular_section',
		'settings' => 'theme_options[popular_category]',
		
		)
	)
);
/************************* Popular Number **********************************/
$wp_customize->add_setting( 'theme_options[popular_number]',
	array(
		'default'           => $default['popular_number'],
		'capability'        => 'edit_theme_options',
		'sanitize_callback' => 'holidays_sanitize_number_range',
		)
);
$wp_customize->add_control( 'theme_options[popular_number]',
	array(
		'label'       => esc_html__( 'Select Number', 'holidays' ),
		'section'     => 'popular_section',
		'type'        => 'number',
		'input_attrs' => array( 'min' => 3, 'max' =>9 , 'step' => 3, 'style' => 'width: 115px;' ),
		
	)
);

/************************* Tour Section **********************************/
$wp_customize->add_section('tour_section', 
	array(    
	'title'       => esc_html__('Tour Section', 'holidays'),
	'panel'       => 'home_page_panel'    
	)
);

/************************** Tour Section Enable  ******************************/
$wp_customize->add_setting('theme_options[enable_tour]', 
	array(
	'default' 			=> $default['enable_tour'],
	'type'              => 'theme_mod',
	'capability'        => 'edit_theme_options',
	'sanitize_callback' => 'holidays_sanitize_checkbox'
	)
);

$wp_customize->add_control('theme_options[enable_tour]', 
	array(		
	'label' 	=> esc_html__('Enable Section', 'holidays'),
	'section' 	=> 'tour_section',
	'settings'  => 'theme_options[enable_tour]',
	'type' 		=> 'checkbox',	
	)
);

/********************** Tour Section *************************************/
$wp_customize->add_setting('theme_options[section_tour_title]', 
	array(
	'default'           => $default['section_tour_title'],
	'type'              => 'theme_mod',
	'capability'        => 'edit_theme_options',	
	'sanitize_callback' => 'sanitize_text_field'
	)
);

$wp_customize->add_control('theme_options[section_tour_title]', 
	array(
	'label'       => esc_html__('Section Title', 'holidays'),
	'section'     => 'tour_section',   
	'settings'    => 'theme_options[section_tour_title]',		
	'type'        => 'text'
	)
);

/************************* Tour category **********************************/
$wp_customize->add_setting( 'theme_options[tour_category]',
	array(
	'default'           => $default['tour_category'],
	'capability'        => 'edit_theme_options',
	'sanitize_callback' => 'absint',
	)
);
$wp_customize->add_control(
	new Holidays_Dropdown_Taxonomies_Control( $wp_customize, 'theme_options[tour_category]',
		array(
		'label'    => esc_html__( 'Select Category', 'holidays' ),
		'section'  => 'tour_section',
		'settings' => 'theme_options[tour_category]',
		
		)
	)
);
/************************* Tour Number **********************************/
$wp_customize->add_setting( 'theme_options[tour_number]',
	array(
		'default'           => $default['tour_number'],
		'capability'        => 'edit_theme_options',
		'sanitize_callback' => 'holidays_sanitize_number_range',
		)
);
$wp_customize->add_control( 'theme_options[tour_number]',
	array(
		'label'       => esc_html__( 'Select Number', 'holidays' ),
		'section'     => 'tour_section',
		'type'        => 'number',
		'input_attrs' => array( 'min' => 1, 'max' =>4, 'step' => 1, 'style' => 'width: 115px;' ),
		
	)
);

/************************* Travel Section **********************************/
$wp_customize->add_section('travel_section', 
	array(    
	'title'       => esc_html__('Travel Section', 'holidays'),
	'panel'       => 'home_page_panel'    
	)
);

/************************** Travel Section Enable  ******************************/
$wp_customize->add_setting('theme_options[enable_travel]', 
	array(
	'default' 			=> $default['enable_travel'],
	'type'              => 'theme_mod',
	'capability'        => 'edit_theme_options',
	'sanitize_callback' => 'holidays_sanitize_checkbox'
	)
);

$wp_customize->add_control('theme_options[enable_travel]', 
	array(		
	'label' 	=> esc_html__('Enable Section', 'holidays'),
	'section' 	=> 'travel_section',
	'settings'  => 'theme_options[enable_travel]',
	'type' 		=> 'checkbox',	
	)
);

/********************** Travel Section *************************************/
$wp_customize->add_setting('theme_options[section_travel_title]', 
	array(
	'default'           => $default['section_travel_title'],
	'type'              => 'theme_mod',
	'capability'        => 'edit_theme_options',	
	'sanitize_callback' => 'sanitize_text_field'
	)
);

$wp_customize->add_control('theme_options[section_travel_title]', 
	array(
	'label'       => esc_html__('Section Title', 'holidays'),
	'section'     => 'travel_section',   
	'settings'    => 'theme_options[section_travel_title]',		
	'type'        => 'text'
	)
);

/************************* Travel category **********************************/
$wp_customize->add_setting( 'theme_options[travel_category]',
	array(
	'default'           => $default['travel_category'],
	'capability'        => 'edit_theme_options',
	'sanitize_callback' => 'absint',
	)
);
$wp_customize->add_control(
	new Holidays_Dropdown_Taxonomies_Control( $wp_customize, 'theme_options[travel_category]',
		array(
		'label'    => esc_html__( 'Select Category', 'holidays' ),
		'section'  => 'travel_section',
		'settings' => 'theme_options[travel_category]',
		
		)
	)
);
/************************* Travel Number **********************************/
$wp_customize->add_setting( 'theme_options[travel_number]',
	array(
		'default'           => $default['travel_number'],
		'capability'        => 'edit_theme_options',
		'sanitize_callback' => 'holidays_sanitize_number_range',
		)
);
$wp_customize->add_control( 'theme_options[travel_number]',
	array(
		'label'       => esc_html__( 'Select Number', 'holidays' ),
		'section'     => 'travel_section',
		'type'        => 'number',
		'input_attrs' => array( 'min' => 2, 'max' =>6, 'step' => 2, 'style' => 'width: 115px;' ),
		
	)
);
