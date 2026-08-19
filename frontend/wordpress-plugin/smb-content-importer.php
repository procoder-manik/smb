<?php
/**
 * Plugin Name: SMB Content Importer
 * Description: Imports existing HTML pages into WordPress as posts/pages
 * Version: 1.0.0
 */

if (!defined('ABSPATH')) exit;

class SMB_Content_Importer {

  public function __construct() {
    add_action('admin_menu', [$this, 'add_admin_page']);
    add_action('admin_post_smb_import_content', [$this, 'handle_import']);
  }

  public function add_admin_page() {
    add_submenu_page(
      'smb-headless',
      'Import Content',
      'Import HTML Content',
      'manage_options',
      'smb-import',
      [$this, 'render_import_page']
    );
  }

  public function render_import_page() {
    ?>
    <div class="wrap">
      <h1>Import HTML Content to WordPress</h1>
      <p>This will import your existing HTML pages as WordPress posts under the appropriate post types.</p>

      <form method="post" action="admin_post_smb_import_content">
        <?php wp_nonce_field('smb_import_content', 'smb_import_nonce'); ?>
        <input type="hidden" name="action" value="smb_import_content">

        <table class="form-table">
          <tr>
            <th scope="row">HTML Files Directory</th>
            <td>
              <input type="text" name="html_directory" value="C:\Users\acer\Downloads\SMB" class="regular-text" />
              <p class="description">Path to your HTML files directory</p>
            </td>
          </tr>
          <tr>
            <th scope="row">Import As</th>
            <td>
              <select name="import_type">
                <option value="page">WordPress Pages</option>
                <option value="post">WordPress Posts</option>
                <option value="industry">Industry Custom Post Type</option>
              </select>
            </td>
          </tr>
        </table>

        <?php submit_button('Import All HTML Files', 'primary', 'submit_import'); ?>
      </form>

      <hr />

      <h2>Quick Import: Create Sample Content</h2>
      <p>Click below to create sample industry pages with the content from your HTML files.</p>
      <form method="post" action="admin_post_smb_import_content">
        <?php wp_nonce_field('smb_import_content', 'smb_import_nonce'); ?>
        <input type="hidden" name="action" value="smb_import_content">
        <input type="hidden" name="quick_import" value="1">
        <?php submit_button('Create Sample Industry Pages', 'primary', 'submit_quick_import'); ?>
      </form>
    </div>
    <?php
  }

  public function handle_import() {
    if (!wp_verify_nonce($_POST['smb_import_nonce'], 'smb_import_content')) {
      wp_die('Security check failed');
    }

    if (!current_user_can('manage_options')) {
      wp_die('Insufficient permissions');
    }

    // Quick import - creates sample content from existing HTML files
    if (isset($_POST['quick_import'])) {
      $this->create_sample_content();
      wp_redirect(add_query_arg('page', 'smb-import', 'admin.php?page=smb-headless&import=success'));
      exit;
    }

    // Custom directory import
    $html_dir = isset($_POST['html_directory']) ? sanitize_text_field($_POST['html_directory']) : '';
    $import_type = isset($_POST['import_type']) ? sanitize_text_field($_POST['import_type']) : 'page';

    if (empty($html_dir) || !is_dir($html_dir)) {
      wp_die('Invalid directory path');
    }

    $files = glob($html_dir . '/*.html');
    $imported = 0;

    foreach ($files as $file) {
      if ($this->import_html_file($file, $import_type)) {
        $imported++;
      }
    }

    wp_redirect(add_query_arg('page', 'smb-import', 'admin.php?page=smb-headless&imported=' . $imported));
    exit;
  }

