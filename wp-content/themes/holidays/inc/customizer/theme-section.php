<?php
/**
 * Theme Options Customizer
 *
 * @package holidays
 */

$default = holidays_get_default_theme_options();


/************************* Add Pannel **********************************/
$wp_customize->add_panel( 'theme_option_panel',
	array(
	'title'      => esc_html__( 'Theme Options', 'holidays' ),
	'priority'   => 100,
	'capability' => 'edit_theme_options',
	)
);

/*************************Header Setting Section starts********************/
$wp_customize->add_section('section_header', 
	array(    
	'title'       => esc_html__('Header Setting', 'holidays'),
	'panel'       => 'theme_option_panel'    
	)
);
/**************************** Site Identity ********************************/
$wp_customize->add_setting('theme_options[site_identity]', 
	array(
	'default' 			=> $default['site_identity'],
	'sanitize_callback' => 'holidays_sanitize_select'
	)
);

$wp_customize->add_control('theme_options[site_identity]', 
	array(		
	'label' 	=> esc_html__('Choose Option', 'holidays'),
	'section' 	=> 'title_tagline',
	'settings'  => 'theme_options[site_identity]',
	'type' 		=> 'radio',
	'choices' 	=>  array(
			'logo-only' 	=> esc_html__('Logo Only', 'holidays'),
			'logo-text' 	=> esc_html__('Logo + Tagline', 'holidays'),
			'title-only' 	=> esc_html__('Title Only', 'holidays'),
			'title-text' 	=> esc_html__('Title + Tagline', 'holidays')
		)
	)
);

/************************* Address *********************************/
$wp_customize->add_setting( 'theme_options[header_address]',
	array(
	'default'           => $default['header_address'],
	'capability'        => 'edit_theme_options',
	'sanitize_callback' => 'sanitize_textarea_field',	
	)
);
$wp_customize->add_control( 'theme_options[header_address]',
	array(
	'label'    => esc_html__( 'Address', 'holidays' ),
	'section'  => 'section_header',
	'type'     => 'text',
	)
);

/************************* Opening Time *********************************/
$wp_customize->add_setting( 'theme_options[header_opening_time]',
	array(
	'default'           => $default['header_opening_time'],
	'capability'        => 'edit_theme_options',
	'sanitize_callback' => 'sanitize_textarea_field',	
	)
);
$wp_customize->add_control( 'theme_options[header_opening_time]',
	array(
	'label'    => esc_html__( 'Opening Time', 'holidays' ),
	'section'  => 'section_header',
	'type'     => 'text',
	)
);


/************************* Phone *********************************/
$wp_customize->add_setting( 'theme_options[header_number]',
	array(
	'default'           => $default['header_number'],
	'capability'        => 'edit_theme_options',
	'sanitize_callback' => 'sanitize_text_field',	
	)
);
$wp_customize->add_control( 'theme_options[header_number]',
	array(
	'label'    => esc_html__( 'Phone Number', 'holidays' ),
	'section'  => 'section_header',
	'type'     => 'text',	
	)
);

/************************* Email *********************************/
$wp_customize->add_setting('theme_options[header_email]',  
	array(
	'default'           => $default['header_email'],
	'type'              => 'theme_mod',
	'capability'        => 'edit_theme_options',	
	'sanitize_callback' => 'sanitize_email',
	'priority' => 100,
	)
);

$wp_customize->add_control('theme_options[header_email]', 
	array(
	'label'       => esc_html__('Contact Email', 'holidays'),
	'section'     => 'section_header',   
	'settings'    => 'theme_options[header_email]',		
	'type'        => 'text'
	)
);


/*****************General  Setting Section starts *****************/
$wp_customize->add_section('section_general', array(    
	'title'       => esc_html__('General Option', 'holidays'),
	'panel'       => 'theme_option_panel'    
	));

/************************** Enable Home Page Content ******************************/
$wp_customize->add_setting('theme_options[enable_home_page]', 
	array(
		'default' 			=> $default['enable_home_page'],
		'type'              => 'theme_mod',
		'capability'        => 'edit_theme_options',
		'sanitize_callback' => 'holidays_sanitize_checkbox'
		)
	);

$wp_customize->add_control('theme_options[enable_home_page]', 
	array(		
		'label' 	=> esc_html__('Enable Home Page Content', 'holidays'),
		'section' 	=> 'section_general',
		'settings'  => 'theme_options[enable_home_page]',
		'type' 		=> 'checkbox',	
		)
	);

/******************* Pagaination Option *********************************/
$wp_customize->add_setting('theme_options[pagination_option]', 
	array(
		'default' 			=> $default['pagination_option'],
		'type'              => 'theme_mod',
		'capability'        => 'edit_theme_options',
		'sanitize_callback' => 'holidays_sanitize_select'
		)
	);

$wp_customize->add_control('theme_options[pagination_option]', 
	array(		
		'label' 	=> esc_html__('Pagaination Options', 'holidays'),
		'section' 	=> 'section_general',
		'settings'  => 'theme_options[pagination_option]',
		'type' 		=> 'radio',
		'choices' 	=> array(		
			'default' 		=> esc_html__('Default', 'holidays'),							
			'numeric' 		=> esc_html__('Numeric', 'holidays'),		
			),	
		)
	);

/************************** Enable Categories  ******************************/
$wp_customize->add_setting('theme_options[enable_categories]', 
	array(
		'default' 			=> $default['enable_categories'],
		'type'              => 'theme_mod',
		'capability'        => 'edit_theme_options',
		'sanitize_callback' => 'holidays_sanitize_checkbox'
		)
	);

