import { EuiProvider, EuiThemeProvider, EuiThemeColorMode } from "@elastic/eui";
import React, { useEffect, useState } from "react";
import "@elastic/eui/dist/eui_theme_light.css";
import "@elastic/eui/dist/eui_theme_dark.css";
import { Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import { useDispatch } from "react-redux";
import { useAppSelector } from "./app/hooks";

function App() {
  const dispatch = useDispatch();
  const isDarkTheme = useAppSelector((zoom) => zoom.auth.isDarkTheme);
  const [theme, setTheme] = useState<EuiThemeColorMode>("light");
  const [initTheme, setInitTheme] = useState(true);

  useEffect(() => {
    const currTheme = localStorage.getItem("zoom-theme");
    if (currTheme) {
      setTheme(currTheme as EuiThemeColorMode);
    } else {
      localStorage.setItem("zoom-them", "light");
    }
  }, []);

  useEffect(() => {
    if (initTheme) setInitTheme(false);
    else {
      window.location.reload();
    }
  }, [isDarkTheme]);

  const overRides = {
    colors: {
      LIGHT: { primary: "#0b5cff" },
      DARK: { primary: "#0b5cff" },
    },
  };

  return (
    <EuiProvider colorMode={theme}>
      <EuiThemeProvider modify={overRides}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="*" element={<Dashboard />} />
        </Routes>
      </EuiThemeProvider>
    </EuiProvider>
  );
}

export default App;
