// Variables globales y constantes
let populationChart;
let pendulumChart;
let circuitChart;

// Funciones para inicializar gráficos
function setupCharts() {
    // Configurar Chart.js para los gráficos
    populationChart = new Chart(document.getElementById('simulationChart1').getContext('2d'), {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Población',
                data: [],
                backgroundColor: 'rgba(33, 150, 243, 0.5)',
                borderColor: 'rgba(33, 150, 243, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Tiempo'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Población'
                    }
                }
            }
        }
    });

    pendulumChart = new Chart(document.getElementById('simulationChart2').getContext('2d'), {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Ángulo del Péndulo',
                data: [],
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Tiempo (s)'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Ángulo (rad)'
                    }
                }
            }
        }
    });

    circuitChart = new Chart(document.getElementById('simulationChart3').getContext('2d'), {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Corriente Eléctrica',
                data: [],
                backgroundColor: 'rgba(75, 192, 192, 0.5)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Tiempo (s)'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Corriente (A)'
                    }
                }
            }
        }
    });
}

// Funciones para simular y graficar
function plotSimulation1() {
    // Simulación y graficación de crecimiento poblacional
    let years = [0, 1, 2, 3, 4, 5];
    let k = 0.05;
    let P0 = 100;
    let populationData = years.map(t => P0 * Math.exp(k * t));

    // Mostrar el cálculo detallado del ejemplo
    let example1 = `
        <h4>Ejemplo:</h4>
        <p>Si \(P_0 = 100\) y \(k = 0.05\), entonces:</p>
        <p>\(P(t) = 100 e^{0.05t}\)</p>
        <p>Resultados:</p>
        ${years.map(t => `<p>P(${t}) = ${P0 * Math.exp(k * t).toFixed(2)}</p>`).join('')}
    `;
    document.getElementById('example1').innerHTML = example1;

    populationChart.data.labels = years;
    populationChart.data.datasets[0].data = populationData;
    populationChart.update();
}

function plotSimulation2() {
    // Simulación y graficación de movimiento de péndulo
    let maxIterations = 100;
    let timeStep = 0.1;
    let results = [];

    let angle = Math.PI / 4;
    let velocity = 0;
    let g = 9.81;
    let l = 1;

    for (let i = 0; i < maxIterations; i++) {
        velocity += -g / l * Math.sin(angle) * timeStep; // Aceleración del péndulo
        angle += velocity * timeStep;

        results.push({ time: i * timeStep, angle: angle });
    }

    let labels = results.map(result => result.time.toFixed(1));
    let angles = results.map(result => result.angle.toFixed(2));

    // Mostrar el cálculo detallado del ejemplo
    let example2 = `
        <h4>Ejemplo:</h4>
        <p>Si \(\theta_0 = \frac{\pi}{4}\), \(g = 9.81\), y \(l = 1\), entonces:</p>
        <p>\(\theta(t) = \frac{\pi}{4} \cos(3.13t)\)</p>
        <p>Resultados:</p>
        ${results.map(result => `<p>t = ${result.time.toFixed(1)}, θ(t) = ${result.angle.toFixed(2)}</p>`).join('')}
    `;
    document.getElementById('example2').innerHTML = example2;

    pendulumChart.data.labels = labels;
    pendulumChart.data.datasets[0].data = angles;
    pendulumChart.update();
}

function plotSimulation3() {
    // Simulación y graficación de circuito eléctrico
    let maxTime = 5;
    let timeStep = 0.1;
    let results = [];

    let V = 12;
    let R = 100;
    let L = 0.5;

    for (let t = 0; t <= maxTime; t += timeStep) {
        let current = (V / R) * (1 - Math.exp(-R / L * t));
        results.push({ time: t.toFixed(1), current: current.toFixed(2) });
    }

    let labels = results.map(result => result.time);
    let currents = results.map(result => result.current);

    // Mostrar el cálculo detallado del ejemplo
    let example3 = `
        <h4>Ejemplo:</h4>
        <p>Si \(V = 12\) V, \(R = 100\) Ω, y \(L = 0.5\) H, entonces:</p>
        <p>\(i(t) = \frac{12}{100} (1 - e^{-200t})\)</p>
        <p>Resultados:</p>
        ${results.map(result => `<p>t = ${result.time}, i(t) = ${result.current}</p>`).join('')}
    `;
    document.getElementById('example3').innerHTML = example3;

    circuitChart.data.labels = labels;
    circuitChart.data.datasets[0].data = currents;
    circuitChart.update();
}

// Función para iniciar el juego de matemáticas
function startMathQuiz() {
    let num1 = Math.floor(Math.random() * 100);
    let num2 = Math.floor(Math.random() * 100);
    let answer = num1 + num2;

    document.getElementById('mathQuiz').innerHTML = `
        <h3>${num1} + ${num2} = ?</h3>
        <div class="quiz-options">
            <button onclick="checkAnswer(${answer})">${answer}</button>
            <button onclick="checkAnswer(${answer + 1})">${answer + 1}</button>
            <button onclick="checkAnswer(${answer - 1})">${answer - 1}</button>
        </div>
    `;
}

function checkAnswer(selectedAnswer) {
    let correctAnswer = document.querySelector('#mathQuiz h3').innerText.split(' + ').reduce((a, b) => parseInt(a) + parseInt(b));

    if (selectedAnswer == correctAnswer) {
        alert('¡Correcto! Eres increíble.');
    } else {
        alert('Incorrecto. Inténtalo de nuevo.');
    }

    startMathQuiz();
}

// Inicializar gráficos al cargar la página
window.onload = setupCharts;
