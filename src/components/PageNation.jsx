import React from "react";

import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
} from "react-icons/md";

export default function PageNation({
  currentSet,
  page,
  btnRange,
  startPage,
  endPage,
  setPage,
  totalSet,
  totalPage,
}) {
  return (
    <nav className="flex">
      {currentSet > 1 && (
        <button onClick={() => setPage(startPage - 1)}>
          <MdKeyboardDoubleArrowLeft />
        </button>
      )}
      {page !== 1 && (
        <button onClick={() => page > 1 && setPage(page - 1)}>
          <MdKeyboardArrowLeft />
        </button>
      )}

      {Array(btnRange)
        .fill(startPage)
        .map((v, i) => {
          if (startPage + i > totalPage) {
            return;
          }
          return (
            <button
              key={i}
              onClick={() => setPage(startPage + i)}
              className={`${
                page === startPage + i
                  ? `active:font-bold bg-slate-400`
                  : "active:font-normal"
              } px-2`}
            >
              {startPage + i}
            </button>
          );
        })}
      {page !== totalPage && (
        <button onClick={() => setPage(page + 1)}>
          <MdKeyboardArrowRight />
        </button>
      )}
      {currentSet !== totalSet && (
        <button onClick={() => setPage(endPage + 1)}>
          <MdKeyboardDoubleArrowRight />
        </button>
      )}
    </nav>
  );
}
