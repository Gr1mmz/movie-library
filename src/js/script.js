// TMDB API

const API_KEY = "api_key=617bdf73d3624d01c9238fbe9d4643b0",
    BASE_URL = "https://api.themoviedb.org/3",
    API_LANG = "&language=ru",
    REQUEST_POPULAR =
        BASE_URL +
        "/discover/movie?sort_by=popularity.desc&" +
        API_KEY +
        API_LANG,
    GENRES = [
        {
            id: 28,
            name: "боевик",
        },
        {
            id: 12,
            name: "приключения",
        },
        {
            id: 16,
            name: "мультфильм",
        },
        {
            id: 35,
            name: "комедия",
        },
        {
            id: 80,
            name: "криминал",
        },
        {
            id: 99,
            name: "документальный",
        },
        {
            id: 18,
            name: "драма",
        },
        {
            id: 10751,
            name: "семейный",
        },
        {
            id: 14,
            name: "фэнтези",
        },
        {
            id: 36,
            name: "история",
        },
        {
            id: 27,
            name: "ужасы",
        },
        {
            id: 10402,
            name: "музыка",
        },
        {
            id: 9648,
            name: "детектив",
        },
        {
            id: 10749,
            name: "мелодрама",
        },
        {
            id: 878,
            name: "фантастика",
        },
        {
            id: 10770,
            name: "телевизионный фильм",
        },
        {
            id: 53,
            name: "триллер",
        },
        {
            id: 10752,
            name: "военный",
        },
        {
            id: 37,
            name: "вестерн",
        },
    ],
    API_SEARCH = BASE_URL + "/search/movie?" + API_KEY + "",
    API_URL = BASE_URL + REQUEST_POPULAR + API_KEY + API_LANG,
    IMG_URL = "https://image.tmdb.org/t/p/w500",
    IMG_PATH = "",
    IMG_LANG = "&language=ru-US&include_image_language=ru,null";

// search request https://api.themoviedb.org/3/search/movie?api_key={api_key}&query=Jack+Reacher
// movie request https://api.themoviedb.org/3/movie/550?api_key=617bdf73d3624d01c9238fbe9d4643b0

//app variables

const movieLibrary = {
        count: 0,
        movies: {},
        actors: {},
        genres: [],
        private: false,
    },
    btnAdd = document.querySelector("#btnAdd"),
    btnPopular = document.querySelector("#btnPopular"),
    btnLibrary = document.querySelector("#btnLibrary"),
    overlay = document.querySelector(".overlay"),
    modalClose = document.querySelectorAll(".modal__close"),
    modals = document.querySelectorAll(".modal"),
    modalAdd = document.querySelector(".modal-add"),
    modalAddAddItem = document.querySelector(".modal-add__add-item"),
    modalAddTable = document.querySelector(".modal-add__table-items"),
    modalAddSubmit = document.querySelector(".modal-add__submit"),
    mainWrapper = document.querySelector(".main__wrapper"),
    searchForm = document.getElementById("searchForm"),
    searchInput = document.getElementById("searchInput");

// API FUNCTIONS

function getMovies(url) {
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            showMovies(data.results);
        });
}

function showMovies(data) {
    mainWrapper.innerHTML = "";
    data.forEach((movie) => {
        const { title, poster_path, vote_average, id, genre_ids } = movie;
        const movieEl = document.createElement("div");
        let movieGenre = "";
        for (let i = 0; i < GENRES.length; i++) {
            if (genre_ids[0] == GENRES[i].id) {
                movieGenre = GENRES[i].name;
            }
        }
        movieEl.classList.add("main__item");
        movieEl.dataset.movieId = id;
        movieEl.innerHTML = `
        <div class="main__item-header">${title}</div>
        <div class="main__item-genres">
            <a href="#" class="main__item-genre">${movieGenre}</a>
        </div>
        <div class="main__item-rate">&#9733; ${vote_average}</div>
        <div class="main__item-image">
            <img src="${IMG_URL + poster_path}" alt="poster" />
        </div>`;
        mainWrapper.appendChild(movieEl);
    });
    document.querySelectorAll(".main__item-genre").forEach((el) => {
        if (el.innerHTML == "") {
            el.remove();
        }
    });
    document.querySelectorAll(".main__item-image img").forEach((el) => {
        if (el.getAttribute("src") == "https://image.tmdb.org/t/p/w500null") {
            el.setAttribute("src", "img/poster.png");
        }
    });
}

