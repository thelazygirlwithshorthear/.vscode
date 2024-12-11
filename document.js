document.addEventListener('DOMContentLoaded', function() {
    const formulas = [
        {
            name: "Newton's Second Law",
            formula: "F = ma",
            description: "Force equals mass times acceleration."
        },
        {
            name: "Kinetic Energy",
            formula: "KE = 0.5 * m * v^2",
            description: "The kinetic energy of an object is half its mass times the square of its velocity."
        }
    ];
    
    const facts = [
        "Light from the Sun takes about 8 minutes and 20 seconds to reach Earth.",
        "The speed of light in a vacuum is approximately 299,792 kilometers per second."
    ];
    
    const formulaSection = document.getElementById('formulas');
    formulas.forEach(f => {
        const formulaElement = document.createElement('div');
        formulaElement.innerHTML = `<h3>${f.name}</h3><p>${f.formula}</p><p>${f.description}</p>`;
        formulaSection.appendChild(formulaElement);
    });
    
    const factSection = document.getElementById('facts');
    facts.forEach(f => {
        const factElement = document.createElement('p');
        factElement.textContent = f;
        factSection.appendChild(factElement);
    });
});
