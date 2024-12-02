console.log("JS Began"); // https://www.w3schools.com/ai/ai_chartjs.asp

// MODAL DEFINITIONS
var settingsModal = document.getElementById("settings-menu-modal")
var settingsModalButton = document.getElementById("settings-modal-button")
var settingsModalCloseButton = document.getElementById("settings-menu-close-button")

settingsModalButton.onclick = function() { // open modal when user clicks button
    settingsModal.style.display = "block";
}
settingsModalCloseButton.onclick = function() { // close modal if user clicks x
    settingsModal.style.display = "none";
}
window.onclick = function(event) { // close modal if user clicks outside content
    if (event.target == settingsModal) {
        settingsModal.style.display = "none";
    }
}
  



Chart.defaults.animation = false; // disable chart.js animations

// DEFINE CHART DATA ARRAYS
var wheelRPMDataY = [];
var wheelRPMDataX = [];
var speedDataY = [];
var speedDataX = [];
var batteryVoltageY = []
var batteryVoltageX = [];
var motorVoltageY = []
var motorVoltageX = [];
var shuntAmperageY = []
var shuntAmperageX = [];

// DEFINE CHART CONSTANTS
let wheelRPMChart, speedChart, batteryVoltageChart, motorVoltageChart, shuntAmperageChart;

// DEFINE UPTIME CONSTANTS
let secondsRunning = 0;
let minutesRunning = 0;
let hoursRunning = 0;

