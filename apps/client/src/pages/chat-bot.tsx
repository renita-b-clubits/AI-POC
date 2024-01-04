import { Alert } from "reactstrap";

export const ChatBox = () => {
  return (
    <>
      <Alert color="info">
        <h4 className="alert-heading">Information</h4>
        <p>
          This page is under active development. The contents of this page is
          coming soon.
        </p>
      </Alert>
    </>
  );
};

export default ChatBox;
