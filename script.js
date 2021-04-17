/**
 * When the page finishes loading, use AJAX to get our dog breeds.
 */
window.onload = function () {
    loadDogBreeds();
};

/**
 * If there are any errors during our AJAX work, display them in the page. 
 */
function showError(message) {
    let err = document.querySelector("#error-msg");
    let errMsg = document.querySelector("#error-alert-message");
    err.classList.remove('hidden');
    errMsg.innerHTML = message;
}

/**
 * Loop through the list of breeds, and create an <option>
 * for each, before adding it to our <select>
 */
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
    // btnLoad.addEventListener('submit', function (e) {
    //     e.preventDefault();
    //     let breed = select.value;
    //     loadBreedImages(breed);
    // })

    btnRand.onclick = function (e) {
        // get length of object for randomizer
        var size = Object.keys(breedList).length;

        // randomize
        let rand = Math.floor(Math.random() * size);

        // random qty
        // let randQty = Math.floor(Math.random() *50) + 1;



        // let randChoice = breedList[haha];
        // console.log(`random breed is ${randChoice}`);
        select.value = breedList[rand];
        // loadBreedImages(randChoice);
        // option.innerHTML = "LMFAO";


        // let breed = select.value
    }
}

/**
 * Get the number of images to load from our form
 */
function getImageCount() {
    let input = document.querySelector("#image-count");
    return input.value;
}

/**
 * Parse the response Object, which looks something like this:
 * 
 * {
 *   status: "success",
 *   message: {
 *     "https://images.dog.ceo/breeds/hound-afghan/n02088094_1003.jpg",
 *     "https://images.dog.ceo/breeds/hound-afghan/n02088094_1007.jpg",
 *     ...
 *   }
 * }
 *  
 * The `status` tells us if the server was successful at building
 * the list of breed image URLs.  The `message` is an Object with all the
 * URLs for the breed images as an Array (we don't have to do anything to it). 
 */
function extractBreedImageList(response) {
    if (response.status !== "success") {
        throw new Error("response wasn't successful");
    }
    return response.message;
}

