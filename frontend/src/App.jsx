import './App.css';
import React from 'react';
import GameBoard from './GameBoard';

function App() {
	return (
		<div className='App'>
			<h1 className='text-3xl font-bold text-center mt-4'>Connect Four</h1>
			<GameBoard />
		</div>
	);
}

export default App;
