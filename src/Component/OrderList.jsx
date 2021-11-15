import '../index.css'
import React, { useEffect, useState, forwardRef } from 'react'
import { useHistory } from 'react-router';
import axios from 'axios';
import { Container, Nav, Navbar } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap';
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

const OrderList = () => {

  const [orders, setOrders] = useState([])
  const baseURL = "http://206.189.39.185:5031/api"

  useEffect(() => {
    axios.get(`${baseURL}/Order/GetOrderList/userId/status`)
      .then((response) => {
        setOrders(response.data.data)
      })
  }, []);
  console.log(orders)

  const order = orders.map(order => {
    return {
      productId: order.productId,
      productName: order.productName,
      price: order.price,
      productDimension: order.productDimension,
      recipient: order.recipient,
      recipientAddr: order.recipientAddr,
      recipientCity: order.recipientCity
    }
  })
  console.log(order)

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
      {/* <Container>
        <Nav defaultActiveKey="/home" as="ul">
          <Navbar.Brand><h4>Cherry Products Management</h4></Navbar.Brand>
          <LinkContainer to='/' style={{ color: 'black' }}>
            <Nav.Link >Home</Nav.Link>
          </LinkContainer>
          <LinkContainer to='/' style={{ color: 'black' }}>
            <Nav.Link onClick={handleLogOut}>Log Out</Nav.Link>
          </LinkContainer>
        </Nav>
      </Container> */}

      <MaterialTable
        icons={tableIcons}
        const columns={[
          {
            title: 'Product Image',
            field: 'imageUrl',
            render: (product) => {
              if (product.imageUrl) {
                return (
                  <img style={{ width: '110px', height: '120px' }} src={JSON.parse(product.imageUrl).url} alt='No Img' />
                )
              }
            }
          },
          { title: "Product", field: "productName" },
          { title: "Description", field: "desciption" },
          { title: "Price", field: "price" },
          { title: "Price1212", field: "price1212" },
        ]}
        // data={orders}
        // options={
        //   {
        //     actionsColumnIndex: -1, addRowPosition: "first",
        //     showTitle: false,
        //     exportButton: true,
        //     headerStyle: { position: 'sticky', top: 0 }, maxBodyHeight: '70vh'
        //   }
        // }
        // editable={{
        //   onRowAdd: newData =>
        //     new Promise((resolve) => {
        //       addRowHandler(newData, resolve)
        //     }),

        //   onRowDelete: oldData =>
        //     new Promise((resolve) => {
        //       deleteRowHanlder(oldData, resolve)
        //     }),

        //   onRowUpdate: (newData, oldData) =>
        //     new Promise((resolve) => {
        //       updateRowHanlder(newData, oldData, resolve)
        //     })
        // }}
      />
    </div>
  )
}

export default OrderList
