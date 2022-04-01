import React from 'react';
import logo from './logo.svg';

export default function Header(props: { title: string }) {
	return (
		<div className="flex items-center m-1">
			<img
				src={logo}
				className="animate-spin w-16 h-16"
				alt="logo"
				style={{ animation: 'spin 2s linear infinite' }}
			/>
			<a className="text-center text-xl mr-1 font-worksans rounded-full px-4 py-2 hover:bg-slate-200 smooth-effect" href='/'>Home</a>
			<a className="text-center text-xl mr-1 font-worksans rounded-full px-4 py-2 hover:bg-slate-200 smooth-effect" href='/about'>About</a>
			
			<div>

			</div>
		</div>
	);
}
