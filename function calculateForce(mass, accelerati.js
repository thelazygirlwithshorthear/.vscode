function calculateForce(mass, acceleration) {
    return mass * acceleration;
}

document.addEventListener('DOMContentLoaded', function() {
    const calculatorSection = document.getElementById('calculators');
    
    const calculatorForm = document.createElement('form');
    calculatorForm.innerHTML = `
        <h3>Calculate Force</h3>
        <label for="mass">Mass (kg):</label>
        <input type="number" id="mass" name="mass" required>.
        <label for="acceleration">Acceleration (m/s²):</label>
        <input type="number" id="acceleration" name="acceleration" required>
        <button type="submit">Calculate</button>
        <p id="result"></p>
    `;
    
    calculatorSection.appendChild(calculatorForm);
    
    calculatorForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const mass = parseFloat(document.getElementById('mass').value);
        const acceleration = parseFloat(document.getElementById('acceleration').value);
        const result = calculateForce(mass, acceleration);
        document.getElementById('result').textContent = `Force: ${result} N`;
    });
});
