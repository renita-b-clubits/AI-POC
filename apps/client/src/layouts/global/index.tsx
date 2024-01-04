import BottomNavbar from "./bottom-navbar";
import SideNavbar from "./side-navbar";
import TopNavbar from "./top-navbar";
import Page from "./page";

export const GlobalLayout = () => {
  return (
    <>
      <div className="vstack h-100 overflow-hidden">
        <TopNavbar />

        <div className="hstack flex-grow-1 overflow-hidden h-100 w-100">
          <SideNavbar />

          <Page />
        </div>

        <BottomNavbar />
      </div>
    </>
  );
};

export default GlobalLayout;
