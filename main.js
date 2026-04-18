async function searchMovies() {
    const query = document.getElementById("search").value.trim();
    const moviesDiv = document.getElementById("movies");

    if (!query) {
        moviesDiv.innerHTML = "<p>Введи назву</p>";
        return;
    }

    moviesDiv.innerHTML = "<p>Завантаження...</p>";

    try {
        const res = await fetch(
            `https://api.tvmaze.com/search/shows?q=${encodeURIComponent(query)}`
        );

        const data = await res.json();

        console.log("API data:", data);

        if (data.length === 0) {
            moviesDiv.innerHTML = "<p>Нічого не знайдено</p>";
            return;
        }

        let html = "";

        data.forEach(item => {
            const show = item.show;

            html += `
                <div>
                    <h3>${show.name}</h3>
                    <p>${show.premiered || "Невідомо"}</p>
                    <img src="${show.image ? show.image.medium : "https://via.placeholder.com/200"}">
                </div>
            `;
        });

        moviesDiv.innerHTML = html;

    } catch (error) {
        console.error(error);
        moviesDiv.innerHTML = "<p>Помилка 😢</p>";
    }
}

document.getElementById("searchBtn").addEventListener("click", searchMovies);