// App.js
import React, { useContext } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Questions from "./pages/QusetionsMain";
import Navbar from "./components/Header";
import QuestionPaper from "./pages/QuestionPaper/QuestionPaper";
import Footer from "./components/footer";
import AuthForm from "./pages/auth/AuthForm";
import Bookmarked from "./pages/Bookmarked";
import { AuthContext } from "./context/AuthContext";

function App() {
  const location = useLocation();
  const { isLoggedIn, userId } = useContext(AuthContext);

  return (
    <>
      {location.pathname !== "/login" && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<AuthForm />} />
        <Route path="question" element={<Questions />} />
        <Route path="questionpaper" element={<QuestionPaper />} />
        {isLoggedIn && <Route path="bookamark" element={<Bookmarked />} />}
      </Routes>
      {location.pathname !== "/login" && <Footer />}
    </>
  );
}

export default App;
