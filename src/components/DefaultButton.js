import React from "react";
import { Button, ConfigProvider } from "antd";
import { colors } from "../assets/colors";

const DefaultButton = (props) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            primaryColor: colors.gray_dark,
          },
        },
        token: {
          colorPrimary: colors.sub,
          colorPrimaryHover: colors.main,
          colorPrimaryTextHover: "white",
          fontWeightStrong: "900",
        },
      }}
    >
      <Button
        type="primary"
        block
        size="large"
        style={{ fontWeight: "bold", color: "white" }}
        onClick={props.onClick}
      >
        {props.text}
      </Button>
    </ConfigProvider>
  );
};
export default DefaultButton;
