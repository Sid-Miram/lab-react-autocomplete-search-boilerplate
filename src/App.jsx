import React, { useState } from 'react';
import './App.css';
import Data from './resources/countryData.json';

function App() {
  const [count, setCount] = useState("");
  const [dataAppearance, setDataAppearance] = useState(false);

  const handleChange = (e) => {
    const searchTerm = e.target.value;
    setCount(searchTerm);
    setDataAppearance(searchTerm.length > 0);
  }

  const handleEsc = (e) => {
    if (e.key === "Escape") {
      setDataAppearance(false);
    } else {
      setDataAppearance(count.length > 0);
    }
  }
//this is for the input element
  const search = (searchTerm) => {
    setCount(searchTerm);
    setDataAppearance(false);
  }

  //this is for the auto complete
  const filteredItems = Data.filter((item) => {
    const searchTerm = count.toLowerCase();
    const name = item.name.toLowerCase();
    return name.startsWith(searchTerm);
  });
//this is for he final search
  const handleButtonClick = () => {
    search(count);
  }

  return (
    <>
      <div className='full-container'>
        <div className='search-container'>
          <input type="text" value={count} onChange={handleChange} onKeyDown={handleEsc} />
          <button onClick={handleButtonClick}>cee</button>
          <h1>All Countries</h1>
        </div>
        <div id='autocomplete' className='data-display' style={{ display: dataAppearance ? 'block' : 'none' }}>
          {filteredItems.length > 0 ? (
            <ul>
              {filteredItems.map((item) => (
                <li key={item.name} onClick={() => search(item.name)}>
                  {item.name}
                </li>
              ))}
            </ul>
          ) : (<p>please enter valid name </p>)}
        </div>
      </div>
    </>
  );
}

export default App;
