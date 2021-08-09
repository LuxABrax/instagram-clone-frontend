import { StrictMode } from "react";
import ReactDOM from "react-dom";
import "./styles/index.scss";
import App from "./App";
import { store } from "./app/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import persistStore from "redux-persist/lib/persistStore";

let persistor = persistStore(store);

ReactDOM.render(
	<StrictMode>
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<App />
			</PersistGate>
		</Provider>
	</StrictMode>,
	document.getElementById("root")
);
