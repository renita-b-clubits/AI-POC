import { Container } from "reactstrap";
import { Outlet } from "react-router-dom";
// import { SIDE_NAVBAR_WIDTH } from "./side-navbar";

export const PageContent = () => {
  return (
    <Container fluid className="h-100 p-3 overflow-y-scroll">
      <Outlet />
    </Container>
  );
};

export default PageContent;
