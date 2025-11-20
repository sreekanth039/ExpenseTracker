import "./App.css";
import Home from "./pages/home.jsx";
import { SnackbarProvider } from "notistack";

function App() {
  return (
    <SnackbarProvider>
      <>
        <Home />
      </>
    </SnackbarProvider>
  );
}

export default App;
