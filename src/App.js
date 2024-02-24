import "./App.css";
import "../src/style/app.scss";
import MainAppComponent from "./Steps/MainAppComponent";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

function App() {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div className="App">
        <MainAppComponent />
      </div>
    </ThemeProvider>
  );
}

export default App;
