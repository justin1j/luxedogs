import React from 'react'

function Images({ images }) {
  return (
    <div>
      {images.map((image, index) => (
        <div key={index}>
          <img style={{ width: '100%', maxHeight: '150px'}} src={`http://localhost:5000/${image}`} alt="productImage" />
        </div>
      ))}
    </div>
  )
}

export default Images
