import React from 'react';
import AppContainer from './AppContainer';
import Header from './Header';
import logo from './logo.svg';
// import './App.css';
const formFields = [
	{ id: 1, label: 'First Name', type: 'text' },
	{ id: 2, label: 'Last Name', type: 'text' },
	{ id: 3, label: 'Email', type: 'email' },
	{ id: 4, label: 'Date of Birth', type: 'date' },
	{ id: 5, label: 'Phone Number', type: 'number' },
];
function App() {
	return (
		<AppContainer>
			<div className="p-4 mx-auto bg-white shadow-lg rounded-xl">
				<Header title={'React & TypeScript Course with Tailwind CSS'} />
				<form action="" className="grid grid-cols-1">
					{formFields.map((field) => (
						<React.Fragment key={field.id}>
							<label className="">{field.label}</label>
							<input
								type={field.type}
								className="border-2 border-gray-300 rounded-lg p-2 mt-1 mb-2 smooth-effect hover:border-blue-400 hover:ring-blue-400 focus:ring-blue-400 focus:border-blue-400"
								required
							/>
						</React.Fragment>
					))}
					<button
						className="w-28 bg-blue-500 font-medium font-worksans rounded-lg px-4 py-2 my-2 text-white hover:bg-blue-700 smooth-effect"
						type="submit"
					>
						Submit
					</button>
				</form>
			</div>
		</AppContainer>
	);
}

export default App;
