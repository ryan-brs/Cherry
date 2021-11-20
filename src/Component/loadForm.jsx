import axios from 'axios'
import { useState } from 'react'
import '../App.css'


const LoadForm = ({onClose, imageUpdate, products}) => {
  const [inputId, setInputId] = useState()
  const [upload, setUpload] = useState()

  const UploadImage = (e) => {
    e.preventDefault()
    setUpload(e.target.files[0])
  }

  const matchId = (imageUrl) => {
    let seletedProduct = {}
    for(let product of products) {
      if(parseInt(inputId) === product.productId) {
        seletedProduct = product
      }
    }

    const Url = {
      "productId": seletedProduct.productId,
      "productName": seletedProduct.productName,
      "imageUrl": `{"url":"${imageUrl}"}`
    }
    // console.log(Url)
    axios.put("http://206.189.39.185:5031/api/Product/ProductUpdate", Url)
      .then(() => {
        const dataUpdate = [...products];
        const index = seletedProduct.tableData.id;
        dataUpdate[index].imageUrl = imageUrl
        console.log(dataUpdate)
        imageUpdate(dataUpdate)
      })
      .catch(error => {
        console.log(error);
      })
  }

  const submitImage = (e) => {
    e.preventDefault()
    const file = upload;
    let formdata = new FormData();
    formdata.append('imageFile', file)
    axios.post('http://206.189.39.185:5031/api/Common/UploadImage', formdata)
      .then(res => {
        console.log(res)
        matchId(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
   <>
      <form className='form'  onSubmit={submitImage} >
        <div>
          <label htmlFor="id">Product ID</label>
          <input type="text" id='id' onChange={(e) => setInputId(e.target.value)} />
          <label htmlFor="upload"><h3>Upload Image</h3></label>
          <input type="file" name='upload' id='upload' onChange={e => UploadImage(e)}/>
          <input type="submit" />
        </div>
      </form>
      <button onClick={onClose}>X</button>
   </>
  )
}

export default LoadForm
