import React, { useState } from "react";
import { addPost } from "../api/firebase";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function PostInput() {
  const [post, setPost] = useState({});
  const { userInfo } = useAuthContext();
  function submitDate() {
    const date = new Date();
    const dt = date.toISOString();
    return dt;
  }

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost((post) => ({ ...post, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const saveDate = submitDate();
    addPost(userInfo, post, saveDate);
    navigate("/");
  };

  return (
    <section className="w-full flex flex-col items-center">
      <h2 className="text-2xl my-6 w-[100px] text-center border-x-[1px]">
        글쓰기
      </h2>
      <form
        className="flex flex-col  px-5 border-2 border-gray-300 p-3 w-full "
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          name="title"
          maxLength={70}
          value={post.title ?? ""}
          required
          placeholder="제목"
          className="border-solid border border-gray-300 my-1 p-1  "
          onChange={handleChange}
        />
        <textarea
          name="content"
          required
          className="border-solid border border-gray-300 my-1 resize-none h-96 p-1 "
          placeholder="내용"
          value={post.content ?? ""}
          onChange={handleChange}
        />
        <button>저장</button>
      </form>
    </section>
  );
}
