import React from "react";
import styled from "styled-components";
import { useMediaQuery } from "react-responsive";

const PageHeader = (props) => {
  // 반응형 화면
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 992 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isNotMobile = useMediaQuery({ minWidth: 768 });

  return (
    <Container
      style={{
        paddingTop: isMobile ? 20 : 50,
        paddingBottom: isMobile ? 20 : 50,
        paddingLeft: "15%",
        paddingRight: "15%",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <p
            style={{
              fontSize: isMobile ? 25 : 35,
              fontWeight: "bold",
              paddingTop: 10,
              paddingBottom: 10,
            }}
          >
            {props.title}
          </p>
          <p style={{ fontSize: isMobile ? 17 : 20, fontWeight: "bold" }}>
            {props.subtitle}
          </p>
        </div>
        {isMobile || isTablet ? null : props.image ? (
          <img src={props.image} alt="logo" height="300" width="300" />
        ) : null}
      </div>
    </Container>
  );
};
export default PageHeader;

const Container = styled.div`
  background: linear-gradient(to right bottom, #68568e, #9f5d83);
  color: white;
  /* padding: 3%;
  padding-left: 15%;
  padding-right: 15%; */
  /* display: flex;
  flex-direction: column; */
`;

const TextGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.text`
  font-weight: bold;
  font-size: 4vh;
  padding-top: 1%;
  padding-bottom: 1%;
`;

const SubTitle = styled.text`
  font-weight: bold;
  font-size: 2vh;
`;
