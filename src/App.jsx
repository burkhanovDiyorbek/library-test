import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Admin from "./pages/Admin/Admin";
import Home from "./pages/Home/Home";
import Bookslist from "./pages/Admin/Bookslist";
import Order from "./pages/Admin/Order";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="admin" element={<Admin />}>
            <Route index element={<Bookslist />} />
            <Route path="orders" element={<Order />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default App;
