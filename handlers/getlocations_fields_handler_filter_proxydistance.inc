<?php

/**
 * @file
 * @author srinath  http://drupal.org/user/847988
 * @copyright GNU GPL
 *
 * Views 3 support for getlocations_fields.
 */

/**
 * General proximity filter for location latitude/longitude.
 */
class getlocations_fields_handler_filter_proxydistance extends views_handler_filter {
  // This is always multiple, because we can have distance, units etc.
  var $always_multiple = TRUE;
    
  function option_definition() {
    $options = parent::option_definition();

    $options['operator'] = array('default' => 'mbr');
    $options['identifier'] = array('default' => 'distance');
    $options['group'] = array('default' => '0');
    $options['origin'] = array('default' => 'nid_arg');

    $options['value'] = array(
      'default' => array(
        'latitude' => '',
        'longitude' => '',
        'postal_code' => '',
#        'country' => '',
        'php_code' => '',
        'nid_arg' => '',
        'nid_loc_field' => 'node',
        'uid_arg' => '',
        'uid_loc_field' => 'user',
        'tid_arg' => '',
        'tid_loc_field' => 'taxonomy_term',
        'cid_arg' => '',
        'cid_loc_field' => 'comment',
        'search_distance' => 1000,
        'search_units' => 'km',
      ),
    );

    $options['expose']['contains']['operator_id'] = array('default' => 'mbr');
    $options['expose']['contains']['search_units'] = array('default' => 'km');
    $options['expose']['contains']['search_distance'] = array('default' => 10);

    return $options;
  }

  function admin_summary() {
    if (!empty($this->options['exposed'])) {
      return t('Exposed');
    }
    return '';
  }

  function operator_options() {
    return array(
      'mbr' => t('Proximity (Rectangular)'),
      'dist' => t('Proximity (Circular)'),
    );
  }
  // TODO
  function expose_options() {
    parent::expose_options();

    $this->options['expose']['search_units'] = array('default' => 'km');
    $this->options['expose']['search_distance'] = array('default' => 10);
  }

  function value_form(&$form, &$form_state) {
    parent::value_form($form, $form_state);
    $form['origin'] = getlocations_fields_element_origin($this->options['origin']);

    if (! empty($form_state['exposed'])) {
      $identifier = $this->options['expose']['identifier'];
      if (! isset($form_state['input'][$identifier])) {
        // We need to pretend the user already inputted the defaults, because
        // fapi will malfunction otherwise.
        $form_state['input'][$identifier] = $this->value;
      }
    }

    $form['value'] = array(
      '#tree' => TRUE,
    );
    $form['value']['latitude'] = getlocations_fields_element_latitude($this->value['latitude']);
    $form['value']['longitude'] = getlocations_fields_element_longitude($this->value['longitude']);
    $form['value']['postal_code'] = getlocations_fields_element_postal_code($this->value['postal_code']);
    $path= drupal_get_path('module','getlocations_fields');
    
      $pageURL = 'http';
    /*if ($_SERVER["HTTPS"] == "on") {$pageURL .= "s";}*/
    $pageURL .= "://";
    if ($_SERVER["SERVER_PORT"] != "80") {
     $pageURL .= $_SERVER["SERVER_NAME"].":".$_SERVER["SERVER_PORT"].$_SERVER["REQUEST_URI"];
     }
    else {
     $pageURL .= $_SERVER["SERVER_NAME"].$_SERVER["REQUEST_URI"];
     }
 
    if(preg_match("/overlay/",$pageURL)||preg_match("/preview/",$pageURL)||preg_match("/ajax/",$pageURL)){
     // this to make sure for the proxy_final.js to be added to only the view page and not to ui
     // drupal_add_js("http://maps.googleapis.com/maps/api/js?key=AIzaSyAK2pLPaCunTTXSiPe29ykkLpPFBxjqRLk&sensor=false&language=en&libraries=places", 'external');
     // drupal_set_message($pageURL);

      }
   else{

     drupal_add_js("http://maps.googleapis.com/maps/api/js?key=AIzaSyAK2pLPaCunTTXSiPe29ykkLpPFBxjqRLk&sensor=false&language=en&libraries=places", 'external');
     drupal_add_js("$path/handlers/proxy_final.js");
      }

    //drupal_add_js("$path/handlers/proxy_final.js");

    // drupal_add_js("http://maps.googleapis.com/maps/api/js?key=AIzaSyAK2pLPaCunTTXSiPe29ykkLpPFBxjqRLk&sensor=false&language=en&libraries=places", 'external');
 
   #$form['value']['country'] = getlocations_fields_element_country($this->value['country']);
    $form['value']['php_code'] = getlocations_fields_element_php_code($this->value['php_code']);
    // drupal_set_message($form['value']['postal_code']);     
   
 
    list($nid_argument_options, $uid_argument_options, $tid_argument_options, $cid_argument_options) = getlocations_fields_views_proximity_get_argument_options($this->view);
    $loc_field_options = getlocations_fields_views_proximity_get_location_field_options();
    if ($nid_argument_options) {
      $form['value']['nid_arg'] = getlocations_fields_element_nid_arg($this->value['nid_arg'], $nid_argument_options);
      $form['value']['nid_loc_field'] = getlocations_fields_element_nid_loc_field($this->value['nid_loc_field'], $loc_field_options);
    }
    if ($uid_argument_options) {
      $form['value']['uid_arg'] = getlocations_fields_element_uid_arg($this->value['uid_arg'], $uid_argument_options);
      $form['value']['uid_loc_field'] = getlocations_fields_element_uid_loc_field($this->value['uid_loc_field'], $loc_field_options);
    }
    if ($tid_argument_options) {
      $form['value']['tid_arg'] = getlocations_fields_element_tid_arg($this->value['tid_arg'], $tid_argument_options);
      $form['value']['tid_loc_field'] = getlocations_fields_element_tid_loc_field($this->value['tid_loc_field'], $loc_field_options);
    }
    ## not tested yet
    if ($cid_argument_options) {
      $form['value']['cid_arg'] = getlocations_fields_element_cid_arg($this->value['cid_arg'], $cid_argument_options);
      $form['value']['cid_loc_field'] = getlocations_fields_element_cid_loc_field($this->value['cid_loc_field'], $loc_field_options);
    }


    $form['value']['search_units'] = getlocations_element_distance_unit($this->value['search_units']);
    $form['value']['search_distance'] = getlocations_element_search_distance($this->value['search_distance']);
    
    $form['value']['lati'] = array('#type' => 'textfield',
    '#title' => t('latitude'),
    '#maxlength' => USERNAME_MAX_LENGTH,
    '#size' => 15,
    
    
     );

    $form['value']['long'] = array('#type' => 'textfield',
    '#title' => t('longitude'),
    '#maxlength' => USERNAME_MAX_LENGTH,
    '#size' => 15,
      
     );

    $form['value']['test'] = array('#type' => 'textfield',
    '#title' => t('geocode count'),
    '#maxlength' => USERNAME_MAX_LENGTH,
    '#size' => 15,

     );

  }
  // TODO
  function exposed_form(&$form, &$form_state) {
    parent::exposed_form($form, $form_state);
    $key = $this->options['expose']['identifier'];
    $origin = $this->options['origin'];

    // Strip dependencies off on exposed form.
    foreach (element_children($form[$key]) as $el) {
      if (!empty($form[$key][$el]['#dependency'])) {
        $form[$key][$el]['#dependency'] = array();
      }
    }
    // unset anything not needed on exposed form
    unset($form[$key]['latitude']);
    unset($form[$key]['longitude']);
    unset($form[$key]['php_code']);
    unset($form[$key]['nid_arg']);
    unset($form[$key]['nid_loc_field']);
    unset($form[$key]['uid_arg']);
    unset($form[$key]['uid_loc_field']);
    unset($form[$key]['tid_arg']);
    unset($form[$key]['tid_loc_field']);
    unset($form[$key]['cid_arg']);
    unset($form[$key]['cid_loc_field']);
    unset($form['origin']);
  }
  

