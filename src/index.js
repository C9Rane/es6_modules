import WishList from "./wishlist.js";

const form = document.querySelector('#submitForm');
const makeInput = document.getElementById('makeInput');
const modelInput = document.getElementById('modelInput');
const yearInput = document.getElementById('yearInput');
const makeParagraph = document.getElementById('car-make');
const modelParagraph = document.getElementById('car-model');
const yearParagraph = document.getElementById('car-year');
const removeButton = document.querySelector('.removeBtn');
const wishlistElement = document.querySelector('#wishListContainer > ul');
const wishlist = new WishList();

function showCarDetails(car) {
    makeParagraph.textContent = car.make;
    modelParagraph.textContent = car.model;
    yearParagraph.textContent = car.year;
    removeButton.disabled = false;
    removeButton.setAttribute("data-carId", car.id);
}

function updateDOMList() {
    wishlistElement.textContent = '';
    wishlist.list.forEach((car) => {
        const li = document.createElement('li');
        li.textContent = `${car.make} ${car.model}`;
        li.addEventListener("click", () => showCarDetails(car));
        wishlistElement.appendChild(li);
    });
}

function addCar(event) {
    event.preventDefault();
    const make = makeInput.value;
    const model = modelInput.value;
    const year = yearInput.value;
    console.log(make, model, year);
    wishlist.add(make, model, year);
    updateDOMList();
}

function removeCar() {
    const carId = Number(removeButton.getAttribute('data-carId'));
    wishlist.remove(carId);
    updateDOMList();
    makeParagraph.textContent = '';
    modelParagraph.textContent = '';
    yearParagraph.textContent = '';
    removeButton.disabled = true;
}

/////

form.addEventListener("submit", (event) => {
  event.preventDefault();
  addCar(event);
});


removeButton.addEventListener('click', () => {
  removeCar();
});