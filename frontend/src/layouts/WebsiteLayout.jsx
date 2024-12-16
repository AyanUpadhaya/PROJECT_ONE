import { Outlet } from "react-router-dom";
import Header from "../components/webiste/Header";

function WebsiteLayout (){
  return (
    <>
      <Header></Header>
      <main className="container">
        <Outlet></Outlet>
      </main>
    </>
  );
};

export default WebsiteLayout;
