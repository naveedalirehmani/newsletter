import { Outlet } from "react-router-dom";
import Footer from "../components\u0017/custom/footer";

type Props = {};

function Root({}: Props) {
  return (
    <div className="h-screen">
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
}

export default Root;
