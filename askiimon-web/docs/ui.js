import hl from "https://esm.sh/@pfmcodes/highlight.js@1.0.0";
import javascript from "https://esm.sh/@pfmcodes/highlight.js/es/languages/javascript.js";
import bash from "https://esm.sh/@pfmcodes/highlight.js/es/languages/bash.js";
import html from "https://esm.sh/@pfmcodes/highlight.js/es/languages/xml.js";
import searchJS from './search.js';

const apiJson = await fetch("./api.json").then(res => res.json());
console.log(apiJson);

const body = document.body;
let nav = `
<div class="left">
    <svg width="70%" height="100" viewBox="0 0 750 189" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M11.776 91.016L32.768 59.4H42.752L63.744 91.016H52.48L37.76 67.592L23.04 91.016H11.776Z" fill="#9A82F2"/>
        <path d="M131.68 150.616H65.12V141.4H131.68V150.616Z" fill="#5FC281"/>
        <path d="M185.688 98.5625H135.688V90.5H185.688V98.5625Z" fill="#F16D8E"/>
        <path d="M261.488 90.2H279.28V135H274.16V114.52H256.24V135H251.12V100.888L261.488 90.2ZM256.24 102.104V109.912H274.16V94.808H263.344L256.24 102.104ZM294.551 90.2H312.599L315.991 95.448L312.727 98.648L310.103 94.808H296.471L294.551 96.856V105.112L297.111 108.824H313.175L317.719 115.608V130.328L313.239 135H292.247L289.431 131.032L292.631 127.64L294.615 130.392H311.063L312.599 129.048V116.184L310.679 113.432H294.551L289.431 105.816V95.512L294.551 90.2ZM351.614 90.2H358.334L340.798 107.992L359.294 135H353.79L337.534 111.384L329.726 119.576V135H324.606V90.2H329.726V112.92L351.614 90.2ZM366.181 90.2H394.469V94.872H382.885V130.328H394.469V135H366.181V130.328H377.765V94.872H366.181V90.2ZM404.556 90.2H432.844V94.872H421.26V130.328H432.844V135H404.556V130.328H416.14V94.872H404.556V90.2ZM442.931 90.2H448.051V91.992L454.771 101.912L466.099 90.2H471.283V135H466.099V96.92L459.763 103.576V109.4H454.195V109.272L448.051 100.184V135H442.931V90.2ZM486.426 90.2H504.602L509.658 97.88V129.688L504.602 135H486.426L481.242 127.32V95.512L486.426 90.2ZM486.362 126.68L488.858 130.392H502.554L504.474 128.28V98.52L502.042 94.808H488.346L486.362 96.92V126.68ZM542.849 90.2H548.033V135H542.849V117.912L527.297 94.808H524.801V135H519.681V90.2H529.729L542.849 109.592V90.2Z" fill="currentColor"/>
    </svg>
</div>
<div class="right">
    <button class="search" id="search">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-search-icon lucide-search"><path d="m21 21-4.34-4.34"/><circle cx="11" cy="11" r="8"/></svg>
        <input type="text" placeholder="search...">
    </button>
    <div class="links">
        <a href="../">Home</a>
        <a class="active">Docs</a>
        <a href="https://npmjs.org/package/askiimon-web">NPM</a>
        <a href="https://github.com/pfmcodes/askiimon-web">Github</a>
    </div>
    <button class="menu">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5h20"/><path d="M4 12h20"/><path d="M4 19h20"/></svg>
    </button>
</div>
`;
const sidebar = `
<div class="sidebar-nav">
    <button id="sidebar-back-btn"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H10"/></svg></button>
    <div class="links">
        <a href="../">Home</a>
        <a class="active">Docs</a>
        <a href="https://npmjs.org/package/askiimon-web">NPM</a>
        <a href="https://github.com/pfmcodes/askiimon-web">Github</a>
    </div>
</div>
<div class="sidebar-content"></div>
`;
const originalContent = body.innerHTML;
body.innerHTML = `
    <div class="page-wrapper">
            <div class="main">
            <div class="sentinal"></div>
            <nav>${nav}</nav>
            <div class="content">${originalContent}</div>
        </div>
        <div class="sidebar">${sidebar}</div>
    </div>
`;

