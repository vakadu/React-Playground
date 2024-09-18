import { useState } from "react";
import usePaginate from "./paginate";

export default function Pagination() {
  const { data, page, setPage } = usePaginate();
  return (
    <section>
      {data.slice(page * 10 - 10, page * 10)?.map((pr) => {
        return (
          <section key={pr.id}>
            <div>{pr.title}</div>
          </section>
        );
      })}
      <section>
        <button onClick={() => setPage(page - 1)}>◀</button>
        {[...Array(data.length / 10)].map((_, i) => {
          return <button onClick={() => setPage(i + 1)}>{i + 1}</button>;
        })}
        <button onClick={() => setPage(page + 1)}>▶</button>
      </section>
    </section>
  );
}
