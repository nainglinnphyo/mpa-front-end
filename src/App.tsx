import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import ThemeProvider from "./theme";

// custom components
import store from "./store";
import Routes from "./routes";

const App = () => {
	return (
		<ThemeProvider>
			<Provider store={store}>
				<BrowserRouter>
					<Routes />
				</BrowserRouter>
			</Provider>
		</ThemeProvider>
	);
};

export default App;
