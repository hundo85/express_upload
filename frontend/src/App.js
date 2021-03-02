import "./App.css";
import React, { useState, useEffect } from "react";

console.log("Client is running!");
//const btn = document.getElementById("submitBtn");

async function uploadFile(event) {
  /*   event.preventDefault();
  console.log("Upload is blocked!"); */

  let formData = new FormData();
  formData.append("name", document.getElementById("username").values);
  formData.append("file", document.getElementById("userfile").files[0]);

  /*     for (var value of formData.values()) {
    console.log(value);
  } */

  await fetch("http://localhost:8000/upload", {
    method: "POST",
    body: formData,
    mode: "no-cors",
  });
}

function App() {
  const [upload, setUpload] = useState(false);

  useEffect(() => {
    if (upload) uploadFile();
    setUpload(false);
  }, [upload]);

  return (
    <div className="App">
      <input type="file" id="userfile" />
      <input type="text" id="username" />
      <button
        type="submit"
        id="submitBtn"
        onClick={() => {
          setUpload(true);
        }}
      >
        Upload
      </button>
    </div>
  );
}

export default App;
