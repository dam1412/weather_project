document.addEventListener('DOMContentLoaded',() => {
    // Temp
    const chartTempElement= document.getElementById('chart-temperature');
    if (!chartTempElement) {
        console.error('Canvas Element Temperture not found.');
        return;
    }

    const ctxTemp=chartTempElement.getContext('2d');
    const gradient=ctxTemp.createLinearGradient(0, -10, 0, 100);
    gradient.addColorStop(0,'rgba(255,0,0,1)');
    gradient.addColorStop(1,'rgba(136,255,0,1)');

    //forecast item
    const forecastItems = document.querySelectorAll('.forecast-item');
    
    const temps=[];
    const times=[];
    const hums = [];

    forecastItems.forEach(item =>{
        const time=item.querySelector('.forecast-time').textContent;
        const temp=item.querySelector('.forecast-temperatureValue').textContent;
        const hum=item.querySelector('.forecast-humidityValue').textContent;

        if (time && temp && hum) {
            times.push(time);
            temps.push(temp);
            hums.push(hum);
        }
    });

    if (temps.length === 0 || times.length === 0 || hums.length === 0) {
        console.error('Temp or time or humhum values are missing.');
        return;
    }

    const Tempchart=new Chart(ctxTemp, {
        type: 'line',
        data: {
            labels: times,
            datasets: [
                {
                    label: 'Celsius Degrees',
                    data: temps,
                    borderColor: gradient,
                    borderWidth: 2,
                    tension: 0.4,
                    pointRadius: 2,
                },
            ],
        },
        options: {
            plugins:{
                legend: {
                    display: false,
                },
            },
            scales: {
                x: {
                    display: false,
                    grid: {
                        drawOnChartArea: false,
                    },
                },
                y: {
                    display: false,
                    grid: {
                        drawOnChartArea: false,
                    },
                },
            },
            animation: {
                duration: 750,

            },
        },
    });
    // Hum
    const chartHumElement= document.getElementById('chart-humidity');
    if (!chartHumElement) {
        console.error('Canvas Element Humidity not found.');
        return;
    }
    const ctxHum = chartHumElement.getContext('2d');
    const Humchart= new Chart(ctxHum, {
        type: 'bar',
        data: {
            labels: times, 
            datasets: [{
                label: 'Humidity (%)',
                data: hums,
                backgroundColor: 'rgba(0, 123, 255, 0.6)', 
                borderColor: 'rgba(0, 123, 255, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: { 
                y: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        stepSize: 100,
                        callback: function(value) {
                            return value + '%';
                        }
                    },
                    grid: {
                        color: 'rgba(12, 12, 12, 0.7)',
                        lineWidth: 1,
                        drawBorder: false, 
                    }
                    
                },
                x: {
                    ticks: {
                        color: '#ffffff'
                    },
                    grid: {
                        color: 'rgba(12, 12, 12, 0.7)',
                        lineWidth: 1,
                        drawBorder: false,
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });

});