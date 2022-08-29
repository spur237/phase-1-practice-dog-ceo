console.log('%c HI', 'color: firebrick')
const dogBreeds = [];

document.addEventListener('DOMContentLoaded', function () {
    fetchDogs();
    loadAllDogs();
});

function fetchDogs() {
    fetch("https://dog.ceo/api/breeds/image/random/4")
    .then(res=> res.json())
    .then(dogs => {
    dogs.message.forEach(image => {
        displayImage(image)})
    });
}

function displayImage(dogImagePath) {
    const main = document.querySelector('#dog-image-container');
    const img = document.createElement('img');
    img.setAttribute('src',dogImagePath);
    main.appendChild(img);
}

function loadAllDogs() {
    fetch("https://dog.ceo/api/breeds/list/all")
    .then(response => {
        return response.json()})
    .then(data => {
        dogBreeds = Object.keys(data.message);updateBreedList(dogBreeds);addBreedSelectListener();
    });
}

function buildDogList(dogBreeds) {
    const ul = document.getElementById('#dog-breeds');
    removeChildren(ul);
    dogBreeds.forEach(breed => addBreed(breed));
}

function addBreed(breed) {
    const ul = document.getElementById('#dog-breeds');
    const li = document.createElement('li');
    li.textContent = breed;
    li.style.cursor = 'pointer';
    ul.appendChild(li);
    li.addEventListener('click', function updateColor(event) {
        event.target.style.color = 'palevioletred';
    });
}

function removeChildren(element) {
    let child = element.lastElementChild;
    while (child) {
    element.removeChild(child);
    child = element.lastElementChild;
}
}

function selectBreedsStartingWith(letter) {
    buildDogList(dogBreeds.filter(breed => breed.startsWith(letter)));
}

function addBreedSelectListener() {
    const breedDropdown = document.querySelector('#breed-dropdown');
    breedDropdown.addEventListener('change',  (e) => {
    selectBreedsStartingWith(e.target.value);
});
}
