

let unit ="metric";
let unit_last= "metric";
var CF='°C';
function fetch0(){
    fetch_current();
    fetch_3days();
    fetch_avgg();    
}

function celsius(){
    if(unit != "metric") unit = "metric";
    if(unit_last != "metric") unit_last="metric";

    CF='°C';
    fetch_current();
    fetch_3days();
    fetch_avgg();
   }
function fahrenheit(){
    if(unit != "imperial") unit = "imperial";
    if(unit_last != "us") unit_last="us";
    CF='°F'; 
    fetch_current();
    fetch_3days();    
    fetch_avgg();

   }
function timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour =a.getHours();
    var min = a.getMinutes();
    // var sec = a.getSeconds();
    date = ("0" + date).slice(-2);
    hour = ("0" + hour).slice(-2);
    min = ("0" + min).slice(-2);


    //var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
    var time = date + '.' + month + ' ' + hour + ':' + min;

    return time;
    }
function getFloatHourMinute(timestamp){
    var a = new Date(timestamp * 1000);
    var hour =a.getHours();
    var min_h = Math.round((a.getMinutes()/60)*100)/100;
    return (hour+min_h);

}
