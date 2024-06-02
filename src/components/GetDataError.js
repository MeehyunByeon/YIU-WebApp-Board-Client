import React from "react";
import { Result } from "antd";
import HoverEventButton from "./HoverEventButton";
import { colors } from "../assets/colors";

const GetDataErrorView = (props) => {
  return (
    <Result
      status="500"
      title="데이터를 불러올 수 없음"
      subTitle={`잠시 후에 다시 시도해주세요.`}
      extra={
        <HoverEventButton
          title={"메인 화면으로 이동"}
          //   onClick={() => setAnswerInput(true)}
          size={"middle"}
          bgColor={colors.sub}
          bgColor_hover={colors.main}
          fontColor={"white"}
          fontColor_hover={"white"}
        />
      }
    />
  );
};
export default GetDataErrorView;
