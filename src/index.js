console.log("Hello World");

// TODO
import WishList from "./wishlist.js";

const form = document.querySelector('#submitForm');
const makeInput = document.getElementById('makeInput');
const modelInput = document.getElementById('modelInput');
const yearInput = document.getElementById('yearInput');
const makeParagraph = document.getElementById('car-make');
const modelParagraph = document.getElementById('car-model');
const yearParagraph = document.getElementById('car-year');
const removeButton = document.querySelector('.removeBtn');
const wishlistElement = document.querySelector('#wishListContainer ul');
const wishlist = new WishList();

form.addEventListener("submit", (event) => {
  event.preventDefault();
  let make = event.target[0].value;
  let model = event.target[1].value;
  let year = event.target[2].value;
  wishlist.add(make, model, year);
});

wishlistElement.addEventListener('click', (event) => {
  if (event.target.classList.contains('removeBtn')) {
    const carId = event.target.dataset.carId;
    wishlist.remove(carId);
    renderWishlist();
  }
});

function renderWishlist() {
  wishlistElement.innerHTML = '';
  wishlist.list.forEach(car => {
    const li = document.createElement('li');
    li.textContent = `${car.make} ${car.model} (${car.year})`;
    const removeBtn = document.createElement('button');
    removeBtn.classList.add('btn', 'btn-danger', 'removeBtn');
    removeBtn.textContent = 'Remove';
    removeBtn.dataset.carId = car.id;
    li.appendChild(removeBtn);
    wishlistElement.appendChild(li);
  });

  if (wishlist.list.length > 0) {
    removeButton.disabled = false;
  } else {
    removeButton.disabled = true;
  }
}

function showCarDetails(car) {
    makeParagraph.textContent = "";
    modelParagraph.textContent = "";
    yearParagraph.textContent = "";
    removeButton.disabled = false;
    removeButton.setAttribute('data-carId', car.id);
}
  
wishlistElement.addEventListener('click', e => {
    if (e.target.classList.contains('removeBtn')) {
      const carId = e.target.dataset.carId;
      wishlist.remove(carId);
      renderWishlist();
      makeParagraph.textContent = '';
      modelParagraph.textContent = '';
      yearParagraph.textContent = '';
      removeButton.disabled = true;
      removeButton.removeAttribute('data-carId');
    } else {
      const carId = e.target.dataset.carId;
      const car = wishlist.list.find(car => car.id === carId);
      showCarDetails(car);
    }
  });

  
function updateDOMList() {
    wishlistElement.innerHTML = '';
      wishlist.list.forEach(car => {
      const li = document.createElement('li');
      li.textContent = `${car.make} ${car.model}`;
      li.addEventListener('click', () => showCarDetails(car));
      wishlistElement.appendChild(li);
    });
  }
  
  form.addEventListener('submit', e => {
    e.preventDefault();
    const make = makeInput.value;
    const model = modelInput.value;
    const year = yearInput.value;
    wishlist.add(make, model, year);
    renderWishlist();
    updateDOMList();
    form.reset();
  });

  function addCar(event) {
    event.preventDefault();
    const make = makeInput.value;
    const model = modelInput.value;
    const year = yearInput.value;
    wishlist.add(make, model, year);
    updateDOMList();
    form.reset();
  }

  form.addEventListener('submit', addCar);

  function removeCar() {
    const carId = Number(removeButton.getAttribute('data-carId'));
    wishlist.remove(carId);
    updateDOMList();
    makeParagraph.textContent = '';
    modelParagraph.textContent = '';
    yearParagraph.textContent = '';
    removeButton.disabled = true;
  }
  
  removeButton.addEventListener('click', removeCar);