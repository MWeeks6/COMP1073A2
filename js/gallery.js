/**
 * - For every file in Images create a new ul that uses the Image class
 * - Add image gallery functionality
 */

//constants
const thumbnailList = document.getElementById("thumbnailList")
const mainImage = document.getElementById("mainImage")
const imageInfo = document.getElementById("imageDescription")

//create a list of images
const images = [
    "flowers-pink-large.jpg",
    "flowers-pink-small.jpg",
    "flowers-purple-large.jpg",
    "flowers-purple-small.jpg",
    "flowers-red-large.jpg",
    "flowers-red-small.jpg",
    "flowers-white-large.jpg",
    "flowers-white-small.jpg",
    "flowers-yellow-large.jpg",
    "flowers-yellow-small.jpg"
]

/* create dynamic list of image objects */
//create a list
imageGallery = []
//using the list of images (strings) create new Image object for each image in the list
images.forEach((image) =>{
    //create an 'imageObject' object
    const imageObject = {}
    //add property of filename
    imageObject.fileName = "images/" + image

    //method to dynamically retrieve charcteristics of the image based on a predetermined file format
    imageObject.info = ()=>{
        let infoList = image.replace(".jpg", "").split("-")
        imageObject.type = infoList[0]
        imageObject.color = infoList[1]
        imageObject.size = infoList[2]
        return imageObject
    }

    imageObject.description = `These are ${imageObject.info().color} ${imageObject.info().type}`

    //add the newly created image object to the gallery(list)
    imageGallery.push(imageObject)
})

/* dynamically creating the ul */
imageGallery.forEach((imageObject) => {

    //only allows small variation of the image to be added as a thumbnail
    if(imageObject.info().size === "small"){
        //create a new li element to hold each img element
        //create a new img element to hold each thumbnail
        const listItem = document.createElement("li")
        const thumbnail = document.createElement("img")

        //set the attributes for the images
        thumbnail.setAttribute("src", imageObject.fileName)
        thumbnail.setAttribute("alt", imageObject.description)

        //update the DOM to include the new li element and img element
        listItem.appendChild(thumbnail)
        thumbnailList.appendChild(listItem)
    }
})

function displayMainImage(imageSrc){
    mainImage.setAttribute("src", imageSrc)
}

function updateImageInfo(description){
    imageInfo.textContent = description
}

function updateThumbnailList(thumbnail){
    const thumbnails = document.querySelectorAll("li img")
    thumbnails.forEach((image) => {
        image.style.filter = "grayscale(100%)"
    })
    thumbnail.style.filter = "grayscale(0)"
}

thumbnailList.addEventListener("click", (event) => {
    if(event.target && event.target.nodeName === "IMG"){
        let imageSrc = event.target.getAttribute("src")
        imageSrc = imageSrc.replace("small", "large")
        displayMainImage(imageSrc)
        updateImageInfo(event.target.getAttribute("alt"))
        updateThumbnailList(event.target)   
    }
})