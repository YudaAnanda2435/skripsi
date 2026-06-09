import { AnimatePresence } from "framer-motion";
import PageTransition from "../fragments/pageTrasition";
import { Navigate, Routes, Route, useLocation } from "react-router-dom";
import LandingPage from "../../pages/landingPage";
import LoginPage from "../../pages/loginPage";
import RegisterPage from "../../pages/RegisterPage";
import DashboardPage from "../../pages/dashboardPage";
import LahanPage from "../../pages/lahanPage";
import ScanTonasePage from "../../pages/scanTonasePage";
import BuktiAnalisaPage from "../../pages/buktiAnalisaPage";
import HargaJualPage from "../../pages/sellingPrice";
import Profil from "../../pages/ProfilPage";
import ProtectedRoute from "../routes/ProtectedRoute";
import { hasStoredSession } from "./authSession";
import PanduanPage from "../../pages/panduanPage";

const PublicRoute = ({ children }) => {
  if (hasStoredSession()) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

function AnimatedRoutes() {
  const location = useLocation();

     console.log("LOCATION STATE:", location.state);
  const isLoginDashboard =
    location.pathname === "/dashboard" && location.state?.fromLogin;

  return (
      <AnimatePresence mode="wait" initia={ false}>
      {isLoginDashboard ? (
        <PageTransition key={location.pathname}>
          <Routes location={location}>
            <Route path="/" element={<PublicRoute><LandingPage /></PublicRoute>} />
            <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
            <Route path="/register" element={<PublicRoute><RegisterPage /></PublicRoute>} />

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/lahan"
              element={
                <ProtectedRoute>
                  <LahanPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/scan-tonase"
              element={
                <ProtectedRoute>
                  <ScanTonasePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/bukti-analisa"
              element={
                <ProtectedRoute>
                  <BuktiAnalisaPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/harga-jual"
              element={
                <ProtectedRoute>
                  <HargaJualPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profil"
              element={
                <ProtectedRoute>
                  <Profil />
                </ProtectedRoute>
              }
            />
            <Route
              path="/panduan"
              element={
                <ProtectedRoute>
                  <PanduanPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </PageTransition>
      ) : (
        <Routes location={location}>
          <Route path="/" element={<PublicRoute><LandingPage /></PublicRoute>} />
          <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
          <Route path="/register" element={<PublicRoute><RegisterPage /></PublicRoute>} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/lahan"
            element={
              <ProtectedRoute>
                <LahanPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/scan-tonase"
            element={
              <ProtectedRoute>
                <ScanTonasePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/bukti-analisa"
            element={
              <ProtectedRoute>
                <BuktiAnalisaPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/harga-jual"
            element={
              <ProtectedRoute>
                <HargaJualPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profil"
            element={
              <ProtectedRoute>
                <Profil />
              </ProtectedRoute>
            }
          />
          <Route
            path="/panduan"
            element={
              <ProtectedRoute>
                <PanduanPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      )}
    </AnimatePresence>
  );
}
export default AnimatedRoutes;
