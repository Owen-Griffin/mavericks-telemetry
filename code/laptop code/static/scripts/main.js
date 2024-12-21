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

// DEFINE FULL READING ARRAYS
var wheelRPMReadings = [];
var speedReadings = [];
var batteryVoltageRPMReadings = [];
var motorVoltageReadings = [];
var shuntAmperageReadings = [];

// DEFINE CHART CONSTANTS
let wheelRPMChart, speedChart, batteryVoltageChart, motorVoltageChart, shuntAmperageChart;

// DEFINE UPTIME CONSTANTS
let secondsRunning = 0;
let minutesRunning = 0;
let hoursRunning = 0;

function trim_list_to_max(list, maxItems) {
    if(list.length > maxItems) {
        list = list.slice(-maxItems);
    }
    return list
}

function create_chart_x_length(targetLength) {
    return Array.from({ length: targetLength }, (v, i) => i + 1);
}

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
setInterval(updateUptimeCounter, 1000); // Update runtime counter
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

    // add data to charts dataset
    wheelRPMDataY.push(data.wheelRPM);
    speedDataY.push(data.speed);
    batteryVoltageY.push(data.batteryVoltage);
    motorVoltageY.push(data.motorVoltage);
    shuntAmperageY.push(data.shuntAmperage);

    // add data to full readings arrays
    wheelRPMReadings.push(data.wheelRPM);
    speedReadings.push(data.speed);
    batteryVoltageRPMReadings.push(data.batteryVoltage);
    motorVoltageReadings.push(data.motorVoltage);
    shuntAmperageReadings.push(data.shuntAmperage);

    // UPDATE CHARTS ----------------------------

    // trim to max point length from settings
    const maxPoints = parseInt(document.getElementById("number-of-data-points-on-charts").value)
    if(maxPoints != 0 && !isNaN(maxPoints)) {
        wheelRPMDataY = trim_list_to_max(wheelRPMDataY, maxPoints);
        speedDataY = trim_list_to_max(speedDataY, maxPoints);
        batteryVoltageY = trim_list_to_max(batteryVoltageY, maxPoints);
        motorVoltageY = trim_list_to_max(motorVoltageY, maxPoints);
        shuntAmperageY = trim_list_to_max(shuntAmperageY, maxPoints);
    }
    // create labels
    wheelRPMDataX = create_chart_x_length(wheelRPMDataY.length);
    speedDataX = create_chart_x_length(speedDataY.length);
    batteryVoltageX = create_chart_x_length(batteryVoltageY.length);
    motorVoltageX = create_chart_x_length(motorVoltageY.length);
    shuntAmperageX = create_chart_x_length(shuntAmperageY.length);
    
    // update charts
    wheelRPMChart.data.labels = wheelRPMDataX;
    wheelRPMChart.data.datasets[0].data = wheelRPMDataY;
    speedChart.data.labels = speedDataX;
    speedChart.data.datasets[0].data = speedDataY;
    batteryVoltageChart.data.labels = batteryVoltageX;
    batteryVoltageChart.data.datasets[0].data = batteryVoltageY;
    motorVoltageChart.data.labels = motorVoltageX;
    motorVoltageChart.data.datasets[0].data = motorVoltageY;
    shuntAmperageChart.data.labels = shuntAmperageX;
    shuntAmperageChart.data.datasets[0].data = shuntAmperageY;

    wheelRPMChart.update({duration: 0});
    speedChart.update({duration: 0});
    batteryVoltageChart.update({duration: 0});
    motorVoltageChart.update({duration: 0});
    shuntAmperageChart.update({duration: 0});
});

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