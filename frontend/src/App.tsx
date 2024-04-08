// import React from "react";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Layout from "./layouts/Layout";
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";
import AddHotel from "./pages/AddHotel";
import { useAppContext } from "./contexts/AppContext";
import MyHotels from "./pages/MyHotels";
import EditHotel from "./pages/EditHotel";
import AddReview from "./pages/AddReview";
import Search from "./pages/Search";
import Detail from "./pages/Detail";
import Booking from "./pages/Booking";
import MyBookings from "./pages/MyBookings";
import Home from "./pages/Home";
import video from "../src/assets/video4.mp4"
// import "./App.css";  Import app.css file

const App = () => {
  const { isLoggedIn } = useAppContext();
  return (
    <Router>
      <Routes>
        {/* diffrent routes using the layout and depending on the route we're passing diffrent elements rendered in the layout component where we can find the children */}
        <Route
          // paths are from the pages folder
          path="/"
          element={
            // for this route instead of children we'll display the homepage part
            // partie marbouta bil Home.tsx
            // Render the Home component wrapped inside the Layout component
            <Layout>
              {/* Uncomment the line below to see a placeholder text */}
              
              <Home />
            </Layout>
          }
        />
        <Route
          path="/search"
          element={
             // Render the Search component wrapped inside the Layout component
             //if you goto your URL and add /search it will lead to the search page
            <Layout>
              <Search />
              
            </Layout>
          }
        />
        <Route
          path="/detail/:hotelId"
          element={
            <Layout>
              <Detail />
            </Layout>
          }
        />
        <Route
          path="/register"
          element={
            <div className="text-white h-screen flex justify-center items-center">
            <video
              autoPlay
              loop
              muted
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src={"../src/assets/video4.mp4"} type="video/mp4" />
               
            </video>
            <div className="relative z-10">
              <Register />
            </div>
            </div> 
            
          }
        />
        <Route
  path="/sign-in"
  element={
    <div className="text-white h-screen flex justify-center items-center">
      <video
        autoPlay
        loop
        muted
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={video} type="video/mp4" />
        {/* Add additional <source> elements for different video formats if necessary */}
        Your browser does not support the video tag.
      </video>
      <div className="relative z-10">
        <SignIn />
      </div>
    </div>
  }
/>


{isLoggedIn && (
          <>
            <Route
              path="/hotel/:hotelId/booking"
              element={
                <Layout>
                  <Booking />
                </Layout>
              }
            />

            <Route
              path="/add-hotel"
              element={
                <Layout>
                  <AddHotel />
                </Layout>
              }
            />
            <Route
              path="/edit-hotel/:hotelId"
              element={
                <Layout>
                  <EditHotel />
                </Layout>
              }
            />
            <Route
              path="/my-hotels"
              element={
                <Layout>
                  <MyHotels />
                </Layout>
              }
            />
            <Route
              path="/my-bookings"
              element={
                <Layout>
                  <MyBookings />
                </Layout>
              }
            />
            <Route
              path="/add-review"
              element={
                <Layout>
                  <AddReview />
                </Layout>
              }
            />
          </>
        )}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;