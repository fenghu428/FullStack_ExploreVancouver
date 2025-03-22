// App.jsx
import "../style/app.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import LoginPage from "./LoginPage";
import Layout from "./Layout";
import Register from "./Register";
import axios from "axios";
import { UserContextProvider } from "./UserContext";
import Museums from "./Museums";
import Parks from "./Parks";
import SkiResorts from "./SkiResorts";
import Others from "./Others";
import NotFound from "./NotFound";
import ProfilePage from "./ProfilePage";
import PlaceDetail from "./PlaceDetail";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/account" element={<ProfilePage />} />
          <Route path="/account/favourite" element={<ProfilePage />} />
          <Route path="/museums" element={<Museums />} />
          <Route path="/parks" element={<Parks />} />
          <Route path="/ski-resorts" element={<SkiResorts />} />
          <Route path="/others" element={<Others />} />
          <Route path="/places/:id" element={<PlaceDetail />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
