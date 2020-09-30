
$(document).ready(function () {

    var rootUrl = 'http://devices.webofthings.io';

    function mashup(name, location) {
        var weatherURL = "https://api.openweathermap.org/data/2.5/weather?q="+location+"&units=metric&appid=fecb744e24bbf7205bc3a726e46f8a0c";
        $.getJSON(weatherURL, function (result) {//#A
            var localTemp = result.main.temp;
            console.log('Local @ ' + location + ': ' + localTemp);
            $.getJSON(rootUrl + '/pi/sensors/temperature', function (piResult) {//#B
              console.log('Pi @ London: ' + piResult.value);
              myMessage = prepareMessage(name, location, localTemp, piResult.value); //#C
              alert(myMessage);
              publishMessage(myMessage);
            });
          });
    }

    function publishMessage(message) {
        $.ajax(rootUrl + '/pi/actuators/display/content', { //#D
          data: JSON.stringify({"value": message}),
          contentType: 'application/json',
          method: 'POST',
          success: function (data) {
            $('#message').html('Published to LCD: ' + message);
            $('#wait').html('The Webcam image with your message will appear below in : ' + (data.displayInSeconds+2) + ' seconds.');
            // console.log('We will take a picture in ' + (data.displayInSeconds+2) + ' seconds...');
            setTimeout(takePicture, (data.displayInSeconds+2) * 1000); //#E 
          }
        });
      }

    function prepareMessage(name, location, localTemp, piTemp) { //#F
        return name + ' @ ' + location + ((localTemp < piTemp) ? ' < ' : ' > ') + piTemp + " @ lab in London";
    }

    function takePicture() {
        $.ajax({ //#G
            method: 'GET',
            url: rootUrl + '/camera/sensors/picture/',
            dataType: 'json',
            success: function (data) {
                console.log(data);
                $('#camImg').attr('src', data.value); //#H
            },
            error: function (err) {
                console.log(err);
            }
        });
    }

    mashup('Olivia', 'lisbon');
});