function define_charts() {
    // WHEEL RPM CHART
    wheelRPMChart = new Chart("wheel-rpm-chart", {
        type: "line",
        data: {
            labels: wheelRPMDataX,
            datasets: [{
                fill: false,
                lineTension: 0,
                backgroundColor: "rgba(255,255,255,1.0)",
                borderColor: "rgba(255,255,255,0.5)",
                data: wheelRPMDataY
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

    // Speed Chart
    speedChart = new Chart("speed-chart", {
        type: "line",
        data: {
            labels: speedDataX,
            datasets: [{
                fill: false,
                lineTension: 0,
                backgroundColor: "rgba(255,255,255,1.0)",
                borderColor: "rgba(255,255,255,0.5)",
                data: speedDataY
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
                        labelString: 'Speed (km/h)',
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

    // Battery voltage chart
    batteryVoltageChart = new Chart("battery-voltage-chart", {
        type: "line",
        data: {
            labels: batteryVoltageX,
            datasets: [{
                fill: false,
                lineTension: 0,
                backgroundColor: "rgba(255,255,255,1.0)",
                borderColor: "rgba(255,255,255,0.5)",
                data: batteryVoltageY
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
                        labelString: 'Voltage (V)',
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

    // motor voltage chart
    motorVoltageChart = new Chart("motor-voltage-chart", {
        type: "line",
        data: {
            labels: motorVoltageX,
            datasets: [{
                fill: false,
                lineTension: 0,
                backgroundColor: "rgba(255,255,255,1.0)",
                borderColor: "rgba(255,255,255,0.5)",
                data: motorVoltageY
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
                        labelString: 'Voltage (V)',
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

    // shunt amperage
    shuntAmperageChart = new Chart("amperage-chart", {
        type: "line",
        data: {
            labels: shuntAmperageX,
            datasets: [{
                fill: false,
                lineTension: 0,
                backgroundColor: "rgba(255,255,255,1.0)",
                borderColor: "rgba(255,255,255,0.5)",
                data: shuntAmperageY
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
                        labelString: 'Amperage (A)',
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
define_charts();

function update_line_graph_X() {
    for (var i = wheelRPMDataX.length + 1; i <= wheelRPMDataY.length; i++) {
        wheelRPMDataX.push(i);
    }
    for (var i = speedDataX.length + 1; i <= speedDataY.length; i++) {
        speedDataX.push(i);
    }
    for (var i = batteryVoltageX.length + 1; i <= batteryVoltageY.length; i++) {
        batteryVoltageX.push(i);
    }
    for (var i = motorVoltageX.length + 1; i <= motorVoltageY.length; i++) {
        motorVoltageX.push(i);
    }
    for (var i = shuntAmperageX.length + 1; i <= shuntAmperageY.length; i++) {
        shuntAmperageX.push(i);
    }
};


function updateUptimeCounter() {
    secondsRunning++;

    if (secondsRunning === 60) {
        minutesRunning++;
        secondsRunning = 0;
    }

    if (minutesRunning === 60) {
        hoursRunning++;
        minutesRunning = 0;
    }

    // Formatting the time to display as "minutes:seconds"
    const formattedTime = 'Uptime: ' + hoursRunning + ':' + minutesRunning + ':' + (secondsRunning < 10 ? '0' : '') + secondsRunning;

    // Display the updated time in the HTML
    document.getElementById('uptime-counter').textContent = formattedTime;
}

var pythonWebSocket = io();

// Listen for 'updateData' events from the server
pythonWebSocket.on('updateData', function(data) {
    // set update time
    var dateObject = new Date(data.time * 1000);
    var lastUpdatedTime = dateObject.toLocaleString();
    document.getElementById('last-data-update-text').textContent = `Data last updated at: ${lastUpdatedTime}`
    // set text elements to new data
    document.getElementById('wheel-rpm-text').textContent = `Wheel RPM: ${data.wheelRPM}`;
    document.getElementById('speed-text').textContent = `Speed:${data.speed}`;
    document.getElementById('battery-voltage-text').textContent = `Battery Voltage: ${data.batteryVoltage}`;
    document.getElementById('motor-voltage-text').textContent = `Motor Voltage: ${data.motorVoltage}`;
    document.getElementById('shunt-amperage-text').textContent = `Shunt Amperage: ${data.shuntAmperage}`;

    // add data to charts dataset, update X axes
    wheelRPMDataY.push(data.wheelRPM);
    speedDataY.push(data.speed);
    batteryVoltageY.push(data.batteryVoltage);
    motorVoltageY.push(data.motorVoltage);
    shuntAmperageY.push(data.shuntAmperage);


    // update charts
    wheelRPMChart.update({duration: 0});
    speedChart.update({duration: 0});
    batteryVoltageChart.update({duration: 0});
    motorVoltageChart.update({duration: 0});
    shuntAmperageChart.update({duration: 0});

    // send updates to user
    update_line_graph_X();
});

setInterval(updateUptimeCounter, 1000);

// Maximize charts
document.getElementById("wheel-rpm-chart-min-max-button").addEventListener("click", function (event) {
    event.preventDefault();
    
    const chartContainer = document.getElementById("wheel-rpm-chart-container");
    chartContainer.classList.remove("individual-chart-container");
    chartContainer.classList.add("maximized-chart-container")
});
document.getElementById("speed-chart-min-max-button").addEventListener("click", function (event) {
    event.preventDefault();
    
    const chartContainer = document.getElementById("speed-chart-container");
    chartContainer.classList.remove("individual-chart-container");
    chartContainer.classList.add("maximized-chart-container")
});
document.getElementById("battery-voltage-chart-min-max-button").addEventListener("click", function (event) {
    event.preventDefault();
    
    const chartContainer = document.getElementById("battery-voltage-chart-container");
    chartContainer.classList.remove("individual-chart-container");
    chartContainer.classList.add("maximized-chart-container")
});
document.getElementById("motor-voltage-chart-min-max-button").addEventListener("click", function (event) {
    event.preventDefault();
    
    const chartContainer = document.getElementById("motor-voltage-chart-container");
    chartContainer.classList.remove("individual-chart-container");
    chartContainer.classList.add("maximized-chart-container")
});
document.getElementById("shunt-amperage-chart-min-max-button").addEventListener("click", function (event) {
    event.preventDefault();
    
    const chartContainer = document.getElementById("amperage-chart-container");
    chartContainer.classList.remove("individual-chart-container");
    chartContainer.classList.add("maximized-chart-container")
});