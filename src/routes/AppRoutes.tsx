import { Routes, Route } from "react-router-dom";

// import Index from "../pages/Index";
// import SignIn from "../pages/SignIn";
import Dashboard from "../pages/DashboardPage";
// import Matches from "../pages/Matches";
// import ProfileRegistration from "../pages/ProfileRegistration";
// import ProfileView from "../pages/ProfileView";
// import ProtectedRoute from "./ProtectedRoute";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public */}
      {/* <Route path="/" element={<Index />} /> */}
      {/* <Route path="/signin" element={<SignIn />} /> */}

      {/* Protected */}
      {/* <Route element={<ProtectedRoute />}> */}
      <Route path="/dashboard" element={<Dashboard />} />
      {/* <Route path="/matches" element={<Matches />} /> */}
      {/* <Route path="/profile/register" element={<ProfileRegistration />} /> */}
      {/* <Route path="/profile/:id" element={<ProfileView />} /> */}
      {/* </Route> */}
    </Routes>
  );
}