// dog jokes
function dogJokes() {
    // jokes were copied from below sites
    // https://www.familyminded.com/s/best-knock-knock-jokes-dc9cdf3cb12c4c3e   
    // https://bestlifeonline.com/dog-puns/ 
    let jokes =
        [
            {
                "joke": "How do you know a good dog pun from a bad dog pun?",
                "punchLine": "The good ones make you bark with laughter!"
            },
            {
                "joke": "Why did the dog cross the road twice?",
                "punchLine": "He was trying to fetch a boomerang!"
            },
            {
                "joke": "What happened to the dog who gave birth on the side of the road?",
                "punchLine": "She was ticketed for littering!"
            },
            {
                "joke": "Looking for some great dog puns?",
                "punchLine": "Then paws what you're doing and read these!"
            },
            {
                "joke": "The dog couldn't remember where he parked his car…",
                "punchLine": "in the barking lot."
            },
            {
                "joke": "What's better than a spelling bee?",
                "punchLine": "A talking dog!"
            },
            {
                "joke": "My friend said he once threw a stick two miles and his dog still brought it back…",
                "punchLine": "Seems a bit far-fetched to me."
            },
            {
                "joke": "What did the dog say when he went to the dentist?",
                "punchLine": "I think one of my canines is getting loose!"
            },
            {
                "joke": "Where do dogs like to surf?",
                "punchLine": "Collie-fornia!"
            },
            {
                "joke": "What's a dog's favourite movie?",
                "punchLine": "Harry Paw-ter and the Sorcerer's Bone!"
            },
            {
                "joke": "What do dogs call their parents?",
                "punchLine": "Ma and paw."
            },
            {
                "joke": "What do you call a dog who picks a lock?",
                "punchLine": "A corg-key!"
            },
            {
                "joke": "What do you call a cold dog?",
                "punchLine": "A pup-sicle!"
            },
            {
                "joke": "What's a pup's favorite action flick?",
                "punchLine": "Jurassic Bark!"
            },
            {
                "joke": "What did the dog say before he left for work?",
                "punchLine": "Just another day at the paw-ffice!"
            },
            {
                "joke": "What do dogs eat at the movies?",
                "punchLine": "Pup-eroni pizza and pup-corn!"
            },
            {
                "joke": "The dog picnic quickly turned into...",
                "punchLine": "a Bark-B-Q!"
            },
            {
                "joke": "Where do dogs go when their tail falls off?",
                "punchLine": "The re-tail store."
            },
            {
                "joke": "Did you see the dog's new outfit?",
                "punchLine": "It was quite fetching!"
            },
            {
                "joke": "How are we doing with these dog puns?",
                "punchLine": "Some of them are ruff, but a few of them have paw-tential!"
            },
            {
                "joke": "What did the dog say to its Valentine?",
                "punchLine": "I'm mutts about you!"
            },
            {
                "joke": "Why was the puppy party so loud?",
                "punchLine": "They turned up the sub-woof-ers!"
            },
            {
                "joke": "What did the celebrity dog say when someone took his photo?",
                "punchLine": "Sorry, no pup-arazzi please!"
            },
            {
                "joke": "Why should you be cautious when it's raining cats and dogs?",
                "punchLine": "If you're not careful, you could step in a poodle!"
            },
            {
                "joke": "What was the sale this week at the pet store?",
                "punchLine": "Buy one dog, get one flea!"
            },
            {
                "joke": "What do you call a dog magician?",
                "punchLine": "A labracadabrador."
            },
            {
                "joke": "What do dogs eat for breakfast?",
                "punchLine": "Pooched eggs."
            },
            {
                "joke": "What kind of dog does Dracula have?",
                "punchLine": "A bloodhound."
            },
            {
                "joke": "What do a dog and a cellphone have in common?",
                "punchLine": "Both have collar ID."
            },
            {
                "joke": "What kind of dog loves to take bubble baths?",
                "punchLine": "A shampoodle."
            },
            {
                "joke": "What kind of dog doesn't bark?",
                "punchLine": "A hush puppy."
            },
            {
                "joke": "What's a dog's favourite instrument?",
                "punchLine": "A trom-bone."
            },
            {
                "joke": "Why doesn't anyone want to work for dogs?",
                "punchLine": "Because they hound their employees."
            },
            {
                "joke": "What kind of dog chases anything red?",
                "punchLine": "A bulldog."
            },
            {
                "joke": "What does a dog say before eating?",
                "punchLine": "Bone appetit!"
            },
            {
                "joke": "What do you call a cold dog?",
                "punchLine": "A chili dog."
            },
            {
                "joke": "What did the dog say to the tree?",
                "punchLine": "Bark."
            },
            {
                "joke": "What is a dog's favourite city?",
                "punchLine": "New Yorkie."
            },
            {
                "joke": "What dog keeps the best time?",
                "punchLine": "A watchdog."
            },
            {
                "joke": "How does a dog stop a TV show?",
                "punchLine": "He presses paws."
            },
            {
                "joke": "What do you get when you cross a cocker spaniel, a poodle and a rooster?",
                "punchLine": "A cockerpoodledoo!"
            },
            {
                "joke": "What does a dog get when they finish obedience school?",
                "punchLine": "Their pet-degree!"
            },
            {
                "joke": "What did the dog say when they sat on sandpaper?",
                "punchLine": "That was ruff!"
            },
            {
                "joke": "What do you call a left-handed boxer?",
                "punchLine": "A south paw!"
            },
            {
                "joke": "What do you do if your dog chews a dictionary?",
                "punchLine": "Take the words out of his mouth!"
            },
            {
                "joke": "What do you call a wild dog that meditates?",
                "punchLine": "Aware wolf."
            },
            {
                "joke": "What do you get if you cross a gold dog with a telephone?",
                "punchLine": "A golden receiver."
            },
            {
                "joke": "What did the dog say to his landlord?",
                "punchLine": "I think we need to renegotiate the terms of my leash."
            },
            {
                "joke": "Do you think he's a bad dog?",
                "punchLine": "No, but he is a little ruff around the edges."
            }
        ];
    return jokes[Math.floor(Math.random() * jokes.length)];
}



/**
 * Given a list of breed image URLs, erase our current image
 * container of any <img>s, and create new ones for these URLs. 
 */
