import { Row, Container } from "reactstrap";

export const LoginHero = () => {
  return (
    <Container className="h-100 px-lg-5">
      <Row className="h-100 justify-content-center align-items-center">
        <img
          alt="Sample"
          src="src/assets/login/artificial-intelligence.svg"
          className="img-fluid position-absolute"
          style={{
            width: "70%",
            height: "70%",
          }}
        />
      </Row>
    </Container>
  );
};

export default LoginHero;
