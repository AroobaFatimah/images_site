import React, { useState } from 'react'
import backgroundImage from '../../images/banner_bg_img.jpg'
import search_icon from '../../images/search_icon.png'

export const Banner = ({ setImages, images, imagesObj }) => {
    //handling images search
    const [searchedTag, setSearchedTag] = useState('');
    const [filteredImages, setFilteredImages] = useState(images);

    // const onTextChange = (e) => {
    //     const searchValue = e.target.value.toLowerCase();
    //     setSearchedTag(searchValue);
    //     console.log(searchedTag)
    // }

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

    // const handleSearch = (e) => {
    //     if (e.target.value == '') {
    //         setImages(images)
    //         console.log("All images");
    //     }
    //     else {
    //         const searchValue = e.target.value.toLowerCase();
    //         setSearchedTag(searchValue);
    //         console.log(searchedTag)

    //         const filtered = imagesObj.filter((image) =>
    //             image.tags.includes(searchValue)
    //         );
    //         setFilteredImages(filtered);
    //         setImages(filteredImages)
    //         console.log(images);
    //     }
    // };
    return (
        <>
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
        </>
    )
}
