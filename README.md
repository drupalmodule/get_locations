/* Readme for the getlocations handler named getlocations_fields_handler_filter_proxydistance.inc and js named proxy_final.js */

This repo consists of the Getlocations_fields module which is a submodule for getlocations module.

My work is in handlers folder the custom handler is named getlocations_fields_handler_filter_proxydistance.inc.

This filter pretty much resembles the filter getlocations_fields_handler_filter_distance.inc.

In the handlers folder there is a js file named proxy_final.js.This js file is really important because it is the one which does all the geocoding and google autocomplete form tasks.

In the handler I have set some if conditions to make sure the proxy_final.js is attached only when the view is in NON AJAX or NON preview format.

This way I am preventing the views to run the js in preview format since this will actually break the AJAX and the fields and the filters in the view become non editable.

I have defined the handler in the getlocations_fields.views.inc and the module knows that there is a custom handler through the info file named getlocations_fields.info.

Dependencies :

Modules : getlocations 7.x-1.x-dev which also has getlocations_fields, getlocations_entity submodules make sure to enable all these modules.

libraries: library for the markers to work
 
http://dl.dropbox.com/u/41489105/Drupal/getlocations/getlocations-markers.tar.gz (required)

or  
    
http://dl.dropbox.com/u/41489105/Drupal/getlocations/getlocations-markers-extra.tar.gz (extra)
and it should be named getlocations and placed in the libarary as follows

sites/all/libraries/getlocations/markers
