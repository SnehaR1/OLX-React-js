import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Signup from './Pages/Signup'
import Login from './Pages/Login'
import ViewPost from './Pages/ViewPost'
import Create from './Components/Create/Create'
import './App.css';
import { AuthContextProvider } from './Context/AuthContextProvider';

/**
 * ?  =====Import Components=====
 */
import Home from './Pages/Home';
import Post from './Context/PostContext';

function App() {

  return (
    <div>
      <Post>
        <AuthContextProvider>

          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/create" element={<Create />} />
              <Route path="/view" element={<ViewPost />} />

            </Routes>
          </Router>
        </AuthContextProvider>
      </Post>

    </div>
  );
}

export default App;
