(function ($) {

Drupal.behaviors.proxycalculator = {
attach: function(context, settings) {

// jquery bind to calc the lat lon

$("#edit-proxydistance-postal-code").bind('input', function() {
  var uiref= $("#edit-proxydistance-postal-code").val();
if(isNaN(uiref)==false)
         {
          if(uiref.length!=5){
        // alert( 'please enter a valid pincode.') ;
              }
          else
          {

        var input_adrs_arr = [];

        var streetfield_value = '';
         input_adrs_arr.push(streetfield_value);
        
        var additionalfield_value = '';
          
        input_adrs_arr.push(additionalfield_value);
        
        var cityfield_value = '';
        
         input_adrs_arr.push(cityfield_value);
        
        var provincefield_value = '';
        
         input_adrs_arr.push(provincefield_value);
        
        var postal_codefield_value = $("#edit-proxydistance-postal-code").val();
        
           if (postal_codefield_value){ 
              input_adrs_arr.push(postal_codefield_value);
            //  alert(postal_codefield_value);
                }
           else{
            //  alert('no postal code entered');
                }
        var countryfield_value = 'US';
        input_adrs_arr.push(countryfield_value);
        
        var input_adrstmp = input_adrs_arr.join(", ");
         
        var input_adrs = {'address': input_adrstmp};   
     
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode(input_adrs, function (results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            
          lat = results[0].geometry.location.lat(); // lat being calculated retrieved
        //    alert(lat);
           $("#" + "edit-proxydistance-lati").val(lat);
          lng = results[0].geometry.location.lng(); // // long being calculated retrieved
          //   alert(lng);
            $("#" + "edit-proxydistance-long").val(lng);

         }
          
         else {
            var prm = {'!a': input_adrstmp, '!b': getGeoErrCode(status) };
            var msg = Drupal.t('Geocode for (!a) was not successful for the following reason: !b', prm);
            alert(msg);
          }
            }); //geocoder for zipcode is closed

    }

      }
//
else 
{
//street field entry
  var regexLetter = /[0-9]/;
      
    if(regexLetter.test(uiref) )
      {   
     // alert('please enter either a city or a zipcode');

       var input_adrs_arr = [];

        var streetfield_value = $("#edit-proxydistance-postal-code").val();
            if (streetfield_value){
              input_adrs_arr.push(streetfield_value);
            //  alert(streetfield_value);
                }
            else{
            //  alert('no street entered');
                }
        
        var additionalfield_value = '';
          
        input_adrs_arr.push(additionalfield_value);
        
        var cityfield_value = '';
        
         input_adrs_arr.push(cityfield_value);
        
        var provincefield_value = '';
        
         input_adrs_arr.push(provincefield_value);
        
        var postal_codefield_value = '';
        
         input_adrs_arr.push(postal_codefield_value);

        var countryfield_value = 'US';
        input_adrs_arr.push(countryfield_value);
        
        var input_adrstmp = input_adrs_arr.join(", ");
         
        var input_adrs = {'address': input_adrstmp};   
     
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode(input_adrs, function (results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            
          lat = results[0].geometry.location.lat(); // lat being calculated retrieved
        //    alert(lat);
           $("#" + "edit-proxydistance-lati").val(lat);
          lng = results[0].geometry.location.lng(); // // long being calculated retrieved
          //   alert(lng);
            $("#" + "edit-proxydistance-long").val(lng);

       }
   
      //Drupal.settings.basepath
         else {
            var prm = {'!a': input_adrstmp, '!b': getGeoErrCode(status) };
            var msg = Drupal.t('Geocode for (!a) was not successful for the following reason: !b', prm);
            alert(msg);
          } });
    }     

    else
      { //for city or state.

     //  alert('It is city or alphabet');

        var input_adrs_arr = [];

        var streetfield_value = '';
         input_adrs_arr.push(streetfield_value);
        
        var additionalfield_value = '';
          
         input_adrs_arr.push(additionalfield_value);
        
        var cityfield_value =  $("#edit-proxydistance-postal-code").val();

        if (cityfield_value){
        input_adrs_arr.push(cityfield_value);
        // alert(cityfield_value);
           }
        else{
              alert('no city entered');
                }

        var provincefield_value = '';
        
        input_adrs_arr.push(provincefield_value);
        
        var postal_codefield_value ='';
        
        input_adrs_arr.push(postal_codefield_value);

        var countryfield_value = 'US';
        
        input_adrs_arr.push(countryfield_value);
        
        var input_adrstmp = input_adrs_arr.join(", ");
         
        var input_adrs = {'address': input_adrstmp};   
     
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode(input_adrs, function (results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            
            lat = results[0].geometry.location.lat(); // lat being calculated retrieved
          //   alert(lat);
           $("#" + "edit-proxydistance-lati").val(lat);
            lng = results[0].geometry.location.lng(); // // long being calculated retrieved
          //   alert(lng);
           $("#" + "edit-proxydistance-long").val(lng);

         }
          
      //Drupal.settings.basepath
         else {
            var prm = {'!a': input_adrstmp, '!b': getGeoErrCode(status) };
            var msg = Drupal.t('Geocode for (!a) was not successful for the following reason: !b', prm);
            alert(msg);
          } });


}

} 


});


// click apply function 

$("#edit-submit-proxy").click( function() {
 var uiref=$("#edit-proxydistance-postal-code").val(); // uiref is the user reference postal code or the city being given. 
 alert(uiref);
 
               
 if(isNaN(uiref)==false)
         {
          if(uiref.length!=5){
         alert( 'please enter a valid pincode.') ;
              }
          else
          {

        var input_adrs_arr = [];

        var streetfield_value = '';
         input_adrs_arr.push(streetfield_value);
        
        var additionalfield_value = '';
          
         input_adrs_arr.push(additionalfield_value);
        
        var cityfield_value = '';
        
         input_adrs_arr.push(cityfield_value);
        
        var provincefield_value = '';
        
         input_adrs_arr.push(provincefield_value);
        
        var postal_codefield_value = $("#edit-proxydistance-postal-code").val();
        
           if (postal_codefield_value){ 
              input_adrs_arr.push(postal_codefield_value);
              alert(postal_codefield_value);
                }
           else{
              alert('no postal code entered');
                }
        var countryfield_value = 'US';
        input_adrs_arr.push(countryfield_value);
        
        var input_adrstmp = input_adrs_arr.join(", ");
         
        var input_adrs = {'address': input_adrstmp};   
     
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode(input_adrs, function (results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            
          lat = results[0].geometry.location.lat(); // lat being calculated retrieved
           //  alert(lat);
           $("#" + "edit-proxydistance-lati").val(lat);
          lng = results[0].geometry.location.lng(); // // long being calculated retrieved
           //  alert(lng);
            $("#" + "edit-proxydistance-long").val(lng);

         }
          
      //Drupal.settings.basepath
         else {
            var prm = {'!a': input_adrstmp, '!b': getGeoErrCode(status) };
            var msg = Drupal.t('Geocode for (!a) was not successful for the following reason: !b', prm);
            alert(msg);
          } });

    }

      }
else 
{
  var regexLetter = /[0-9]/;
      
    if(regexLetter.test(uiref) )
      {   
      alert('please enter either a city or a zipcode');
       }
    else
      {

      alert('It is city or alphabet');

        var input_adrs_arr = [];

        var streetfield_value = '';
         input_adrs_arr.push(streetfield_value);
        
        var additionalfield_value = '';
          
         input_adrs_arr.push(additionalfield_value);
        
        var cityfield_value =  $("#edit-proxydistance-postal-code").val();
        if (cityfield_value){
        input_adrs_arr.push(cityfield_value);
       //  alert(cityfield_value);
           }
        else{
              alert('no city entered');
                }

        var provincefield_value = '';
        
        input_adrs_arr.push(provincefield_value);
        
        var postal_codefield_value ='';
        
        input_adrs_arr.push(postal_codefield_value);

        var countryfield_value = 'US';
        
        input_adrs_arr.push(countryfield_value);
        
        var input_adrstmp = input_adrs_arr.join(", ");
         
        var input_adrs = {'address': input_adrstmp};   
     
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode(input_adrs, function (results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            
            lat = results[0].geometry.location.lat(); // lat being calculated retrieved
           //  alert(lat);
           $("#" + "edit-proxydistance-lati").val(lat);
            lng = results[0].geometry.location.lng(); // // long being calculated retrieved
           //  alert(lng);
           $("#" + "edit-proxydistance-long").val(lng);

         }
          
      //Drupal.settings.basepath
         else {
            var prm = {'!a': input_adrstmp, '!b': getGeoErrCode(status) };
            var msg = Drupal.t('Geocode for (!a) was not successful for the following reason: !b', prm);
            alert(msg);
          } });


}

} 


});

}
};

 })(jQuery);

