import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

//authcontext
import { useAuthContext } from './hooks/useAuthContext';

//pages and components
import Dashboard from './pages/dashboard/Dashboard'
import Create from './pages/create/Create'
import Friends from './pages/friends/Friends'
import Settings from './pages/settings/Settings'
import Login from './pages/login/Login'
import Signup from './pages/signup/Signup'
import Project from './pages/project/Project'

import Navbar from './Components/Navbar'
import Sidebar from './Components/Sidebar'
import OnlineUsers from './Components/OnlineUsers'


function App() {
  const { user, authIsReady } = useAuthContext()

  return (
    <div className="App">
      {authIsReady && (
        <Router>
          {user && <Sidebar />}

          <div className='container'>
            <Navbar />

            <Routes>
              <Route path="/" element={user ? <Dashboard /> : <Navigate to="/login" />} />
              <Route path="/create" element={user ? <Create /> : <Navigate to="/login" />} />
              <Route path="/friends" element={user ? <Friends /> : <Navigate to="/login" />} />
              <Route path="/settings" element={user ? <Settings /> : <Navigate to="/login" />} />
              <Route path="/projects/:id" element={user ? <Project /> : <Navigate to="/login" />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
          </div>

          {user && <OnlineUsers />}
        </Router>
      )}
    </div>
  );
}

export default App