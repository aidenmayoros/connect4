import React, { useState } from 'react';

const ROWS = 6;
const COLS = 7;
const PLAYER_ONE = 'Red';
const PLAYER_TWO = 'Yellow';

const GameBoard = () => {
	const initialBoard = Array.from({ length: ROWS }, () =>
		Array(COLS).fill(null)
	);

	const [board, setBoard] = useState(initialBoard);
	const [currentPlayer, setCurrentPlayer] = useState(PLAYER_ONE);
	const [winner, setWinner] = useState(null);
	const [isDraw, setIsDraw] = useState(false);

	const handleClick = (colIndex) => {
		if (winner || isDraw) return;

		for (let row = ROWS - 1; row >= 0; row--) {
			if (!board[row][colIndex]) {
				const newBoard = board.map((row) => [...row]);
				newBoard[row][colIndex] = currentPlayer;
				setBoard(newBoard);

				if (checkWin(newBoard, row, colIndex, currentPlayer)) {
					setWinner(currentPlayer);
				} else if (checkDraw(newBoard)) {
					setIsDraw(true);
				} else {
					setCurrentPlayer(
						currentPlayer === PLAYER_ONE ? PLAYER_TWO : PLAYER_ONE
					);
				}
				break;
			}
		}
	};

	const checkDraw = (board) => {
		return board.every((row) => row.every((cell) => cell !== null));
	};

	// Function to check for a win in any direction
	const checkWin = (board, row, col, player) => {
		return (
			checkHorizontal(board, row, player) ||
			checkVertical(board, col, player) ||
			checkDiagonalRight(board, row, col, player) ||
			checkDiagonalLeft(board, row, col, player)
		);
	};

	// Horizontal check
	const checkHorizontal = (board, row, player) => {
		let count = 0;
		for (let col = 0; col < COLS; col++) {
			count = board[row][col] === player ? count + 1 : 0;
			if (count >= 4) return true;
		}
		return false;
	};

	// Vertical check
	const checkVertical = (board, col, player) => {
		let count = 0;
		for (let row = 0; row < ROWS; row++) {
			count = board[row][col] === player ? count + 1 : 0;
			if (count >= 4) return true;
		}
		return false;
	};

	// Diagonal right check
	const checkDiagonalRight = (board, row, col, player) => {
		let count = 0;
		for (let r = row, c = col; r < ROWS && c < COLS; r++, c++) {
			count = board[r][c] === player ? count + 1 : 0;
			if (count >= 4) return true;
		}
		count = 0;
		for (let r = row, c = col; r >= 0 && c >= 0; r--, c--) {
			count = board[r][c] === player ? count + 1 : 0;
			if (count >= 4) return true;
		}
		return false;
	};

	// Diagonal left check
	const checkDiagonalLeft = (board, row, col, player) => {
		let count = 0;
		for (let r = row, c = col; r < ROWS && c >= 0; r++, c--) {
			count = board[r][c] === player ? count + 1 : 0;
			if (count >= 4) return true;
		}
		count = 0;
		for (let r = row, c = col; r >= 0 && c < COLS; r--, c++) {
			count = board[r][c] === player ? count + 1 : 0;
			if (count >= 4) return true;
		}
		return false;
	};

	const resetGame = () => {
		setBoard(Array.from({ length: ROWS }, () => Array(COLS).fill(null)));
		setCurrentPlayer(PLAYER_ONE);
		setWinner(null);
		setIsDraw(false);
	};

	const renderCell = (value, rowIndex, colIndex) => (
		<div
			key={colIndex}
			onClick={() => handleClick(colIndex)}
			className={`w-12 h-12 border-2 rounded-full cursor-pointer ${
				value === PLAYER_ONE
					? 'bg-red-500'
					: value === PLAYER_TWO
					? 'bg-yellow-500'
					: 'bg-white'
			}`}></div>
	);

	return (
		<div className='flex flex-col items-center'>
			{winner ? (
				<h2 className='text-2xl font-bold text-center text-green-500 mt-4'>
					{winner} Wins!
				</h2>
			) : isDraw ? (
				<h2 className='text-2xl font-bold text-center text-gray-500 mt-4'>
					It's a Draw!
				</h2>
			) : (
				<h2 className='text-xl font-bold text-center mt-4'>
					Current Player: {currentPlayer}
				</h2>
			)}
			<div className='grid grid-rows-6 gap-1 mt-4'>
				{board.map((row, rowIndex) => (
					<div key={rowIndex} className='flex'>
						{row.map((cell, colIndex) => renderCell(cell, rowIndex, colIndex))}
					</div>
				))}
			</div>
			{/* Reset button */}
			{(winner || isDraw) && (
				<button
					onClick={resetGame}
					className='mt-4 px-4 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600'>
					Reset Game
				</button>
			)}
		</div>
	);
};

export default GameBoard;
