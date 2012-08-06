(function ($) {

Drupal.behaviors.proxycalculator = {
attach: function(context, settings) {


var uiref1= document.getElementById('edit-proxydistance-postal-code');
var autocomplete = new google.maps.places.Autocomplete(uiref1);

$("#edit-proxydistance-postal-code").each(function(){

alert('hello');

});

/*
$.each(#edit-proxydistance-postal-code, function(){

// jquery change to calc the lat lon when mouse click selected.

alert('change');
});*/

$("#edit-proxydistance-postal-code").bind('onpaste',function(event) {

//alert('inside change');

var uiref= $("#edit-proxydistance-postal-code").val();
//alert(uiref);
 if(isNaN(uiref)==false)
       {
        if(uiref.length!=5)
           {
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
          alert(lat);
              $("#" + "edit-proxydistance-lati").val(lat);
              lng = results[0].geometry.location.lng(); // // long being calculated retrieved
          //  alert(lng);
              $("#" + "edit-proxydistance-long").val(lng);

                   }
          
             else {
              var prm = {'!a': input_adrstmp, '!b': getGeoErrCode(status) };
              var msg = Drupal.t('Geocode for (!a) was not successful for the following reason: !b', prm);
              alert(msg);
               }
                }); //geocoder for zipcode is closed.
    }

      }
 else 
 {
//street field entry or alphanumeric entry
  var regexLetter = /[0-9]/;
      
    if(regexLetter.test(uiref) )
      {   
     // for street entry or alphanumeric entry 

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
             if (status == google.maps.GeocoderStatus.OK) 
              {
              
              alert('inside change');
 
              lat = results[0].geometry.location.lat(); // lat being calculated retrieved
        //    alert(lat);
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
                 } 
           });
    }     

    else
      { //for city or state or just alphabets.

     //  alert('It is city or alphabet');

        var input_adrs_arr = [];

        var streetfield_value = '';
        input_adrs_arr.push(streetfield_value);
        
        var additionalfield_value = '';
          
        input_adrs_arr.push(additionalfield_value);
        
        var cityfield_value =  $("#edit-proxydistance-postal-code").val();

             if (cityfield_value){
              input_adrs_arr.push(cityfield_value);
        //    alert(cityfield_value);
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
                  } 
                   }); //geocoder for city or for alphabets ended or 


}

} 


}); //change geocoder for calc lat lon is closed this is for mouse select 


// key up function for calculating the lat lon in dropdown key select 

$("#edit-proxydistance-postal-code").keyup( function() {
var uiref= $("#edit-proxydistance-postal-code").val();
 if(isNaN(uiref)==false)
  {
    if(uiref.length!=5){
        //alert( 'please enter a valid pincode.') ;
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
          //  alert(lng);
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
//street field entry or alphanumeric entry
  var regexLetter = /[0-9]/;
      
    if(regexLetter.test(uiref) )
      {   
     // for street entry or alphanumeric entry 

       var input_adrs_arr = [];

        var streetfield_value = $("#edit-proxydistance-postal-code").val();
             if (streetfield_value)
                 {
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
          //  alert(lng);
              $("#" + "edit-proxydistance-long").val(lng);

       }
   
      //Drupal.settings.basepath
             else {
              var prm = {'!a': input_adrstmp, '!b': getGeoErrCode(status) };
              var msg = Drupal.t('Geocode for (!a) was not successful for the following reason: !b', prm);
              alert(msg);
          } 
           });
    }     

    else
      { //for city or state or just alphabets.

     //  alert('It is city or alphabet');

        var input_adrs_arr = [];

        var streetfield_value = '';
        input_adrs_arr.push(streetfield_value);
        
        var additionalfield_value = '';
          
        input_adrs_arr.push(additionalfield_value);
        
        var cityfield_value =  $("#edit-proxydistance-postal-code").val();

             if (cityfield_value){
              input_adrs_arr.push(cityfield_value);
        //    alert(cityfield_value);
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
                  } 
                   }); //geocoder for city or for alphabets ended or .


}

} 


}); //keyup works for all the browsers geocoder for calc lat lon is closed


// click apply function 

$("#edit-submit-proxy").click( function() {
var uiref=$("#edit-proxydistance-postal-code").val(); // uiref is the user reference postal code or the city being given. 

 
               
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
            //  alert(postal_codefield_value);
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
     // alert('please enter either a city or a zipcode');
       }
    else
      {

     // alert('It is city or alphabet');

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
               }
                 });


}

} 


});

}
}

 })(jQuery);

