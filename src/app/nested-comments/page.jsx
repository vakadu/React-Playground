"use client";

import { useEffect, useState } from "react";
import { getData } from "./api";

export default function NestedComments() {
  const [data, setData] = useState([]);
  console.log(data);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await getData();
    const newData = await response.json();
    setData(newData);
  };

  const updateComment = (id, value) => {
    const updateReplies = (replies) => {
      return replies.map((reply) => {
        if (reply.id === id) {
          return { ...reply, comment: value };
        }
        if (reply.replies) {
          return { ...reply, replies: updateReplies(reply.replies) };
        }

        return reply;
      });
    };
    setData(updateReplies(data));
  };

  return (
    <div style={{ padding: 24 }}>
      <Reply replies={data} updateComment={updateComment} />
    </div>
  );
}

const Reply = ({ replies, updateComment }) => {
  const [value, setValue] = useState("");
  const [edit, setEdit] = useState(null);

  const handleToggle = (id) => {
    setEdit(id);
  };

  const save = (id) => {
    updateComment(id, value);
    setEdit(null);
    setValue("");
  };

  return (
    <>
      {replies?.map((reply) => {
        return (
          <div
            style={{ border: "1px solid", padding: 16, margin: 16 }}
            key={reply.id}
          >
            <div>{reply.author}</div>
            {edit === reply.id ? (
              <div>
                <input
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                />
                <button onClick={() => save(reply.id)}>Save</button>
              </div>
            ) : (
              <div onClick={() => handleToggle(reply.id)}>{reply.comment}</div>
            )}
            <Reply replies={reply.replies} updateComment={updateComment} />
          </div>
        );
      })}
    </>
  );
};
