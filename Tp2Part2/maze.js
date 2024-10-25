// Wait for the document to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
    const boundaries = document.querySelectorAll('.boundary');
    const start = document.getElementById('start');
    const end = document.getElementById('end');
    const status = document.getElementById('status');

    let gameActive = false; // Track if the game is active

    // Function to turn all boundaries red
    function turnAllRed() {
        boundaries.forEach(boundary => {
            boundary.classList.add('youlose');
            boundary.style.backgroundColor = '#ff8888'; // Change to red
        });
        status.textContent = "You lose! Click 'S' to restart.";
        gameActive = false; // End the game
    }

    // Function to handle boundary mouseover
    function handleMouseOver() {
        if (gameActive) {
            turnAllRed();
        }
    }

    // Function to handle reaching the end
    function handleEndMouseOver() {
        if (gameActive) {
            let hasLost = false;

            // Check if any boundary is red
            boundaries.forEach(boundary => {
                if (boundary.style.backgroundColor === 'rgb(255, 136, 136)') { // '#ff8888' in RGB
                    hasLost = true;
                }
            });

            if (hasLost) {
                status.textContent = "You lose!";
            } else {
                status.textContent = "You win!";
            }
            gameActive = false; // End the game
        }
    }

    // Function to reset the maze
    function resetMaze() {
        boundaries.forEach(boundary => {
            boundary.classList.remove('youlose');
            boundary.style.backgroundColor = '#eeeeee'; // Reset to original color
        });
        status.textContent = "Move your mouse over the 'S' to begin.";
        gameActive = false; // Reset the game state
    }

    // Add mouseover event to each boundary
    boundaries.forEach(boundary => {
        boundary.addEventListener('mouseover', handleMouseOver);
    });

    // Add mouseover event to the end element
    end.addEventListener('mouseover', handleEndMouseOver);

    // Add click event to the start element to reset the maze
    start.addEventListener('click', function () {
        resetMaze();
        gameActive = true; // Start the game
        status.textContent = "Game started! Avoid the walls.";
    });

    // Monitor mouse movement outside the maze
    document.addEventListener('mousemove', function (event) {
        const maze = document.getElementById('maze');
        const mazeRect = maze.getBoundingClientRect();

        // Check if the mouse is outside the maze
        if (gameActive && (event.clientX < mazeRect.left ||
            event.clientX > mazeRect.right ||
            event.clientY < mazeRect.top ||
            event.clientY > mazeRect.bottom)) {
            turnAllRed(); // Turn boundaries red if outside
        }
    });
});
