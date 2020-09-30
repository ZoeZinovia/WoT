(function($){ 
    function processForm(e){ 
        $.ajax({ 
            url: $("#host").val(), //#A
            dataType: 'json', //#B
            type: 'get', //#C
            success: function( data, textStatus, jQxhr ){
                $("#meta").html(data.links.meta.title + "<a href = \"" + data.links.meta.rel + "\"> " + data.links.meta.rel + "</a>");
                $("#doc").html(data.links.doc.title + "<a href = \"" + data.links.doc.rel + "\"> " + data.links.doc.rel + "</a>");
                sensorspath = data.url + data.resources.sensors.url;
                $.ajax({
                    url: sensorspath,
                    dataType: 'json',
                    type: 'get',
                    success: function(data, textStatus, jQxhr){
                        var sensorList = "";
                        alert(sensorspath);
                        $('#sensors').html(Object.keys(data).length + " sensors found!");
                        for(var key in data){
                            sensorList = sensorList + "<li><a href = \"" + sensorspath + key + "\">"+ data[key].name +"</a></li>";
                        }
                        $('#sensors-list').html(sensorList);
                    },
                    error: function( jqXhr, textStatus, errorThrown ){//#G 
                        console.log( errorThrown ); 
                    } 
                });
            },
            error: function( jqXhr, textStatus, errorThrown ){//#G 
                console.log( errorThrown ); 
            }
        }); 
        e.preventDefault(); 
    } 
    $('#message-form').submit( processForm ); //#H -> Will just run the processForm function (the one above) once the form is submitted 
})(jQuery); 