<?php
/*
Plugin Name: Gravity Forms Fields Persistence
Plugin URI: https://www.radishconcepts.com
Description: Adds persistence to the Gravity Forms fields, so inputs will be saved in order to use it in other forms. This will improve user experience and boost your goals!
Version: 1.0
Author: Radish Concepts <info@radishconcepts.com>
Author URI: https://www.radishconcepts.com
*/

define( 'RCGFP_PLUGIN_PATH', dirname( __FILE__ ) );
define( 'RCGFP_PLUGIN_URI', plugin_dir_url( __FILE__ ) );

// Includes.
require_once( RCGFP_PLUGIN_PATH . '/vendor/autoload.php' );
require_once( RCGFP_PLUGIN_PATH . '/classes/class-persistence.php' );

// Fire those classes.
new Radish\GravityForms\Persistence\Core();