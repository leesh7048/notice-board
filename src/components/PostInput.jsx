import React, { useState } from "react";
import { addPost } from "../api/firebase";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function PostInput() {
  const [post, setPost] = useState({});
  const { user } = useAuthContext();

  const navigate = useNavigate();

  function submitDate() {
    const date = new Date();
    const dt = date.toISOString();
    return dt;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost((post) => ({ ...post, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const userInfo = user;
    const saveDate = submitDate();
    addPost(userInfo, post, saveDate);
    navigate("/");
  };

  return (
    <section className="w-full text-center">
      <h2 className="text-2xl">글쓰기</h2>
      <form className="flex flex-col  px-5 " onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={post.title ?? ""}
          required
          className="border-solid border-2 border-black my-1  "
          onChange={handleChange}
        />
        <textarea
          name="content"
          required
          className="border-solid border-2 border-black my-1 resize-none "
          value={post.content ?? ""}
          onChange={handleChange}
        />
        <button>저장</button>
      </form>
    </section>
  );
}
