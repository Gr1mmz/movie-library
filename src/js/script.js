const movieLibrary = {
        count: 0,
        movies: {},
        actors: {},
        genres: [],
        private: false,
    },
    btnAdd = document.querySelector(".btn_add"),
    overlay = document.querySelector(".overlay"),
    modalClose = document.querySelectorAll(".modal__close"),
    modals = document.querySelectorAll(".modal"),
    modalAdd = document.querySelector(".modal-add"),
    modalAddAddItem = document.querySelector(".modal-add__add-item"),
    modalAddTable = document.querySelector(".modal-add__table-items"),
    modalAddSubmit = document.querySelector(".modal-add__submit"),
    mainWrapper = document.querySelector(".main__wrapper");

// Buttons

btnAdd.addEventListener("click", () => {
    overlay.classList.add("overlay_active");
    modalAdd.classList.add("modal_active");
});

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
    modalAddTable.innerHTML += `<div class="modal-add__item">
    <div class="item__number">${
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
    </select>
</div>`;
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
        movieLibrary.movies[modalAddMovieName[i].value] =
            modalAddMovieRate[i].value;
        addMainItem(modalAddMovieName[i].value, modalAddMovieRate[i].value);
    }
    closeModals();
    clearAddModal();
});
