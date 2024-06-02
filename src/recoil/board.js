import { atom } from "recoil";

// 게시글 form 타입 => 작성 || 수정
export const PostFormTypeAtom = atom({
  key: "PostFormTypeAtom",
  default: "create",
});

// 게시글 form 데이터
export const PostFormDataAtom = atom({
  key: "PostFormDataAtom",
  default: {},
});
