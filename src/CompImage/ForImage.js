import React, { useState } from 'react'
// import plus from '../plus.png'
import './ForImage.css';
import { AiOutlineClose, AiOutlinePlus } from 'react-icons/ai'

function ForImage() {
    const [image, setImage] = useState('')
    const [typeFile, setTypeFile] = useState('')
    const [isuploaded, setIsUploaded] = useState(false)

    console.log("typeFile", typeFile)
    const handleImage = (e) => {
        if (e.target.files && e.target.files[0]) {
            setTypeFile(e.target.files[0].type)
            let reader = new FileReader();

            reader.onload = function (e) {
                setImage(e.target.result);
                setIsUploaded(true)
            };
            reader.readAsDataURL(e.target.files[0])
        }
    }
    return (
        <div className='container w-100'>
            <div className='imageBox'>
                {!isuploaded ? (
                    <>
                        <label htmlFor='imageUpload'>
                            <AiOutlinePlus size="9rem" />
                        </label>
                        <input type="file" id="imageUpload"
                            accept='.jpg, .jpeg, .png'
                            onChange={handleImage}
                            className='d-none'
                        />
                    </>

                ) : (
                    <div className='h-100'>
                        <AiOutlineClose onClick={() => {
                            setIsUploaded(false);
                            setImage(null)
                        }}
                            className='close'
                        />
                        <img src={image} alt="" className='picture' />
                    </div>
                )

                }



            </div>
            <div className="mt-5">
                <div class="uk-card uk-card-default uk-card-body uk-width-1-2@m">

                    <p >This is in base64</p>

                    <p className=''>{image}</p>


                </div>
            </div>
        </div>
    )
}
export default ForImage