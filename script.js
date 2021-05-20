// load list of dog breeds on page load
window.onload = function () {
    loadDogBreeds();
}

function updateError(message, action) {
    let errorContainer = document.querySelector("#error-container");
    let errorMessage = document.querySelector("#error-message");

    if (action === 'show') {
        errorContainer.classList.remove('hidden');
        errorMessage.innerHTML = message;
    } else {
        errorContainer.classList.add('hidden');
        errorMessage.innerHTML = "";
    }
}

function updateAlert(availableImages, action) {
    let alertContainer = document.querySelector("#alert-container");
    let alertMessage = document.querySelector("#alert-message");
    let selectedBreed = document.querySelector("#breeds");
    let verb = `${availableImages === 1 ? 'is' : 'are'}`;

    if (action === 'show') {
        alertContainer.classList.remove('hidden');
        alertMessage.innerHTML = `There ${verb} only ${availableImages} image${availableImages === 1 ? '' : 's'} of ${selectedBreed.value}s available!`;
    } else {
        alertContainer.classList.add('hidden');
        alertMessage.innerHTML = "";
    }
}

// loop through list of breeds, create <option>s then add to <select>
function updateBreedList(breedList) {
    let select = document.querySelector("#breeds");
    let btnLoad = document.querySelector("#btn-load");
    let btnRand = document.querySelector("#btn-random");

    // create <option> for the single breed passed in
    function createBreedOption(breedName) {
        let breedOption = document.createElement("option");
        breedOption.value = breedName;
        breedOption.innerHTML = breedName;
        return breedOption;
    }

    // pass each breed in "breedList" to createBreedOption
    breedList.forEach(function (breed) {
        let breedOption = createBreedOption(breed);
        select.appendChild(breedOption);
    });

    // retrieve images for user selected breed
    btnLoad.onclick = function () {
        let selectedBreed = select.value;
        loadBreedImages(selectedBreed);
    };

    // randomize breed
    btnRand.onclick = function () {
        // get length of object for randomizer
        let size = Object.keys(breedList).length;

        // random number from 0 to 94 (if size = 95)
        let rand = Math.floor(Math.random() * size);
        select.value = breedList[rand];
    }
}

// get user input for number of images
function getImageCount() {
    let imageCount = document.querySelector("#image-count");
    return imageCount.value;
}

function createBreedHeading(availableImages) {
    let breedHeading = document.querySelector('#breed-heading');
    let selectedBreed = document.querySelector('#breeds');
    let h2 = document.createElement('h2');
    let breedHeadingName = document.createElement('span');
    let badge = document.createElement('span');

    // clear previous heading
    breedHeading.innerHTML = '';

    // selected breed name
    breedHeadingName.setAttribute('id', 'breed-name');
    breedHeadingName.innerHTML = `Breed: <span class="highlight">${selectedBreed.value}</span>`;

    // available image count badge
    badge.setAttribute('id', 'count-badge');
    badge.classList.add('badge', 'badge-warning');
    badge.innerHTML = `${availableImages} image${availableImages === 1 ? '' : 's'} available`;

    // append selected breed name and image count badge to <h2>
    h2.appendChild(breedHeadingName);
    h2.appendChild(badge);
    breedHeading.appendChild(h2);
}

// show bootstrap carousel next/prev indicators
function showCarouselIndicators() {
    let carouselIndicators = document.querySelector('#carousel-controls');
    carouselIndicators.classList.remove('hidden');
}

// erase current images in container and create new one for retrieved dog image URLs
function updateBreedImages(breedImageList, requestedCount, availableImages) {
    let imagesContainer = document.querySelector('#images-container');

    // clear previous image container
    imagesContainer.innerHTML = "";

    createBreedHeading(availableImages);
    showCarouselIndicators();

    if (requestedCount > availableImages) {
        updateAlert(availableImages, 'show');
    }
    // Loop through the image URLs, and create new <img> elements
    let count = 0;
    function createImgElement(url) {
        let div = document.createElement("div");
        div.classList.add('carousel-item');

        if (count === 0) {
            div.classList.add('active');
            count++;
        }
        let img = document.createElement("img");
        img.src = url;
        div.appendChild(img);
        return div;
    }
    breedImageList.forEach(function (url) {
        let img = createImgElement(url);
        imagesContainer.appendChild(img);
    });
};

// message is an object with the URLs for the breed images in the array
function getBreedImgUrls(response) {
    if (response.status !== 'success') {
        throw new Error('response was not successful');
    }
    return response.message;
}

// dynamically load list of dog image URLS for given breed name
function loadBreedImages(breed) {
    let imageCount = getImageCount();
    let xhr = new XMLHttpRequest();

    xhr.onload = function () {
        try {
            let response = JSON.parse(xhr.response);
            let breedImageUrls = getBreedImgUrls(response);
            if (imageCount > 0) {
                updateError(null, 'hide')
                updateAlert(null, 'hide');
                updateBreedImages(breedImageUrls, imageCount, breedImageUrls.length);
            }
        } catch (e) {
            updateError("Please Select a Dog Breed.", 'show');
        }
    }
    xhr.onerror = function () {
        updateError("Please Enter a Quantity.", 'show');
    }
    xhr.open("GET", `https://dog.ceo/api/breed/${breed}/images/random/${imageCount}`);
    xhr.send();
}

function getBreedList(response) {
    if (response.status !== "success") {
        throw new Error("response was not successful");
    }
    return Object.keys(response.message);
}

// creates XHR request to get dog breeds as JSON, parse JSON and get list of breeds
function loadDogBreeds() {
    let xhr = new XMLHttpRequest();

    xhr.onload = function () {
        try {
            let response = JSON.parse(xhr.response);
            let breedNamesList = getBreedList(response);
            updateBreedList(breedNamesList);
        } catch (e) {
            updateError("Unable to load dog breeds", 'show');
        }
    }
    xhr.onerror = function () {
        updateError("Unable to load dog breeds", 'show');
    }
    xhr.open('GET', 'https://dog.ceo/api/breeds/list/all');
    xhr.send();
}