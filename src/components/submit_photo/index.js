import react, { useState } from 'react';

export const SubmitPhoto = ({ onImageUpload }) => {
    //const [images, setImages] = useState([]);

    const [btnClicked, setBtnClicked] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        setSelectedImage(file);
        console.log(selectedImage)
    }

    const handleUploadButtonClick = () => {
        console.log(1)
        setBtnClicked(true);
        const fileInput = document.getElementById('file-input');
        fileInput.click(); // Trigger the file input when the button is clicked
    };

    const uploadImage = () => {
        console.log(2)
        setBtnClicked(false);
        if (selectedImage) {
            onImageUpload(selectedImage);
            setSelectedImage(null); // Clear the selected image after upload
        }
    }

    // const [selectedImage, setSelectedImage] = useState(null);

    // const handleImageChange = (e) => {
    //     const file = e.target.files[0];
    //     setSelectedImage(file);
    // };

    // const handleUpload = () => {
    //     if (selectedImage) {
    //         onImageUpload(selectedImage);
    //         setSelectedImage(null); // Clear the selected image after upload
    //     }
    // };
    return (
        <>
            <div>
                {/* <input type="file" accept="image/*" onChange={handleImageChange}  /> */}
                {/* <button onClick={handleUpload}>Upload</button> */}
                {/* <button className='bg-black text-white text-xl rounded-md p-3' onClick={() => {handleUpload() }} ><input type="file" accept="image/*" onChange={handleImageChange} />Submit a photo</button> */}
                {/* <button className='bg-black text-white text-xl rounded-md p-3' onClick={() => { handleUpload() }} ><input type="file" accept="image/*" onChange={handleImageChange} />Submit a photo</button> */}
                <button id='submit-btn' className='bg-black text-white text-xl rounded-md p-3' onClick={btnClicked ? uploadImage : handleUploadButtonClick}>Submit Photo</button>
                <input
                    type="file"
                    accept="image/*"
                    id="file-input"
                    style={{ display: 'none' }}
                    onChange={handleFileInputChange}
                />
            </div>
        </>
    )
}
//export default SubmitPhoto ;