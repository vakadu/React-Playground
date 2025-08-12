import { memo } from "react";

const Content = () => {
    console.log("content");
    
    return(
          <div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium
        eligendi quam earum, explicabo tempore officia. Hic qui fugiat tenetur
        recusandae deleniti aliquid illum cum! Nulla officia sed magnam
        assumenda tempore.
      </div>
    )
}

export default memo(Content)

