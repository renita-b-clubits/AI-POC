import { Card, CardBody } from "reactstrap";

export const _mobileAppSnapshotImageHeight = "18.1875rem";
export const _loginBannerCardHeight = "13.5rem";

export const LoginBanner = () => {
  return (
    <Card
      className="border-0"
      style={{
        height: _loginBannerCardHeight,
        borderRadius: "1.25rem",
        background:
          "linear-gradient(180deg, #102F47 0%, rgba(47, 27, 27, 0.00) 100%)",
        marginTop: `calc(${_mobileAppSnapshotImageHeight} - ${_loginBannerCardHeight})`,
      }}
    >
      <CardBody className="d-flex flex-column">
        <div className="z-1">
          <h6 className="text-white">Your Next-Gen Practice Experience</h6>
          <h6 className="text-white">now in your hands</h6>
        </div>

        <div className="h-100 d-flex flex-column justify-content-center">
          <img
            alt="Sample"
            src="/images/login/app-store-buttons.png"
            className="img-fluid"
            style={{
              width: "14.9375rem",
              height: "2.3125rem",
            }}
          />
        </div>
      </CardBody>

      <div className="position-relative">
        <img
          alt="Sample"
          src="/images/login/mobile-app-snapshot.png"
          className="img-fluid position-absolute bottom-0 end-0"
          style={{
            width: "17.0625rem",
            height: _mobileAppSnapshotImageHeight,
          }}
        />
      </div>
    </Card>
  );
};

export default LoginBanner;
