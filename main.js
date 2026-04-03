
    const API_KEY = "YOUR_API_KEY";

    function searchMovies() {
        const query = document.getElementById("search").value;

        fetch(`https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`)
            .then(res => res.json())
            .then(data => {
                const moviesDiv = document.getElementById("movies");
                moviesDiv.innerHTML = "";

                if (data.Search) {
                    data.Search.forEach(movie => {
                        fetch(`https://www.omdbapi.com/?i=${movie.imdbID}&apikey=${API_KEY}`)
                            .then(res => res.json())
                            .then(details => {
                                moviesDiv.innerHTML += `
                                    <div class="movie">
                                        <img src="${details.Poster}" alt="">
                                        <h3>${details.Title}</h3>
                                        <p>⭐ ${details.imdbRating}</p>
                                        <p>${details.Year}</p>
                                    </div>
                                `;
                            });
                    });
                } else {
                    moviesDiv.innerHTML = "<p>Нічого не знайдено 😢</p>";
                }
            });
    }

