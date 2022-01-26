import { CircularProgress } from "@mui/material";
import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";

import DefaultLayout from "@app/layouts/Default";
import Home from "@app/views/Home";

const Cryptocurrencies = lazy(() => import("@app/views/Cryptocurrencies"));
const Exchanges = lazy(() => import("@app/views/Exchanges"));
const News = lazy(() => import("@app/views/News"));

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route index element={<Home />} />
        <Route
          path="cryptocurrencies"
          element={
            <Suspense fallback={<CircularProgress />}>
              <Cryptocurrencies />
            </Suspense>
          }
        />
        <Route
          path="exchanges"
          element={
            <Suspense fallback={<CircularProgress />}>
              <Exchanges />
            </Suspense>
          }
        />
        <Route
          path="news"
          element={
            <Suspense fallback={<CircularProgress />}>
              <News />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
};

export default App;
