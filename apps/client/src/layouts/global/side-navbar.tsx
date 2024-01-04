import {
  faHouse,
  faPrint,
  faMicrophoneLines,
  faWandMagicSparkles,
  faLanguage,
  faRobot,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
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
        <RouterNavLink to="/" className="text-decoration-none">
          {({ isActive }) => (
            <Link
              className="text-decoration-none"
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
                <FontAwesomeIcon icon={faHouse} fontSize="1.25rem" />

                <p className="mb-0" style={{ marginTop: "-0.25rem" }}>
                  Home
                </p>
              </div>
            </Link>
          )}
        </RouterNavLink>

        <RouterNavLink
          to="/document-extraction"
          className="text-decoration-none"
        >
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
                  Document Extraction
                </p>
              </div>
            </Link>
          )}
        </RouterNavLink>

        <RouterNavLink to="/chat-bot" className="text-decoration-none">
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
                <FontAwesomeIcon icon={faRobot} fontSize="1.25rem" />

                <p className="mb-0" style={{ marginTop: "-0.25rem" }}>
                  Chatbot
                </p>
              </div>
            </Link>
          )}
        </RouterNavLink>

        <RouterNavLink to="/computer-vision" className="text-decoration-none">
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
                <FontAwesomeIcon icon={faEye} fontSize="1.25rem" />

                <p className="mb-0" style={{ marginTop: "-0.25rem" }}>
                  Computer Vision
                </p>
              </div>
            </Link>
          )}
        </RouterNavLink>

        <RouterNavLink to="/voice" className="text-decoration-none">
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
                <FontAwesomeIcon icon={faMicrophoneLines} fontSize="1.25rem" />

                <p className="mb-0" style={{ marginTop: "-0.25rem" }}>
                  Voice
                </p>
              </div>
            </Link>
          )}
        </RouterNavLink>

        <RouterNavLink to="/anomaly-detection" className="text-decoration-none">
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
                <FontAwesomeIcon
                  icon={faWandMagicSparkles}
                  fontSize="1.25rem"
                />

                <p className="mb-0" style={{ marginTop: "-0.25rem" }}>
                  Anomaly Detection
                </p>
              </div>
            </Link>
          )}
        </RouterNavLink>

        <RouterNavLink to="/language" className="text-decoration-none">
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
                <FontAwesomeIcon icon={faLanguage} fontSize="1.25rem" />

                <p className="mb-0" style={{ marginTop: "-0.25rem" }}>
                  Language
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
