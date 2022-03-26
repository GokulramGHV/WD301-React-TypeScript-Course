import React, { useState } from 'react';
import AppContainer from './AppContainer';
import { Form } from './Components/Form';
import { Home } from './Components/Home';
import Header from './Header';
// import logo from './logo.svg';
// import './App.css';

function App() {
  const [state, setState] = useState('HOME');
  const [formID, setFormIDState] = useState(0); 
  const closeForm = () => {
    setState('HOME');
  };
  const openForm = (id:number) => {
    setFormIDState(id);
    setState('FORM');
  };

  return (
    <AppContainer>
      <div className="px-4 py-2 mx-auto bg-white shadow-lg rounded-xl">
        <Header title={'React & TypeScript Course with Tailwind CSS'} />
        {state === 'HOME' ? (
          <Home openFormCB={openForm} />
        ) : (
          <Form closeFormCB={closeForm} formID={formID} />
        )}
      </div>
    </AppContainer>
  );
}

export default App;
