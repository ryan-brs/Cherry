import '../index.css'
import React, { useEffect, useState, forwardRef } from 'react'
import { useHistory } from 'react-router';
import axios from 'axios';
import { Container, Nav, Navbar, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap';
import { logout } from './PrivateRoute'
import MaterialTable from "material-table";
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import LoadForm from './loadForm';
import cookie from 'react-cookies'
import UploadFileIcon from '@mui/icons-material/UploadFile';



const ProductList = () => {
  const [rowId, setRowId] = useState()
  const [showDialog, setShowDialog] = useState(false)

  const [products, setProducts] = useState([])
  const baseURL = "http://206.189.39.185:5031/api"

  const toggleShowDialog = () => {
    setShowDialog(true)
  }
  const toggleCloseDialog = () => {
    setShowDialog(false)
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

  const updateHanlder = (update) => {
    setProducts([...update])
  }

  const addRowHandler = (newData, resolve) => {
    const cookieToken = cookie.load('token')
    const header = new Headers()
    header.append('Access', cookieToken)

    axios.post(`${baseURL}/Product/ProductCreate`, {
      "productName": newData.productName,
      "desciption": newData.desciption,
      "price": parseInt(newData.price),
      "price1212": parseInt(newData.price1212)
    }, header)
      .then((response) => {
        const addProduct = [...tableProduct, newData]
        setProducts([...addProduct])
        resolve()
      })
  }

  const history = useHistory()
  const handleLogOut = () => {
    history.push('/')
    logout()
  }

  function deleteRowHanlder(oldData, resolve) {
    axios.delete(`${baseURL}/Product/${oldData.productId}`)
      .then((response) => {
        const index = oldData.tableData.id;
        const deleteProduct = [...tableProduct];
        deleteProduct.splice(index, 1);
        setProducts([...deleteProduct]);
        resolve();
      })
      .catch(error => {
        alert("delete failed");
      })
  }

  function updateRowHanlder(newData, oldData, resolve) {
    axios.put(`${baseURL}/Product/ProductUpdate`, {
      "productId": parseInt(newData.productId),
      "productName": newData.productName,
      "desciption": newData.desciption,
      "price1212": parseInt(newData.price1212),
      "imageUrl": `{"url":"${newData.imageUrl}"}`
    })
      .then((response) => {
        const dataUpdate = [...tableProduct];
        const index = oldData.tableData.id;
        dataUpdate[index] = newData;
        setProducts([...dataUpdate]);
      })
      .catch(error => {
        alert('Update Failed');
      })
    resolve();
  }

  const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  }

  return (
    <div>
      <Container>
        <Nav>
          <Navbar.Brand><h4>Cherry Products Management</h4></Navbar.Brand>
          <LinkContainer to='/' style={{ color: 'black' }}>
            <Nav.Link><Button variant='outline-primary' size='sm'>Home</Button></Nav.Link>
          </LinkContainer>
          <LinkContainer to='orderlist' style={{ color: 'black' }}>
            <Nav.Link><Button variant='outline-primary' size='sm'>Orders</Button></Nav.Link>
          </LinkContainer>
          <LinkContainer to='/' style={{ color: 'black' }}>
            <Nav.Link onClick={handleLogOut}><Button variant='outline-primary' size='sm'>Log out</Button></Nav.Link>
          </LinkContainer>
        </Nav>
      </Container>

      {/* {showDialog && <LoadForm onClose={toggleCloseDialog}
        products={tableProduct}
        imageUpdate={updateHanlder}
        rowId={rowId}
      />} */}

      <MaterialTable
        icons={tableIcons}
        const columns={[

          {
            title: 'Product Image',
            field: 'imageUrl',
            render: tableProduct => {
              return (
                showDialog && rowId === tableProduct.productId ?
                  <LoadForm onClose={toggleCloseDialog}
                    // products={[tableProduct]}
                    imageUpdate={updateHanlder}
                    rowId={rowId}
                  /> :
                  tableProduct.imageUrl ? <img style={{ width: '110px', height: '120px' }} src={tableProduct.imageUrl} alt='' /> : <span>No Product Img</span>
                )
              }
            },
            // {title: "Product ID", field: "productId" },
      {title: "Product", field: "productName", maxWidth:'200px' },
      {title: "Description", field: "desciption" },
      {title: "Price1212", field: "price1212" },
          ]}
      data={tableProduct}
      options={
        {
          actionsColumnIndex: -1, addRowPosition: "first",
          showTitle: false,
          headerStyle: { position: 'sticky', top: 0 }, maxBodyHeight: '70vh',
        }
      }

      actions={[
        {
          icon: () => <UploadFileIcon />,
          onClick: (event, rowData) => {
            toggleShowDialog()
            setRowId(rowData.productId)
          },
          tooltip: 'Edit Product Image',
        }
      ]}

      editable={{
        onRowAdd: newData =>
          new Promise((resolve) => {
            addRowHandler(newData, resolve)
          }),

        onRowDelete: oldData =>
          new Promise((resolve) => {
            deleteRowHanlder(oldData, resolve)
          }),

        onRowUpdate: (newData, oldData) =>
          new Promise((resolve) => {
            updateRowHanlder(newData, oldData, resolve)
          })
      }}
        />
    </div>
  )
}

export default ProductList
