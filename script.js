const postsPerPage = 3;
let currentPage = 1;

function renderPostList() {
  const lang = getLang();
  const tag = document.getElementById("tagFilter").value;
  const category = document.getElementById("categoryFilter").value;
  const keyword = document.getElementById("searchInput").value.toLowerCase();

  const filtered = posts.filter(p => {
    const matchTag = !tag || p.tags.includes(tag);
    const matchCat = !category || p.category === category;
    const matchKeyword = !keyword || p.title[lang].toLowerCase().includes(keyword) || p.content[lang].toLowerCase().includes(keyword);
    return matchTag && matchCat && matchKeyword;
  });

  const start = (currentPage - 1) * postsPerPage;
  const paginated = filtered.slice(start, start + postsPerPage);
  const list = document.getElementById("postList");
  list.innerHTML = "";
  paginated.forEach(p => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = "post.html?id=" + p.id;
    a.textContent = `${p.title[lang]} (${p.date})`;
    li.appendChild(a);
    list.appendChild(li);
  });

  renderPagination(filtered.length);
}

function renderPagination(totalCount) {
  const pageCount = Math.ceil(totalCount / postsPerPage);
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = "";
  for (let i = 1; i <= pageCount; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    btn.onclick = () => {
      currentPage = i;
      renderPostList();
    };
    if (i === currentPage) btn.disabled = true;
    pagination.appendChild(btn);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  currentPage = 1;
  const tagSet = new Set();
  posts.forEach(p => p.tags.forEach(t => tagSet.add(t)));
  const tagFilter = document.getElementById("tagFilter");
  tagSet.forEach(tag => {
    const opt = document.createElement("option");
    opt.value = tag;
    opt.textContent = tag;
    tagFilter.appendChild(opt);
  });
  renderPostList();
});
