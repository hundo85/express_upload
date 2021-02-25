function pageLoad() {
  console.log("Client is running!");
  const form = document.getElementById("uploadForm");

  function blockSubmit(event) {
    event.preventDefault();
    console.log("Upload is blocked!");
  }

  form.addEventListener("submit", blockSubmit);
}

window.addEventListener("load", pageLoad);
