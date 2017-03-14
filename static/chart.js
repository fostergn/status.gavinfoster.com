var iframe = document.getElementById('video-stream');

var params = {
    api_key: 'u413851-fe06191fa195a5841a40c089',
    monitors: '778643699',
    response_times: 1,
};

var points = [];
var labels = [];

$.post('https://api.uptimerobot.com/v2/getMonitors', params, function(response, err){
  var monitor = response.monitors[0];
  monitor.response_times.slice(0,20).map(function(response, index){
    points.unshift(response.value);
    labels.unshift(moment(response.datetime * 1000).format('h:mm a'))
  });
  var ctx = document.getElementById('status-chart').getContext('2d');
  var myLineChart = new Chart(ctx, {
      type: 'line',
      options: {
        lineWidth:4,
        fill:true,
        backgroundColor: 'rgba(0,255,0,1)',
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [{
            ticks: {
              suggestedMin: 0,
              maxTicksLimit: 3,
            },
          }],
          xAxes: [{
              ticks: {
                  fontSize: 10,
                  maxTicksLimit: 7,
                  maxRotation: 0,
              }
          }]
        },
        showYLabels: 2,
      },
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Response Time (ms)',
            data: points,
            backgroundColor: 'rgba(0,255,0,.5)',
          },
        ]
      },
  });
});
