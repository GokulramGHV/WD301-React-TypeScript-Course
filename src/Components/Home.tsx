import React from 'react';
import logo from '../logo.svg';

export function Home() {
	return (
		<div className="flex items-center">
			<img src={logo} alt="logo" className="h-44 animate-pulse " />
			<p className="font-medium font-worksans">Welcome to the Home Page!</p>
		</div>
	);
}
