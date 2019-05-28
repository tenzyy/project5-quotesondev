<?php
/**
 * Custom functions that act independently of the theme templates.
 *
 * @package QOD_Starter_Theme
 */

/**
 * Removes Comments from admin menu.
 */
function qod_remove_admin_menus() {
    remove_menu_page( 'edit-comments.php' );
}
add_action( 'admin_menu', 'qod_remove_admin_menus' );

/**
 * Removes comments support from Posts and Pages.
 */
function qod_remove_comment_support() {
    remove_post_type_support( 'post', 'comments' );
    remove_post_type_support( 'page', 'comments' );
}
add_action( 'init', 'qod_remove_comment_support', 100 );

/**
 * Removes Comments from admin bar.
 */
function qod_admin_bar_render() {
    global $wp_admin_bar;
    $wp_admin_bar->remove_menu('comments');
}
add_action( 'wp_before_admin_bar_render', 'qod_admin_bar_render' );

/**
 * Removes Comments-related metaboxes.
 */
 function qod_remove_comments_meta_boxes() {
	remove_meta_box( 'commentstatusdiv', 'post', 'normal' );
	remove_meta_box( 'commentsdiv', 'post', 'normal' );
	remove_meta_box( 'trackbacksdiv', 'post', 'normal' );
}
add_action( 'admin_init', 'qod_remove_comments_meta_boxes' );

/** 
 * Toggle post status with Ajax
//  */
// OLD WAY- PHP
// function qod_status_ajax(){
//         check_ajax_referer("qod_status_nonce", "security");

//         if( ! current_user_can("edit_posts") ){
//             exit;
//         }

//         $id = $_POST["the_post_id"];

//         if(isset($id) && is_numberic($id) ){
//          $the_post = array(
//                 "ID" => $id,
//                 "post_status" => "draft"
//             );
//         }
       
//             wp_update_post($the_post);
//         exit;
// }

// add_action( "wp_ajax_qod_status_ajax","qod_status_ajax");