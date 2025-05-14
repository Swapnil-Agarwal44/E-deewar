import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import CommunityForum from "./pages/CommunityForum";
import Chatbot from "./pages/Chatbot";
import FAQs from "./pages/FAQs";
import Register from "./pages/Register";
import Services from "./pages/Services";
import Profile from "./pages/Profile";
import Footer from "./components/Footer";
import Event from "./pages/Event";
import MyEvents from "./pages/MyEvents";
import ExploreEvents from "./pages/ExploreEvents";
import RecommEvents from "./pages/RecommEvents";
import GoogleCal from "./pages/GoogleCal";

import ExploreClubs from "./pages/ExploreClubs";
import MyClubs from "./pages/MyClubs";
import ClubEvents from "./pages/ClubEvents";
import ClubAnnouncements from "./pages/ClubAnnouncements";
import SingleEventPage from './pages/SingleEventPage';


// Import the 3D Book Experience
import { Loader } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Experience } from "./components/Experience";
import { UI } from "./components/UI";





// New Book Experience Page Component
const BookExperience = () => (
  <>
    <UI />
    <Loader />
    <Canvas shadows camera={{ position: [-0.5, 1, 4], fov: 45 }}>
      <group position-y={0}>
        <Suspense fallback={null}>
          <Experience />
        </Suspense>
      </group>
    </Canvas>
  </>
);

function App() {
  const backgroundClass = 'first-color';
  return (
    <Router>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/community" element={<CommunityForum />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/faqs" element={<FAQs />} />
          <Route path="/register" element={<Register />} />
          <Route path="/services" element={<Services />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/events" element={<Event />} />
          <Route path="/my-events" element={<MyEvents />} />
          <Route path="/explore" element={<ExploreEvents />} />
          <Route path="/recommended" element={<RecommEvents />} />
          <Route path="/calendar" element={<GoogleCal />} />
          {/* New Route for 3D Book Experience */}
          <Route path="/book-experience" element={<BookExperience />} />
          
          <Route path="/clubs/explore" element={<ExploreClubs />} />
          <Route path="/clubs/my-clubs" element={<MyClubs />} />
          <Route path="/clubs/events" element={<ClubEvents />} />
          <Route path="/clubs/announcements" element={<ClubAnnouncements />} />
          <Route path="/clubs" element={<SingleEventPage />} />

        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
