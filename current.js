


function fetch_current(){
    let city= $("#cityName").val();
    $("#city").html("The current weather in "+ city);
    let key = "489dde00adb1b128e168b61f943e0af3";
    let url_city= "http://api.positionstack.com/v1/forward?access_key="+key+"&query="+city;
    $.get(url_city,function(dataCity){
      console.log(dataCity);
      console.log("data city");
      let lat = String(dataCity.data[0].latitude);
      let lon = String(dataCity.data[0].longitude); 

let url1="https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&exclude=allerts&appid=619c1fba475bc7dd51b4f5ec3446e1e1&units="+unit;   
$.get(url1,function(data1){
    console.log("yes, data1 arrived"); 
    console.log(data1);    
    // let url_img="https://openweathermap.org/img/wn/"+data1.current.weather[0].icon +"@2x.png";
    // document.getElementById("myImg").src =url_img;
    
    var para_current=
    {
        chart: {
            plotBackgroundImage: 'sky.jpg',
            plotBackgroundColor: null,
            plotBorderWidth: 0,
            plotShadow: false
        },
        title: {
            useHTML:true,
            text:'<div style="text-align: center;">'+String(data1.daily[0].temp.min.toFixed(0))+CF+'/'+String(data1.daily[0].temp.max.toFixed(0))+CF+'<br>'
            +'<span style="font-size:2em;">'+ String(data1.current.temp.toFixed(0)) +CF+'</span>'+ "<img src='https://openweathermap.org/img/wn/"+data1.current.weather[0].icon +".png' />"+'<br>' 
            + String(data1.current.weather[0].description)+'<br>'
            +'<span style="font-size:0.8em;">'
            +'<i class="fa fa-tint"></i>'+String(data1.current.humidity)+' %  &nbsp;'
            +" <i class='fas fa-wind'></i>"+String((data1.current.wind_speed*3.6).toFixed(2)) + " km/h  "+'  &nbsp;'
            +"<i class='fas fa-tachometer-alt'></i>"+ String(data1.current.pressure)+' hPA'
            +'</span>'+'<br>'
            +"<i class='bi bi-sunrise-fill' style='color:#f3e012'></i>"+ timeConverter(data1.current.sunrise).split(" ")[1]+' &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;'
            +timeConverter(data1.current.dt)+'  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;'
            + timeConverter(data1.current.sunset).split(" ")[1]+"<i class='bi bi-sunset-fill'style='color:#f3e012'></i>"+'<br>'
            +'<br> </div>',  
            align: 'center',
            verticalAlign: 'middle',
            y: 60,
  
            
        },
        tooltip: {
            pointFormat: '{series.name}: <b> {point.y}h </b>'
        },
        accessibility: {
            point: {
                valueSuffix: '%'
            }
        },
        plotOptions: {
            pie: {
               marker:{
                   enabled:true,
                  },
                dataLabels: {
                    enabled: false,
          
                },
                startAngle: -90,
                endAngle: 90,
                center: ['50%', '75%'],
                size: '110%'
            }
        },
        series: [{
            type: 'pie',
            name: 'suntime',
            innerSize: '95%',
            data: [ 
       
                {
                y: getFloatHourMinute(data1.current.dt-data1.current.sunrise),
               color:  '#ffd480',
               type: "datetime"
               
                },
                {name: null, 
                   y: getFloatHourMinute(data1.current.sunset -data1.current.dt),
                   color:  '#99ffff',
                   type: "datetime"
               }
              
            ]
        }],
       };  


    Highcharts.chart('current', para_current,function (c) {
        c.renderer.image('https://www.highcharts.com/samples/graphics/sun.png',
         c.plotLeft+400,
        c.plotTop+50,
        // point.plotX + chart.plotLeft+100,
        // point.plotY + chart.plotTop+100,
        40,
        40).add();
        // console.log('point '+point.plotX + chart.plotLeft);
        }
    
    );

});

}); //end of get city lat lon

} //end of fetch