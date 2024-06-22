import React, { useState } from "react";
import './UploadImage.css';
 
function UploadImage() {
    const [image, setImage] = useState(null);
    const [error, setError] = useState('');

    function handleChange(e) {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
            if (allowedTypes.includes(selectedFile.type)) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setImage(reader.result);
                    setError('');
                };
                reader.readAsDataURL(selectedFile);
            } else {
                setImage(null);
                setError('Please select a valid image file (png, jpg, jpeg).');
            }
        } else {
            setImage(null);
            setError('Please select an image file.');
        }
    }
 
    return (
        <div className="UploadImage">
            <input type="file" accept="image/png, image/jpeg, image/jpg" onChange={handleChange} />
            {error && <p className="error-message">{error}</p>}
            {image && <img src={image} alt="Uploaded" className='recipe-image'/>}
        </div>
    );
}
 
export default UploadImage;
