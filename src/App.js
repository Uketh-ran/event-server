import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLayout from "./amin/Layout/AdminLayout";
import AdminDashboard from "./amin/AdminDashboard";
import WedThemeDecorationAdmin from "./amin/Pages/WedThemeDecorationAdmin";
import { Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import WedRecParty from "./amin/Pages/WedRecParty";
import WedLiveMusic from "./amin/Pages/WedLiveMusic";
import WedPhoto from "./amin/Pages/WedPhoto";

function App() {
  return (
    <BrowserRouter>
       <Routes>
        {/* Redirect root to /admin */}
        <Route path="/" element={<Navigate to="/admin" />} />

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="wed-theme" element={<WedThemeDecorationAdmin />} />
          <Route path="wed-recparty" element={<WedRecParty/>} />
          <Route path="wed-livemusic" element={<WedLiveMusic/>} />
          <Route path="wed-photo" element={<WedPhoto/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
