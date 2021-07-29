const btnAdd = document.querySelector(".btn_add"),
    overlay = document.querySelector(".overlay"),
    modalClose = document.querySelectorAll(".modal__close"),
    modals = document.querySelectorAll(".modal"),
    modalAdd = document.querySelector(".modal-add"),
    modalAddAddItem = document.querySelector(".modal-add__add-item"),
    modalAddTable = document.querySelector(".modal-add__table-items");

btnAdd.addEventListener("click", () => {
    overlay.classList.add("overlay_active");
    modalAdd.classList.add("modal_active");
});
modalClose.forEach((item) => {
    item.addEventListener("click", () => {
        overlay.classList.remove("overlay_active");
        modals.forEach((item) => {
            item.classList.remove("modal_active");
        });
    });
});
overlay.addEventListener("click", () => {
    overlay.classList.remove("overlay_active");
    modals.forEach((item) => {
        item.classList.remove("modal_active");
    });
});
modalAddAddItem.addEventListener("click", () => {
    modalAddTable.innerHTML += `<div class="modal-add__item">
    <div class="item__number">${
        document.querySelectorAll(".modal-add__item").length + 1
    }.</div>
    <input type="text" placeholder="Введите название фильма" />
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
