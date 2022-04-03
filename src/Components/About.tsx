import React from 'react';
import Header from '../Header';

export default function About() {
    return (
        <>
            <Header />
            <div>About Page</div>
            <select name="cars" id="cars" multiple>
                <option value="volvo">Volvo</option>
                <option value="saab">Saab</option>
                <option value="opel">Opel</option>
                <option value="audi">Audi</option>
            </select>
        </>
    );
}
