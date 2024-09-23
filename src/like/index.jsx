import { useState } from "react";
import { HeartIcon, SpinnerIcon } from "./icons";

function classNames(...args) {
  //filter(Boolean) removes flasy values like "", false, null, undefined etc..
  return args.filter(Boolean).join(" ");
}

export default function Like() {
  const [isLoading, setIsPending] = useState(false);
  const [liked, setLiked] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  async function likeUnlikeAction() {
    try {
      setIsPending(true);
      setErrorMessage(null);

      const response = await fetch(
        "https://www.greatfrontend.com/api/questions/like-button",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            action: liked ? "unlike" : "like",
          }),
        }
      );

      if (!response.ok) {
        const res = await response.json();
        setErrorMessage(res.message);
        return;
      }

      setLiked(!liked);
    } finally {
      setIsPending(false);
    }
  }

  return (
    <div>
      <button
        onClick={likeUnlikeAction}
        className={classNames(
          "like-button",
          liked ? "like-button--liked" : "like-button--default"
        )}
        disabled={isLoading}
      >
        {isLoading ? <SpinnerIcon /> : <HeartIcon className="" />}
        <span>Like</span>
      </button>
    </div>
  );
}
