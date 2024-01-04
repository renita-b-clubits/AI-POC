import { faBell, faQuestionCircle } from "@fortawesome/free-regular-svg-icons";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import style from "./top-navbar.module.scss";
import menuIndicator from "../../assets/navbar/top/menu-indicator.png";
import avatar from "../../assets/navbar/top/avatar.png";
import {
  Collapse,
  Nav,
  NavItem,
  NavLink,
  Button,
  UncontrolledDropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Navbar,
  NavbarBrand,
} from "reactstrap";
import { useAuthContext } from "../../shared/hooks/use-auth";

export const TopNavbar = () => {
  const [isOpen] = React.useState(false);

  const auth = useAuthContext();

  const handleLogout = () => {
    auth.dispatcher({ type: "reset-user" });
  };

  return (
    <>
      <Navbar
        expand="lg"
        sticky="top"
        className={`shadow-sm p-0 ps-0 ${style["menu-indicator"]}`}
        style={{ minHeight: "4.5rem", maxHeight: "4.5rem" }}
      >
        <NavbarBrand
          className="bg-dark-subtle d-flex justify-content-center align-items-center"
          style={{ height: "4.5rem", width: "4.5rem", marginRight: "0.5rem" }}
        >
          <img
            src={menuIndicator}
            style={{
              width: "2.0625rem",
              height: "2.1875rem",
            }}
          />
        </NavbarBrand>

        <NavbarBrand color="primary">
          <h5 className="mb-0">
            <span className="text-primary">Genyus</span> | AI POCs
          </h5>

          {/* <img
            alt="Sample"
            src="/images/navbar/top/logo.png"
            className=""
            style={{
              width: "8.375rem",
              height: "3.17313rem",
            }}
          /> */}
        </NavbarBrand>

        <Collapse isOpen={isOpen} navbar>
          <Nav className="ms-auto align-items-center" navbar>
            <NavItem style={{ marginRight: "0.75rem" }}>
              <NavLink>
                <Button color="primary" outline>
                  <p className="hstack gap-2 mb-0">
                    <FontAwesomeIcon icon={faLocationDot} />

                    <span className="mb-0">Dallas</span>
                  </p>
                </Button>
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink>
                <Button color="link" className="rounded-circle">
                  <FontAwesomeIcon size="xl" icon={faQuestionCircle} />
                </Button>
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink>
                <Button
                  color="link"
                  className="rounded-circle position-relative"
                >
                  <FontAwesomeIcon size="xl" icon={faBell} />
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    99+
                    <span className="visually-hidden">unread messages</span>
                  </span>
                </Button>
              </NavLink>
            </NavItem>

            <UncontrolledDropdown
              direction="start"
              nav
              inNavbar
              style={{ marginLeft: "0.75rem" }}
            >
              <DropdownToggle nav>
                <div className="position-relative">
                  <img
                    src={avatar}
                    alt=""
                    className="img-thumbnail rounded"
                  ></img>
                  <span className="position-absolute top-0 start-100 translate-middle p-2 bg-success border border-light rounded-circle">
                    <span className="visually-hidden">New alerts</span>
                  </span>
                </div>
              </DropdownToggle>

              <DropdownMenu>
                <DropdownItem onClick={handleLogout}>Logout</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
      </Navbar>
    </>
  );
};

export default TopNavbar;
