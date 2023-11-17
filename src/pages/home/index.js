import React from 'react'
import { useState, useContext, useRef } from 'react'
import { Navbar } from '../../components/navbar'
import { Card } from '../../components/card'
import { SubmitPhoto } from '../../components/submit_photo'
import { Banner } from '../../components/banner'
import DataContext from '../dataProvider';
import cat1_original from '../../images/cat1-original.jpg'
import cat2_original from '../../images/cat2-original.jpg'
import cat3_original from '../../images/cat3-original.jpg'
import backgroundImage from '../../images/banner_bg_img.jpg'
import search_icon from '../../images/search_icon.png'
import { useSelector, useDispatch } from 'react-redux'
import { nanoid } from '@reduxjs/toolkit'
import { addCollection } from '../../app/features/collectionImages/collectionImagesSlice'

export const Home = () => {
    const dispatch = useDispatch()
    let activeUser = useSelector(state => state.users.activeUser);
    console.log("Active User:", activeUser)

    const { setOnCollectionPage } = useContext(DataContext);
    setOnCollectionPage(false);
    const imagesObj = [
        {
            id: 1,
            original_img: cat1_original,
            tags: "cat1",
        },
        {
            id: 2,
            original_img: cat2_original,
            tags: "cat2",
        },
        {
            id: 3,
            original_img: cat3_original,
            tags: "cat3",
        },
    ]

    const [images, setImages] = useState(imagesObj)
    // add to collection functionality
    //const { collectionImages, setCollectionImages } = useContext(DataContext);

    let collections = useSelector(state => state.collections.collections);
    let foundCollection = collections.find(collection => collection.email == activeUser)
    console.log("found collection", foundCollection)
    const addToCollection = (image) => {
        if (foundCollection) {
            console.log("found collection email: ", foundCollection.email)
            dispatch(addCollection({ collectionEmail: foundCollection.email, image: image }))
        }
        else {
            let collectionObj = {
                id: nanoid,
                email: activeUser,
                collectionImages: []
            }
            collectionObj.collectionImages.push(image);
            dispatch(addCollection({ collectionObj: collectionObj }))
        }
        //setCollectionImages([...collectionImages]);
    }

    //submit photo
    const handleImageUpload = (image) => {
        let uploadedImageObj = {}
        uploadedImageObj.id = images[images.length - 1].id + 1
        uploadedImageObj.original_img = URL.createObjectURL(image);
        console.log(uploadedImageObj);
        setImages([...images, uploadedImageObj]);
        console.log("Image Upload", images)
    };

    //Specific Image on Modal
    let [modalIsOpen, setModalIsOpen] = useState(false);
    let [selectedImage, setSelectedImage] = useState(null);

    const openModal = (id) => {
        let selectedImageObj = images.find(image => image.id === id)
        console.log(selectedImageObj.original_img)
        setSelectedImage(selectedImageObj.original_img);
        console.log("selected-image", selectedImage)
        setModalIsOpen(true);
    };

    const closeModal = () => {
        console.log("closemodal")
        setSelectedImage(null);
        setModalIsOpen(false);
    };

    //config button dropdown
    const [showDropdown, setShowDropdown] = useState(false)
    const handleDropdown = () => {
        if (showDropdown) {
            setShowDropdown(false)
        }
        else {
            setShowDropdown(true);
        }
    }

    //search function
    const [searchedTag, setSearchedTag] = useState('');
    const [filteredImages, setFilteredImages] = useState(images);
    const handleSearch = (e) => {
        const searchValue = e.target.value.toLowerCase();
        setSearchedTag(searchValue);
        console.log(searchedTag)
        if (searchedTag == "") {
            setImages(imagesObj);
        }
        else {
            const filtered = imagesObj.filter((image) =>
                image.tags.includes(searchedTag)
            );
            setFilteredImages(filtered);
            setImages(filteredImages)
            console.log(images);
        }
    };

    //specified  sized images
    const [selectedSize, setSelectedSize] = useState("medium");
    const imageSizes = {
        small: { width: 320, height: 240 },
        medium: { width: 640, height: 480 },
        large: { width: 1024, height: 768 },
    };
    const canvasRef = useRef();
    const handleSpecificSizeImageDownload = (specifiedSize) => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const width = specifiedSize == 'small' ? 640 : specifiedSize == 'medium' ? 1920 : specifiedSize == 'large' ? 2400 : ""; // Specify the desired width
        const height = specifiedSize == 'small' ? 960 : specifiedSize == 'medium' ? 2880 : specifiedSize == 'large' ? 3600 : ""; // Specify the desired height

        // Clear the canvas and draw an example image (replace with your own image)
        const img = new Image();
        img.src = selectedImage;
        img.onload = function () {
            ctx.clearRect(0, 0, width, height);
            ctx.drawImage(img, 0, 0, width, height);

            // Convert the canvas to a data URL
            const dataURL = canvas.toDataURL('image/jpeg');

            // Create a link element for downloading
            const downloadLink = document.createElement('a');
            downloadLink.href = dataURL;
            downloadLink.download = 'downloaded_image.jpg'; // Specify the desired file name
            downloadLink.click();
        };
    };


    // useEffect(() => {
    //     const apiUrl = 'https://api.thecatapi.com/v1/images/search?limit=10';
    //     fetch(apiUrl)
    //         .then((response) => response.json())
    //         .then((data) => {
    //             setImages(data);
    //         })
    //         .catch((error) => {
    //             console.error('Error fetching data:', error);
    //         });
    // }, []);
    // console.log(images);
    return (
        <>
            <SubmitPhoto onImageUpload={handleImageUpload} />
            <Navbar />
            <canvas ref={canvasRef} width={selectedSize == 'small' ? 640 : selectedSize == 'medium' ? 1920 : 2400} height={selectedSize == 'small' ? 960 : selectedSize == 'medium' ? 2880 : 3600} style={{ display: 'none', backgroundImage: `url(${selectedImage})` }} />
            <div
                className="bg-cover bg-center"
                style={{ height: '500px', backgroundImage: `url(${backgroundImage})` }}
            >
                <div className="flex flex-col justify-center items-center h-full bg-black bg-opacity-50">
                    <h1 className="text-4xl font-bold text-white mb-7">
                        Discover the World Through Pictures!
                    </h1>
                    <div className="flex bg-white bg-opacity-80 p-4 rounded-full w-1/3">
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchedTag}
                            onChange={handleSearch}
                            className="w-full bg-transparent focus:outline-none"
                        />
                        <div className='w-7 h-7 mr-7'>
                            <button><img src={search_icon} /></button>
                        </div>
                    </div>
                </div>
            </div>
            {/* <Banner setImages={setImages} images={images} imagesObj={imagesObj} /> */}
            {console.log(modalIsOpen)}
            <div className="grid grid-cols-3 gap-4" id='specific_grid_image'>
                {images.map((image) => (
                    <div onClick={() => openModal(image.id)}>
                        <Card
                            key={image.id}
                            image={image}
                            images={images}
                            setImages={setImages}
                            onAddToCollection={addToCollection}
                        />
                    </div>
                ))}
            </div>
            <Modal imageSizes={imageSizes} showModal={modalIsOpen} selectedImage={selectedImage} closeModal={closeModal} showDropdown={showDropdown} handleDropdown={handleDropdown} selectedSize={selectedSize} setSelectedSize={setSelectedSize} handleSpecificSizeImageDownload={handleSpecificSizeImageDownload} />
        </>
    )
}

