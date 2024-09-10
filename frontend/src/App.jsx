import './App.css';
import React from 'react';
import GameBoard from './GameBoard';

const ROWS = 6;
const COLS = 7;

// Create the board as a 2D array filled with null values
const Initialboard = Array.from({ length: ROWS }, () => Array(COLS).fill(null));

function App() {
	return (
		<div className='App'>
			<h1 className='text-3xl font-bold text-center mt-4'>Connect Four</h1>
			<GameBoard />
		</div>
	);
}

export default App;
