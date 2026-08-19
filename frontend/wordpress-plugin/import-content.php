<?php
/**
 * SMB HTML Content Importer
 * 
 * This script imports your HTML files into WordPress as posts/pages.
 * Upload this to your WordPress root and visit it once, then DELETE it.
 * 
 * Usage: Visit http://localhost/smb/import-content.php
 */

define('WP_USE_THEMES', false);
require_once(__DIR__ . '/wp-load.php');

// Security check - only allow admin users
if (!current_user_can('manage_options')) {
  die('You need admin permissions to run this script.');
}

// Check if already imported
$imported = get_option('smb_content_imported', false);
if ($imported) {
  die('Content already imported! If you want to re-import, delete the "smb_content_imported" option from wp_options table.');
}

echo "<h1>SMB Content Importer</h1>\n";
echo "<p>Starting import...</p>\n";
echo "<pre>\n";

$html_dir = 'C:\\Users\\acer\\Downloads\\SMB';
$imported_count = 0;

// Import Home Page
$home_content = file_get_contents($html_dir . '/seo-agency-home.html');
if ($home_content) {
  $title = $this->extract_title($home_content);
  $post_id = wp_insert_post([
    'post_title' => $title,
    'post_name' => 'home-page',
    'post_type' => 'industry',
    'post_content' => extract_body_content($home_content),
    'post_status' => 'publish',
    'post_author' => get_current_user_id(),
  ]);
  if ($post_id) {
    echo "✓ Created: Home Page (ID: $post_id)\n";
    $imported_count++;
  }
}

// Import Industry Pages
$industry_files = [
  'seo-restaurant.html' => 'Restaurant SEO',
  'seo-plumbing.html' => 'Plumbing SEO',
  'seo-hvac.html' => 'HVAC SEO',
  'seo-healthcare.html' => 'Healthcare SEO',
  'seo-lawyer.html' => 'Lawyer SEO',
  'seo-ecommerce.html' => 'Ecommerce SEO',
];

foreach ($industry_files as $file => $title) {
  $content = file_get_contents($html_dir . '/' . $file);
  if ($content) {
    $slug = sanitize_title(basename($file, '.html'));
    $post_id = wp_insert_post([
      'post_title' => $title,
      'post_name' => $slug,
      'post_type' => 'industry',
      'post_content' => extract_body_content($content),
      'post_status' => 'publish',
      'post_author' => get_current_user_id(),
    ]);
    if ($post_id) {
      echo "✓ Created: $title (ID: $post_id)\n";
      $imported_count++;
    }
  }
}

// Create Services
$services = [
  'Search Engine Optimization',
  'Local SEO',
  'AI Search Optimization (GEO & AEO)',
  'Ads Marketing',
  'Content Marketing',
];

foreach ($services as $service) {
  $post_id = wp_insert_post([
    'post_title' => $service,
    'post_type' => 'service',
    'post_content' => '<p>' . $service . ' services for small businesses. We provide comprehensive ' . strtolower($service) . ' solutions tailored to your needs.</p>',
    'post_status' => 'publish',
    'post_author' => get_current_user_id(),
  ]);
  if ($post_id) {
    echo "✓ Created Service: $service (ID: $post_id)\n";
    $imported_count++;
  }
}

// Create Case Studies
$case_studies = [
  'Storeganise - SEO Campaign',
  'Paragon Living - Local SEO',
  'Glazing Refurbishments - Content SEO',
  'The Sleepy Sloth - Ecommerce SEO',
  'Spy Spot - Organic Authority',
];

foreach ($case_studies as $case) {
  $post_id = wp_insert_post([
    'post_title' => $case,
    'post_type' => 'case_study',
    'post_content' => '<p>Case study: ' . $case . '. We helped this client achieve significant growth through our SEO strategies.</p>',
    'post_status' => 'publish',
    'post_author' => get_current_user_id(),
  ]);
  if ($post_id) {
    echo "✓ Created Case Study: $case (ID: $post_id)\n";
    $imported_count++;
  }
}

// Create Testimonials
$testimonials = [
  'Local Plumbing Company',
  'Therapy Clinic',
  'Ecommerce Brand',
];

foreach ($testimonials as $testimonial) {
  $post_id = wp_insert_post([
    'post_title' => $testimonial,
    'post_type' => 'testimonial',
    'post_content' => '<p>Testimonial from ' . $testimonial . '. "Excellent service and results!"</p>',
    'post_status' => 'publish',
    'post_author' => get_current_user_id(),
  ]);
  if ($post_id) {
    echo "✓ Created Testimonial: $testimonial (ID: $post_id)\n";
    $imported_count++;
  }
}

// Create FAQs
$faqs = [
  'How fast will I see results?',
  'What if I have a small budget?',
  'Do I need to sign a long contract?',
  'How is this different from a big agency?',
  'What do I actually get in the first 30 days?',
];

foreach ($faqs as $faq) {
  $post_id = wp_insert_post([
    'post_title' => $faq,
    'post_type' => 'faq',
    'post_content' => '<p>Answer: ' . $faq . ' - We provide clear, honest answers to all your questions.</p>',
    'post_status' => 'publish',
    'post_author' => get_current_user_id(),
  ]);
  if ($post_id) {
    echo "✓ Created FAQ: $faq (ID: $post_id)\n";
    $imported_count++;
  }
}

// Mark as imported
update_option('smb_content_imported', true);

echo "\n";
echo "✅ Import completed! Total imported: $imported_count items\n";
echo "</pre>\n";
echo "<p><strong>Important:</strong> Delete this file (import-content.php) after import for security!</p>";

function extract_title($html) {
  if (preg_match('/<title>(.*?)<\/title>/i', $html, $matches)) {
    return html_entity_decode($matches[1], ENT_QUOTES, 'UTF-8');
  }
  if (preg_match('/<h1>(.*?)<\/h1>/i', $html, $matches)) {
    return html_entity_decode(strip_tags($matches[1]), ENT_QUOTES, 'UTF-8');
  }
  return 'Imported Page';
}

function extract_body_content($html) {
  if (preg_match('/<body[^>]*>(.*?)<\/body>/is', $html, $matches)) {
    return $matches[1];
  }
  return $html;
}

?>
