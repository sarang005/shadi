import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "@/components/common/ProtectedRoute/ProtectedRoute";
import PublicRoute from "@/components/common/PublicRoute/PublicRoute";
import RoleRoute from "@/components/common/RoleRoute/RoleRoute";
import RedirectHome from "@/components/common/RedirectHome/RedirectHome";
import DashboardLayout from "@/components/layouts/DashboardLayout/DashboardLayout";
import { ROUTES } from "@/constants/routes";
import { ROLES } from "@/constants/roles";
import ShadiSampannaLoader from "@/components/layouts/Loader/ShadiSampannaLoader";

const SignInPage = lazy(() => import("@/pages/SignIn/SignInPage"));
const Dashboard = lazy(() => import("@/pages/Dashboard/Dashboard"));
const Matches = lazy(() => import("@/pages/Matches/Matches"));
const ProfileRegistration = lazy(
  () => import("@/pages/ProfileRegistration/ProfileRegistration"),
);
const ProfileView = lazy(() => import("@/pages/ProfileView/ProfileView"));
const AdminDashboard = lazy(() => import("@/pages/Admin/AdminDashboard"));
const AdminUsers = lazy(() => import("@/pages/Admin/AdminUsers"));
const SuperadminDashboard = lazy(
  () => import("@/pages/Superadmin/SuperadminDashboard"),
);
const SuperadminUsers = lazy(
  () => import("@/pages/Superadmin/SuperadminUsers"),
);
const SuperadminAdmins = lazy(
  () => import("@/pages/Superadmin/SuperadminAdmins"),
);
const ComingSoon = lazy(() => import("@/pages/ComingSoon/ComingSoon"));

const PageLoader = () => (
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "var(--muted)",
      fontFamily: "Jost, sans-serif",
    }}
  >
    <ShadiSampannaLoader />
  </div>
);

const AppRoutes = () => (
  <Suspense fallback={<PageLoader />}>
    <Routes>
      <Route path={ROUTES.HOME} element={<RedirectHome />} />

      <Route
        path={ROUTES.SIGN_IN}
        element={
          <PublicRoute>
            <SignInPage />
          </PublicRoute>
        }
      />

      <Route
        path={ROUTES.REGISTER}
        element={
          <PublicRoute>
            <ProfileRegistration />
          </PublicRoute>
        }
      />

      {/* User matrimony routes */}
      <Route
        element={
          <ProtectedRoute>
            <RoleRoute allowedRoles={[ROLES.USER]}>
              <DashboardLayout />
            </RoleRoute>
          </ProtectedRoute>
        }
      >
        <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
        <Route path={ROUTES.MATCHES} element={<Matches />} />
        <Route path={ROUTES.PROFILE_VIEW} element={<ProfileView />} />
        <Route path={ROUTES.EDIT_PROFILE} element={<ProfileRegistration />} />
        <Route path={ROUTES.COMING_SOON} element={<ComingSoon />} />
      </Route>

      {/* Admin routes */}
      <Route
        element={
          <ProtectedRoute>
            <RoleRoute allowedRoles={[ROLES.ADMIN, ROLES.SUPERADMIN]}>
              <DashboardLayout />
            </RoleRoute>
          </ProtectedRoute>
        }
      >
        <Route path={ROUTES.ADMIN_DASHBOARD} element={<AdminDashboard />} />
        <Route path={ROUTES.ADMIN_USERS} element={<AdminUsers />} />
      </Route>

      {/* Superadmin routes */}
      <Route
        element={
          <ProtectedRoute>
            <RoleRoute allowedRoles={[ROLES.SUPERADMIN]}>
              <DashboardLayout />
            </RoleRoute>
          </ProtectedRoute>
        }
      >
        <Route
          path={ROUTES.SUPERADMIN_DASHBOARD}
          element={<SuperadminDashboard />}
        />
        <Route path={ROUTES.SUPERADMIN_USERS} element={<SuperadminUsers />} />
        <Route path={ROUTES.SUPERADMIN_ADMINS} element={<SuperadminAdmins />} />
      </Route>

      <Route path="*" element={<RedirectHome />} />
    </Routes>
  </Suspense>
);

export default AppRoutes;
