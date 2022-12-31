import { configureStore } from "@reduxjs/toolkit";

// reducers
import AuthReducer from "./reducers/auth";
import ShipperReducer from "./reducers/shipper";
import ShipReducer from "./reducers/ship";
import PortReducer from "./reducers/port";
import CountryReducer from "./reducers/country";
import UnitReducer from "./reducers/unit";
import ShipArrivalReducer from "./reducers/shipArrival";

const store = configureStore({
  reducer: {
    auth: AuthReducer,
    shipper: ShipperReducer,
    ship: ShipReducer,
    port: PortReducer,
    country: CountryReducer,
    unit: UnitReducer,
    shipArrival: ShipArrivalReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

const { dispatch } = store;

export { dispatch };
