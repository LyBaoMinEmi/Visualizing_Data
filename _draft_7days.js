var parameters = 
{
    chart: {
        type: 'spline',
        zoomType: 'xy',
        
        
    },

    title: {
        text: '7 day weather forecast'
    },

    subtitle: {
        text: 'Quelle: https://openweathermap.org/',
    },

    yAxis:[
    {
        title: {
            text: 'Temperature',
            style: {
                color: Highcharts.getOptions().colors[3],
            } 
        },
        lineColor: '#FF0000',
        labels: {
        formatter: function () {
        return this.value + '°';},
        style: {
                color: Highcharts.getOptions().colors[3],
            } 
        },
       
    },
    {
        title: {
            text: null
        },
        labels: {
        formatter: function () {
        return this.value + '°';}
        },
        opposite:true
    }
    ] ,

    xAxis: {
        type: "datetime"
    },

    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle'
    },
    tooltip: {
        crosshairs: true,
        shared: true
    },

    function (c) { // on complete

        c.renderer.image('https://www.highcharts.com/samples/graphics/sun.png',0,0,30,30).add();
            
    }
    
}
function timeConverter(UNIX_timestamp){
var a = new Date(UNIX_timestamp * 1000);
var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
var year = a.getFullYear();
var month = months[a.getMonth()];
var date = a.getDate();
var hour =a.getHours();
var min = a.getMinutes();
var sec = a.getSeconds();
//var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
var time = date + '.' + month + ' ' + hour + ':' + min;

return time;
}


//Highchart forecast 7 day
// let url_alt="https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=47.076668&lon=15.421371&dt=1655296573&appid=619c1fba475bc7dd51b4f5ec3446e1e1&units=metric";
// $.get(url_alt,function(data0){
//     console.log("yes, data0 arrived"); 
//     console.log(data0);
//     for(var i = 0; i < data0.hourly.length; i++){
//         console.log("time "+timeConverter(data0.hourly[i].dt));
//     }
    

// });


let url2="https://api.openweathermap.org/data/2.5/onecall?lat=47.076668&lon=15.421371&exclude=allerts&appid=619c1fba475bc7dd51b4f5ec3446e1e1&units=metric";
$.get(url2,function(data2){
console.log("yes, data2 arrived"); 
//console.log(data2);      

let series = new Array();
let obj1 = new Object();
obj1.name = 'Max Temperature';
obj1.color="#ffa64d";

let temp= new Array;
for(var i = 0; i < data2.daily.length; i++) {
            var point = new Array();
            point[0]= data2.daily[i].dt*1000;
            point[1] = data2.daily[i].temp.max;
            temp.push(point);
        }
obj1.data= temp;
series.push(obj1); 


let obj2 = new Object();
obj2.name = 'Min Temperature';
let temp2= new Array;
for(var i = 0; i < data2.daily.length; i++) {
            var point = new Array();
            point[0]= data2.daily[i].dt*1000;
            point[1] = data2.daily[i].temp.min;
            temp2.push(point);
        }
obj2.data= temp2;
series.push(obj2); 

parameters.series = series;
Highcharts.chart('7days',parameters);
});