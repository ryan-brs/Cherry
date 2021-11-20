import axios from 'axios'
import { useState } from 'react'
import '../App.css'
import { Form, Button, Container } from 'react-bootstrap'


const LoadForm = ({ onClose, imageUpdate, products, rowId }) => {
  // const [inputId, setInputId] = useState()
  const [upload, setUpload] = useState()
  const UploadImage = (e) => {
    e.preventDefault()
    setUpload(e.target.files[0])
  }

  const matchId = (imageUrl) => {
    let seletedProduct = {}
    for (let product of products) {
      if (rowId === product.productId) {
        seletedProduct = product
      }
    }

    const Url = {
      "productId": seletedProduct.productId,
      "productName": seletedProduct.productName,
      "imageUrl": `{"url":"${imageUrl}"}`
    }
    axios.put("http://206.189.39.185:5031/api/Product/ProductUpdate", Url)
      .then(() => {
        const dataUpdate = [...products];
        const index = seletedProduct.tableData.id;
        dataUpdate[index].imageUrl = imageUrl
        imageUpdate(dataUpdate)
      })
      .catch(error => {
        console.log(error);
      })
  }

  const submitImage = (e) => {
    e.preventDefault()
    onClose()
    const file = upload;
    let formdata = new FormData();
    formdata.append('imageFile', file)
    axios.post('http://206.189.39.185:5031/api/Common/UploadImage', formdata)
      .then(res => {
        matchId(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <Container 
    style={{ 
      width: '500px', 
      display:'flex', 
      alignItems:'flex-end', 
      marginTop:'30px' }}>
      <Form.Group controlId="formFile" className="mb-3">
        <h4>Choose Image</h4>
        <Form.Control type="file"  onChange={e => UploadImage(e)} />
      </Form.Group>
      <Button
        className="btn btn-primary btn-large centerButton"
        style={{height:'38px', marginLeft:'10px', marginBottom:'16px'}}
        type="submit"
        onClick={submitImage}
      >Submit</Button>
      {/* <form className='form' onSubmit={submitImage} >
        <div>
          <label htmlFor="upload"><h3>Upload Image</h3></label>
          <input type="file" name='upload' id='upload' onChange={e => UploadImage(e)} />
          <input type="submit" />
        </div>
      </form> */}
      <Button 
      variant='danger'
      style={{marginLeft:'10px', marginBottom:'16px'}}
      onClick={onClose}
      >Cancle</Button>
    </Container>
  )
}

export default LoadForm
