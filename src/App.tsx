import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import ThemeProvider from "./theme";

// custom components
import store from "./store";
import Routes from "./routes";
import SnackbarProvider from "./components/snackbar";

const App = () => {
  return (
    <ThemeProvider>
      <SnackbarProvider>
        <Provider store={store}>
          <BrowserRouter>
            <Routes />
          </BrowserRouter>
        </Provider>
      </SnackbarProvider>
    </ThemeProvider>
  );
};

export default App;

//changes 2
