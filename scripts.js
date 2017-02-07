console.log('script working');
var iframe = document.getElementById('video-stream');


// iframe.onload = function(){
//   console.log('window loaded');
//   var imageStream = iframe.getElementsByTagName('img')[0];

//   imageStream.style.width = '300px';
//   imageStream.style.height = '200px';
// }

// var hours = [];

// for(var i=0; i>=-24; i--){
//   // timestamp for each hour for the last day
//   var timestamp = moment() - moment.duration(i, 'hours')
//   timestamp = timestamp.toString();
//   timestamp = timestamp.substring(0, timestamp.length - 3);
//   hours.push(timestamp);
// }

// // combine hour chunks
// var hoursDurations = hours.map(function(hour, index){
//   if(index < hours.length - 1){
//     return hour + '_' + hours[index + 1]
//   } else return false;
// });

// hoursDurations.pop();
// var hoursQuery = hoursDurations.join('-');

// console.log('hours query: ', hoursQuery);

var params = {
    api_key: 'u413851-fe06191fa195a5841a40c089',
    monitors: '778643699',
    response_times: 1,
};

var points = [];
var labels = [];

$.post('https://api.uptimerobot.com/v2/getMonitors', params, function(response, err){
  var monitor = response.monitors[0];
  console.log('response times: ', monitor.response_times.map(function(response){
    points.unshift(response.value);
    labels.unshift(moment(response.datetime * 1000).fromNow())
    // return {
    //   datetime: moment(response.datetime * 1000).fromNow(), 
    //   value: response.value
    // }
  }));
  var ctx = document.getElementById('statusChart').getContext('2d');
  var myLineChart = new Chart(ctx, {
      type: 'line',
      options: {
        lineWidth:4,
        fill:true,
        backgroundColor: '255,0,255',

      },
      data: {
        labels: labels,
        datasets: [
          {
            data: points // [3, 5, 6, 3, 4],
          },
        ]
      },
      // options: options
  });
  // console.log('data: ', data);
});
