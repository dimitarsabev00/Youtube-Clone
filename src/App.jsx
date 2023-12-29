import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { Routes } from "./components";

const App = () => {
  return (
    <BrowserRouter>
      <div className="flex flex-col h-full">
        <Routes />
      </div>
    </BrowserRouter>
  );
};

export default App;
