import logo from "./logo.svg";
import "./App.css";
import { useMediaQuery } from "react-responsive";
import { colors } from "./assets/colors";
import FooterNavBtn from "./components/FooterNavBtn";

const Layout = (props) => {
  const { className, children } = props;

  // 반응형 화면
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 992 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isNotMobile = useMediaQuery({ minWidth: 768 });

  // 새 탭 열기
  const handleOpenNewTab = (url) => {
    window.open(url, "_blank", "noopener, noreferrer");
  };

  return (
    <div className="App">
      {/* <div>
        <h2>용인대학교</h2>
        <h1>웹앱프로그래밍</h1>
      </div> */}
      <div style={{ minHeight: 500 }}>{children}</div>
      <div>
        <div
          style={{
            paddingTop: isMobile ? 30 : 60,
            paddingBottom: isMobile ? 30 : 60,
            paddingLeft: isMobile ? 30 : 120,
            paddingRight: isMobile ? 30 : 120,
            backgroundColor: colors.footer_bg,
            color: colors.footer_text2,
            marginTop: 100,
          }}
        >
          <div>
            <p style={{ fontSize: isMobile ? 14 : 15 }}>
              <FooterNavBtn
                text={"AI Service Lab"}
                onClick={() =>
                  handleOpenNewTab("http://aiservicelab.yongin.ac.kr")
                }
              />
              <br />
              주소 : 경기도 용인시 처인구 용인대학로134 보건복지과학대학1동 7203
              <br />
              이메일 : yiuaiservicelab@gmail.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
