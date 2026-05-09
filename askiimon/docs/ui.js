import hl from "https://esm.sh/@pfmcodes/highlight.js@1.0.0";
import javascript from "https://esm.sh/@pfmcodes/highlight.js/es/languages/javascript.js"

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
        <a href="https://npmjs.org/package/askiimon/">NPM</a>
        <a href="https://github.com/pfmcodes/askiimon">Github</a>
    </div>
    <button class="menu">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5h20"/><path d="M4 12h20"/><path d="M4 19h20"/></svg>
    </button>
</div>
`;
const sidebar = ``;
body.innerHTML = `
    <div class="main">
        <nav>${nav}</nav>
        <div class="content">${body.innerHTML}</div>
    </div>
    <div class="sidebar">${sidebar}</div>
`;

body.classList.add("kode-mono-400");
hl.registerLanguage("javascript", javascript);
hl.highlightAll();

const search = document.getElementById("search");
const searchInput = search.querySelector("input");
const menuBtn = body.querySelector("button.menu");
const root = document.documentElement;

let menuState = true;

if (menuState) {
    root.style.setProperty('--sidebar-width', `20%`);
}
else {
    root.style.setProperty('--sidebar-width', `0`);
}

menuBtn.addEventListener("click", () => {
    menuState = !menuState;

    let i;
    let interval;

    if (menuState) {
        i = 0;

        interval = setInterval(() => {
            root.style.setProperty('--sidebar-width', `${i}%`);

            i++;

            if (i > 20) {
                clearInterval(interval);
            }
        }, 20);

    } else {
        i = 20;

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
    link.addEventListener("mouseenter", () => {
        link.classList.remove(...classes);

        const randomClass =
            classes[Math.floor(Math.random() * classes.length)];

        link.classList.add(randomClass);
    });
});

const blockquotes = document.querySelectorAll("blockquote")

blockquotes.forEach((bq) => {
    bq.classList.add("kode-mono-500")
})