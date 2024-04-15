import React, { useEffect, useState } from "react";
import Post from "./Post";
import { getPosts } from "../api/firebase";
import PageNation from "./PageNation";
import { useAuthContext } from "../context/AuthContext";

export default function List() {
  const [allPost, setAllPost] = useState();
  const [myPost, setMyPost] = useState(false);
  const [page, setPage] = useState(1); //현재 페이지수
  const { userInfo } = useAuthContext();

  const totalPost =
    myPost && userInfo
      ? allPost?.filter((post) => post.userId === userInfo.uid).length
      : allPost?.length; // 총 게시물 수
  const pageRange = 3; // 페이지당 보여줄 게시물 수
  const btnRange = 3; // 보여질 페이지 버튼의 개수
  const currentSet = Math.ceil(page / btnRange); // 현재 버튼이 몇번째 세트인지 나타내는 수
  const startPage = (currentSet - 1) * btnRange + 1; // 현재 보여질 버튼의 첫번째 수
  const endPage = startPage + btnRange - 1; // 현재 보여질 버튼의 마지막 수
  const totalPage = Math.ceil(totalPost / pageRange); // 총 페이지
  const totalSet = Math.ceil(Math.ceil(totalPost / pageRange) / btnRange); // 전체 버튼 세트 수
  const startPost = (page - 1) * pageRange + 1; // 시작 게시물 번호
  const endPost = startPost + pageRange - 1; // 끝 게시물 번호

  useEffect(() => {
    getPosts().then((snap) => setAllPost(sortDate(snap)));
  }, []);

  function sortDate(list) {
    const sorted_list = [...list].sort(function (a, b) {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

    return sorted_list;
  }
  const handlePostsFilterClick = (e) => {
    e.target.value === "MyPost" ? setMyPost(true) : setMyPost(false);
    setPage(1);
  };

  return (
    <div className="flex flex-col ">
      <div>
        <select name="post" id="" onChange={handlePostsFilterClick}>
          <option value="AllPost">AllPost</option>
          {userInfo && <option value="MyPost">MyPost</option>}
        </select>
      </div>
      <table className="mt-1 w-[1024px] table-fixed">
        <colgroup>
          <col className="w-[88px]" />
          <col />
          <col className="w-[300px]" />
          <col className="w-[200px]" />
        </colgroup>
        <thead>
          <tr className="border-collapse border-b-gray-500 border-b">
            <th scope="col" className=" py-3">
              번호
            </th>
            <th>제목</th>
            <th>이메일</th>
            <th>날짜</th>
          </tr>
        </thead>
        <tbody>
          {myPost && userInfo
            ? allPost
                ?.filter((post) => post.userId === userInfo.uid)
                .slice(startPost - 1, endPost)
                .map((post) => (
                  <Post
                    key={post.postId}
                    post={post}
                    allPost={allPost?.filter(
                      (post) => post.userId === userInfo.uid
                    )}
                  />
                ))
            : allPost
                ?.slice(startPost - 1, endPost)
                .map((post) => (
                  <Post key={post.postId} post={post} allPost={allPost} />
                ))}
        </tbody>
      </table>
      <div className="flex justify-center">
        <PageNation
          totalPage={totalPage}
          currentSet={currentSet}
          page={page}
          btnRange={btnRange}
          startPage={startPage}
          endPage={endPage}
          setPage={setPage}
          totalSet={totalSet}
        />
      </div>
    </div>
  );
}
