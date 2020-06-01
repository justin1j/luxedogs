import React, {useState} from 'react';
import FileUpload from '../../utils/FileUpload'
import axios from 'axios';

const sizes = [
  { key: 1, value: 'x-small'},
  { key: 2, value: 'small'},
  { key: 3, value: 'medium'},
  { key: 4, value: 'large'},
  { key: 5, value: 'x-large'}
]

function UploadProductPage({user, history}) {

  const [TitleValue, setTitleValue] = useState('');
  const [DescriptionValue, setDescriptionValue] = useState('')
  const [PriceValue, setPriceValue] = useState(0);
  const [SizeValue, setSizeValue] = useState(1)

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

  const onSizeSelectChange = e => {
    setSizeValue(e.target.value)
  }
 
  const updateImages = newImages => {
    setImages(newImages)
  }

  const submitUploadProduct = e => {
    e.preventDefault();
    console.log(Images)

    if (!TitleValue || !DescriptionValue || !PriceValue || !SizeValue || !Images.length) {
      return alert('Failed!: All product information should be filled');
    }

    const productInfo = {
      author: user.userData._id,
      title: TitleValue,
      description: DescriptionValue,
      price: PriceValue,
      images: Images,
      size: SizeValue
    }

    axios.post('/api/product/uploadProduct', productInfo)
    .then(res => {
      if (res.data.success) {
        alert('Product uploaded successfully')
        console.log(productInfo)
        history.push('/')
      } else {
        alert('failed to upload product')
      }
    })
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

      <select onChange={onSizeSelectChange} value={SizeValue}>
        {sizes.map(item => (
          <option key={item.key} value={item.key}>{item.value}</option>
        ))}
      </select>

      <br />
      <br />

      <button
        onClick={submitUploadProduct}
      >
        Submit
      </button>
    </form>


    </div>
  )
}

export default UploadProductPage;
