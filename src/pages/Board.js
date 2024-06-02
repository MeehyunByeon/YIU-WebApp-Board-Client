import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import HoverEventButton from "../components/HoverEventButton";
import PageHeader from "../components/PageHeader";
import { Input, Table } from "antd";
import Column from "antd/es/table/Column";
import styles from "./Board.module.css";
import { colors } from "../assets/colors";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { PostFormTypeAtom } from "../recoil/board";
import PageHeaderImage from "../assets/post_img.svg";
import dayjs from "dayjs";
import { SearchOutlined } from "@ant-design/icons";
import LoadingSpin from "../components/LoadingSpin";
import GetDataErrorView from "../components/GetDataError";

const BoardPage = (props) => {
  // 반응형 화면
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 992 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isNotMobile = useMediaQuery({ minWidth: 768 });

  const {
    data: board,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["board"],
    queryFn: async () => {
      const res = await axios.get("/board");
      return res.data;
    },
  });

  // 페이지 이동
  const navigate = useNavigate();

  // 현재 검색어
  const [searchText, setSearchText] = useState("");
  // 폼 타입 => 작성
  const setFormType = useSetRecoilState(PostFormTypeAtom);

  const boardListHeader = () => {
    return (
      <div style={{ marginBottom: 10 }}>
        <Input
          style={{
            width: isMobile || isTablet ? "100%" : "50%",
            color: colors.text_black_color,
          }}
          size="large"
          placeholder="검색어 입력"
          variant="filled"
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>
    );
  };

  if (isLoading) return <LoadingSpin />;
  if (error) return <GetDataErrorView />;

  return (
    <div>
      <PageHeader
        title="웹앱프로그래밍 게시판"
        subtitle="웹앱프로그래밍 게시판에 오신 걸 환영합니다 : )"
        image={PageHeaderImage}
      />
      <div
        style={{
          marginTop: isMobile ? 50 : 100,
          marginBottom: isMobile ? 0 : 100,
          marginLeft: isMobile ? 10 : isTablet ? 80 : "15%",
          marginRight: isMobile ? 10 : isTablet ? 80 : "15%",
        }}
      >
        <div style={{ textAlign: "end", marginRight: 20 }}>
          <HoverEventButton
            title={"게시글 작성"}
            onClick={() => {
              setFormType("create");
              navigate("/form");
            }}
            size={"middle"}
            bgColor={colors.sub}
            bgColor_hover={colors.main}
            fontColor={"white"}
            fontColor_hover={"white"}
          />
        </div>
        <Table
          size={isMobile ? "middle" : "large"}
          // columns={columns}
          dataSource={board.filter((n) => n.title.includes(searchText))}
          title={() => boardListHeader()}
          // footer={() => "Footer"}
          onRow={(record, rowIndex) => {
            return {
              onClick: (event) => {
                navigate(`/post/${record.boardId}`, {
                  state: { data: record },
                });
              }, // click row
            };
          }}
          pagination={{
            position: ["bottomCenter"],
          }}
          rowClassName={styles.table_row}
        >
          <Column title="작성자" dataIndex="userId" key="userId" width={200} />
          {/* <Column
            title="작성일"
            dataIndex="createdAt"
            key="createdAt"
            width={60}
          /> */}
          <Column title="제목" dataIndex="title" key="title" />
          <Column
            title="작성일"
            dataIndex="createdAt"
            key="createdAt"
            // defaultFilteredValue={(data) => dayjs(data).format("YYYY-MM-DD")}
            width={150}
            render={(text, row, index) => {
              return <>{dayjs(text).format("YYYY.MM.DD")}</>;
            }}
          />
        </Table>
      </div>
    </div>
  );
};
export default BoardPage;