//Search

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (searchInput.value) {
        getMovies(API_SEARCH + "&query=" + searchInput.value + API_LANG);
    }
});

// Buttons

btnAdd.addEventListener("click", () => {
    overlay.classList.add("overlay_active");
    modalAdd.classList.add("modal_active");
});
btnPopular.addEventListener("click", () => {
    getMovies(REQUEST_POPULAR);
});
btnLibrary.addEventListener("click", () => {
    showLibrary();
});

function showLibrary() {
    mainWrapper.innerHTML = "";
    for (let movie in movieLibrary.movies) {
        getMovieInfo(API_SEARCH + "&query=" + movie + API_LANG);
    }
}

// Modals

function closeModals() {
    overlay.classList.remove("overlay_active");
    modals.forEach((item) => {
        item.classList.remove("modal_active");
    });
}

modalClose.forEach((item) => {
    item.addEventListener("click", () => {
        closeModals();
    });
});

overlay.addEventListener("click", () => {
    closeModals();
});

// Modal Add

function clearAddModal() {
    modalAddTable.innerHTML = `<div class="modal-add__item">
    <div class="item__number">
        1.</div>
    <input class="modal-add__movie-name" type="text" placeholder="Введите название фильма" required/>
    <select name="rate" id="rate">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option selected value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
    </select>
</div>`;
}

function addMainItem(name, rate) {
    mainWrapper.innerHTML += `<div class="main__item">
    <div class="main__item-header">${name}</div>
    <div class="main__item-rate">&#9733; ${rate}</div>
</div>`;
}

modalAddAddItem.addEventListener("click", () => {
    let tableEl = document.createElement("div");
    tableEl.classList.add("modal-add__item");
    tableEl.innerHTML = `<div class="item__number">${
        document.querySelectorAll(".modal-add__item").length + 1
    }.</div>
    <input class="modal-add__movie-name" type="text" placeholder="Введите название фильма" required/>
    <select name="rate" id="rate">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option selected value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
    </select>`;
    modalAddTable.appendChild(tableEl);
    modalAddAddItem.scrollIntoView();
});

modalAddSubmit.addEventListener("click", () => {
    for (
        let i = 0;
        i < document.querySelectorAll(".modal-add__item").length;
        i++
    ) {
        let modalAddMovieName = document.querySelectorAll(
                ".modal-add__movie-name"
            ),
            modalAddMovieRate = document.querySelectorAll("#rate");
        if (modalAddMovieName[i].value != "") {
            movieLibrary.movies[modalAddMovieName[i].value] =
                modalAddMovieRate[i].value;
            getMovieInfo(
                API_SEARCH + "&query=" + modalAddMovieName[i].value + API_LANG
            );
        }
    }
    closeModals();
    clearAddModal();
});

function getMovieInfo(url) {
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            renewLibrary(data.results);
        });
}

function renewLibrary(data) {
    data.length = 1;
    data.forEach((movie) => {
        const { title, poster_path, vote_average, id, genre_ids } = movie;
        const movieEl = document.createElement("div");
        let movieGenre = "";
        for (let i = 0; i < GENRES.length; i++) {
            if (genre_ids[0] == GENRES[i].id) {
                movieGenre = GENRES[i].name;
            }
        }
        movieEl.classList.add("main__item");
        movieEl.dataset.movieId = id;
        movieEl.innerHTML = `
        <div class="main__item-header">${title}</div>
        <div class="main__item-genres">
            <a href="#" class="main__item-genre">${movieGenre}</a>
        </div>
        <div class="main__item-rate">&#9733; ${vote_average}</div>
        <div class="main__item-image">
            <img src="${IMG_URL + poster_path}" alt="poster" />
        </div>`;
        mainWrapper.appendChild(movieEl);
    });
    document.querySelectorAll(".main__item-genre").forEach((el) => {
        if (el.innerHTML == "") {
            el.remove();
        }
    });
    document.querySelectorAll(".main__item-image img").forEach((el) => {
        if (el.getAttribute("src") == "https://image.tmdb.org/t/p/w500null") {
            el.setAttribute("src", "img/poster.png");
        }
    });
}
