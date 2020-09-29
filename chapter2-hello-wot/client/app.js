// $("button").click(function(){
//     console.log("clicked!");
//     $.ajax({
//         type: "POST",
//         url: "https://postman-echo.com/post",
//         data: "Hello from Here",
//         success: function(response)
//         {
//             alert(response);
//         },
//         error: function(XMLHttpRequest, textStatus, errorThrown)
//         {
//             alert(errorThrown);
//         },
//         dataType: "text"
//     });
// });
(function($){ 
    function processForm(e){ 
        $.ajax({ 
            url: 'http://devices.webofthings.io/pi/actuators/display/content/', //#A
            dataType: 'json', //#B
            type: 'post', //#C
            contentType: 'application/json',
            data: JSON.stringify({"value": $('#value').val()}), 
            processData: false,
            success: function( data, textStatus, jQxhr ){
                $('#response pre').html( JSON.stringify( data ) ); 
            },
            error: function( jqXhr, textStatus, errorThrown ){//#G 
                console.log( errorThrown ); 
            } 
        }); 
        e.preventDefault(); 
    } 
    $('#message-form').submit( processForm ); //#H -> Will just run the processForm function (the one above) once the form is submitted 
})(jQuery); 
// (function($){ 
//     function processForm(e){ 
//         $.ajax({ 
//             url: 'http://devices.webofthings.io/pi/actuators/display/content/', //#A
//             dataType: 'text', //#B
//             type: 'post', //#C
//             contentType: 'application/x-www-form-urlencoded', //#D
//             data: $(this).serialize(), //#E
//             success: function( data, textStatus, jQxhr ){ //#F
//                 $('#response pre').html( data ); 
//             }, 
//             error: function( jqXhr, textStatus, errorThrown ){//#G 
//                 console.log( errorThrown ); 
//             } 
//         }); 
//         e.preventDefault(); 
//     } 
//     $('#message-form').submit( processForm ); //#H -> Will just run the processForm function (the one above) once the form is submitted 
// })(jQuery); 
