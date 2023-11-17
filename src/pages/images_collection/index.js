import React, { useContext } from 'react'
import { Card } from '../../components/card'
import DataContext from '../dataProvider';
import { useState } from 'react';
import { useSelector } from 'react-redux';


export const Collection = () => {
    let activeUser = useSelector(state => state.users.activeUser);
    let collections = useSelector(state => state.collections.collections);
    let activeUserCollection = collections.find(collection => collection.email == activeUser)
    let activeUserCollectionImages;
    if (activeUserCollection) {
        activeUserCollectionImages = activeUserCollection.collectionImages
    }

    // const setCollectionPageImages = () => {
    //     activeUserCollectionImages = activeUserCollection.collectionImages;
    // }
    //const { collectionImages } = useContext(DataContext);
    //const [collectionPageImages, setCollectionPageImages] = useState(collectionImages)
    const { setOnCollectionPage } = useContext(DataContext);
    setOnCollectionPage(true);

    return (
        <>
            {console.log("collections", collections)}
            <div className="grid grid-cols-3 gap-4">
                {activeUserCollectionImages ? activeUserCollectionImages.map((image) => (
                    //<div onClick={() => openModal(image.id)}>
                    <div>
                        <Card
                            key={image.id}
                            image={image}
                            collectionPageImages={activeUserCollectionImages}
                            //setCollectionPageImages={setCollectionPageImages}
                        //onDelete={deleteImage}
                        //onDownload={handleDownload}
                        />
                    </div>
                )) : ""}
            </div>

        </>
    )
}
