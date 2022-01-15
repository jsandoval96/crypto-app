import { CircularProgress } from "@mui/material";
import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";

import DefaultLayout from "@app/layouts/Default";
import Home from "@app/views/Home";

const Cryptocurrencies = lazy(() => import("@app/views/Cryptocurrencies"));

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
      </Route>
    </Routes>
  );
};

export default App;
