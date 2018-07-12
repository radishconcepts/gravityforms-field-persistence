<?php

namespace Radish\GravityForms\Persistence;

class Core {
	
	private static $instance;
	private $_version = '1.0.1';
	private $load_js_in_footer = true;
	
	public function __construct() {
		$this->run();
	}
	
	public function run() {
		add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_scripts' ), 11 );
		add_action( 'init', array( $this, 'init_filters'), 99 );
	}
	
	public function init_filters() {
		add_filter( 'gform_field_content', function ( $content, $field ) {
			if( ! empty( $field->inputName ) ) {
				$current_name_attr = "name='input_" . $field->id . "'";
				$new_attr = $current_name_attr . " data-inputname='" . esc_attr( $field->inputName ) . "'";
				
				$content           = str_replace( $current_name_attr, $new_attr, $content );
			}
			
			return $content;
		}, 99, 2);
	}
	
	/**
	 * Enqueues the needed scripts. jQuery is required, so we load it, if it isn't enqueued yet.
	 */
	public function enqueue_scripts() {
		$is_enqueued = wp_script_is( 'jquery', 'enqueued' );
		if ( false === $is_enqueued ) {
			wp_enqueue_script( 'jquery', '//ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js', null, null, $this->load_js_in_footer );
		}
		
		wp_enqueue_script( 'rcgfp_script', RCGFP_PLUGIN_URI . 'assets/js/gf-field-persistence.js', array( 'jquery' ), $this->_version, $this->load_js_in_footer );
		wp_localize_script( 'rcgfp_script', 'rcgfp_data', array(
			'ajax_url' => admin_url( 'admin-ajax.php' ),
			'sec_nonce' => wp_create_nonce('rcgfp_nonce' ),
		) );
	}
	
	/**
	 * Returns an instance of this class. An implementation of the singleton design pattern.
	 *
	 * @return   object    A reference to an instance of this class.
	 * @since    1.0.0
	 */
	public static function get_instance() {
		
		if ( null == self::$instance ) {
			self::$instance = new Core();
		}
		
		return self::$instance;
		
	}
}