function pageLoad() {
  console.log("Client is running!");
  const form = document.getElementById("uploadForm");

  function blockSubmit(event) {
    event.preventDefault();
    console.log("Upload is blocked!");

    let formData = new FormData();
    formData.append("name", event.target[0].value);
    formData.append("file", event.target[1].value);

    for (var value of formData.values()) {
      console.log(value);
    }
  }

  form.addEventListener("submit", blockSubmit);
}

window.addEventListener("load", pageLoad);
