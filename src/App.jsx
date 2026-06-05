import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store/store";

// Pages
import DashboardPage from "./pages/DashboardPage";

/**
 * AppRoutes — All page routes
 */
const AppRoutes = () => (
  <Routes>
    <Route
      path="/dashboard"
      element={
        <ProtectedRoute>
          <DashboardPage />
        </ProtectedRoute>
      }
    />
    <Route path="/" element={<Navigate to="/dashboard" replace />} />
    <Route path="*" element={<Navigate to="/dashboard" replace />} />
  </Routes>
);

/**
 * App — Root component with mobile container
 * Mobile-first: max 430px centred, full-height
 */
const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <div>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300&family=Jost:wght@300;400;500;600;700&display=swap"
            rel="stylesheet"
          />
          <AppRoutes />
        </div>
      </div>
    </BrowserRouter>
  </Provider>
);

export default App;
