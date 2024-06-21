import { faPrint } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CSSProperties } from "react";
import { NavLink as RouterNavLink } from "react-router-dom";
import { NavLink as Link } from "reactstrap";

export const SIDE_NAVBAR_WIDTH = "4.5rem";

const _activeStyles: CSSProperties = {
  backgroundColor: "white",
  color: "black",
  borderLeft: "0.25rem solid #FF9C27",
  fontSize: "0.625rem",
};

const getActiveStyles = ({
  isActive,
}: {
  isActive: boolean;
}): CSSProperties => {
  return isActive
    ? _activeStyles
    : {
        color: "white",
        fontSize: "0.625rem",
      };
};

export const SideNavbar = () => {
  return (
    <div
      className="d-none d-lg-block h-100 text-align-center bg-primary overflow-y-auto"
      style={{
        width: `calc(${SIDE_NAVBAR_WIDTH} + 0.25rem)`,
      }}
    >
      <div className="vstack h-100 p-0" style={{ width: SIDE_NAVBAR_WIDTH }}>
        <RouterNavLink to="/ocr" className="text-decoration-none">
          {({ isActive }) => (
            <Link
              className="text-decoration-none text-center"
              style={getActiveStyles({ isActive })}
            >
              <div
                className="vstack align-items-center justify-content-center gap-2"
                style={{
                  minWidth: "4.5rem",
                  minHeight: "4.5rem",
                  marginLeft: isActive ? "-0.25rem" : "",
                }}
              >
                <FontAwesomeIcon icon={faPrint} fontSize="1.25rem" />

                <p className="mb-0" style={{ marginTop: "-0.25rem" }}>
                  OCR
                </p>
              </div>
            </Link>
          )}
        </RouterNavLink>
      </div>
    </div>
  );
};

export default SideNavbar;
