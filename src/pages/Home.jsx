import React from "react";
import List from "../components/List";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  return (
    <div className="absolute">
      <List />

      <button
        className="absolute right-0 bg-gray-200 p-1 rounded-[10px]"
        onClick={() => navigate("/postInput")}
      >
        글쓰기
      </button>
    </div>
  );
}
