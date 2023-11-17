import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    collections: [
        {
            id: 1,
            email: "test@gmail.com",
            collectionImages: []
        }
    ],
}
export const collectionImagesSlice = createSlice({
    name: 'collections',
    initialState,
    reducers: {
        addCollection: (state, action) => {
            let { collectionEmail, image, collectionObj } = action.payload;
            if (collectionEmail) {
                const updatedCollections = state.collections.map(collection => {
                    if (collection.email === collectionEmail) {
                        return {
                            ...collection,
                            collectionImages: [...collection.collectionImages, image],
                        };
                    }
                    return collection;
                });
                return { ...state, collections: updatedCollections };
            }
            else {
                return { ...state, collections: [...state.collections, collectionObj] };
            }
        },

        deleteCollectionImage: (state, action) => {
            let { collectionEmail, imageId} = action.payload;
            state.collections.map(collection => {
                if (collection.email === collectionEmail) {
                    collection.collectionImages = collection.collectionImages.filter(image => image.id !== imageId)
                }
            })
        }
    }
})
export const { addCollection, deleteCollectionImage } = collectionImagesSlice.actions;
export default collectionImagesSlice.reducer;