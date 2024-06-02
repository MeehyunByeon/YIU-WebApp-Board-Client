import React from "react";
import { Spin } from "antd";

const LoadingSpin = (props) => {
  return (
    <div
      style={{ textAlign: "center", alignContent: "center", minHeight: 500 }}
    >
      <Spin size="large" />
    </div>
  );
};
export default LoadingSpin;