function updateBreedImages(breedImageList, requestedCnt, availImgs) {
    let imagesContainer = document.querySelector("#images-container");
    // let breedName = document.querySelector("#breed-name");
    // let breedName = document.querySelector("#breed-heading");
    let breedHeading = document.querySelector("#breed-heading");
    let breedsSelect = document.querySelector("#breeds");
    let breedVal = breedsSelect.value;
    let liContainer = document.querySelector("#carou-indicator");




    let carouIndicators = document.querySelector("#carou-controls");
    carouIndicators.classList.remove('hidden');





    // 
    // let err = document.querySelector("#error-msg");
    // let errMsg = document.querySelector("#error-alert-message");
    // err.classList.add('show');
    // errMsg.innerHTML = message;
    // 



    // let pageHeading = document.querySelector("#page-heading");


    // pageHeading.innerHTML = "";
    // pageHeading.innerHTML = "testing";
    breedHeading.innerHTML = "";


    // create and add selected BREED
    let span = document.createElement('span');
    let badge = document.createElement('span');
    span.setAttribute("id", "breed-name");
    badge.setAttribute("id", "count-badge");


    badge.classList.add('badge', 'badge-warning');
    badge.innerHTML = "testing";



    // span.setAttribute("class", "text-capitalize");
    let h2 = document.createElement('h2');
    h2.appendChild(span);
    // badge.innerHTML = "testing";
    h2.appendChild(badge);
    breedHeading.appendChild(h2);
    // lolz.appendChild(h2);

    // olActive.setAttribute("id", "breed-name");


    // h2.appendChild(selectedBreed);
    // pageHeading.appendChild(h2);

    // alert(`count = ${requestedCnt} | available = ${availImgs}`);

    // Set the name of the Breed in our heading
    // breedName.innerHTML = breedVal.charAt(0).toUpperCase() + breedVal.slice(1);
    // span.innerHTML = "";


    // document.getElementById('error').innerHTML="Please enter a username";


    // below code works
    // span.innerHTML = breedVal; 
    span.innerHTML = `Selected Breed: ${breedVal}`;

    if (availImgs === 1) {
        badge.innerHTML = `${availImgs} image available`;
    }
    else {
        badge.innerHTML = `${availImgs} images available`;
    }




    // Clear the imagesContainer if there is anything there now
    imagesContainer.innerHTML = "";
    liContainer.innerHTML = "";


    // 
    // let err = document.querySelector("#error-msg");
    // let errMsg = document.querySelector("#error-alert-message");
    // err.classList.add('show');
    // errMsg.innerHTML = message;
    // 

    // check if there are enough pictures to match requested amount
    if (requestedCnt > availImgs) {

        let alert = document.querySelector("#alert-msg");
        let alertMsg = document.querySelector("#alert-msg2");
        alert.classList.remove('hidden');
        alertMsg.innerHTML = `There are only ${availImgs} images available!`;




    }



    // add left and right indicators

    // create first active indicator
    let olActive = document.createElement('li');
    olActive.setAttribute("data-target", "#carouselExampleIndicators");
    olActive.setAttribute("data-slide-to", 0);
    olActive.classList.add('active');
    liContainer.appendChild(olActive);

    // create indicator for each successfully retrieved image
    for (let i = 0; i < availImgs - 1; i++) {
        let olImgs = document.createElement('li');
        olImgs.setAttribute("data-target", "#carouselExampleIndicators");
        olImgs.setAttribute("data-slide-to", i + 1);
        liContainer.appendChild(olImgs);
    }


    // let div2 = document.createElement("div");
    // div2.classList.add('carousel-item active');
    // let img2 = document.createElement("p");
    // img2.src = "imgs/2.jpg";
    // div2.appendChild(img2);
    // imagesContainer.appendChild(div2);




    // create first active image of carousel
    // let div3 = document.createElement('div');
    // div3.classList.add('carousel-item', 'active');
    // let img3 = document.createElement('img');
    // img3.src = "imgs/new.jpg";
    // div3.appendChild(img3);
    // imagesContainer.appendChild(div3);


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


        // dog jokes
        let dogJoke = dogJokes();




        // create and add caption
        let caption = document.createElement("div");
        caption.classList.add('carousel-caption', 'd-none', 'd-md-block', 'text-capitalize');
        div.appendChild(caption);
        let capHeading = document.createElement("h5");
        capHeading.innerHTML = dogJoke.joke;




        // console.log(dogJoke.joke);
        // console.log(dogJoke.punchLine);

        let capDesc = document.createElement("p");
        capDesc.classList.add("jk-punchline");
        capDesc.innerHTML = dogJoke.punchLine;


        let newDiv = document.createElement("div");
        newDiv.classList.add("rando");
        // newDiv.appendChild()


        newDiv.appendChild(capHeading);
        newDiv.appendChild(capDesc);
        caption.appendChild(newDiv);



        return div;
    }

    breedImageList.forEach(function (url) {
        // let count = 0;

        let img = createImgElement(url);



        imagesContainer.appendChild(img);
    });
};

/**
 * Given a breed name, dynamically load a list of image URLs for that breed 
 */
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


            // if (imageCount <= 0) {
            // alert("NO!");

            // } else {
            if (imageCount > 0) {
                // working
                err.classList.add('hidden');
                errMsg.innerHTML = "";

                let alrt = document.querySelector("#alert-msg");
                let alrtMsg = document.querySelector("#alert-msg2");
                alrt.classList.add('hidden');
                alrtMsg.innerHTML = "";


                updateBreedImages(breedImageList, imageCount, breedImageList.length);
            }
            // }









            // err.innerHTML = "";
            // err.classList.add('show');
            // errMsg.innerHTML = "";



        } catch (e) {

            showError("Please Select a Dog Breed.");
        }
    };

    xhr.onerror = function () {

        showError("Please Enter a Quantity.");
        // change above line to an error has occured?
    };

    xhr.open("GET", url);
    xhr.send();
}

/**
 * Parse the response Object, which looks something like this:
 * 
 * {
 *   status: "success",
 *   message: {
 *     dingo: [],
 *     beagle: [],
 *     ...
 *   }
 * }
 *  
 * The `status` tells us if the server was successful at building
 * the list of breeds.  The `message` is an Object with all the names
 * of the breeds as keys, and values of sub-breeds (most are empty).
 * We want to turn the breed keys into an Array. 
 */
function extractBreedList(response) {
    if (response.status !== "success") {
        throw new Error("response wasn't successful");
    }
    return Object.keys(response.message);
}

/**
 * Create an XHR request to get all the dog breeds as JSON.
 * Parse the JSON and extract the list of breeds, populating
 * our <select> with <option>s.
 */
function loadDogBreeds() {
    // See https://dog.ceo/dog-api/documentation/
    let url = "https://dog.ceo/api/breeds/list/all";
    let xhr = new XMLHttpRequest();

    xhr.onload = function () {
        try {
            let response = JSON.parse(this.responseText);
            let breedList = extractBreedList(response);
            // alert(breedList.length);
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