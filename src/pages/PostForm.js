import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useLocation, useNavigate } from "react-router-dom";
import { colors } from "../assets/colors";
import { Button, Form, Input, Popconfirm, message } from "antd";
import LoadingSpin from "../components/LoadingSpin";
import GetDataErrorView from "../components/GetDataError";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { PostFormDataAtom, PostFormTypeAtom } from "../recoil/board";
import dayjs from "dayjs";
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import PageHeader from "../components/PageHeader";
import TextArea from "antd/es/input/TextArea";
import FormLabelText from "../components/FormLabel";
import DefaultButton from "../components/DefaultButton";

const PostFormPage = (props) => {
  // 반응형 화면
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 992 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isNotMobile = useMediaQuery({ minWidth: 768 });

  // 페이지 이동
  const navigate = useNavigate();

  // 폼 타입 => 작성 || 수정
  const formType = useRecoilValue(PostFormTypeAtom);
  // 폼 데이터 세팅
  const [formData, setFormData] = useRecoilState(PostFormDataAtom);

  // 등록된 queryClient를 가져옴
  const queryClient = useQueryClient();

  // 데이터
  const [form, setForm] = useState({
    boardId: {
      value: formData.boardId,
      type: "textInput",
      // rules: {
      //   isRequired: true,
      // },
      valid: false,
    },
    userId: {
      value: formData.userId,
      type: "textInput",
      rules: {
        isRequired: true,
      },
      valid: false,
    },
    pwd: {
      value: "",
      type: "textInput",
      rules: {
        isRequired: true,
      },
      valid: true,
    },
    title: {
      value: formData.title,
      type: "textInput",
      rules: {
        isRequired: true,
      },
      valid: false,
    },
    contents: {
      value: formData.contents,
      type: "textInput",
      rules: {
        isRequired: true,
      },
      valid: false,
    },
  });

  // 게시글 생성
  const createData = useMutation({
    mutationFn: async (data) =>
      await axios({
        method: "POST",
        url: "/board",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: data,
      }),
    onSuccess: (data, variables) => {
      message.success("게시글 등록 완료");
      // 게시글 목록 리로드
      queryClient.invalidateQueries("게시글");
      // 게시글 목록으로 이동
      navigate(-1);
    },
    onError: (e) => {
      message.error("잠시 후에 다시 시도해주세요");
    },
    // onSettled: () => {
    //   console.log("결과에 관계 없이 무언가 실행됨");
    // },
  });

  // 게시글 수정
  const updateData = useMutation({
    mutationFn: async (data) =>
      await axios({
        method: "PUT",
        url: "/board",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: data,
      }),
    onSuccess: (data, variables) => {
      message.success("게시글 수정 완료");
      // 게시글 목록 리로드
      queryClient.invalidateQueries("게시글");
      // 게시글 상세보기로 이동
      navigate(-2);
    },
    onError: (e) => {
      if (e.response.status == 403)
        message.error("비밀번호가 일치하지 않습니다!");
      else message.error("잠시 후에 다시 시도해주세요");
    },
    // onSettled: () => {
    //   console.log("결과에 관계 없이 무언가 실행됨");
    // },
  });

  // 유효성 검사 함수
  const validateForm = (form) => {
    let isValid = true;
    const updatedForm = Object.keys(form).reduce((acc, key) => {
      const isRequired = form[key].rules?.isRequired || false;
      const value = form[key].value;
      let valid = true;

      // 필수 입력값 검사
      if (isRequired && !value.trim()) {
        valid = false;
        isValid = false;
      }

      acc[key] = { ...form[key], valid };
      return acc;
    }, {});

    // 업데이트된 폼 상태를 설정
    setForm(updatedForm);
    return isValid;
  };

  // 제출
  const onSubmitForm = () => {
    // 데이터 준비
    let data = Object.keys(form).reduce((acc, key) => {
      acc[key] = form[key].value;
      return acc;
    }, {});

    // 유효성 검사
    const isFormValid = validateForm(form);
    if (!isFormValid) {
      message.error("입력하지 않은 항목이 있습니다.");
      return;
    }

    // API 요청
    formType === "create" ? createData.mutate(data) : updateData.mutate(data);
  };

  // 텍스트인풋 업데이트
  const onChange = (e) => {
    setForm((prevState) => ({
      ...prevState,
      [e.target.id]: {
        ...prevState[e.target.id],
        value: e.target.value,
      },
    }));
  };

  return (
    <div>
      <PageHeader
        title={formType == "create" ? "게시글 작성" : "게시글 수정"}
        // subtitle="DevTogether의 다양한 소식을 알려드립니다."
      />
      <Form
        name="wrap"
        labelCol={
          {
            // flex: "120px",
          }
        }
        labelAlign="left"
        labelWrap
        wrapperCol={{
          flex: 1,
        }}
        colon={false}
        style={{
          marginTop: 100,
          marginBottom: 150,
          marginLeft: isMobile ? 30 : isTablet ? 100 : "25%",
          marginRight: isMobile ? 30 : isTablet ? 100 : "25%",
        }}
        layout="vertical"
        variant="filled"
      >
        <Form.Item
          label={<FormLabelText text="아이디" />}
          name="userId"
          style={{ marginBottom: 30 }}
          required
        >
          <Input
            id={"userId"}
            value={form.userId.value}
            defaultValue={form.userId.value}
            onChange={onChange}
            count={{
              show: true,
              max: 30,
            }}
            placeholder={`아이디 입력`}
            size={"large"}
            disabled={formType == "update" ? true : false}
          />
        </Form.Item>
        <Form.Item
          label={<FormLabelText text="비밀번호" />}
          name="pwd"
          style={{ marginBottom: 30 }}
          required
        >
          <Input
            id={"pwd"}
            value={form.pwd.value}
            defaultValue={form.pwd.value}
            onChange={onChange}
            count={{
              show: true,
              max: 255,
            }}
            placeholder={`비밀번호 입력 (글 수정/삭제 시 필요함)`}
            size={"large"}
          />
        </Form.Item>
        <Form.Item
          label={<FormLabelText text="제목" />}
          name="title"
          style={{ marginBottom: 30 }}
          required
        >
          <Input
            id={"title"}
            value={form.title.value}
            defaultValue={form.title.value}
            onChange={onChange}
            count={{
              show: true,
              max: 100,
            }}
            placeholder={`제목 입력`}
            size={"large"}
          />
        </Form.Item>

        <Form.Item
          label={<FormLabelText text="내용" />}
          name="contents"
          style={{ marginBottom: 30 }}
          required
        >
          {/* {console.log("데이터: ", form.contents.value)} */}
          <TextArea
            id={"contents"}
            value={form.contents.value}
            defaultValue={form.contents.value}
            onChange={onChange}
            placeholder={`내용 입력`}
            autoSize={{
              minRows: 15,
              // maxRows: 100,
            }}
            count={{
              show: true,
              max: 3000,
            }}
            size={"large"}
          />
        </Form.Item>

        <div style={{ marginTop: 100 }}>
          <Form.Item>
            <DefaultButton text={"완료"} onClick={() => onSubmitForm()} />
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};
export default PostFormPage;
