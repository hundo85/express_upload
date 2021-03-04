import "./App.css";
import React, { useState, useEffect } from "react";

console.log("Client is running!");
//const btn = document.getElementById("submitBtn");

async function uploadFile(event) {
  /*   event.preventDefault();
  console.log("Upload is blocked!"); */

  let formData = new FormData();

  // read out the inputs
  let inputs = document.querySelectorAll(".inputText");
  let obj = {};

  for (const elem of inputs) {
    obj[elem.id] = elem.value;
  }
  formData.append("userdata", JSON.stringify(obj));
  formData.append("name", document.getElementById("username").value);
  formData.append("file", document.getElementById("userfile").files[0]);

  console.log(formData);

  /*     for (var value of formData.values()) {
    console.log(value);
  } */

  await fetch("http://localhost:8000/upload", {
    method: "POST",
    body: formData,
    mode: "no-cors",
  });
  console.log("Upload success!");
}

function App() {
  const [upload, setUpload] = useState(false);

  useEffect(() => {
    if (upload) uploadFile();
    setUpload(false);
  }, [upload]);

  return (
    <div className="App">
      <h1>Personal Data</h1>
      <div className="info">
        <input
          className="inputText"
          type="text"
          id="fullName"
          placeholder="Full name"
        />
        <input
          type="text"
          className="inputText"
          id="email"
          placeholder="Email"
        />
        <input
          type="text"
          className="inputText"
          id="zip"
          placeholder="Zip Code"
        />
        <input type="text" className="inputText" id="town" placeholder="Town" />
        <input
          type="text"
          className="inputText"
          id="address"
          placeholder="Address"
        />

        <p>Other</p>
        <div>
          <textarea className="inputText" id="textArea" rows="4"></textarea>
        </div>

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
    </div>
  );
  //onClick={()=>{setUpload(!upload)}}
}

export default App;
