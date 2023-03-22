import React from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./componets/Header";
import Home from "./pages/Home";

// import Cart from "./pages/Cart";
// import NotFound from "./pages/NotFound";
// import pizzas from "./assets/pizza.json";

import "./scss/app.scss";

const Cart = React.lazy(() =>
  import(/* webpackChunkName: "Cart" */ "./pages/Cart")
);
const NotFound = React.lazy(() =>
  import(/* webpackChunkName: "NotFound" */ "./pages/NotFound")
);

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/cart"
            element={
              <React.Suspense fallback={<div>Загрузка...</div>}>
                <Cart />
              </React.Suspense>
            }
          />
          <Route
            path="*"
            element={
              <React.Suspense fallback={<div>Загрузка...</div>}>
                <NotFound />
              </React.Suspense>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;

// path='*'  так обозначается последняя страница в Route

// const AppContext = React.createContext(); объеденили App.js и search.lsx
