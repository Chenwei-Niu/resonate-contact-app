import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';
import ContactList from './components/ContactList';
import ContactDetail from './pages/ContactDetail';

function App() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(response => setContacts(response.data))
      .catch(error => console.error("Error fetching data:", error));
  },[]);

  return (
    <div className='app-wrapper'>
      <h1 style={{ marginBottom: '20px' }}>Contacts Application</h1>
      <Router>
        <div className="app-container">
          <Routes>
            <Route path="/" element={<ContactList contacts={contacts} />} />
            <Route path="/contact/:id" element={<ContactDetail contacts={contacts}/>} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
