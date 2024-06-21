import { Outlet, Route, Routes } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem, Container } from "reactstrap";
import { NavLink as Link } from "reactstrap";
import styles from "./page-title.module.scss";

export const PageTitle = () => {
  return (
    <Container
      fluid
      className="  d-flex align-items-center"
      // style={{ minHeight: "3rem", maxHeight: "3rem" }}
    >
      <Breadcrumb className={`flex-nowrap ${styles["page-title"]} `}>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <BreadcrumbItem>
                  <Link
                    color="secondary"
                    href="/"
                    className="text-decoration-none"
                  ></Link>
                </BreadcrumbItem>
                <Outlet />
              </>
            }
          />

          <Route
            path="/document-extraction"
            element={
              <>
                <BreadcrumbItem>
                  <Link
                    color="secondary"
                    href="/"
                    className="text-decoration-none"
                  >
                    <h5 className="mb-0">Document Extraction</h5>
                  </Link>
                </BreadcrumbItem>
                <Outlet />
              </>
            }
          />

          <Route
            path="/chat-bot"
            element={
              <>
                <BreadcrumbItem>
                  <Link
                    color="secondary"
                    href="/"
                    className="text-decoration-none"
                  >
                    <h5 className="mb-0">Chatbot</h5>
                  </Link>
                </BreadcrumbItem>
                <Outlet />
              </>
            }
          />

          <Route
            path="/computer-vision"
            element={
              <>
                <BreadcrumbItem>
                  <Link
                    color="secondary"
                    href="/"
                    className="text-decoration-none"
                  >
                    <h5 className="mb-0">Computer Vision</h5>
                  </Link>
                </BreadcrumbItem>
                <Outlet />
              </>
            }
          />

          <Route
            path="/anomaly-detection"
            element={
              <>
                <BreadcrumbItem>
                  <Link
                    color="secondary"
                    href="/"
                    className="text-decoration-none"
                  >
                    <h5 className="mb-0">Anomaly Detection</h5>
                  </Link>
                </BreadcrumbItem>
                <Outlet />
              </>
            }
          />

          <Route
            path="/voice"
            element={
              <>
                <BreadcrumbItem>
                  <Link
                    color="secondary"
                    href="/"
                    className="text-decoration-none"
                  >
                    <h5 className="mb-0">Voice</h5>
                  </Link>
                </BreadcrumbItem>
                <Outlet />
              </>
            }
          />

          <Route
            path="/Language"
            element={
              <>
                <BreadcrumbItem>
                  <Link
                    color="secondary"
                    href="/"
                    className="text-decoration-none"
                  >
                    <h5 className="mb-0">Language</h5>
                  </Link>
                </BreadcrumbItem>
                <Outlet />
              </>
            }
          />
        </Routes>
      </Breadcrumb>
    </Container>
  );
};

export default PageTitle;
