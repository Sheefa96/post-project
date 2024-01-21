import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = (props: { children: React.ReactNode }): JSX.Element => {
  const { children } = props;

  // checking on condition wether user is authenticated
  const isLoggedIn: boolean =
    localStorage.getItem("username") === "admin" &&
    localStorage.getItem("password") === "admin@123";

  const location = useLocation();

  const hasPermission = (): boolean => {
    if (location.pathname === "/posts") {
      return true;
    } else if (
      location.pathname.startsWith("/posts/") &&
      location.pathname !== "/posts/"
    ) {
      return true;
    }
    // By default, deny access if the route is not matched
    return false;
  };
  return isLoggedIn && hasPermission() ? (
    <>{children}</>
  ) : (
    <Navigate
      replace={true}
      to="/"
      state={{ from: `${location.pathname}${location.search}` }}
    />
  );
};
export { PrivateRoute };
