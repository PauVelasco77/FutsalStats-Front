import { Navigate, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import CreatePlayer from "./pages/CreatePlayer/CreatePlayer";
import DetailPage from "./pages/Detail/Detail";
import Login from "./pages/Login/Login";
import MainPage from "./pages/MainPage/MainPage";
import NotFound from "./pages/NotFound/NotFound";
import Register from "./pages/Register/Register";
import UpdatePlayer from "./pages/UpdatePlayer/UpdatePlayer";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Navigate to="/main-page" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/main-page" element={<MainPage />} />
        <Route path="/create-player" element={<CreatePlayer />} />
        <Route path="/main-page/update-player/:id" element={<UpdatePlayer />} />
        <Route path="/main-page/detail-player/:id" element={<DetailPage />} />

        <Route path="/*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
