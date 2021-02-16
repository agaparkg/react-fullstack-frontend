import React from "react";
import { Spinner } from "reactstrap";

const Loading = () => {
  return (
    <div className="loading">
      <Spinner color="primary" />
    </div>
  );
};

export default Loading;
