import React from "react";
import List from "../components/List";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <List />
      <Link to="/ItemInput">글쓰기</Link>
    </>
  );
}
