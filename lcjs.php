<?php
/*
Plugin Name: LC JS Charts
Version:1.0
Description: LCJS Charts is a lightningchart JS plugin that can easily be used to create, update, manage 
and embed interactive charts into your WordPress posts and pages.
Author: Lightningchart ,arction
*/
require_once plugin_dir_path(__FILE__) . 'includes/mfp-functions.php';
//define( 'LC_JS_IIFE_URL', 'https://unpkg.com/@arction/lcjs@3.0.0/dist/lcjs.iife.js' );
//define( 'LC_JS_IIFE_URL', 'https://unpkg.com/@arction/xydata@1.4.0/dist/xydata.iife.js' );


define( 'LC_JS_IIFE_URL', 'https://unpkg.com/@arction/lcjs@3.3.0/dist/lcjs.iife.js' );
define( 'LC_JS_IIFE_URL', 'https://unpkg.com/@arction/xydata@1.4.0/dist/xydata.iife.js' );
?>
<?php if ( ! defined( 'ABSPATH' ) ) exit; ?>
