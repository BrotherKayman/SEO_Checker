import './App.css';

import Navbar from './Header/Navbar';
import SignUp from './Button/SignUp';
import SEOCheck from './SEOCheck/SEOCheck';
import AddPostForm from './Blog/BlogPost';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BlogList from "./Blog/Blog";
import BlogPost from "./Blog/BlogPost";

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <br />

        <SignUp />
        <br />
        
        <SEOCheck />
        <AddPostForm />

        {/* The updated routes */}
        <Routes>
          <Route path="/" element={<BlogList />} />
          <Route path="/blog/:id" element={<BlogPost />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
