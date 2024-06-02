import { Button, ConfigProvider } from "antd";
import React from "react";

const HoverEventButton = (props) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            primaryColor: props.fontColor,
            // primaryColor: colors.gray_dark,
          },
        },
        token: {
          colorPrimary: props.bgColor,
          colorPrimaryHover: props.bgColor_hover,
          colorPrimaryTextHover: props.fontColor_hover,
          fontWeightStrong: 700,
          // colorPrimary: colors.gray_light,
          // colorPrimaryHover: colors.main,
        },
      }}
    >
      <Button
        type="primary"
        size={props.size}
        style={{ fontWeight: 700 }}
        styles={{}}
        onClick={props.onClick}
      >
        {props.title}
      </Button>
    </ConfigProvider>
  );
};
export default HoverEventButton;
