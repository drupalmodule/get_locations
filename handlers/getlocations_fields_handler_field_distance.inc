<?php
// NEEDS WORK
## NOT IN USE ATM
/**
 * @file
 * Distance field handler.
 */

class getlocations_fields_handler_field_distance extends views_handler_field {

  function option_definition() {
    $options = parent::option_definition();
    $options['origin'] = array('default' => 'nid_arg');
#    $options['units'] = array('default' => 'km');
#    $options['search_distance']  = array('default' => '100');
    $options['latitude'] = array('default' => '');
    $options['longitude'] = array('default' => '');
#    $options['postal_code'] = array('default' => '');
#    $options['country'] = array('default' => '');
    $options['php_code'] = array('default' => '');
    $options['nid_arg'] = array('default' => '');
    $options['nid_loc_field'] = array('default' => 'node');
    $options['uid_arg'] = array('default' => '');
    $options['uid_loc_field'] = array('default' => 'user');
    $options['tid_arg'] = array('default' => '');
    $options['tid_loc_field'] = array('default' => 'taxonomy_term');
    $options['cid_arg'] = array('default' => '');
    $options['cid_loc_field'] = array('default' => 'comment');
    $options['distance_arg'] = array('default' => '');
    return $options;
  }

  function has_extra_options() {
    return TRUE;
  }

  function extra_options_form(&$form, &$form_state) {

    $form['origin'] = getlocations_fields_element_origin($this->options['origin'], TRUE);

    $form['latitude'] = getlocations_fields_element_latitude($this->options['latitude']);

    $form['longitude'] = getlocations_fields_element_longitude($this->options['longitude']);

    $form['php_code'] = getlocations_fields_element_php_code($this->options['php_code']);

    list($nid_argument_options, $uid_argument_options, $tid_argument_options, $cid_argument_options) = getlocations_fields_views_proximity_get_argument_options($this->view);
    $loc_field_options = getlocations_fields_views_proximity_get_location_field_options();
    if ($nid_argument_options) {
      $form['nid_arg'] = getlocations_fields_element_nid_arg($this->options['nid_arg'], $nid_argument_options);
      $form['nid_loc_field'] = getlocations_fields_element_nid_loc_field($this->options['nid_loc_field'], $loc_field_options);
    }
    if ($uid_argument_options) {
      $form['uid_arg'] = getlocations_fields_element_uid_arg($this->options['uid_arg'], $uid_argument_options);
      $form['uid_loc_field'] = getlocations_fields_element_uid_loc_field($this->options['uid_loc_field'], $loc_field_options);
    }
    ### TESTING
    if ($tid_argument_options) {
      $form['tid_arg'] = getlocations_fields_element_tid_arg($this->options['tid_arg'], $tid_argument_options);
      $form['tid_loc_field'] = getlocations_fields_element_tid_loc_field($this->options['tid_loc_field'], $loc_field_options);
    }
    if ($cid_argument_options) {
      $form['cid_arg'] = getlocations_fields_element_cid_arg($this->options['cid_arg'], $cid_argument_options);
      $form['cid_loc_field'] = getlocations_fields_element_cid_loc_field($this->options['cid_loc_field'], $loc_field_options);
    }

    $form['units'] = getlocations_element_distance_unit($this->options['units']);

  }


  function click_sort($order) {
    $location = getlocations_fields_views_proximity_get_reference_location($this->view, $this->options);

    if ($location) {
      $this->query->add_orderby(NULL, getlocations_earth_distance_sql($location['latitude'], $location['longitude'], $this->table_alias), $order, $this->field_alias);
    }
  }

  function render($values) {
    if (empty($values->{$this->field_alias}) || $values->{$this->field_alias} == 'Unknown') {
      // Unset location, empty display.
      return;
    }
    $dist = (float)$values->{$this->field_alias};
    return theme('getlocations_fields_distance', array('distance' => $dist, 'units' => $this->options['units']));
  }

  function query() {

    $coordinates = getlocations_fields_views_proximity_get_reference_location($this->view, $this->options);


    $this->ensure_my_table();

    if (! empty($coordinates)) {

      $lat = $coordinates['latitude'];
      $lon = $coordinates['longitude'];
      $this->field_alias = $this->query->add_field(NULL, getlocations_earth_distance_sql($lat, $lon, $this->table_alias), $this->table_alias . '_' . $this->field);
    }
    else {
      $this->field_alias = $this->query->add_field(NULL, "'Unknown'", $this->table_alias . '_' . $this->field);
    }
  }
}