body.classList.add("kode-mono-400");
hl.registerLanguage("javascript", javascript);
hl.registerLanguage("bash", bash);
hl.registerLanguage("html", html);
hl.highlightAll();

const search = document.getElementById("search");
const searchInput = search.querySelector("input");
const menuBtn = body.querySelector("button.menu");
const root = document.documentElement;
const styles = getComputedStyle(root);
const sidebarEl = document.querySelector(".sidebar");
const sideBarBackBtn = document.querySelector("#sidebar-back-btn");


const isMobile = window.matchMedia("(width < 426px)").matches;

let menuState = !isMobile;

if (menuState) {
    root.style.setProperty('--sidebar-width', `25%`);
}
else {
    root.style.setProperty('--sidebar-width', `0`);
}

sideBarBackBtn.addEventListener("click", () => {
    sidebarEl.classList.remove("active");
});

menuBtn.addEventListener("click", () => {
    
    if (isMobile) {
        if (!menuState) {
            sidebarEl.classList.add("active");
        }
        else {
            sidebarEl.classList.remove("active");
        }
        return;
    }
    
    menuState = !menuState;

    let i;
    let interval;

    if (menuState) {
        i = 0;

        interval = setInterval(() => {
            root.style.setProperty('--sidebar-width', `${i}%`);
            i++;

            if (i > 25) {
                clearInterval(interval);
            }
        }, 20);

    } else {
        i = 25;

        interval = setInterval(() => {
            root.style.setProperty('--sidebar-width', `${i}%`);

            i--;

            if (i < 0) {
                clearInterval(interval);
            }
        }, 20);
    }
});

searchInput.classList.add("kode-mono-100");

let open = false;

searchInput.addEventListener("click", (e) => {
    e.stopPropagation();
});

search.addEventListener("click", () => {
    open = !open;

    if (open) {
        searchInput.style.width = "100px";
        searchInput.style.opacity = "1";
    } else {
        searchInput.style.width = "0";
        searchInput.style.opacity = "0";
    }
});

const links = document.querySelectorAll("nav a");

const classes = [
    "brand-0",
    "brand-1",
    "brand-2"
];

links.forEach(link => {
    if (link.classList.contains("active")) return;
    let randomClass;
    link.addEventListener("mouseenter", () => {
        link.classList.remove(...classes);

        randomClass =
            classes[Math.floor(Math.random() * classes.length)];

        link.classList.add(randomClass);
    });
    link.addEventListener("mouseleave", () => {
        link.classList.remove(randomClass);
    })
});

const blockquotes = document.querySelectorAll("blockquote")

blockquotes.forEach((bq) => {
    bq.classList.add("kode-mono-500");
    bq.innerHTML = `<span style="display: flex; width: 5px; margin-right: 45px; border-radius: 10px; margin-left: 5px; height: 25px; background-color: var(--pink);"></span>\n${bq.innerHTML}`
});
 
const navbar = document.querySelector("nav");
const sentinel = document.querySelector('.sentinal');

const handler = (entries) => {
  if (!entries[0].isIntersecting) {
    navbar.classList.add('is-sticky');
  } else {
    navbar.classList.remove('is-sticky');
  }
};

const observer = new IntersectionObserver(handler);
observer.observe(sentinel);

const container = document.querySelector(".sidebar-content");
renderAPI(apiJson, container, 2, null);

