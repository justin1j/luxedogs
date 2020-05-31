import React, {useState} from 'react';
import FileUpload from '../../utils/FileUpload'

function UploadProductPage() {

  const [TitleValue, setTitleValue] = useState('');
  const [DescriptionValue, setDescriptionValue] = useState('')
  const [PriceValue, setPriceValue] = useState(0);

  const [Images, setImages] = useState([])

  const onTitleChange = e => {
    setTitleValue(e.target.value)
  }

  const onDescriptionChange = e => {
    setDescriptionValue(e.target.value)
  }

  const onPriceChange = e => {
    setPriceValue(e.target.value)
  }
 
  const updateImages = newImages => {
    console.log(newImages)
    setImages(newImages)
  }

  return (
    <div style={{ maxWidth:'700px', margin:'2rem auto' }}>
      <div style={{ textAlign: 'center', marginBottom:'2rem'}}>
        <h2>Upload Clothes</h2>
      </div>

    <form onSubmit >

      <FileUpload updateImages={updateImages} />
    
      <br />
      <br />
      <label>Title</label>
      <input 
        onChange={onTitleChange}
        value={TitleValue}
      />
      <br />
      <br />
      <label>Description</label>
      <textarea
        onChange={onDescriptionChange}
        value={DescriptionValue}
      />
      <br />
      <br />
      <label>Price($)</label>
      <input 
        onChange={onPriceChange}
        value={PriceValue}
        type="number"
      />
      <selelct>
        <option key value>
        
        </option>

      </selelct>
      <br />
      <br />
      <button
        onClick
      >
        Submit
      </button>
    </form>


    </div>
  )
}

export default UploadProductPage;