  private function create_sample_content() {
    // Create Home Page
    $home_id = $this->create_post([
      'post_title' => 'Home Page',
      'post_name' => 'home-page',
      'post_type' => 'industry',
      'post_content' => $this->get_home_content(),
      'post_status' => 'publish',
    ]);

    // Create Industry Pages
    $industries = [
      [
        'title' => 'Restaurant SEO',
        'slug' => 'restaurant',
        'content' => $this->get_restaurant_content(),
      ],
      [
        'title' => 'Plumbing SEO',
        'slug' => 'plumbing',
        'content' => $this->get_plumbing_content(),
      ],
      [
        'title' => 'HVAC SEO',
        'slug' => 'hvac',
        'content' => $this->get_hvac_content(),
      ],
      [
        'title' => 'Healthcare SEO',
        'slug' => 'healthcare',
        'content' => $this->get_healthcare_content(),
      ],
      [
        'title' => 'Lawyer SEO',
        'slug' => 'lawyer',
        'content' => $this->get_lawyer_content(),
      ],
      [
        'title' => 'Ecommerce SEO',
        'slug' => 'ecommerce',
        'content' => $this->get_ecommerce_content(),
      ],
    ];

    foreach ($industries as $industry) {
      $this->create_post([
        'post_title' => $industry['title'],
        'post_name' => $industry['slug'],
        'post_type' => 'industry',
        'post_content' => $industry['content'],
        'post_status' => 'publish',
      ]);
    }

    // Create Sample Services
    $services = [
      'Search Engine Optimization',
      'Local SEO',
      'AI Search Optimization',
      'Ads Marketing',
      'Content Marketing',
    ];

    foreach ($services as $service) {
      $this->create_post([
        'post_title' => $service,
        'post_type' => 'service',
        'post_content' => '<p>' . $service . ' services for small businesses. We provide comprehensive ' . strtolower($service) . ' solutions tailored to your needs.</p>',
        'post_status' => 'publish',
      ]);
    }

    // Create Sample Case Studies
    $case_studies = [
      'Storeganise - SEO Campaign',
      'Paragon Living - Local SEO',
      'Glazing Refurbishments - Content SEO',
      'The Sleepy Sloth - Ecommerce SEO',
      'Spy Spot - Organic Authority',
    ];

    foreach ($case_studies as $case) {
      $this->create_post([
        'post_title' => $case,
        'post_type' => 'case_study',
        'post_content' => '<p>Case study: ' . $case . '. We helped this client achieve significant growth through our SEO strategies.</p>',
        'post_status' => 'publish',
      ]);
    }

    // Create Sample Testimonials
    $testimonials = [
      'Local Plumbing Company',
      'Therapy Clinic',
      'Ecommerce Brand',
    ];

    foreach ($testimonials as $testimonial) {
      $this->create_post([
        'post_title' => $testimonial,
        'post_type' => 'testimonial',
        'post_content' => '<p>Testimonial from ' . $testimonial . '. "Excellent service and results!"</p>',
        'post_status' => 'publish',
      ]);
    }

    // Create Sample FAQs
    $faqs = [
      'How fast will I see results?',
      'What if I have a small budget?',
      'Do I need to sign a long contract?',
      'How is this different from a big agency?',
      'What do I actually get in the first 30 days?',
    ];

    foreach ($faqs as $faq) {
      $this->create_post([
        'post_title' => $faq,
        'post_type' => 'faq',
        'post_content' => '<p>Answer: ' . $faq . ' - We provide clear, honest answers to all your questions.</p>',
        'post_status' => 'publish',
      ]);
    }
  }

  private function create_post($post_data) {
    // Check if post already exists
    if (isset($post_data['post_name']) && $post_data['post_name']) {
      $existing = get_page_by_path($post_data['post_name'], OBJECT, $post_data['post_type']);
      if ($existing) {
        return $existing->ID;
      }
    }

    $post_id = wp_insert_post([
      'post_title' => $post_data['post_title'],
      'post_name' => isset($post_data['post_name']) ? $post_data['post_name'] : '',
      'post_type' => $post_data['post_type'],
      'post_content' => $post_data['post_content'],
      'post_status' => $post_data['post_status'],
      'post_author' => get_current_user_id(),
    ]);

    return $post_id;
  }

  private function import_html_file($file_path, $import_type) {
    if (!file_exists($file_path)) {
      return false;
    }

    $content = file_get_contents($file_path);
    $title = $this->extract_title($content);
    $slug = sanitize_title(basename($file_path, '.html'));

    // Check if already imported
    $existing = get_page_by_path($slug, OBJECT, $import_type);
    if ($existing) {
      return false;
    }

    // Extract main content (between body tags)
    $body_content = $this->extract_body_content($content);

    $post_data = [
      'post_title' => $title,
      'post_name' => $slug,
      'post_type' => $import_type,
      'post_content' => $body_content,
      'post_status' => 'publish',
    ];

    $this->create_post($post_data);
    return true;
  }

  private function extract_title($html) {
    if (preg_match('/<title>(.*?)<\/title>/i', $html, $matches)) {
      return html_entity_decode($matches[1], ENT_QUOTES, 'UTF-8');
    }
    if (preg_match('/<h1>(.*?)<\/h1>/i', $html, $matches)) {
      return html_entity_decode(strip_tags($matches[1]), ENT_QUOTES, 'UTF-8');
    }
    return 'Imported Page';
  }

