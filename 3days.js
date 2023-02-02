 

  
  function fetch_3days(){
    let city= $("#cityName").val();
    const key1 = "489dde00adb1b128e168b61f943e0af3";
    const key2="3f2281da49235808d65329234dbe1a57";
    let url_city= "http://api.positionstack.com/v1/forward?access_key="+key2+"&query="+city;
    $.get(url_city,function(dataCity){
      console.log(dataCity);
      console.log("data city");
      let lat = String(dataCity.data[0].latitude);
      let lon = String(dataCity.data[0].longitude); 
      var para= {
        chart: {
            // type: 'spline',
            plotBackgroundImage: 'sky.jpg',
            zoomType: 'xy',
        },
        title: {

            text: '<b>3 day weather forecast in '+city+'</b>'
        },
        subtitle: {
            text: 'Source: openweathermap.org'
        },
        xAxis: {
          type: "datetime"
        },
        yAxis:[
          {
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
        {
          title: {
              text: 'Air pressure',
              style: {
                color: Highcharts.getOptions().colors[4],
            }
          },
          labels: {
              format: '{value} hPa',
              style: {
                color: Highcharts.getOptions().colors[4],
            },
          },
          opposite:true
      },
      {
        title: {
            text: 'Wind Speed',
            style: {
              color: '#80d4ff',
          }
        },
        labels: {
            format: '{value} km/h',
            style: {
              color:'#80d4ff',
          },
        },
        opposite:true
      },
      
        ] ,
        tooltip: {
            crosshairs: true,
            shared: true
        },
        plotOptions: {
          series: {
            marker:{
              enabled:true
            },
            dataLabels: {
              shape: 'callout',
              borderRadius: 2,
              y: -10, 
              backgroundColor:'#ff6666',
              
            }
          }
        }     
      };
   

      
    // let unit ="metric";
    let url3="https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&exclude=allerts&appid=619c1fba475bc7dd51b4f5ec3446e1e1&units="+unit;
    $.get(url3,function(data3){
    console.log("yes, data3 arrived"); 
    console.log(data3);
    console.log(url3);
    let series= new Array;
  
    //object1: Temperature
    let object1= new Object;
    object1.name='Temperature ('+CF+')';
    object1.type='spline';
    object1.color='#ffb84d';
    let tem=new Array;
  
    //object2: Air pressure
    let object2= new Object;
    object2.name='Air Pressure (hPa)';
    object2.type='spline';
    object2.yAxis=1;
    object2.color='#4d4dff';
    object2.dashStyle='shortdot';
    let air=new Array;
  
    //object3: wind speed
    let object3= new Object;
    object3.name='Wind Speed (km/h)';
    object3.type='column';
    object3.yAxis=2;
    object3.color='#80d4ff';
    let wind=new Array;
  
    var max_temp = 0; 
    var min_temp = 150; 
    var i_max=0;var i_min=0;
  
    for(var i = 0; i < data3.hourly.length; i++){
    
      var point = new Object;
      point.x= data3.hourly[i].dt*1000;
      point.y= data3.hourly[i].temp;
      point.marker= new Object;
      point.marker.symbol='url(https://openweathermap.org/img/wn/'+data3.hourly[i].weather[0].icon+'.png)';
      tem.push(point);
      if(point.y> max_temp) {max_temp= point.y;i_max=i;}//find max temp and the num of this max point
      if(point.y< min_temp) {min_temp= point.y;i_min=i;}//find min temp and the num of this min point
    
  
      var point2 = new Array();
      point2[0]= data3.hourly[i].dt*1000;
      point2[1] = data3.hourly[i].pressure;
      air.push(point2);
  
      var point3 = new Array();
      point3[0]= data3.hourly[i].dt*1000;
      point3[1] = (data3.hourly[i].wind_speed)*3.6.toFixed(0);
      wind.push(point3); 
  
    }   

    tem[i_max].dataLabels= new Object;
    tem[i_max].dataLabels.format=String(tem[i_max].y)+CF;
    tem[i_max].dataLabels.enabled=true;
  
    tem[i_min].dataLabels= new Object;
    tem[i_min].dataLabels.format=String(tem[i_min].y)+CF;
    tem[i_min].dataLabels.enabled=true;
  
    object3.data= wind;
    series.push(object3);
  
    object1.data= tem;
    series.push(object1);
  
    object2.data= air;
    series.push(object2);  
  
    para.series=series;
    para.yAxis[0].labels.format = '{value}'+CF;
    Highcharts.chart('3days',para);
    
    });
  
    }); //end of get city lat lon
  
   } //end of fetch   
  
  
  