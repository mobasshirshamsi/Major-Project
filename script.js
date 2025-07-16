const SIZE = 10;

function createEmptyBoard() {
  return Array.from({ length: SIZE }, () => Array(SIZE).fill('-'));
}

function canPlaceHorizontally(board, word, row, col) {
  if (col + word.length > SIZE) return false;
  for (let i = 0; i < word.length; i++) {
    if (board[row][col + i] !== '-' && board[row][col + i] !== word[i]) return false;
  }
  return true;
}

function canPlaceVertically(board, word, row, col) {
  if (row + word.length > SIZE) return false;
  for (let i = 0; i < word.length; i++) {
    if (board[row + i][col] !== '-' && board[row + i][col] !== word[i]) return false;
  }
  return true;
}

function placeHorizontally(board, word, row, col, placed) {
  for (let i = 0; i < word.length; i++) {
    if (board[row][col + i] === '-') {
      board[row][col + i] = word[i];
      placed[i] = true;
    }
  }
}

function unplaceHorizontally(board, word, row, col, placed) {
  for (let i = 0; i < word.length; i++) {
    if (placed[i]) board[row][col + i] = '-';
  }
}

function placeVertically(board, word, row, col, placed) {
  for (let i = 0; i < word.length; i++) {
    if (board[row + i][col] === '-') {
      board[row + i][col] = word[i];
      placed[i] = true;
    }
  }
}

function unplaceVertically(board, word, row, col, placed) {
  for (let i = 0; i < word.length; i++) {
    if (placed[i]) board[row + i][col] = '-';
  }
}

function solve(board, words, index) {
  if (index === words.length) return true;
  let word = words[index];
  for (let row = 0; row < SIZE; row++) {
    for (let col = 0; col < SIZE; col++) {
      if (canPlaceHorizontally(board, word, row, col)) {
        let placed = Array(word.length).fill(false);
        placeHorizontally(board, word, row, col, placed);
        if (solve(board, words, index + 1)) return true;
        unplaceHorizontally(board, word, row, col, placed);
      }
      if (canPlaceVertically(board, word, row, col)) {
        let placed = Array(word.length).fill(false);
        placeVertically(board, word, row, col, placed);
        if (solve(board, words, index + 1)) return true;
        unplaceVertically(board, word, row, col, placed);
      }
    }
  }
  return false;
}

function handleSolve() {
  const input = document.getElementById('wordsInput').value;
  const words = input.split(',').map(w => w.trim().toUpperCase());
  const board = createEmptyBoard();
  if (solve(board, words, 0)) {
    displayBoard(board);
  } else {
    alert('No solution found!');
  }
}

function displayBoard(board) {
  const grid = document.getElementById('gridOutput');
  grid.innerHTML = '';
  board.forEach(row => {
    row.forEach(cell => {
      const div = document.createElement('div');
      div.className = 'cell';
      div.textContent = cell;
      grid.appendChild(div);
    });
  });
}
