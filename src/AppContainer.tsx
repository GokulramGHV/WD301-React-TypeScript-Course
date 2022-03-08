import React from 'react';

export default function AppContainer(props: { children: React.ReactNode }) {
	return (
		<div className="flex w-full h-screen bg-gray-100 items-center p-5">
			{props.children}
		</div>
	);
}
