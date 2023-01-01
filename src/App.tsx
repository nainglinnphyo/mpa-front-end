import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import ThemeProvider from "./theme";

// custom components
import store from "./store";
import Routes from "./routes";
import SnackbarProvider from "./components/snackbar";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const App = () => {
  return (
    <ThemeProvider>
      <SnackbarProvider>
        {/* <LocalizationProvider dateAdapter={AdapterDayjs}> */}
        <Provider store={store}>
          <BrowserRouter>
            <Routes />
          </BrowserRouter>
        </Provider>
        {/* </LocalizationProvider> */}
      </SnackbarProvider>
    </ThemeProvider>
  );
};

export default App;

//changes 2
