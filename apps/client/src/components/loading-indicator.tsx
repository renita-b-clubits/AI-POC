import { Spinner } from "reactstrap";

export const LoadingIndicator = () => {
  return (
    <div className="d-flex justify-content-center align-items-center h-100 w-100">
      <Spinner color="success">Loading...</Spinner>
    </div>
  );
};

export default LoadingIndicator;
