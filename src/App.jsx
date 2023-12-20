import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { Header, Routes } from "./components";

const App = () => {
  return (
    <BrowserRouter>
      <div className="flex flex-col h-full">
        <Header />
        <Routes />
      </div>
    </BrowserRouter>
  );
};

export default App;
