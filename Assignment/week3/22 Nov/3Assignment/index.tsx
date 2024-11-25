import React ,{Suspense} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import About from './components/About';
import Contact from './components/Contact';
// import NotFound from './components/NotFound';
// import Emps from './components/Emps';
import Details from './components/Details';
// import Depts from './components/Depts';
import ProtectedRoute from './components/ProtectedRoute';
// import Login from './components/Login';
import Admin from './components/Admin';
import AdminHome from './pages/AdminHome';
import Project from './pages/Project';
import Customer from './pages/Customer';


const Login = React.lazy(() => import("./components/Login"));
const Emps = React.lazy(() => import("./components/Emps"));
const Depts = React.lazy(() => import("./components/Depts"));
const NotFound = React.lazy(() => import("./components/NotFound"));


const router = (

  <Router>
      <Suspense fallback={<div style={{ textAlign: "center" }}>Loading...</div>}>

    <h3 style={{ textAlign: "center" }} >Routing Implementation in React Applications</h3>
    <hr />

    <div style={{ textAlign: "center" }} >
      <Link to="/">Home</Link>  |
      <Link to="/Emps">Employees</Link> |
      <Link to="/Depts">Departments</Link> |
      <Link to="/About">About Us</Link> |
      <Link to="/Contact">Contact Us</Link> |
    
      <Link to="/Login">Login</Link> |
      <Link to="/">Home</Link> | 
      <Link to="/admin">Admin</Link>
    </div>
    <hr/>

    <Routes>
      
      <Route path="/" element={<App />} />
      <Route path="/About" element={<About />} />
      <Route path="/Contact" element={<Contact />} />

      <Route 
  path="/Emps" 
  element={
    <ProtectedRoute returnUrl="/Emps" requireAdmin={true}>
      <Emps />
    </ProtectedRoute>
  } 
/>

      <Route path="/Depts" element={
         <ProtectedRoute returnUrl="/Depts">
         <Depts />
       </ProtectedRoute>
      } />

      <Route path="/Login" element={<Login />} />
      <Route path="/Details/:id" element={<Details />} />

      <Route path="/admin" element={
          <ProtectedRoute returnUrl="/admin"><Admin /></ProtectedRoute>
        }>
          <Route path="admin-home" element={<AdminHome />} />
          <Route path="project" element={<Project />} />
          <Route path="customer" element={<Customer />} />
        </Route>
     
      {/*  Route for non-matching urls   */}
      <Route path="*" element={<NotFound />} />
    </Routes>
    </Suspense>
  </Router>
);



const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  router
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