  private function extract_body_content($html) {
    // Extract content between <body> and </body>
    if (preg_match('/<body[^>]*>(.*?)<\/body>/is', $html, $matches)) {
      return $matches[1];
    }
    return $html;
  }

  // Content generators for quick import
  private function get_home_content() {
    return '
    <p>We help small businesses rank higher on Google, show up on Maps, and get found in AI search. Practical SEO, local search, and content done properly, with monthly reporting so you see exactly what\'s working.</p>
    <h2>Our Services</h2>
    <ul>
      <li>Search Engine Optimization</li>
      <li>Local SEO</li>
      <li>AI Search Optimization (GEO & AEO)</li>
      <li>Ads Marketing</li>
      <li>Content Marketing</li>
    </ul>
    <h2>Why Choose Us</h2>
    <ul>
      <li>Built for small, not an afterthought</li>
      <li>Plain-English reporting</li>
      <li>No lock-in contracts</li>
    </ul>
    ';
  }

  private function get_restaurant_content() {
    return '
    <p>We\'re the team restaurants call for restaurant SEO services that actually fill tables — not just rank a homepage. From your Google listing to your menu pages, we help hungry searchers find you first.</p>
    <h2>Core Services</h2>
    <ul>
      <li>Local SEO & Google Business Profile</li>
      <li>Menu & Location Page SEO</li>
      <li>Review Generation & Management</li>
      <li>Local Content & Blogging</li>
      <li>Technical SEO For Restaurant Sites</li>
      <li>Link Building & Local Citations</li>
    </ul>
    ';
  }

  private function get_plumbing_content() {
    return '
    <p>We\'re the plumber SEO agency local plumbing and HVAC companies call when they\'re tired of watching competitors show up first on Google. We get your business ranking, calling, and booking.</p>
    <h2>Core Services</h2>
    <ul>
      <li>Local SEO & Google Business Profile</li>
      <li>Service Page SEO</li>
      <li>Plumber HVAC SEO</li>
      <li>Local Content & Blogging</li>
      <li>Citation & Directory Building</li>
      <li>Reputation & Review Management</li>
    </ul>
    ';
  }

  private function get_hvac_content() {
    return '
    <p>SEO for HVAC contractors has specific nuances a general agency will miss — seasonal demand shifts, service-area targeting, and the fact that most of your best leads come from a few miles away.</p>
    <h2>What We Work On</h2>
    <ul>
      <li>Local search & Google Business Profile</li>
      <li>Service page optimization</li>
      <li>Service-area pages</li>
      <li>Technical fixes</li>
      <li>Link building</li>
      <li>Monthly reporting</li>
    </ul>
    ';
  }

  private function get_healthcare_content() {
    return '
    <p>We\'re the go-to partner for therapist SEO, dentist SEO services, and medical clinic SEO — built for practices tired of relying on insurance directories and word-of-mouth alone.</p>
    <h2>Core Services</h2>
    <ul>
      <li>Local SEO & Google Business Profile</li>
      <li>Service Page SEO</li>
      <li>SEO For Medical Clinics</li>
      <li>Dentist SEO</li>
      <li>Therapist & Counselor SEO</li>
      <li>Reputation & Review Management</li>
    </ul>
    ';
  }

  private function get_lawyer_content() {
    return '
    <p>We\'re the lawyer SEO agency law firms call when they\'re tired of referrals being their only source of new clients. From personal injury to family law, we build organic visibility that turns searches into consultations.</p>
    <h2>Core Services</h2>
    <ul>
      <li>Practice-Area Page SEO</li>
      <li>Local SEO & Google Business Profile</li>
      <li>Legal Content & Blogging</li>
      <li>Technical SEO For Law Firms</li>
      <li>Link Building & Digital PR</li>
      <li>Reputation & Review Management</li>
    </ul>
    ';
  }

  private function get_ecommerce_content() {
    return '
    <p>We\'re the e-commerce SEO company online stores turn to when they\'re sick of paying for every single click. From category pages to product listings, we build organic visibility that turns browsers into buyers.</p>
    <h2>Core Services</h2>
    <ul>
      <li>Product & Category SEO</li>
      <li>Collection & Seasonal Page Strategy</li>
      <li>Ecommerce Content Marketing</li>
      <li>Link Building For Online Stores</li>
      <li>Structured Data & Shopping Visibility</li>
      <li>Technical Ecommerce SEO</li>
    </ul>
    ';
  }
}

new SMB_Content_Importer();
