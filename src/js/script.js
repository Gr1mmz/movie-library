// TMDB API

const API_KEY = "api_key=617bdf73d3624d01c9238fbe9d4643b0",
    BASE_URL = "https://api.themoviedb.org/3",
    API_LANG = "&language=ru-RU",
    REQUEST_POPULAR =
        BASE_URL +
        "/discover/movie?sort_by=popularity.desc&" +
        API_KEY +
        API_LANG,
    REQUEST_BY_ID = BASE_URL + "/movie/" + "451048" + "?" + API_KEY + API_LANG,
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
    btnLogin = document.querySelector("#btnLogin"),
    btnMainPage = document.querySelector("#mainPage"),
    btnPopular = document.querySelector("#btnPopular"),
    btnLibrary = document.querySelector("#btnLibrary"),
    btnSearch = document.querySelector(".search-icon"),
    overlay = document.querySelector(".overlay"),
    modalClose = document.querySelectorAll(".modal__close"),
    modals = document.querySelectorAll(".modal"),
    modalMovie = document.querySelector(".modal__movie"),
    modalMovieWrapper = document.querySelector(".modal__movie .wrapper"),
    modalLogin = document.querySelector(".modal__login"),
    mainWrapper = document.querySelector(".main__wrapper"),
    mainHeader = document.querySelector(".main__header"),
    mainDescr = document.querySelector(".main__descr"),
    searchForm = document.getElementById("searchForm"),
    searchInput = document.getElementById("searchInput");
let mainItems = document.querySelectorAll(".main__item");

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
    getMainItems();
}

function getMovieInfo(url) {
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            showMovieInfo(data);
        });
}

//Search

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (searchInput.value) {
        getMovies(API_SEARCH + "&query=" + searchInput.value + API_LANG);
        mainHeader.innerHTML = "Результаты поиска:";
        mainDescr.style.display = "none";
    }
});

btnSearch.addEventListener("click", () => {
    if (searchInput.value) {
        getMovies(API_SEARCH + "&query=" + searchInput.value + API_LANG);
        mainHeader.innerHTML = "Результаты поиска:";
        mainDescr.style.display = "none";
    }
});

// Buttons

btnLogin.addEventListener("click", () => {
    overlay.classList.add("overlay_active");
    modalLogin.classList.add("modal_active");
});

mainPage.addEventListener("click", () => {
    mainHeader.innerHTML = "Всем привет!";
    mainDescr.style.display = "block";
    mainWrapper.innerHTML = "";
});

btnPopular.addEventListener("click", () => {
    getMovies(REQUEST_POPULAR);
    mainHeader.innerHTML = "Популярные сейчас:";
    mainDescr.style.display = "none";
    getMainItems();
});
btnLibrary.addEventListener("click", () => {
    showLibrary();
    mainHeader.innerHTML = "Моя библиотека:";
    mainDescr.style.display = "none";
    getMainItems();
});

function showLibrary() {
    mainWrapper.innerHTML = "";
    // for (let movie in movieLibrary.movies) {
    //     getMovieInfo(API_SEARCH + "&query=" + movie + API_LANG);
    // }
}

// Modals

function closeModals() {
    overlay.classList.remove("overlay_active");
    modals.forEach((item) => {
        item.classList.remove("modal_active");
    });
}

modalClose.forEach((item) => {
    item.addEventListener("click", (e) => {
        e.preventDefault();
        closeModals();
    });
});

overlay.addEventListener("click", () => {
    closeModals();
});

function getMainItems() {
    mainItems = document.querySelectorAll(".main__item");
    mainItems.forEach((item) => {
        let movieId = item.dataset.movieId;
        item.addEventListener("click", () => {
            overlay.classList.add("overlay_active");
            modalMovie.classList.add("modal_active");
            getMovieInfo(
                BASE_URL + "/movie/" + movieId + "?" + API_KEY + API_LANG
            );
        });
    });
}

function showMovieInfo(data) {
    // console.log(data);
    const { title, poster_path, vote_average, overview, genres } = data;
    if (poster_path != null) {
        document.querySelector(".modal__movie .wrapper .poster img").src = `${
            IMG_URL + poster_path
        }`;
    } else {
        document.querySelector(".modal__movie .wrapper .poster img").src =
            "img/poster.png";
    }
    document.querySelector(".modal__movie .wrapper .text .header").innerHTML =
        title;
    document.querySelector(
        ".modal__movie .wrapper .text .info .rate span"
    ).innerHTML = vote_average;
    if (vote_average > 7) {
        document.querySelector(
            ".modal__movie .wrapper .text .info .rate span"
        ).style.color = "gold";
    } else if (vote_average <= 7 && vote_average > 5) {
        document.querySelector(
            ".modal__movie .wrapper .text .info .rate span"
        ).style.color = "green";
    } else {
        document.querySelector(
            ".modal__movie .wrapper .text .info .rate span"
        ).style.color = "red";
    }
    document.querySelector(
        ".modal__movie .wrapper .text .info .genres"
    ).innerHTML = "Жанры: ";
    for (let i = 0; i < genres.length; i++) {
        if (i != genres.length - 1) {
            genresEl = document.createElement("span");
            genresEl.innerHTML = `${genres[i].name}, `;
            document
                .querySelector(".modal__movie .wrapper .text .info .genres")
                .appendChild(genresEl);
        } else {
            genresEl = document.createElement("span");
            genresEl.innerHTML = genres[i].name;
            document
                .querySelector(".modal__movie .wrapper .text .info .genres")
                .appendChild(genresEl);
        }
    }
    if (overview) {
        document.querySelector(
            ".modal__movie .wrapper .text .descr"
        ).innerHTML = overview;
    } else {
        document.querySelector(
            ".modal__movie .wrapper .text .descr"
        ).innerHTML = "Описание отсутствует";
    }
}
