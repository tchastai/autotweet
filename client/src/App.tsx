import React from "react";

import { registerRootComponent } from "expo";
import { Provider } from "react-redux";

import store from "./store/index";
import Navigation from "./components/Navigation";

export default function App() {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}

registerRootComponent(App);
