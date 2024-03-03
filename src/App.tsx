import { useState } from "react";
import Signin from "./components/Signin";
import { Signup } from "./components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MyUrls from "./components/MyUrls";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/myurls" element={<MyUrls />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
