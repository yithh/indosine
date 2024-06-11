import React, { useState } from "react";
import './UploadImage.css';
 
function UploadImage() {
    const [image, setFile] = useState();
    function handleChange(e) {
        console.log(e.target.files);
        setFile(URL.createObjectURL(e.target.files[0]));
    }
 
    return (
        <div className="UploadImage">
            <input type="file" onChange={handleChange} />
            <img src={image} className='recipe-image'/>
        </div>
    );
}
 
export default UploadImage;