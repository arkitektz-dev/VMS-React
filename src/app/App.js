import React from "react";
import Routes from "./Routes";
import "./App.scss";
import { useSelector } from "react-redux";
const App = () => {
  const state = useSelector((state) => state);

  console.log(state);

  return <Routes />;
};

export default App;
