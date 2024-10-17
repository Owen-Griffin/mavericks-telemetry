console.log("Loaded"); // https://www.w3schools.com/ai/ai_chartjs.asp

var wheelRPMExampleDataY = [0, 0, 0, 0, 2, 5, 10, 12, 13, 17, 2, 0]
var wheelRPMExampleDataX = [];
for (var i = 1; i <= wheelRPMExampleDataY.length; i++) {
    wheelRPMExampleDataX.push(i);
}
console.log(wheelRPMExampleDataX)


function defineCharts() {
    // WHEEL RPM CHART
    const wheelRPMChart = new Chart("wheel-rpm-chart", {
        type: "line",
        data: {
            labels: wheelRPMExampleDataX,
            datasets: [{
                fill: false,
                lineTension: 0,
                backgroundColor: "rgba(255,255,255,1.0)",
                borderColor: "rgba(255,255,255,0.5)",
                data: wheelRPMExampleDataY
            }]
        },
        options: {
            legend: {display: false},
            scales: {
                yAxes: [{
                    ticks: {
                        fontColor: "#ffffff"
                    }, 
                    scaleLabel: {
                        display: true,
                        labelString: 'RPM',
                        fontColor: "#ffffff"
                    },
                    gridLines: {
                        color: "ffffff"
                    }
                }], 
                xAxes: [{
                    ticks: {
                        fontColor: "#ffffff"
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Reading #',
                        fontColor: "#ffffff"
                    },
                    gridLines: {
                        color: "ffffff"
                    }
                }]
            }
        }
    });
};

defineCharts()