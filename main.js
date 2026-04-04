const API_KEY = "";

function searchMovies() {
    const query = document.getElementById("search").value;
    const moviesDiv = document.getElementById("movies");

    if (!query) {
        alert("Введи назву фільму!");
        return;
    }

    moviesDiv.innerHTML = "<p>Завантаження...</p>";

    fetch(`https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`)
        .then(res => res.json())
        .then(data => {
            moviesDiv.innerHTML = "";

            if (data.Search) {
                data.Search.forEach(movie => {
                    moviesDiv.innerHTML += `
                        <div class="movie">
                            <img src="${movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/200"}">
                            <h3>${movie.Title}</h3>
                            <p>${movie.Year}</p>
                        </div>
                    `;
                });
            } else {
                moviesDiv.innerHTML = "<p>Нічого не знайдено 😢</p>";
            }
        })
        .catch(error => {
            console.error(error);
            moviesDiv.innerHTML = "<p>Помилка 😢</p>";
        });
}

document.getElementById("search").addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        searchMovies();
    }
});
