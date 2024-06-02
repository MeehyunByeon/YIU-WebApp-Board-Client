import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LoadingSpin from "./components/LoadingSpin";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080"; // 원래 이 부분은 env 환경변수 처리해서 드러나지 않도록 해야 합니다.
axios.defaults.withCredentials = true;

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <React.Suspense fallback={<LoadingSpin />}>
          <App />
        </React.Suspense>
      </QueryClientProvider>
    </RecoilRoot>
  </React.StrictMode>
);

reportWebVitals();
