import { Outlet } from "react-router-dom";
import "./output.css";
import Header from "./components/header";
import Footer from "./components/footer";
function App() {
  return (
    <div className="flex flex-col justify-between h-screen bg-[#F7F7F7] p-6">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
