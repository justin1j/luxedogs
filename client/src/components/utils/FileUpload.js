import React, {useState} from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';

function FileUpload({ updateImages }) {
  
  const [Images, setImages] = useState([])

  const onDrop = files => {
    const formData = new FormData();
    const config = {
      header: {'content-type':'multipart/formdata'}
    }
    formData.append('file', files[0])

    axios.post('/api/product/uploadImage', formData, config)
    .then(res => {
      if (res.data.success) {
        setImages([...Images, res.data.image])
        updateImages([...Images, res.data.image])
      } else {
        console.log('failed to save')
      }
    })
  }

  const onDelete = (image) => {
    const currentIndex = Images.indexOf(image);
    const newImages = [...Images]
    newImages.splice(currentIndex, 1)

    setImages(newImages);
    updateImages(newImages)
  }

  return (
    <div style={{ display: 'flex', justifyContent:'space-between'}}>
      <Dropzone
        onDrop={onDrop}
        multiple={false}
        maxSize={8000000000}
      >
        {({ getRootProps, getInputProps }) => (
          <div 
            style={{ 
              width:'300px', height: '240px', border:'1px solid lightgray', display:'flex', alignItems:'center', justifyContent:'center'
            }}
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            <h2>Add Image</h2>
          </div>
        )}
      </Dropzone>

            <div style={{ display: 'flex', width: '350px', height:'240px'}}>
              {Images.map((image, index) => (
                <div onClick={() => onDelete(image)}>
                  <img style={{ minWidth:'300px', width:'300px', height: '240px'}} src={`http://localhost:5000/${image}`} alt={`productImage`} />
                </div>
              ))}
              <div onClick>
                <img />
              </div>
            </div>
    </div>
  )
}

export default FileUpload 