import axios from 'axios'
import { useState, useEffect } from 'react'
import '../App.css'
import { Form, Button, Container } from 'react-bootstrap'


const LoadForm = ({ onClose, imageUpdate, rowId }) => {
  const [products, setProducts] = useState([])
  const baseURL = "http://206.189.39.185:5031/api"
  const [upload, setUpload] = useState()
  const UploadImage = (e) => {
    e.preventDefault()
    setUpload(e.target.files[0])
  }

  useEffect(() => {
    axios.get(`${baseURL}/Product`)
      .then((response) => {
        let data = response.data.data
        for (let prod of data) {
          if (prod.imageUrl) {
            prod.imageUrl = JSON.parse(prod.imageUrl).url
          }
        }
        setProducts(data);
      })
  }, []);

   const tableProduct = products.map((product) => {
    return {
      productId: product.productId,
      productName: product.productName,
      desciption: product.desciption,
      price: product.price,
      price1212: product.price1212,
      productAgent: product.productAgent,
      imageUrl: product.imageUrl
    }
  })

  const matchId = (imageUrl) => {
    let selectedProduct = {}
    for (let product of tableProduct) {
      if (rowId === product.productId) {
        selectedProduct = product
        console.log('selected',selectedProduct)
      }
    }

    const Url = {
      "productId": selectedProduct.productId,
      "productName": selectedProduct.productName,
      "desciption": selectedProduct.desciption,
      "price1212": parseInt(selectedProduct.price1212),
      "imageUrl": `{"url":"${imageUrl}"}`
    }

    axios.put("http://206.189.39.185:5031/api/Product/ProductUpdate", Url)
      .then(() => {
        selectedProduct.imageUrl = imageUrl
        const dataUpdate = [...tableProduct]
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
        <h6>Choose Image</h6>
        <Form.Control type="file"  onChange={e => UploadImage(e)} />
      </Form.Group>
      <Button
        className="btn btn-primary btn-large centerButton"
        style={{height:'38px', marginLeft:'10px', marginBottom:'16px'}}
        type="submit"
        onClick={submitImage}
      >Submit</Button>
      <Button 
      variant='danger'
      style={{marginLeft:'10px', marginBottom:'16px'}}
      onClick={onClose}
      >Cancle</Button>
    </Container>
  )
}

export default LoadForm
