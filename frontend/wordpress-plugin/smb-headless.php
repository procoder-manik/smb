<?php
/**
 * Plugin Name: SMB Headless
 * Plugin URI: https://smallbusinessmarketing.co
 * Description: Headless WordPress setup for SMB. Registers custom post types and exposes content via REST API for Next.js frontend.
 * Version: 1.0.0
 * Author: Small Business Marketing
 * License: GPL-2.0+
 */

if (!defined('ABSPATH')) exit;

class SMB_Headless {

  public function __construct() {
    add_action('init', [$this, 'register_post_types']);
    add_action('rest_api_init', [$this, 'register_rest_routes']);
    add_action('wp_enqueue_scripts', [$this, 'enqueue_assets']);
    add_action('admin_menu', [$this, 'add_admin_menu']);
    add_action('admin_init', [$this, 'register_settings']);
  }

  public function register_post_types() {
    // Industry
    register_post_type('industry', [
      'labels' => [
        'name' => 'Industries',
        'singular_name' => 'Industry',
        'add_new' => 'Add Industry',
        'add_new_item' => 'Add New Industry',
        'edit_item' => 'Edit Industry',
      ],
      'public' => true,
      'has_archive' => true,
      'rewrite' => ['slug' => 'industries'],
      'supports' => ['title', 'editor', 'thumbnail', 'excerpt', 'custom-fields'],
      'show_in_rest' => true,
    ]);

    // Service
    register_post_type('service', [
      'labels' => [
        'name' => 'Services',
        'singular_name' => 'Service',
        'add_new' => 'Add Service',
        'add_new_item' => 'Add New Service',
      ],
      'public' => true,
      'has_archive' => true,
      'rewrite' => ['slug' => 'services'],
      'supports' => ['title', 'editor', 'thumbnail', 'custom-fields'],
      'show_in_rest' => true,
    ]);

    // Case Study
    register_post_type('case_study', [
      'labels' => [
        'name' => 'Case Studies',
        'singular_name' => 'Case Study',
        'add_new' => 'Add Case Study',
        'add_new_item' => 'Add New Case Study',
      ],
      'public' => true,
      'has_archive' => true,
      'rewrite' => ['slug' => 'case-studies'],
      'supports' => ['title', 'editor', 'thumbnail', 'custom-fields'],
      'show_in_rest' => true,
    ]);

    // Testimonial
    register_post_type('testimonial', [
      'labels' => [
        'name' => 'Testimonials',
        'singular_name' => 'Testimonial',
        'add_new' => 'Add Testimonial',
        'add_new_item' => 'Add New Testimonial',
      ],
      'public' => true,
      'has_archive' => false,
      'rewrite' => ['slug' => 'testimonials'],
      'supports' => ['title', 'editor', 'thumbnail', 'custom-fields'],
      'show_in_rest' => true,
    ]);

    // FAQ
    register_post_type('faq', [
      'labels' => [
        'name' => 'FAQs',
        'singular_name' => 'FAQ',
        'add_new' => 'Add FAQ',
        'add_new_item' => 'Add New FAQ',
      ],
      'public' => true,
      'has_archive' => true,
      'rewrite' => ['slug' => 'faqs'],
      'supports' => ['title', 'editor', 'custom-fields'],
      'show_in_rest' => true,
    ]);
  }

  public function register_rest_routes() {
    // Get all content as a single payload
    register_rest_route('smb/v1', '/content', [
      'methods' => 'GET',
      'callback' => [$this, 'get_all_content'],
      'permission_callback' => '__return_true',
    ]);

    // Get industry by slug
    register_rest_route('smb/v1', '/industry/(?P<slug>[a-zA-Z0-9-]+)', [
      'methods' => 'GET',
      'callback' => [$this, 'get_industry_by_slug'],
      'permission_callback' => '__return_true',
    ]);
  }

  public function get_all_content() {
    $industries = get_posts([
      'post_type' => 'industry',
      'posts_per_page' => -1,
      'post_status' => 'publish',
    ]);

    $services = get_posts([
      'post_type' => 'service',
      'posts_per_page' => -1,
      'post_status' => 'publish',
    ]);

    $case_studies = get_posts([
      'post_type' => 'case_study',
      'posts_per_page' => -1,
      'post_status' => 'publish',
    ]);

    $testimonials = get_posts([
      'post_type' => 'testimonial',
      'posts_per_page' => -1,
      'post_status' => 'publish',
    ]);

    $faqs = get_posts([
      'post_type' => 'faq',
      'posts_per_page' => -1,
      'post_status' => 'publish',
    ]);

    return [
      'industries' => array_map([$this, 'prepare_post'], $industries),
      'services' => array_map([$this, 'prepare_post'], $services),
      'case_studies' => array_map([$this, 'prepare_post'], $case_studies),
      'testimonials' => array_map([$this, 'prepare_post'], $testimonials),
      'faqs' => array_map([$this, 'prepare_post'], $faqs),
    ];
  }

  public function get_industry_by_slug($request) {
    $slug = $request['slug'];
    $post = get_page_by_path($slug, OBJECT, 'industry');

    if (!$post) {
      return new WP_Error('not_found', 'Industry not found', ['status' => 404]);
    }

    return $this->prepare_post($post);
  }

  private function prepare_post($post) {
    return [
      'id' => $post->ID,
      'title' => $post->post_title,
      'slug' => $post->post_name,
      'content' => $post->post_content,
      'excerpt' => $post->post_excerpt,
      'meta' => get_post_meta($post->ID),
      'acf' => function_exists('get_fields') ? get_fields($post->ID) : [],
    ];
  }

  public function enqueue_assets() {
    // Add CORS headers for headless frontend
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
  }

  public function add_admin_menu() {
    add_options_page(
      'SMB Headless Settings',
      'SMB Headless',
      'manage_options',
      'smb-headless',
      [$this, 'render_settings_page']
    );
  }

  public function register_settings() {
    register_setting('smb_headless_options', 'smb_frontend_url');
    register_setting('smb_headless_options', 'smb_api_key');
  }

  public function render_settings_page() {
    ?>
    <div class="wrap">
      <h1>SMB Headless Settings</h1>
      <form method="post" action="options.php">
        <?php
        settings_fields('smb_headless_options');
        do_settings_sections('smb_headless_options');
        ?>
        <table class="form-table">
          <tr>
            <th scope="row">Frontend URL</th>
            <td><input type="text" name="smb_frontend_url" value="<?php echo esc_attr(get_option('smb_frontend_url')); ?>" class="regular-text" placeholder="https://your-nextjs-app.com" /></td>
          </tr>
          <tr>
            <th scope="row">API Key (optional)</th>
            <td><input type="text" name="smb_api_key" value="<?php echo esc_attr(get_option('smb_api_key')); ?>" class="regular-text" placeholder="Leave empty for public API" /></td>
          </tr>
        </table>
        <?php submit_button(); ?>
      </form>
    </div>
    <?php
  }
}

new SMB_Headless();

// Handle OPTIONS requests for CORS
add_action('rest_api_init', function() {
  remove_filter('rest_pre_serve_request', 'rest_send_cors_headers');
  add_filter('rest_pre_serve_request', function($value) {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    return $value;
  });
});
