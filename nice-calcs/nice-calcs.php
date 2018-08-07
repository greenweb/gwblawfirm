<?php
/**
* Plugin Name: Nice Calculator
* Description: Creates the workers comp calculators for gwblawfirm.com
* Plugin URI: https://www.greenvilleweb.us
* Author: Rew Rixom
* Author URI: https://www.greenvilleweb.us
* Version: 2.0
* License: GPL2
* Text Domain: nice-calc
* Domain Path: /
*/

/*
Copyright (C) 2015  Rew Rixom  rew@rixom.org

This program is free software; you can redistribute it and/or modify
it under the terms of the GNU General Public License, version 2, as
published by the Free Software Foundation.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; if not, write to the Free Software
Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
*/
/**
 * Snippet Wordpress Plugin Boilerplate based on:
 *
 * - https://github.com/purplefish32/sublime-text-2-wordpress/blob/master/Snippets/Plugin_Head.sublime-snippet
 * - http://wordpress.stackexchange.com/questions/25910/uninstall-activate-deactivate-a-plugin-typical-features-how-to/25979#25979
 *
 * By default the option to uninstall the plugin is disabled,
 * to use uncomment or remove if not used.
 *
 * This Template does not have the necessary code for use in multisite. 
 *
 * Also delete this comment block is unnecessary once you have read.
 *
 * Version 1.0
 */

if ( ! defined( 'ABSPATH' ) ) exit;
include 'nc-class.php';
add_action( 'plugins_loaded', array( 'Nice_Calculator', 'get_instance' ) );

// EOF