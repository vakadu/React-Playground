'use client'

import { useEffect, useState } from "react";

function useLockBodyScroll(status = true) {

    useEffect(() => {

        const style = document.body.style.overflow;
        console.log(style);
        

        if(status) {
            document.body.style.overflow = 'hidden'
        }

        return () => {
            document.body.style.overflow = style
        }

    }, [status])

}

export default function Page() {
    const [locked, toggleLocked] = useState(false);
    useLockBodyScroll(locked)

  return (
    <div>
      <button onClick={() => toggleLocked(!locked)}>
        {locked ? "Unlock" : "Lock"}
      </button>
    </div>
  );
}
