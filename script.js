// page finished loading AJAX retrieves dog breeds
window.onload = function () {
    loadDogBreeds();
};

// error handler display messages on page
function showError(message) {
    let err = document.querySelector("#error-msg");
    let errMsg = document.querySelector("#error-alert-message");
    err.classList.remove('hidden');
    errMsg.innerHTML = message;
}

// loop through list of breeds, create <option>s then add to <select>
function updateBreedList(breedList) {
    let select = document.querySelector("#breeds");
    let btnLoad = document.querySelector("#btn-load");
    let btnRand = document.querySelector("#btn-random");

    function createBreedOption(name) {
        let option = document.createElement("option");
        option.value = name;
        option.innerHTML = name;
        return option;
    }

    breedList.forEach(function (breed) {
        let breedOption = createBreedOption(breed);
        select.appendChild(breedOption);
    });

    btnLoad.onclick = function (e) {
        let breed = select.value;
        loadBreedImages(breed);
    };

    btnRand.onclick = function (e) {
        // get length of object for randomizer
        var size = Object.keys(breedList).length;

        // randomize
        let rand = Math.floor(Math.random() * size);

        select.value = breedList[rand];
    }
}

// get user input for number of images
function getImageCount() {
    let input = document.querySelector("#image-count");
    return input.value;
}

function extractBreedImageList(response) {
    if (response.status !== "success") {
        throw new Error("response wasn't successful");
    }
    return response.message;
}

// erase current images in container and create new one for retrieved dog image URLs
function updateBreedImages(breedImageList, requestedCnt, availImgs) {
    let imagesContainer = document.querySelector("#images-container");
    let breedHeading = document.querySelector("#breed-heading");
    let breedsSelect = document.querySelector("#breeds");
    let breedVal = breedsSelect.value;
    // let liContainer = document.querySelector("#carou-indicator");
    let carouIndicators = document.querySelector("#carou-controls");
    
    carouIndicators.classList.remove('hidden');
    breedHeading.innerHTML = "";

    // create and add selected BREED
    let h2 = document.createElement('h2');

    let breedHeadingName = document.createElement('span');
    breedHeadingName.setAttribute("id", "breed-name");
    breedHeadingName.innerHTML = `Selected Breed: <span class="highlight">${breedVal}</span>`;

    let badge = document.createElement('span');
    badge.setAttribute("id", "count-badge");
    badge.classList.add('badge', 'badge-warning');

    h2.appendChild(breedHeadingName);
    h2.appendChild(badge);
    breedHeading.appendChild(h2);

    if (availImgs === 1) {
        badge.innerHTML = `${availImgs} image available`;
    }
    else {
        badge.innerHTML = `${availImgs} images available`;
    }

    imagesContainer.innerHTML = "";
    // liContainer.innerHTML = "";

    if (requestedCnt > availImgs) {

        let alert = document.querySelector("#alert-msg");
        let alertMsg = document.querySelector("#alert-msg2");
        alert.classList.remove('hidden');
        if(availImgs === 1) {
            alertMsg.innerHTML = `There is only ${availImgs} image available!`;
        }
        else {
            alertMsg.innerHTML = `There are only ${availImgs} images available!`;
        }
    }

    // create first active indicator
    // let olActive = document.createElement('li');
    // olActive.setAttribute("data-target", "#carouselExampleIndicators");
    // olActive.setAttribute("data-slide-to", 0);
    // olActive.classList.add('active');
    // liContainer.appendChild(olActive);

    // create indicator for each successfully retrieved image
    // for (let i = 0; i < availImgs - 1; i++) {
    //     let olImgs = document.createElement('li');
    //     olImgs.setAttribute("data-target", "#carouselExampleIndicators");
    //     olImgs.setAttribute("data-slide-to", i + 1);
    //     liContainer.appendChild(olImgs);
    // }

    let count = 0;

    // Loop through the image URLs, and create new <img> elements
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

// dynamically load list of dog image URLS for given breed name
function loadBreedImages(breed) {
    let imageCount = getImageCount();
    // See https://dog.ceo/dog-api/documentation/breed
    // Use the imageCount and breed variables to create our URL 
    let url = `https://dog.ceo/api/breed/${breed}/images/random/${imageCount}`;
    let xhr = new XMLHttpRequest();

    let err = document.querySelector("#error-msg");
    let errMsg = document.querySelector("#error-alert-message");

    xhr.onload = function () {
        try {
            let response = JSON.parse(this.responseText);
            let breedImageList = extractBreedImageList(response);

            if (imageCount > 0) {
                err.classList.add('hidden');
                errMsg.innerHTML = "";
                let alrt = document.querySelector("#alert-msg");
                let alrtMsg = document.querySelector("#alert-msg2");
                alrt.classList.add('hidden');
                alrtMsg.innerHTML = "";
                updateBreedImages(breedImageList, imageCount, breedImageList.length);
            }
        } catch (e) {
            showError("Please Select a Dog Breed.");
        }
    };

    xhr.onerror = function () {
        showError("Please Enter a Quantity.");
    };
    xhr.open("GET", url);
    xhr.send();
}

function extractBreedList(response) {
    if (response.status !== "success") {
        throw new Error("response wasn't successful");
    }
    return Object.keys(response.message);
}

// creates XHR request to get dog breeds as JSON, parse JSON and get list of breeds
function loadDogBreeds() {
    // See https://dog.ceo/dog-api/documentation/
    let url = "https://dog.ceo/api/breeds/list/all";
    let xhr = new XMLHttpRequest();

    xhr.onload = function () {
        try {
            let response = JSON.parse(this.responseText);
            let breedList = extractBreedList(response);
            updateBreedList(breedList);
        } catch (e) {
            showError("Unable to load dog breeds");
        }
    };
    xhr.onerror = function () {
        showError("Unable to load dog breeds");
    };
    xhr.open("GET", url);
    xhr.send();
}