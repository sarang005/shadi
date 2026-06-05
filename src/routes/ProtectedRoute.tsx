import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store/store";

export default function ProtectedRoute() {
  const token = useSelector((state: RootState) => state.auth.token);

  return token ? <Outlet /> : <Navigate to="/signin" replace />;
}
