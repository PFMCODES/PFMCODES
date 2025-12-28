const BATCH_SIZE = 100;
let pages = [];
let allFiles = [];
let isSearching = false;
const searchInput = document.getElementById('input');
const resultsContainer = document.getElementById('results');
let pUrl;

// Load query from URL (?q=...)
window.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const q = params.get("q");
    if (q) {
    searchInput.value = q;
    }
    loadData().then(() => {
    if (q) search(q);
    });
});

document.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
    const para = searchInput.value;
    window.location.href = `?q=${encodeURIComponent(para)}`;
    }
});

// searchInput.addEventListener('input', () => {
//     const query = searchInput.value.trim();
//     if (query.length > 0) {
//     search(query);
//     } else {
//     resultsContainer.innerHTML = '';
//     }
// });

async function loadData() {
    try {
    allFiles = await fetch('../db/files.json').then(res => res.json());
    loadBatch(0);
    } catch (err) {
    console.error("❌ Failed to load file list:", err);
    }
}

function loadBatch(start = 0) {
    const batch = allFiles.slice(start, start + BATCH_SIZE);
    Promise.all(batch.map(file =>
    fetch(`../db/${file}`)
        .then(res => res.ok ? res.json() : null)
        .catch(() => null)
    )).then(data => {
    pages.push(...data.filter(Boolean));
    console.log(`📦 Loaded batch ${start} to ${start + BATCH_SIZE}`);

    if (searchInput.value.trim()) {
        search(searchInput.value.trim());
    }

    if (start + BATCH_SIZE < allFiles.length) {
        setTimeout(() => loadBatch(start + BATCH_SIZE), 200);
    }
    });
}

async function search(query) {
  if (isSearching) return;
  isSearching = true;

  const lower = query.toLowerCase();

  // 1. Local search
  const localResults = pages.filter(p =>
    (p.title && p.title.toLowerCase().includes(lower)) ||
    (p.url && p.url.toLowerCase().includes(lower))
  );

  // 2. Backend search (custom format)
  let backendResults = [];
  try {
    const response = await fetch(`https://search-engine-backend-2ra9.onrender.com/search?query=${encodeURIComponent(query)}`);
    if (response.ok) {
      const data = await response.json();
      backendResults = data.map(r => ({
        title: r.title,
        url: r.link,
        desc: r.description,
        favicon: r.logo
      }));
    }
  } catch (err) {
    console.warn("⚠️ Backend fetch failed:", err.message);
  }

  // 3. Merge and display
  const allResults = [
    ...localResults.map(p => ({
      title: p.title,
      url: p.url,
      desc: "",
      favicon: `https://www.google.com/s2/favicons?sz=64&domain_url=${p.url}`
    })),
    ...backendResults
  ];

  resultsContainer.innerHTML = '';
  allResults.forEach(p => {
    const div = document.createElement('div');
    if (p.url.length > 60) {
      pUrl = p.url.substring(0, 57) + '...';
    }
    if (p.title.length > 60) {
      p.title = p.title.substring(0, 57) + '...';
    }
    div.className = 'result';
    div.innerHTML = `
      <a href="${p.url}" target="_blank">
        <div style="display: flex; align-items: center; gap: 10px;">
          <img style="width: 20px;" src="${p.favicon}" alt="favicon">
          <div>
            <strong>${p.title}</strong><br>
            <small>${pUrl}</small>
            <p style="margin: 5px 0; color: #666; font-size: 13px;">${p.desc}</p>
          </div>
        </div>
      </a>
    `;
    resultsContainer.appendChild(div);
  });

  isSearching = false;
}