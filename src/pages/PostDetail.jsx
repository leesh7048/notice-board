import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deletePost, getPost, updatePost } from "../api/firebase";
import { useAuthContext } from "../context/AuthContext";

export default function PostDetail() {
  const [isUpdate, setIsUpdate] = useState(false);
  const [post, setPost] = useState({});
  const params = useParams();
  const { userInfo } = useAuthContext();

  const { title, content, email, date, postId, userId } = post;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPost(params.id).then((data) => {
      setPost(data);
      setLoading(false);
    });
  }, [params.id]);

  const navigate = useNavigate();
  const handleDelete = () => {
    if (window.confirm("삭제하시겠습니까?")) {
      deletePost(postId);
      navigate("/");
    }
  };
  const handleUpdate = () => {
    setIsUpdate(!isUpdate);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost((post) => ({ ...post, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    updatePost(post);
    setIsUpdate(!isUpdate);
  };

  if (loading) {
    return "loading...";
  }

  return (
    <>
      {!isUpdate ? (
        <div className="w-full pt-5 ">
          <div className="text-[30px] border-t-2 border-t-gray-400 border-b border-b-gray-300 bg-gray-200 p-3">
            {title}
          </div>

          <div className="flex border-b border-b-gray-300 ">
            <div className="w-1/2 flex ">
              <span className="bg-gray-200 flex-auto leading-[48px] pl-3 ">
                이메일
              </span>
              <span className="flex-1 leading-[48px] pl-3">{email}</span>
            </div>
            <div className="w-1/2 flex">
              <span className="bg-gray-200 flex-auto leading-[48px] pl-3 ">
                등록일
              </span>
              <span className="flex-1 leading-[48px] pl-3">
                {date.split("T")[0]}
              </span>
            </div>
          </div>

          <div className="h-[400px] border-b border-b-gray-300 text-[20px] p-3 ">
            {content}
          </div>

          {userInfo?.uid === userId && (
            <div>
              <button
                className="bg-[#2a419a] text-white p-3"
                onClick={handleUpdate}
              >
                수정
              </button>
              <button
                className="bg-[#d1d869] text-white p-3"
                onClick={handleDelete}
              >
                삭제
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="w-full pt-5 ">
          <form onSubmit={handleSubmit}>
            <input
              onChange={handleChange}
              name="title"
              autoFocus
              value={title}
              required
              className="text-[30px] border-t-2 border-t-gray-400 border-b border-b-gray-300 bg-yellow-100 p-3 w-full"
            />

            <div className="flex border-b border-b-gray-300 ">
              <div className="w-1/2 flex ">
                <span className="bg-gray-200 flex-auto leading-[48px] pl-3 ">
                  이메일
                </span>
                <span className="flex-1 leading-[48px] pl-3">{email}</span>
              </div>
              <div className="w-1/2 flex">
                <span className="bg-gray-200 flex-auto leading-[48px] pl-3 ">
                  등록일
                </span>
                <span className="flex-1 leading-[48px] pl-3">
                  {date.split("T")[0]}
                </span>
              </div>
            </div>

            <textarea
              onChange={handleChange}
              name="content"
              value={content}
              required
              className="h-[400px] border-b border-b-gray-300 text-[20px] p-3 w-full bg-yellow-100 "
            />
            <button className="bg-[#2a419a] text-white p-3">저장</button>
          </form>
        </div>
      )}
    </>
  );
}
