console.log("Loaded"); // https://www.w3schools.com/ai/ai_chartjs.asp

var wheelRPMDataY = [0, 0, 0, 0, 2, 5, 10, 12, 13, 17, 2, 0];
var wheelRPMDataX = [];
for (var i = 1; i <= wheelRPMDataY.length; i++) {
    wheelRPMDataX.push(i);
};

var speedDataY = [0, 0, 0, 0, 10, 14, 18, 20, 19, 2, 0];
var speedDataX = [];
for (var i = 1; i <= speedDataY.length; i++) {
    speedDataX.push(i);
};

var batteryVoltageY = [13.34, 13.33, 13.29, 12.91, 12.87, 12.65, 12.51, 11.23]
var batteryVoltageX = [];
for (var i = 1; i <= batteryVoltageY.length; i++) {
    batteryVoltageX.push(i);
};

var motorVoltageY = [13.34, 13.33, 13.29, 12.91, 12.87, 12.65, 12.51, 11.23]
var motorVoltageX = [];
for (var i = 1; i <= motorVoltageY.length; i++) {
    motorVoltageX.push(i);
};

var shuntAmperageY = [85, 84, 82, 81, 75, 50]
var shuntAmperageX = [];
for (var i = 1; i <= shuntAmperageY.length; i++) {
    shuntAmperageX.push(i);
};




function defineCharts() {
    // WHEEL RPM CHART
    const wheelRPMChart = new Chart("wheel-rpm-chart", {
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
    const speedChart = new Chart("speed-chart", {
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
    const batterVoltageChart = new Chart("battery-voltage-chart", {
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
    const motorVoltageChart = new Chart("motor-voltage-chart", {
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
    const shuntAmperageChart = new Chart("amperage-chart", {
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

defineCharts()