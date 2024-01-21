import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./scenes/Login/Login";
import PostList from './scenes/PostList/PostList';
// import PostDetail from "./scenes/PostDetail/PostDetail";
import { PrivateRoute } from './scenes/Auth/AuthGuard';
import PostDetail from './scenes/PostDetail/PostDetail';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/posts" element={<PrivateRoute><PostList /></PrivateRoute>} />
      <Route path="/posts/:id" element={<PrivateRoute><PostDetail /></PrivateRoute>} />
    </Routes>
  );
}

export default App;