  function query() {
  
   
    if (empty($this->value) ) {
    return;
    }
   
  if (empty($this->value['lati'])){ 
       
    return FALSE;

    }

  if(empty($this->value['postal_code'])){

     $lat = 0;
     $lon = 0;
    } 
   else{
     $lat = $this->value['lati']; //setting the lat lon to 0 if the input addr is empty.
     $lon = $this->value['long'];   
    }
     $coordinates['latitude']=$lat;
     $coordinates['longitude']=$lon;

     $this->ensure_my_table();
            
    $distance_meters = getlocations_convert_distance_to_meters($this->value['search_distance'], $this->value['search_units']);
    $latrange = getlocations_earth_latitude_range($lat, $lon, $distance_meters);
    $lonrange = getlocations_earth_longitude_range($lat, $lon, $distance_meters);

    // If the table alias is specified, add on the separator.
    $table_alias = (empty($this->table_alias) ? '' : $this->table_alias . '.');

    // Add MBR check (always).
    // In case we go past the 180/-180 mark for longitude.
    if ($lonrange[0] > $lonrange[1]) {
      $where = $table_alias . "latitude > :minlat
      AND " . $table_alias . "latitude < :maxlat
      AND ((" . $table_alias . "longitude < 180
      AND " . $table_alias . "longitude > :minlon)
      OR (" . $table_alias . "longitude < :maxlon
      AND " . $table_alias . "longitude > -180))";
    }
    else {
      $where = $table_alias . "latitude > :minlat
      AND " . $table_alias . "latitude < :maxlat
      AND " . $table_alias . "longitude > :minlon
      AND " . $table_alias . "longitude < :maxlon";
    }
    $this->query->add_where_expression($this->options['group'], $where, array(':minlat' => $latrange[0], ':maxlat' => $latrange[1], ':minlon' => $lonrange[0], ':maxlon' => $lonrange[1]));
      
    if ($this->operator == 'dist') {
      // Add radius check.
      $this->query->add_where_expression($this->options['group'], getlocations_earth_distance_sql($lat, $lon, $this->table_alias) . ' < :distance', array(':distance' => $distance_meters));
    } 

  }

}
