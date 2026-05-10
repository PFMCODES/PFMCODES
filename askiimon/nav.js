const body = document.body;

const search = document.getElementById("search");
const searchInput = search.querySelector("input");
const isMobile = window.matchMedia("(width < 426px)").matches;

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

const classesBg = [
    "brand-0-bg",
    "brand-1-bg",
    "brand-2-bg"
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