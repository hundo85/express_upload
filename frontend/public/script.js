function pageLoad() {
  console.log("Client is running!");
  const form = document.getElementById("uploadForm");

  async function upload(event) {
    event.preventDefault();
    console.log("Upload is blocked!");

    let formData = new FormData();
    formData.append("name", document.getElementById("username").values);
    formData.append("file", document.getElementById("userfile").files[0]);

    /*     for (var value of formData.values()) {
      console.log(value);
    } */

    await fetch("/upload", {
      method: "POST",
      body: formData,
    });
  }

  form.addEventListener("submit", upload);
}

window.addEventListener("load", pageLoad);
