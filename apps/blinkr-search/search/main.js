function getQueryParam(param) {
            const urlParams = new URLSearchParams(window.location.search);
            return urlParams.get(param);
        }

        function performSearch(query) {
            if (!query) return;
            document.getElementById('searchQuery').value = query;


            fetch(`https://search-engine-backend-2ra9.onrender.com/search?query=${encodeURIComponent(query)}`)
                .then(response => response.json())
                .then(data => {
                    const resultsDiv = document.getElementById('searchResults');
                    resultsDiv.innerHTML = '';

                    if (!Array.isArray(data) || data.length === 0) {
                        resultsDiv.innerHTML = `<h1 style='margin-top: 100px;'>No results found.</h1>`;
                        return;
                    }

                    data.forEach(result => {
                        const card = document.createElement('div');
                        card.classList.add('result-card');
                        // Example usage:
                        const websiteUrl = result.link;
                        const faviconUrl = getFavicon(websiteUrl);
                        card.innerHTML = `
                            <a href="${result.link}">
                                <img src='${faviconUrl}'>
                                <h5>${result.title}</h5>
                                <p>${result.link}</p>
                                <p>${result.description}</p>
                            </a>
                        `;
                        resultsDiv.appendChild(card);
                        function getFavicon(url) {
                            return `https://www.google.com/s2/favicons?sz=64&domain=${new URL(url).hostname}`;
                        }
                                        });
                })
                .catch(error => {
                    console.error('Error:', error);
                    resultsDiv.innerHTML = `
                    <h1>There was an error. Try reloading the page or <a href="https://forms.gle/xgDmVGgJ1PJAQyJp6">report</a></h1>
                    `;
                });
        }

document.getElementById('searchForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const query = document.getElementById('searchQuery').value.trim();
    if (query) {
        window.history.pushState({}, "", `?query=${encodeURIComponent(query)}`);
        performSearch(query);
    }
});

const queryParam = getQueryParam('query');
if (queryParam) { 
    performSearch(queryParam);
}
performSearch()