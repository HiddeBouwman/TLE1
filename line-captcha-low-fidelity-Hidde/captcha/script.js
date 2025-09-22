const canvas = document.getElementById('captchaCanvas');
const ctx = canvas.getContext('2d');
const newLineButton = document.getElementById('newLineButton');
const statusMessage = document.getElementById('statusMessage');

let generatedLine = [];
let userLine = [];
let drawing = false;

// Draw a grid background on the canvas
function drawGrid() {
    const gridSize = 20; // Size of each grid square
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.strokeStyle = '#e0e0e0'; // Light gray color for the grid
    ctx.lineWidth = 0.5;

    // Draw vertical lines
    for (let x = 0; x <= canvas.width; x += gridSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
    }

    // Draw horizontal lines
    for (let y = 0; y <= canvas.height; y += gridSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
    }

    ctx.stroke();
}

// Generate a random line using a mathematical formula
function generateLine() {
    generatedLine = [];
    drawGrid(); // Draw the grid before generating the line

    ctx.beginPath();

    // Randomize starting point with a margin from the top and bottom
    const margin = 50; // Minimum margin from the top and bottom of the canvas
    const startX = 50;
    const startY = Math.random() * (canvas.height - 2 * margin) + margin;

    let currentX = startX;
    let currentY = startY;

    while (currentX <= canvas.width - 50) {
        const segmentLength = Math.random() * 50 + 50; // Random segment length between 50 and 100
        const segmentType = Math.random(); // Randomly decide the type of segment

        if (segmentType < 0.5) {
            // Generate a sine wave segment
            const amplitude = Math.random() * 100 + 50; // Increased amplitude for more verticality
            const frequency = Math.random() * 0.1 + 0.05; // Random frequency
            const phaseShift = Math.random() * Math.PI * 2; // Random phase shift

            for (let x = currentX; x < currentX + segmentLength && x <= canvas.width - 50; x += 10) {
                let y = currentY + amplitude * Math.sin(frequency * (x - currentX) + phaseShift);
                y = Math.max(margin, Math.min(canvas.height - margin, y)); // Ensure y stays within the margin
                generatedLine.push({ x, y });
            }

            currentX += segmentLength;
        } else {
            // Generate a vertical line segment
            let verticalShift = Math.random() * 100 - 50; // Random vertical shift
            verticalShift = Math.max(-currentY + margin, Math.min(canvas.height - margin - currentY, verticalShift));

            for (let x = currentX; x < currentX + segmentLength && x <= canvas.width - 50; x += 10) {
                const y = currentY + verticalShift;
                generatedLine.push({ x, y });
            }

            currentX += segmentLength;
            currentY += verticalShift;
        }
    }

    // Draw the actual line
    ctx.beginPath();
    ctx.moveTo(generatedLine[0].x, generatedLine[0].y);
    for (const point of generatedLine) {
        ctx.lineTo(point.x, point.y);
    }

    ctx.strokeStyle = 'blue';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw start and end points
    const startPoint = generatedLine[0];
    const endPoint = generatedLine[generatedLine.length - 1];

    ctx.fillStyle = 'green';
    ctx.beginPath();
    ctx.arc(startPoint.x, startPoint.y, 5, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.arc(endPoint.x, endPoint.y, 5, 0, Math.PI * 2);
    ctx.fill();
}

// Start drawing the user line
canvas.addEventListener('mousedown', (e) => {
    drawing = true;
    userLine = [];
    ctx.beginPath();
    ctx.moveTo(e.offsetX, e.offsetY);
    userLine.push({ x: e.offsetX, y: e.offsetY, timestamp: Date.now() });
});

// Draw the user line
canvas.addEventListener('mousemove', (e) => {
    if (!drawing) return;

    const x = e.offsetX;
    const y = e.offsetY;
    userLine.push({ x, y, timestamp: Date.now() });

    ctx.lineTo(x, y);
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 2;
    ctx.stroke();
});

// Stop drawing and validate the line
canvas.addEventListener('mouseup', () => {
    drawing = false;
    validateLine();
});

// Redirect to the destination page if the captcha is passed
// Adjust the validateLine function to allow drawing in reverse order
function validateLine() {
    let valid = true;
    let failureReason = '';
    const margin = 15; // Slightly increase margin for leniency

    if (userLine.length < generatedLine.length) {
        valid = false;
        failureReason = 'You did not complete the line.';
    } else {
        let totalDistance = 0;
        let pointCount = 0;

        // Helper function to calculate the average distance
        function calculateAverageDistance(line1, line2) {
            let totalDistance = 0;
            let pointCount = 0;

            for (let i = 0; i < line1.length; i++) {
                const genPoint = line1[i];

                // Find the closest user point to the current generated point
                let minDistance = Infinity;
                for (let j = 0; j < line2.length; j++) {
                    const userPoint = line2[j];

                    const distance = Math.sqrt(
                        Math.pow(genPoint.x - userPoint.x, 2) +
                        Math.pow(genPoint.y - userPoint.y, 2)
                    );

                    if (distance < minDistance) {
                        minDistance = distance;
                    }
                }

                totalDistance += minDistance;
                pointCount++;

                if (minDistance > margin * 2) { // Allow slightly more deviation for individual points
                    return { valid: false, totalDistance: 0, pointCount: 0 };
                }
            }

            return { valid: true, totalDistance, pointCount };
        }

        // Check both the original and reversed order
        const forwardCheck = calculateAverageDistance(generatedLine, userLine);
        const reverseCheck = calculateAverageDistance(generatedLine, userLine.slice().reverse());

        if (forwardCheck.valid) {
            totalDistance = forwardCheck.totalDistance;
            pointCount = forwardCheck.pointCount;
        } else if (reverseCheck.valid) {
            totalDistance = reverseCheck.totalDistance;
            pointCount = reverseCheck.pointCount;
        } else {
            valid = false;
            failureReason = 'Your drawing deviated too far from the line.';
        }

        if (valid) {
            const averageDistance = totalDistance / pointCount;
            if (averageDistance > margin) {
                valid = false;
                failureReason = `Your average distance from the line was too far (${averageDistance.toFixed(2)}px).`;
            }
        }
    }

    // Check drawing speed
    const drawingTime = userLine.length > 1 ? userLine[userLine.length - 1].timestamp - userLine[0].timestamp : 0;
    if (drawingTime < 500) { // Allow slightly faster drawing
        valid = false;
        failureReason = 'You drew the line too quickly.';
    }

    if (valid) {
        statusMessage.textContent = 'Captcha passed! Redirecting...';
        statusMessage.style.color = 'green';

        // Redirect to the destination URL, fallback naar index
        setTimeout(function() {
            if (window.destinationUrl && window.destinationUrl.trim() !== '') {
                window.location.href = window.destinationUrl;
            } else {
                window.location.href = '../youtube-ripoff/index.html';
            }
        }, 800);
    } else {
        statusMessage.textContent = `Captcha failed. ${failureReason}`;
        statusMessage.style.color = 'red';
        generateLine();
    }
}

// Generate a new line when the button is clicked
newLineButton.addEventListener('click', generateLine);

// Generate the initial line
generateLine();

// Function to open the modal
function openCaptchaModal() {
    document.getElementById('captchaModal').style.display = 'flex';
}

// Function to close the modal
function closeCaptchaModal() {
    document.getElementById('captchaModal').style.display = 'none';
}

// Automatically open the modal for demonstration
openCaptchaModal();

// Retrieve the destination URL from the query parameter
const urlParams = new URLSearchParams(window.location.search);
const destination = urlParams.get('destination');

// Pass the destination URL to the script
window.destinationUrl = destination;
