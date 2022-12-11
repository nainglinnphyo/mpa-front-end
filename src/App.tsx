import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import ThemeProvider from "./theme";
import SnackbarProvider from "./components/snackbar";

// custom components
import store from "./store";
import Routes from "./routes";

const App = () => {
  return (
    <ThemeProvider>
      <Provider store={store}>
        <SnackbarProvider>
          <BrowserRouter>
            <Routes />
          </BrowserRouter>
        </SnackbarProvider>
      </Provider>
    </ThemeProvider>
  );
};

export default App;
