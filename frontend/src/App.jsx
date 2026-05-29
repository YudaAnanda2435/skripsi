import { BrowserRouter } from "react-router-dom";
import AnimatedRoutes from "./components/routes/AnimatedRoutes";
import { ToastProvider } from "./components/ui/toast/ToastProvider";
import { ConfirmProvider } from "./components/ui/confirm/ConfirmProvider";

function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <ConfirmProvider>
          <AnimatedRoutes />
        </ConfirmProvider>
      </ToastProvider>
    </BrowserRouter>
  );
}

export default App;
