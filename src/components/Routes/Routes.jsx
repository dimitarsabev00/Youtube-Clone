import { Routes, Route } from "react-router-dom";
import { Home, Search, Watch } from "../../screens";

const RoutesComp = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/search" element={<Search />} />
      <Route exact path="/watch" element={<Watch />} />
    </Routes>
  );
};

export default RoutesComp;
