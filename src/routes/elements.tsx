import { Suspense, lazy, ElementType } from "react";

//components
import Loading from "../pages/guest/Loading";

const Loadable = (Component: ElementType) => (props: any) => {
  return (
    <Suspense fallback={<Loading />}>
      <Component {...props} />
    </Suspense>
  );
};

//Aurh
export const Login = Loadable(lazy(() => import("../pages/guest/Login")));

//Dashboard
export const DashBoard = Loadable(
  lazy(() => import("../pages/admin/Dashboard"))
);

//Country
export const Country = Loadable(
  lazy(() => import("../pages/admin/country/Country"))
);

//Port
export const Port = Loadable(lazy(() => import("../pages/admin/port/Port")));

//Ship
export const Ship = Loadable(lazy(() => import("../pages/admin/ship/Ship")));

//shipper
export const Shipper = Loadable(
  lazy(() => import("../pages/admin/shipper/Shipper"))
);

//ship arrival
export const ShipArrival = Loadable(
  lazy(() => import("../pages/admin/shiparrival/ShipArrival"))
);

//unit
export const Unit = Loadable(lazy(() => import("../pages/admin/unit/index")));

//new ship arrival

export const NewShipArrival = Loadable(
  lazy(() => import("../sections/shipArrival/new/New"))
);
