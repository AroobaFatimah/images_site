import React, { useState, useContext } from 'react'
import DataContext from '../../pages/dataProvider'
import download_icon from '../../images/download_icon.png'
import delete_icon from '../../images/delete_icon.png'
import add_to_collection_icon from '../../images/add_to_collection_icon.png'
import { deleteCollectionImage } from '../../app/features/collectionImages/collectionImagesSlice'
import { useSelector, useDispatch } from 'react-redux'

export const Card = ({ image, images, setImages, collectionPageImages, setCollectionPageImages, onAddToCollection }) => {
    const { onCollectionPage } = useContext(DataContext);
    console.log(onCollectionPage)
    const [hover, setHover] = useState(false);

    //fetching collection from store
    let collections = useSelector(state => state.collections.collections);
    let activeUser = useSelector(state => state.users.activeUser);
    let foundCollection = collections.find(collection => collection.email == activeUser)
    const dispatch = useDispatch();

    //delete
    let deleteImage = (id) => {
        console.log(collectionPageImages)
        let selectedImageObj = onCollectionPage ? collectionPageImages.find(image => image.id === id) : images.find(image => image.id === id)
        console.log(selectedImageObj);
        let selectedImageObjIndex = onCollectionPage ? collectionPageImages.indexOf(selectedImageObj) : images.indexOf(selectedImageObj);
        console.log(selectedImageObjIndex)
        // onCollectionPage ? collectionPageImages.splice(selectedImageObjIndex, 1) : images.splice(selectedImageObjIndex, 1);
        onCollectionPage ? dispatch(deleteCollectionImage({imageId: selectedImageObj.id, collectionEmail: foundCollection.email})) : images.splice(selectedImageObjIndex, 1);
        if(!onCollectionPage){
            setImages([...images]);
        }
        //onCollectionPage ? setCollectionPageImages() : setImages([...images]);
    }

    //download image
    const handleDownload = (url, fileName) => {
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <>
            <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} className={`relative bg-black overflow-hidden mt-10 hover:opacity-50 transition-opacity`} style={{ width: "500px", height: "500px" }}>
                <img src={image.original_img ? image.original_img : URL.createObjectURL(image)} className='' style={{ width: '100%', height: '100%', objectFit: 'cover', }}></img>
                <div className="absolute inset-0 bg-black opacity-0 hover:opacity-30 transition-opacity"></div>
                <div className='flex absolute top-5 right-5'>
                    <button onClick={(e) => { e.stopPropagation(); onAddToCollection(image) }} className={`bg-btn-bg w-12 h-12 p-2 rounded-md mr-3 ${hover ? "" : "hidden"} ${onCollectionPage ? "hidden" : ""}`}>
                        <img src={add_to_collection_icon} />
                    </button>
                    <button onClick={(e) => { e.stopPropagation(); deleteImage(image.id) }} className={`bg-btn-bg w-12 h-12 p-2 rounded-md ${hover ? "" : "hidden"}`}>
                        <img src={delete_icon} />
                    </button>
                </div>
                <div className='absolute bottom-5 right-5'>
                    <button onClick={(e) => { e.stopPropagation(); handleDownload(image.original_img, 'downloaded-img.png') }} className={`bg-btn-bg w-12 h-12 p-2 rounded-md ${hover ? "" : "hidden"}`}>
                        <img src={download_icon} />
                    </button>
                </div>
            </div>
        </>
    )
}
//#393939