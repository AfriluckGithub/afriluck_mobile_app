import { Outlet } from "react-router-dom";
import "./output.css";
import Header from "./components/header";
import Footer from "./components/footer";
function App() {
  return (
    <div className="flex flex-col justify-between h-screen bg-gray-50 p-10">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
