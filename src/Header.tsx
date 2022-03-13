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
			<h1 className="text-center text-xl mr-4 font-worksans">{props.title}</h1>
		</div>
	);
}
