document.addEventListener('DOMContentLoaded', () => {
    const seedContainer = document.getElementById('seed-container');
    const seed = document.getElementById('seed');
    const instruction = document.getElementById('instruction');
    const svgNS = "http://www.w3.org/2000/svg";
    const bloomSvg = document.getElementById('bloom-svg');
    const svgWidth = 800; // viewBox width
    const svgHeight = 600; // viewBox height
    const centerX = svgWidth / 2;
    const centerY = svgHeight / 2;

    let isBlooming = false;

    const colors = [
        // Cool palette
        { fill: 'rgba(100, 150, 255, 0.3)', stroke: 'rgba(180, 220, 255, 0.8)' }, // Sky Blue
        { fill: 'rgba(150, 100, 255, 0.3)', stroke: 'rgba(200, 180, 255, 0.8)' }, // Lavender
        { fill: 'rgba(100, 200, 200, 0.3)', stroke: 'rgba(180, 230, 230, 0.8)' }, // Teal
        // Warm palette
        { fill: 'rgba(255, 150, 100, 0.3)', stroke: 'rgba(255, 200, 180, 0.8)' }, // Peach
        { fill: 'rgba(255, 100, 150, 0.3)', stroke: 'rgba(255, 180, 200, 0.8)' }, // Rose
        { fill: 'rgba(255, 220, 100, 0.3)', stroke: 'rgba(255, 240, 180, 0.8)' }  // Gold
    ];

    function getRandomElement(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    function createPetal(angle, length, color) {
        const petal = document.createElementNS(svgNS, 'path');
        petal.setAttribute('class', 'petal');
        // Basic teardrop shape. For more complex, you'd use more curve commands.
        // M = moveto, Q = quadratic bezier, L = lineto, Z = close path
        const halfWidth = length / 4 + (Math.random() * length / 8); // variable width
        const d = `M ${centerX},${centerY} Q ${centerX + halfWidth * Math.cos(angle - Math.PI / 16)},${centerY + halfWidth * Math.sin(angle - Math.PI / 16)} ${centerX + length * Math.cos(angle)},${centerY + length * Math.sin(angle)} Q ${centerX + halfWidth * Math.cos(angle + Math.PI / 16)},${centerY + halfWidth * Math.sin(angle + Math.PI / 16)} ${centerX},${centerY} Z`;
        
        petal.setAttribute('d', d);
        petal.style.fill = color.fill;
        petal.style.stroke = color.stroke;
        petal.style.transformOrigin = `${centerX}px ${centerY}px`;
        petal.style.transform = `rotate(${ (angle * 180 / Math.PI) -90 }deg) scale(0.1)`; // Initial small state
        petal.style.opacity = '0';

        return petal;
    }

    function createSpark(x, y) {
        const spark = document.createElementNS(svgNS, 'circle');
        spark.setAttribute('class', 'spark');
        spark.setAttribute('cx', x);
        spark.setAttribute('cy', y);
        spark.setAttribute('r', Math.random() * 2 + 1); // Random radius 1-3
        spark.style.fill = `rgba(255, 255, ${200 + Math.random() * 55}, ${0.5 + Math.random() * 0.5})`; // White with yellow/blue tint
        return spark;
    }

    function triggerBloom() {
        if (isBlooming) return;
        isBlooming = true;

        seedContainer.style.display = 'none';
        instruction.classList.add('hidden');
        bloomSvg.innerHTML = ''; // Clear previous bloom

        const numPetals = 6 + Math.floor(Math.random() * 7); // 6 to 12 petals
        const baseLength = 150 + Math.random() * 100; // Base petal length
        const bloomDuration = 2500 + Math.random() * 1000; // Duration of bloom animation
        const holdDuration = 2000 + Math.random() * 1000; // How long to show fully bloomed
        const fadeDuration = 2000;

        const chosenColor = getRandomElement(colors);

        for (let i = 0; i < numPetals; i++) {
            const angle = (i / numPetals) * 2 * Math.PI;
            const petalLength = baseLength * (0.8 + Math.random() * 0.4); // Vary petal length
            const petal = createPetal(angle, petalLength, chosenColor);
            bloomSvg.appendChild(petal);

            // Animate petal
            setTimeout(() => {
                petal.style.transform = `rotate(${ (angle * 180 / Math.PI) - 90}deg) scale(1)`;
                petal.style.opacity = '1';
                petal.style.fillOpacity = '0.3'; // More opaque when bloomed
                petal.style.strokeOpacity = '0.9';
            }, 50 + i * 50 + Math.random() * 200); // Stagger animation

            // Add sparks at petal tips
            setTimeout(() => {
                const tipX = centerX + petalLength * Math.cos(angle);
                const tipY = centerY + petalLength * Math.sin(angle);
                for(let k=0; k < 3; k++) { // A few sparks per petal tip
                    const spark = createSpark(tipX + (Math.random()-0.5)*20, tipY + (Math.random()-0.5)*20);
                    bloomSvg.appendChild(spark);
                    setTimeout(() => spark.remove(), 1500); // Spark life
                }
            }, bloomDuration * 0.6 + i * 30);
        }

        // Fade out and reset
        setTimeout(() => {
            const petals = bloomSvg.querySelectorAll('.petal');
            petals.forEach((petal, index) => {
                setTimeout(() => {
                    petal.style.opacity = '0';
                    petal.style.transform = `rotate(${ (petal.angle * 180 / Math.PI) - 90 }deg) scale(0.8) translate(0px, 50px)`; // Gently fall and fade
                }, index * 30); // Stagger fade out
            });

            setTimeout(() => {
                bloomSvg.innerHTML = ''; // Clear after fade
                seedContainer.style.display = 'flex';
                instruction.classList.remove('hidden');
                isBlooming = false;
            }, fadeDuration + numPetals * 30);

        }, bloomDuration + holdDuration);
    }

    seedContainer.addEventListener('click', triggerBloom);

    // Initial welcome pulse for instruction
    setTimeout(() => instruction.style.opacity = '1', 500);
});