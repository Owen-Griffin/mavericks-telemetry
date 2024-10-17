console.log("Loaded"); // https://www.w3schools.com/ai/ai_chartjs.asp

var wheelRPMExampleDataY = [0, 0, 0, 0, 2, 5, 10, 12, 13, 17, 2, 0]
var wheelRPMExampleDataX = [];
for (var i = 1; i <= wheelRPMExampleDataY.length; i++) {
    wheelRPMExampleDataX.push(i);
}
console.log(wheelRPMExampleDataX)



// WHEEL RPM CHART
const wheelRPMChart = new Chart("wheel-rpm-chart", {
    type: "line",
    data: {
        labels: wheelRPMExampleDataX,
        datasets: [{
            fill: false,
            lineTension: 0,
            backgroundColor: "rgba(0,0,255,1.0)",
            borderColor: "rgba(0,0,255,0.1)",
            data: wheelRPMExampleDataY
        }]
    },
    options: {
        legend: {display: false},
        scales: {
            yAxes: [{
                ticks: {min: 0, max: 50}, 
                scaleLabel: {
                    display: true,
                    labelString: 'RPM'
                }
            }], 
            xAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'Reading'
                }
            }]
        }
    }
  });