import React from "react";
import { Outlet, Link, useRoutes, type RouteObject } from "react-router-dom";
import Login from "./pages/Login";

const Home = React.lazy(() => import(/* webpackChunkName: "home" */ "./pages/Home"));
const About = React.lazy(() => import(/* webpackChunkName: "about" */ "./pages/About"));

function Suspense(props: React.SuspenseProps) {
  return <React.Suspense fallback={<div>loading...</div>}>{props.children}</React.Suspense>;
}

function Router() {
  let routes: RouteObject[] = [
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: (
            <Suspense>
              <Home />
            </Suspense>
          ),
        },
        {
          path: "/about",
          element: (
            <Suspense>
              <About />
            </Suspense>
          ),
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
  ];
  return useRoutes(routes);
}

function Layout() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </nav>

      <hr />

      <Outlet />
    </div>
  );
}

export default Router;
