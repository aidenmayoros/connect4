import React from 'react';

const ROWS = 6;
const COLS = 7;

const GameBoard = () => {
	// Create the board as a 2D array filled with null values
	const board = Array.from({ length: ROWS }, () => Array(COLS).fill(null));

	return (
		<div className='flex justify-center mt-8'>
			<div className='grid grid-rows-6 gap-1'>
				{board.map((row, rowIndex) => (
					<div key={rowIndex} className='flex'>
						{row.map((_, colIndex) => (
							<div
								key={colIndex}
								className='w-12 h-12 bg-blue-500 rounded-full border-2 border-blue-700'
							/>
						))}
					</div>
				))}
			</div>
		</div>
	);
};

export default GameBoard;