function renderAPI(obj, parent, n = 2, l) {
    for (const key in obj) {
        const val = obj[key];
        const block = document.createElement("div");
        block.className = "dropDown";

        const isParam =
            val &&
            typeof val === "object" &&
            "type" in val &&
            "required" in val;

            if (l === "Object") {
                l = "init";
            }

        if (isParam) {
            block.innerHTML = `
                ${l != null ? `<a href="./${l}.html" style="font-style: none;">` : ""}
                    <strong class="hljs-title function">${key}</strong> ${val.required === true ? "(<span class='hljs-type hljs-error'>required</span>)" : ""}
                    <div style="margin: 10px;">
                        <span class="hljs-type">${val.type}</span>
                    </div>
                ${l != null ? `</a>` : ""}
            `;
        } else {
            const title = document.createElement("div");
            title.classList.add("dropDown-title");

            title.innerHTML = `<div><h${n}>${key}</h${n}></div><div class="dropDown-icon dropDown-icon-${key}"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-down-icon lucide-chevron-down"><path d="m6 9 6 6 6-6"/></svg></div>`;

            // content wrapper
            const content = document.createElement("div");
            content.classList.add("dropDown-content");
            const current = parseInt(getComputedStyle(content).paddingLeft) || 0;
            content.style.paddingLeft = (current + 25) + "px";
            

            renderAPI(val, content, n + 1, key);

            // toggle logic
            title.addEventListener("click", () => {
                block.classList.toggle("open");
                document.querySelector(`.dropDown-icon.dropDown-icon-${key}`).classList.toggle("active");
            });

            block.appendChild(title);
            block.appendChild(content);
            title.addEventListener("click", () => {
                parent.classList.toggle("open");
            });
        }

        parent.appendChild(block);
    }
}

// --- Search UI Integration ---

// Target the container and cache its original generated tree structure
searchJS.init();
const sidebarContent = document.querySelector(".sidebar-content");
const defaultSidebarHTML = sidebarContent.innerHTML; 

// Listen for typing events on the search bar
searchInput.addEventListener("input", (e) => {
  const query = searchInput.value.trim();

  // If the query input is cleared, restore the original content tree
  if (!query) {
    sidebarContent.innerHTML = defaultSidebarHTML;
    // Re-bind click event listeners to the original dropdown titles if necessary
    restoreDropdownListeners();
    return;
  }


  // Force open the sidebar drawer visual container if it is closed on desktop
  if (!menuState && !isMobile) {
    menuBtn.click();
  } else if (isMobile && !sidebarEl.classList.contains("active")) {
    sidebarEl.classList.add("active");
  }

  // Fetch match results using your scoring algorithm
  const results = searchJS.search(query);
  console.log(query, results)

  if (results.length === 0) {
    sidebarContent.innerHTML = `
      <div style="padding: 20px; text-align: center; color: var(--pink, #F16D8E);">
        No matching endpoints found.
      </div>`;
    return;
  }

  // Render the matching query blocks cleanly inside the sidebar container layout
  sidebarContent.innerHTML = results.map(item => `
    <div class="dropDown" style="border-bottom: 1px solid rgba(255,255,255,0.05); padding: 12px 5px;">
      <a href="./${item.method === 'Object' ? 'init' : item.method}.html" style="text-decoration: none; color: inherit; display: block;">
        <strong class="hljs-title function" style="font-size: 17px; margin-bottom: 2px;">${item.path.split(' ➔ ').slice(0, -1).join(' ➔ ')}</strong>
        <div style="font-size: 11px; opacity: 0.5;">${item.param}</div>
        ${item.required ? "(<span class='hljs-type hljs-error'>required</span>)" : ""}
        <div style="margin-top: 6px; display: flex; gap: 8px; align-items: center;">
          <span class="hljs-type" style="font-size: 12px; background: rgba(255,255,255,0.08); padding: 1px 5px; border-radius: 3px;">${item.type}</span>
          ${item.default !== "" ? `<span style="font-size: 11px; opacity: 0.6;">Default: <code>${item.default}</code></span>` : ""}
        </div>
      </a>
    </div>
  `).join('');
});

// Helper function to re-attach your toggle logic when search is cleared
function restoreDropdownListeners() {
  const blocks = sidebarContent.querySelectorAll(".dropDown");
  blocks.forEach(block => {
    const title = block.querySelector(".dropDown-title");
    const content = block.querySelector(".dropDown-content");
    if (!title || !content) return;
    
    // Extract the key name safely from class attributes
    const iconEl = title.querySelector(".dropDown-icon");
    const key = Array.from(iconEl.classList)
      .find(c => c.startsWith("dropDown-icon-"))
      ?.replace("dropDown-icon-", "");

    title.addEventListener("click", () => {
      block.classList.toggle("open");
      if (key) {
        document.querySelector(`.dropDown-icon.dropDown-icon-${key}`)?.classList.toggle("active");
      }
      sidebarContent.classList.toggle("open");
    });
  });
}