import React from "react";
import { useMediaQuery } from "react-responsive";
import { colors } from "../assets/colors";

const FooterNavBtn = (props) => {
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 992 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isNotMobile = useMediaQuery({ minWidth: 768 });

  return (
    <div
      style={{
        textDecoration: "none",
        cursor: "pointer",
        fontWeight: "bold",
        color: colors.footer_text2,
        fontSize: isMobile ? 14 : 18,
      }}
      onClick={props.onClick}
    >
      {props.text}
    </div>
  );
};

export default FooterNavBtn;
