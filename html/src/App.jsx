import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from "@/app/store";
import { setAxiosStore, setupInterceptors } from "@/services/axiosInstance";
import { restoreSession } from "@/features/auth/authThunk";
import AppRoutes from "@/routes/AppRoutes";
import ShadiSampannaLoader from "@/components/layouts/Loader/ShadiSampannaLoader";

setAxiosStore(store);
setupInterceptors();

const AppLoader = () => (
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
    {/* Loading... */}
    <ShadiSampannaLoader />
  </div>
);

const AppContent = () => {
  const dispatch = useDispatch();
  const authReady = useSelector((state) => state.auth.authReady);

  useEffect(() => {
    dispatch(restoreSession());
  }, [dispatch]);

  if (!authReady) {
    return <AppLoader />;
  }

  return <AppRoutes />;
};

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  </Provider>
);

export default App;
