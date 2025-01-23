const directions = [
  [0, 1, "→"],
  [1, 0, "↓"],
  [0, -1, "←"],
  [-1, 0, "↑"],
];
let maze = [];
let start = null;
let end = null;
let totalObstacleCount = 0;
let obstaclePlacedCount = 0;
let stack = [];
let visited = new Set();
let path = {};
let isPaused = false;
let isPathfinding = false;

//Function for generating Grid as dimentions given by user
const generateGrid = () => {
  maze = [];
  start = null;
  end = null;
  totalObstacleCount = 0;
  obstaclePlacedCount = 0;
  stack = [];
  visited = new Set();
  path = {};
  isPaused = false;
  isPathfinding = false;

  document.getElementById("message").innerText = ""; // Clear victory message
  const rows = parseInt(document.getElementById("rows").value);
  const cols = parseInt(document.getElementById("cols").value);
  totalObstacleCount = parseInt(document.getElementById("obstacles").value);

  const mazeContainer = document.getElementById("maze");
  mazeContainer.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
  mazeContainer.innerHTML = "";

  maze = Array.from({ length: rows }, () => Array(cols).fill(0));
  start = end = null;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.row = r;
      cell.dataset.col = c;
      cell.onclick = () => toggleCell(r, c, cell);
      mazeContainer.appendChild(cell);
    }
  }
};

//Initialize data-structure for Path finding
const initializePathfinding = () => {
  stack = [[...start]];
  visited = new Set([`${start[0]},${start[1]}`]);
  path = {};
  isPaused = false;
  isPathfinding = true;
  document.getElementById("message").innerText = ""; // Clear any previous messages
};

//Function for mark source, destination points as well as Obstacles in Grid
const toggleCell = (row, col, cell) => {
  if (start === null) {
    start = [row, col];
    cell.classList.add("start");
    maze[row][col] = "S";
  } else if (end === null) {
    end = [row, col];
    cell.classList.add("end");
    maze[row][col] = "E";
  } else {
    if (maze[row][col] === 1) {
      maze[row][col] = 0;
      obstaclePlacedCount -= 1;
      cell.classList.remove("obstacle");
    } else {
      maze[row][col] = 1;
      obstaclePlacedCount += 1;
      cell.classList.add("obstacle");
    }
  }
};

//Function for find Path from Source to Destination point
const findPathStep = async () => {
  if (stack.length === 0 || !isPathfinding) {
    document.getElementById("message").innerText = "No path found!";
    return;
  }

  while (stack.length > 0 && !isPaused) {
    const [row, col] = stack.pop();

    for (let [dr, dc, arrow] of directions) {
      const newRow = row + dr;
      const newCol = col + dc;
      const key = `${newRow},${newCol}`;

      if (
        newRow >= 0 &&
        newRow < maze.length &&
        newCol >= 0 &&
        newCol < maze[0].length &&
        maze[newRow][newCol] !== 1 &&
        !visited.has(key)
      ) {
        stack.push([newRow, newCol]);
        visited.add(key);
        path[key] = { from: [row, col], direction: arrow };
        
        const cell = document.querySelector(
          `.cell[data-row="${newRow}"][data-col="${newCol}"]`
        );

        if (newRow === end[0] && newCol === end[1]) {
          cell.innerText = arrow;
          highlightPath(path);
          document.getElementById("message").innerText =
            "Victory! The rat has reached its destination!";
          return;
        }

        if (cell) {
          cell.innerText = arrow; // Show arrow
          cell.classList.add("path");
        }

        await delay(2000); // 2-second delay
      }
    }
  }
};

//Function for validation before starting Path find function
const startPathfinding = () => {
  if (!start || !end) {
    alert("Please set both start and end points in Grid");
    return;
  }

  if (totalObstacleCount != obstaclePlacedCount) {
    alert("Please set all Obstacles in Grid");
    return;
  }

  if (!isPathfinding) {
    initializePathfinding();
  }
  isPaused = false;
  findPathStep(); // Start or resume pathfinding
};

//Function for pause button
const pausePathfinding = () => {
  isPaused = true; // Just pause without clearing state
};

//Function for restart button
const restartPathfinding = () => {
  if (isPaused) {
    isPaused = false;
    findPathStep(); // Resume from where it was paused
  }
};

//Function for add delay
const delay = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

//Function for highlighting the path
const highlightPath = (path) => {
  let current = `${end[0]},${end[1]}`;

  while (current !== `${start[0]},${start[1]}`) {
    const { from, direction } = path[current];
    const [row, col] = from;

    //Once we found starting point
    if (`${row},${col}` === `${start[0]},${start[1]}`) {
      break;
    }

    const cell = document.querySelector(
      `.cell[data-row="${row}"][data-col="${col}"]`
    );
    if (cell) cell.classList.add("destPath");
    current = `${row},${col}`;
  }
};
