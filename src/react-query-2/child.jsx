import { useEffect, useState } from "react";
import { getData } from "./api";
import useQuery from "./use-query";

async function getUsers() {
  const response = await getData();
  return response;
}

function Reply({ reply, editReply, showInput, setShowInput, handleDelete }) {
  const [value, setValue] = useState("");

  function updateEdit(id) {
    setShowInput(id);
    setValue(reply.comment);
  }

  return (
    <div style={{ marginLeft: 12 }}>
      <div>{reply.author}</div>
      {showInput === reply.id ? (
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => editReply(e, reply.id, value)}
        />
      ) : (
        <div onDoubleClick={() => updateEdit(reply.id)}>{reply.comment}</div>
      )}
      <button onClick={() => handleDelete(reply.id)}>delete</button>

      {reply.replies?.map((r) => (
        <Reply
          key={reply.id}
          reply={r}
          editReply={editReply}
          showInput={showInput}
          setShowInput={setShowInput}
          handleDelete={handleDelete}
        />
      ))}
    </div>
  );
}

export default function Child() {
  const { data, loading, refetch } = useQuery("/api/users", getUsers);
  const [userData, setUserData] = useState(data);
  const [showInput, setShowInput] = useState();

  useEffect(() => {
    setUserData(data);
  }, [data]);

  function editReply(e, id, value) {
    if (e.code === "Enter") {
      const newData = updateReplies(userData, id, value);
      setUserData(newData);
      setShowInput();
    }
  }

  function updateReplies(data, id, value) {
    return userData.map((user) => {
      if (user.id === id) {
        return {
          ...user,
          comment: value,
        };
      }
      if (user.replies) {
        return {
          ...user,
          replies: updateReplies(user.replies, id, value),
        };
      }
      return user;
    });
  }

  function handleDelete(id) {
    const newData = onDelete(userData, id);
    setUserData(newData);
  }

  function onDelete(data, id) {
    return data
      ?.filter((reply) => reply.id !== id)
      .map((newReply) => {
        if (newReply.replies) {
          return {
            ...newReply,
            replies: onDelete(newReply.replies, id),
          };
        }
        return newReply;
      });
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {userData?.map((reply) => {
        return (
          <Reply
            reply={reply}
            key={reply.id}
            editReply={editReply}
            showInput={showInput}
            setShowInput={setShowInput}
            handleDelete={handleDelete}
          />
        );
      })}

      <button onClick={() => refetch()}>Reftch</button>
    </div>
  );
}
