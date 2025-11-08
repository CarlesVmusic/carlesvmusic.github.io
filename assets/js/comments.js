document.addEventListener("DOMContentLoaded", () => {
  const boxes = document.querySelectorAll(".comments-box");
  boxes.forEach(box => {
    const thread = box.dataset.thread || "default-thread";
    const listEl = box.querySelector(".comment-list");
    const formEl = box.querySelector(".comment-form");
    const STORAGE_KEY = "cv_comments_" + thread;

    function renderComments() {
      const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      listEl.innerHTML = "";
      data.forEach(c => {
        const item = document.createElement("div");
        item.className = "comment-item";
        item.innerHTML = `
          <div class="comment-meta">${c.name ? c.name : "Anònim"} · ${new Date(c.date).toLocaleString()}</div>
          <div class="comment-text">${c.text.replace(/</g,"&lt;").replace(/>/g,"&gt;")}</div>
        `;
        listEl.appendChild(item);
      });
    }

    renderComments();

    formEl.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = formEl.querySelector("[name='name']").value.trim();
      const text = formEl.querySelector("[name='text']").value.trim();
      if (!text) return;
      const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      data.unshift({
        name,
        text,
        date: new Date().toISOString()
      });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      formEl.reset();
      renderComments();
    });
  });
});
