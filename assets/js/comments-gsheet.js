// URL del teu Google Apps Script (ja amb la teva)
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyDXdV2Du-uR7CAf1KT113KHzofBe-yWX6pmWTfrGMpJvqH6qI3f1vo3XFqXzfaFsBjvg/exec";

async function loadComments() {
  try {
    const res = await fetch(GOOGLE_SCRIPT_URL + "?action=list");
    const data = await res.json();
    const listEl = document.getElementById("commentList");
    listEl.innerHTML = "";
    (data.comments || []).forEach(c => {
      const div = document.createElement("div");
      div.className = "comment-item";
      div.innerHTML = `
        <div class="comment-meta">${c.name || "Anònim"} · ${c.date || ""}</div>
        <div class="comment-text">${c.text || ""}</div>
      `;
      listEl.appendChild(div);
    });
  } catch (e) {
    console.warn("No s'han pogut carregar els comentaris", e);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("commentForm");
  const errorMsg = document.getElementById("errorMsg");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    errorMsg.style.display = "none";
    const formData = new FormData(form);
    const name = formData.get("name");
    const text = formData.get("text");
    if (!text) {
      errorMsg.textContent = "Escriu un comentari abans d'enviar.";
      errorMsg.style.display = "block";
      return;
    }
    try {
      const res = await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        body: new URLSearchParams({
          action: "add",
          name,
          text
        })
      });
      const data = await res.json();
      if (data.status === "ok") {
        form.reset();
        loadComments();
      } else {
        errorMsg.textContent = "No s'ha pogut enviar. Revisa la configuració del Google Script.";
        errorMsg.style.display = "block";
      }
    } catch (err) {
      errorMsg.textContent = "Error d'enviament. Revisa la configuració del Google Script.";
      errorMsg.style.display = "block";
    }
  });

  loadComments();
});