$wp_customize->add_control('theme_options[enable_categories]', 
	array(		
		'label' 	=> esc_html__('Enable Category', 'holidays'),
		'section' 	=> 'section_general',
		'settings'  => 'theme_options[enable_categories]',
		'type' 		=> 'checkbox',	
		)
	);

/************************** Enable Tags  ******************************/
$wp_customize->add_setting('theme_options[enable_tags]', 
	array(
		'default' 			=> $default['enable_tags'],
		'type'              => 'theme_mod',
		'capability'        => 'edit_theme_options',
		'sanitize_callback' => 'holidays_sanitize_checkbox'
		)
	);

$wp_customize->add_control('theme_options[enable_tags]', 
	array(		
		'label' 	=> esc_html__('Enable Tags', 'holidays'),
		'section' 	=> 'section_general',
		'settings'  => 'theme_options[enable_tags]',
		'type' 		=> 'checkbox',	
		)
	);


/************************** Enable Author  ******************************/
$wp_customize->add_setting('theme_options[enable_author]', 
	array(
		'default' 			=> $default['enable_author'],
		'type'              => 'theme_mod',
		'capability'        => 'edit_theme_options',
		'sanitize_callback' => 'holidays_sanitize_checkbox'
		)
	);

$wp_customize->add_control('theme_options[enable_author]', 
	array(		
		'label' 	=> esc_html__('Enable Author', 'holidays'),
		'section' 	=> 'section_general',
		'settings'  => 'theme_options[enable_author]',
		'type' 		=> 'checkbox',	
		)
	);

/************************** Enable Posted Date  ******************************/
$wp_customize->add_setting('theme_options[enable_posted_date]', 
	array(
		'default' 			=> $default['enable_posted_date'],
		'type'              => 'theme_mod',
		'capability'        => 'edit_theme_options',
		'sanitize_callback' => 'holidays_sanitize_checkbox'
		)
	);

$wp_customize->add_control('theme_options[enable_posted_date]', 
	array(		
		'label' 	=> esc_html__('Enable Date', 'holidays'),
		'section' 	=> 'section_general',
		'settings'  => 'theme_options[enable_posted_date]',
		'type' 		=> 'checkbox',	
		)
	);

/*****************Layout Setting Section  *****************/
$wp_customize->add_section('section_layout', array(    
	'title'       => esc_html__('Layout Option', 'holidays'),
	'panel'       => 'theme_option_panel'    
	));

/************************** Default Layout  ******************************/
$wp_customize->add_setting('theme_options[default_layout]', 
	array(
		'default' 			=> $default['default_layout'],
		'type'              => 'theme_mod',
		'capability'        => 'edit_theme_options',
		'sanitize_callback' => 'holidays_sanitize_select'
		)
	);

$wp_customize->add_control('theme_options[default_layout]', 
	array(		
		'label' 	=> esc_html__('Archive Page Layout', 'holidays'),
		'section' 	=> 'section_layout',
		'settings'  => 'theme_options[default_layout]',
		'type' 		=> 'select',
		'choices' 	=> array(		
			'list-default' 	=> esc_html__('List Default', 'holidays'),							
			'list' 			=> esc_html__('List', 'holidays'),
			'list-opp' 		=> esc_html__('List Opp', 'holidays'),		
			),	
		)
	);

/************************* Layout Options ******************************************/
$wp_customize->add_setting('theme_options[layout_options]', 
	array(
		'default' 			=> $default['layout_options'],
		'type'              => 'theme_mod',
		'capability'        => 'edit_theme_options',
		'sanitize_callback' => 'holidays_sanitize_select'
		)
	);

$wp_customize->add_control(new Holidays_Image_Radio_Control($wp_customize, 'theme_options[layout_options]', 
	array(		
		'label' 	=> esc_html__('Sidebar Layout Options', 'holidays'),
		'section' 	=> 'section_layout',
		'settings'  => 'theme_options[layout_options]',
		'type' 		=> 'radio-image',
		'choices' 	=> array(		
			'left-sidebar' 			=> get_template_directory_uri() . '/assets/img/left-sidebar.png',							
			'right-sidebar' 		=> get_template_directory_uri() . '/assets/img/right-sidebar.png',
			'no-sidebar' 	=> get_template_directory_uri() . '/assets/img/no-sidebar.png',
			),	
		))
);

/***************** Footer Setting Section starts ********************/
$wp_customize->add_section('section_footer', 
	array(    
	'title'       => esc_html__('Footer Setting', 'holidays'),
	'panel'       => 'theme_option_panel'    
	)
);

/************************* Footer Page Section  **********************************/
$wp_customize->add_setting('theme_options[footer_page]', 
	array(
	'default'           => $default['footer_page'],
	'type'              => 'theme_mod',
	'capability'        => 'edit_theme_options',	
	'sanitize_callback' => 'holidays_sanitize_dropdown_pages'
	)
);

$wp_customize->add_control('theme_options[footer_page]', 
	array(
	'label'       => esc_html__('Select Subscribe Page', 'holidays'),
    'description' => esc_html__( 'Select page from dropdown or leave blank if you want to hide this section.', 'holidays' ), 
	'section'     => 'section_footer',   
	'settings'    => 'theme_options[footer_page]',		
	'type'        => 'dropdown-pages'
	)
);

/************************** Copyright Text ******************************/
$wp_customize->add_setting( 'theme_options[copyright_text]',
	array(
	'default'           => $default['copyright_text'],
	'capability'        => 'edit_theme_options',
	'sanitize_callback' => 'sanitize_textarea_field',
	)
);
$wp_customize->add_control( 'theme_options[copyright_text]',
	array(
	'label'    => esc_html__( 'Copyright Text', 'holidays' ),
	'section'  => 'section_footer',
	'settings'  => 'theme_options[copyright_text]',
	'type'     => 'text',
	)
);