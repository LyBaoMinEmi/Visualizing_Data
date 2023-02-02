function fetch_avgg(){
    let city= $("#cityName").val();
    const location_key1 = "489dde00adb1b128e168b61f943e0af3";
    const location_key2="3f2281da49235808d65329234dbe1a57";

    let url_city= "http://api.positionstack.com/v1/forward?access_key="+location_key1+"&query="+city;
    $.get(url_city,function(dataCity){
      console.log(dataCity);
      console.log("data city");
      let lat = String(dataCity.data[0].latitude);
      let lon = String(dataCity.data[0].longitude); 

//last 7 days

const key1 ="E3XF2QD4W6XA8PFFYWFFFLRHE";
const key2="WQMT4CK7LTMVTZ5MK6KTGT4F5";
const key3="TM2EUEGJT9QZSQKSRR8WGV8K3";
let url_old="https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/"+city+"/last7days?unitGroup="+unit_last+"&key="+key2+"&contentType=json";

  $.get(url_old,function(response){
    console.log("yes, data last 7 days arrived"); 
    console.log(response);  
    var ranges = new Array;
    var sum = 0;
      
    for(var i = 0; i < response.days.length; i++){
        var range = new Array;
        range[0]= parseFloat(response.days[i].datetimeEpoch)*1000;
        range[1]=parseFloat(response.days[i].tempmin);
        range[2]=parseFloat(response.days[i].tempmax);       
        ranges.push(range);
    }
    var averages = new Array;
    
    for(var i = 0; i < response.days.length; i++){
        var avg = new Array;
        avg[0]= parseFloat(response.days[i].datetimeEpoch)*1000;
        avg[1]=parseFloat(((response.days[i].tempmin+response.days[i].tempmax)/2).toFixed(2)); 
        sum += avg[1];
        averages.push(avg);
    }  

    //next 7 days    
const appid1= "dbe8557a9e8ee2187c08a8ff00f467f4";
const appid2= "619c1fba475bc7dd51b4f5ec3446e1e1";

let url2="https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&exclude=allerts&appid="+appid1+"&units="+unit;
$.get(url2,function(data2){
console.log("yes, data2 arrived"); 
for(var i = 0; i < data2.daily.length; i++) {
            var point = new Array();
            point[0]= data2.daily[i].dt*1000;
            point[2] = data2.daily[i].temp.max;
            point[1] = data2.daily[i].temp.min;
            ranges[i+8]=point;
            
        }

for(var i = 0; i < data2.daily.length; i++){
    var a = new Array;
    a[0]= data2.daily[i].dt*1000;
    a[1]=Math.round(((data2.daily[i].temp.max + data2.daily[i].temp.min)/2)*100)/100;
    sum += a[1];

    averages[i+8]=a;
}
var days= data2.daily.length+response.days.length;
var avg_all= Math.round((sum/days)*100)/100;

//highchart
let para_avg= {
    chart: {
        // type: 'spline',
        plotBackgroundImage: 'sky.jpg',
        zoomType: 'xy',
    },

    title: {
        text: '<b>Temperatures last and next 7 days in '+city+'</b>'
    },
    subtitle: {
        text: 'Source: weather.visualcrossing.com & openweathermap.org'+'<br> <b> Average temperature '+String(days)+' days: '+String(avg_all)+' '+CF+'</b>'
    },

    xAxis: {
        type: 'datetime',
        
    },

    yAxis: {
        
            title: {
                text: 'Temperature',
                style: {
                color: Highcharts.getOptions().colors[3],
            }
            },
            labels: {
                format: '{value}°C',
                style: {
                color: Highcharts.getOptions().colors[3],
            }
            }
        
    },   

    tooltip: {
        crosshairs: true,
        shared: true,
        valueSuffix: '°C'
    },
    plotOptions: {
        line: {
            dataLabels: {
                enabled: true
            },
            enableMouseTracking: false
        }
    },

    series: [{
        name: 'Average temperature',
        data: averages,
        zIndex: 1,
        marker: {
            fillColor: 'white',
            lineWidth: 2,
            lineColor:'#ffa31a'
        }
    }, {
        name: 'Range',
        data: ranges,
        type: 'arearange',
        lineWidth: 0,
        linkedTo: ':previous',
        // fillcolor: '#ff1a1a',
        fillColor: {
                        linearGradient: {
                            x1: 0,
                            y1: 0,
                            x2: 0,
                            y2: 1
                        },
                        stops: [
                            [0, '#e6e600'],
                            [1, Highcharts.color('#80ff00').setOpacity(0).get('rgba')]
                        ]
                    },
        zIndex: 0,
        marker: {
            enabled: false
        }
    }]
}; //end of highcharts
para_avg.yAxis.labels.format = '{value}'+CF;
para_avg.tooltip.valueSuffix=CF;
Highcharts.chart('avg',para_avg);
}); //end of  "$.get(url_old,function(response){"
}); // end of "$.get(url2,function(data2){ "
}); //end of lat lon
} //end of fetch
