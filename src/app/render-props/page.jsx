"use client";

import Clock from "./clock";

const RenderProps = () => {
  return (
    <div>
      <Clock
        render={(time) => {
          return <p>time is {time.toString()}</p>;
        }}
      />
    </div>
  );
};

export default RenderProps;
