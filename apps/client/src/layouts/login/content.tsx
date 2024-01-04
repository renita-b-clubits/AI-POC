import { Outlet } from "react-router-dom";
import { Container } from "reactstrap";

export const LoginContent = () => {
  return (
    <Container className="h-100 px-lg-5">
      <div className="vstack h-100 gap-5">
        <div className="mt-5">
          <h2 className="mb-0">
            <span className="text-primary">Genyus</span> | AI POCs
          </h2>
        </div>

        <div>
          <h5>Connect, Engage</h5>
          <h5>and Grow with Genyus</h5>
        </div>

        <div className="pb-5">
          <Outlet />
        </div>
      </div>
    </Container>
  );
};

export default LoginContent;
