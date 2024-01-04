import { faSearch, faMessage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Navbar,
  NavbarBrand,
  NavItem,
  Collapse,
  NavLink,
  Button,
  Nav,
} from "reactstrap";
import React from "react";

export const BottomNavbar = () => {
  const [isOpen] = React.useState(false);

  return (
    <Navbar
      expand="lg"
      sticky="bottom"
      container="fluid"
      className="border-top p-0"
      style={{ maxHeight: "2rem" }}
    >
      <NavbarBrand>
        <h5 className="text-primary">g</h5>
      </NavbarBrand>

      <Collapse isOpen={isOpen} navbar>
        <Nav className="ms-auto align-items-center" navbar>
          <NavItem>
            <NavLink className="py-0">
              <Button
                size="sm"
                color="secondary"
                className="rounded-circle"
                style={{ transform: "scale(0.75)" }}
              >
                <FontAwesomeIcon icon={faSearch} />
              </Button>
            </NavLink>
          </NavItem>

          <NavItem>
            <NavLink className="py-0">
              <span>zoom</span>
            </NavLink>
          </NavItem>

          <NavItem>
            <NavLink className="py-0">
              <div className="vstack">
                <input
                  type="range"
                  min="0"
                  max="100"
                  color="white"
                  style={{
                    accentColor: "#BFBFBF",
                  }}
                />
                <div
                  className="hstack justify-content-between"
                  style={{ marginTop: "-0.75rem" }}
                >
                  <span>+</span>
                  <span>-</span>
                </div>
              </div>
            </NavLink>
          </NavItem>

          <NavItem>
            <NavLink className="py-0">
              <span>reset</span>
            </NavLink>
          </NavItem>

          <NavItem>
            <NavLink href="" className="py-0">
              <Button
                size="sm"
                color="secondary"
                className="rounded-circle"
                style={{ transform: "scale(0.75)" }}
              >
                <FontAwesomeIcon icon={faMessage} />
              </Button>
            </NavLink>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default BottomNavbar;
