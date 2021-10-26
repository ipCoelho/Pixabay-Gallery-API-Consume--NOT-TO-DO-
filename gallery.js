"use strict"

const clearElement = (htmlElement) => {
    while (htmlElement.firstChild) {
        htmlElement.removeChild(htmlElement.lastChild)
    }
}
const searchImages = async (event) => {
    if (event.key === 'Enter') {
        const search = event.target.value;
        const apiUrl = `https://pixabay.com/api/?key=24041695-05863ddbee6a5255c478b284f&q=${search}&image_type=photo`;
        const apiFetch = await fetch(apiUrl);
        const apiJson = await apiFetch.json();
        
        // This syntax 'apiJson.hits[0]' tracks the array on the element, now it's needed to use the reduce() to get only the largeImageURL and storage all on a single date.
        console.log(apiJson.hits[0]);

        // clearElement(document.querySelector('.gallery-section'))
        // clearElement(document.querySelector('.slide-section'))

        // renderGallery(apiJson.message);
        // renderSlide(apiJson.message);
    }
}




const filterUrl = urlImage => {
    const lastBar = urlImage.lastIndexOf('/') + 1
    const lastDot = urlImage.lastIndexOf('.') 
    return urlImage.substring(lastBar, lastDot)
}
const createGalleryItem = (urlImage) => {
    const htmlGallerycontainer = document.querySelector(".gallery-section")
    const link = document.createElement('a')
    link.href = `#${filterUrl(urlImage)}`
    link.classList.add("gallery-items")
    link.innerHTML = `<img src="${urlImage}" alt="">`
    htmlGallerycontainer.append(link)
}
const createSlideItem = (urlImage, index, array) => {
    const container = document.querySelector(".slide-section")
    const div = document.createElement('div')
    div.classList.add('slide')
    div.id = filterUrl(urlImage)

    const indexBack = index == 0 ? array.length - 1 : index - 1 
    const slideBack = filterUrl(array[indexBack])

    const indexNext = index == array.length - 1 ? 0 : index + 1
    const slideNext = filterUrl(array[indexNext])

    div.innerHTML = `
            <div class="image-container">
                <a href="" class="close">&#10006;</a>
                <a href="#${slideBack}" class="navigation back">&#171;</a>
                <img src="${urlImage}" alt="">
                <a href="#${slideNext}" class="navigation next">&#187;</a>
            </div>
    `
    container.appendChild(div)
}

const renderGallery = (images) => images.forEach(createGalleryItem)
const renderSlide = (images) => images.forEach(createSlideItem)

document.querySelector('.search-container input').addEventListener('keypress', searchImages)


// const searchImages = async (event) => {
//     // Get the event from the 'keypress' that delivers an object.
//     if (event.key === 'Enter') {
//         // Get the value of the input, by the keypress, using the properties 'event.target.value'.
//         const breed = event.target.value;
//         // Getting the API url and saving into a const.
//         const apiUrl = `https://dog.ceo/api/breed/${breed}/images`;
//         // Using the method fetch(), and saving the object, into a const; also using the property 'await' to deliver the promisse properly.
//         const apiFetch = await fetch(apiUrl);
//         // Using the method .json() to transform the object into a json, and also saving into a const.
//         const apiJson = await apiFetch.json();
//         console.log(apiJson);

//         clearElement(document.querySelector('.gallery-section'))
//         clearElement(document.querySelector('.slide-section'))

//         // Using the both method created to render the gallery and also the slides, the '.message' is 'key' on the json which contain the array with all the image URLs.
//         renderGallery(apiJson.message);
//         renderSlide(apiJson.message);
//     }
// }