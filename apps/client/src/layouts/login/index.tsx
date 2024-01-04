import { Container, Row, Col } from "reactstrap";
import LoginHero from "./hero";
import LoginContent from "./content";

export const Login = () => {
  return (
    <Container fluid className="h-100">
      <Row className="h-100">
        <Col md="7" className="bg-primary h-100">
          <LoginHero />
        </Col>

        <Col className="h-100 overflow-scroll">
          <LoginContent />
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
