import React, { useEffect, useState } from "react";
import { Button, Modal } from "@/components";
import styles from "./index.module.less";
import { HttpMethod, RequestOptions, http } from "@/utils";
import { useFetch } from "@/hooks";

function Home() {
  const [modal1, setModal1] = useState(false);
  const [modal2, setModal2] = useState(false);

  // useEffect(() => {
  //   const request = http.send({
  //     method: HttpMethod.POST,
  //     url: "http://127.0.0.1:9000/file",
  //   });
  //   setTimeout(() => {
  //     request.cancel();
  //   }, 1000);

  //   setTimeout(() => {
  //     http.send({
  //       url: "http://127.0.0.1:9000/json",
  //     });
  //   }, 2000);
  //   return () => {
  //     request.cancel();
  //   };
  // }, []);

  const [options, setOptions] = useState<RequestOptions>({
    method: HttpMethod.POST,
    url: "http://127.0.0.1:9000/file",
  });
  const [data, loading, error] = useFetch<boolean>(options);
  setTimeout(() => {
    setOptions({ url: "http://127.0.0.1:9000/json" });
  }, 2000);

  return (
    <div className={styles.root}>
      {loading && <div>loading</div>}
      {data && <div>{JSON.stringify(data)}</div>}
      {error && <div style={{ color: "red" }}>{JSON.stringify(error)}</div>}

      <Button className={styles.button} text="show modal1" onClick={() => setModal1(true)} />
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
