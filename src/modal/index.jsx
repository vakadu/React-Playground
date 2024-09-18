import { createPortal } from "react-dom";
import ModalDialog from "./modal-dialog";
import { useState } from "react";

const Modal = () => {
  const [show, setShow] = useState(false);
  return (
    <div>
      <button onClick={() => setShow(!show)}>open dialog</button>
      <ModalDialog show={show} title="Modal" onClose={() => setShow(!show)}>
        One morning, when Gregor Samsa woke from troubled dreams, he found
        himself transformed in his bed into a horrible vermin. He lay on his
        armour-like back, and if he lifted his head a little he could see his
        brown belly, slightly domed and divided by arches into stiff sections.
      </ModalDialog>
    </div>
  );
};

export default Modal;
