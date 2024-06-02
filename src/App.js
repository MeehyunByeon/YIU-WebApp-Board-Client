import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import Layout from "./Layout";
import BoardPage from "./pages/Board";
import PostDetailPage from "./pages/Post";
import PostFormPage from "./pages/PostForm";
import ScrollToTop from "./ScrollToTop";

function App(props) {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route exact path="/" element={<BoardPage />} />
          <Route exact path="/form" element={<PostFormPage />} />
          <Route exact path="/post/:id" element={<PostDetailPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
