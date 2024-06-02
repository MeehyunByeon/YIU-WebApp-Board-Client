import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useLocation, useNavigate } from "react-router-dom";
import { colors } from "../assets/colors";
import { Button, Input, Modal, Popconfirm, message } from "antd";
import LoadingSpin from "../components/LoadingSpin";
import GetDataErrorView from "../components/GetDataError";
import { useRecoilState, useSetRecoilState } from "recoil";
import { PostFormDataAtom, PostFormTypeAtom } from "../recoil/board";
import dayjs from "dayjs";
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import DefaultButton from "../components/DefaultButton";

const PostDetailPage = (props) => {
  // 반응형 화면
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 992 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isNotMobile = useMediaQuery({ minWidth: 768 });

  // 페이지 이동
  const navigate = useNavigate();
  // 이전 페이지에서 데이터 가져오기
  const location = useLocation();

  // 폼 타입 => 작성
  const setFormType = useSetRecoilState(PostFormTypeAtom);
  // 폼 데이터 세팅
  const [formData, setFormData] = useRecoilState(PostFormDataAtom);
  // 비밀번호
  const [pwd, setPwd] = useState("");

  // 등록된 queryClient를 가져옴
  const queryClient = useQueryClient();

  // 게시글 삭제
  const deleteData = useMutation({
    mutationFn: (data) =>
      axios.delete("/board", {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: {
          userId: location.state.data.userId,
          pwd: pwd,
          boardId: location.state.data.boardId,
        },
      }),
    onSuccess: (data, variables) => {
      message.success("게시글 삭제 완료");
      // FAQ 목록 리로드
      queryClient.invalidateQueries("board");
      navigate(-1);
    },
    onError: (e) => {
      if (e.response.status == 403)
        message.error("비밀번호가 일치하지 않습니다!");
      else message.error("잠시 후에 다시 시도해주세요");
    },
  });

  const updateConfirm = (e) => {
    setFormType("update");
    setFormData(location.state.data);
    navigate("/form");
  };

  const deleteConfirm = (e) => {
    setIsModalOpen(true);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div style={{ textAlign: "left" }}>
      <div
        style={{
          marginTop: isMobile ? 50 : 100,
          marginBottom: isMobile ? 50 : 100,
          marginLeft: isMobile ? 30 : isTablet ? 100 : "20%",
          marginRight: isMobile ? 30 : isTablet ? 100 : "20%",
        }}
      >
        {/* 제목 */}
        <p
          style={{
            fontSize: 30,
            fontWeight: "bold",
            color: colors.text_black_color,
          }}
        >
          {location.state.data.title}
        </p>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <p
            style={{
              fontSize: 17,
              fontWeight: "700",
              color: colors.text_body_color,
              marginTop: 30,
              marginBottom: 30,
              whiteSpace: "pre-wrap",
            }}
          >
            <span>{location.state.data.userId}</span>
            {"  |  "}
            <span>
              {dayjs(location.state.data.createdAt).format("YYYY.MM.DD")}
            </span>
          </p>
          <div style={{ display: "flex", flexDirection: "row", gap: 10 }}>
            <Popconfirm
              title="게시글 수정"
              description="게시글을 수정하시겠습니까?"
              onConfirm={updateConfirm}
              okText="수정"
              cancelText="취소"
            >
              <Button type="text" icon={<EditOutlined />} />
            </Popconfirm>
            <Popconfirm
              title="게시글 삭제"
              description="게시글을 삭제하시겠습니까?"
              onConfirm={deleteConfirm}
              okText="삭제"
              cancelText="취소"
              icon={
                <ExclamationCircleOutlined
                  style={{
                    color: "red",
                  }}
                />
              }
            >
              <Button type="text" icon={<DeleteOutlined />} />
            </Popconfirm>
          </div>
        </div>

        {/* 구분선 */}
        <div style={{ height: 2, backgroundColor: colors.gray_light }} />

        {/* 내용 */}
        <p
          style={{
            fontWeight: "600",
            whiteSpace: "pre-line",
            marginTop: 30,
          }}
        >
          {location.state.data.contents}
        </p>
      </div>
      <Modal
        title="유저 확인"
        open={isModalOpen}
        cancelButtonProps={{ style: { display: "none" } }}
        okButtonProps={{ style: { display: "none" } }}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Input
          id={"pwd"}
          value={pwd}
          defaultValue={pwd}
          onChange={(e) => setPwd(e.target.value)}
          // count={{
          //   show: true,
          //   max: 255,
          // }}
          placeholder={`게시글 작성 시 설정한 비밀번호를 입력해주세요.`}
          size={"large"}
          style={{ marginTop: 30, marginBottom: 30 }}
        />
        <DefaultButton text="삭제" onClick={() => deleteData.mutate()} />
      </Modal>
    </div>
  );
};
export default PostDetailPage;
