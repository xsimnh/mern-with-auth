import React, { useState } from "react";
import { Button, Modal } from "@/components";

function Home() {
  const [modal1, setModal1] = useState(false);
  const [modal2, setModal2] = useState(false);

  return (
    <div>
      <Button text="show modal1" onClick={() => setModal1(true)} />
      <Button text="show modal2" onClick={() => setModal2(true)} />
      <Button icon="c-modal-closable" />
      <Button theme text="theme button" />
      <Modal
        onClose={() => setModal1(false)}
        visible={modal1}
        title="modal1 header"
        buttons={[{ text: "ok", theme: true }, { text: "cancel" }]}>
        <h1>modal1</h1>
      </Modal>
      <Modal onClose={() => setModal2(false)} visible={modal2}>
        <h1>modal2</h1>
      </Modal>
    </div>
  );
}

export default Home;
