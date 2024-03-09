import React from "react";
import List from "../components/List";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  return (
    <>
      <List />

      <button className="left-1" onClick={() => navigate("/postInput")}>
        글쓰기
      </button>
    </>
  );
}