const Modal = ({ imageSizes, showModal, selectedImage, closeModal, handleDropdown, showDropdown, selectedSize, setSelectedSize, handleSpecificSizeImageDownload }) => {
    return (
        <>
            <div className='m-4'>
                <div id="defaultModal" tabindex="-1" aria-hidden="true" class={`backdrop-brightness-50 z-50 fixed w-full py-4 overflow-x-hidden md:inset-0 h-[calc(100%-1rem)] max-h-screen ${(showModal ? " " : "hidden")}`}>
                    <div class="w-full max-w-2xl max-h-full">
                        <div class="relative w-screen mx-4 bg-white rounded-lg shadow dark:bg-gray-700">
                            <div class="flex items-start justify-between p-4 ">
                                <button onClick={closeModal} type="button" class="fixed left-5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="defaultModal">
                                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                    </svg>
                                </button>
                                <div className='fixed right-5'>
                                    <button onClick={handleDropdown} id="dropdownDefaultButton" data-dropdown-toggle="dropdown" class="text-white bg-black font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">Download<svg class="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
                                    </svg>
                                    </button>
                                    <div id="dropdown" class={`z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 ${(showDropdown ? "" : "hidden")}`}>
                                        <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                                            <li>
                                                <a href="#" onClick={() => { setSelectedSize("small"); handleSpecificSizeImageDownload("small") }} class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Small (640 x 960)</a>
                                            </li>
                                            <li>
                                                <a href="#" onClick={() => { setSelectedSize("medium"); handleSpecificSizeImageDownload("medium") }} class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Medium (1920 x 2880)</a>
                                            </li>
                                            <li>
                                                <a href="#" onClick={() => { setSelectedSize("large"); handleSpecificSizeImageDownload("large") }} class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Large (2400 x 3600)</a>
                                            </li>
                                            <li>
                                                <a href="#" onClick={handleSpecificSizeImageDownload} class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Original Size</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className='flex justify-center'>
                                <div class="my-6 space-y-6 flex justify-center">
                                    {selectedImage && (
                                        // <img style={{ width: '80%', height: '90%', objectFit: 'cover', }} src={selectedImage} alt="Selected Image" />
                                        <img src={selectedImage} alt="Resized Image" width={imageSizes[selectedSize].width} height={imageSizes[selectedSize].height} />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

