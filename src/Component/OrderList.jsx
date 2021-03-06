import '../index.css'
import React, { useEffect, useState, forwardRef } from 'react'
import { useHistory } from 'react-router';
import { logout } from './PrivateRoute'
import axios from 'axios';
import { Container, Nav, Navbar, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap';
import XLSX from 'xlsx';
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
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    axios.get(`${baseURL}/Order/GetOrderList/userId/status`)
      .then((response) => {
        setOrders(response.data.data)
        setIsLoading(false)
      })
  }, []);

  const history = useHistory()
  const handleLogOut = () => {
    history.push('/')
    logout()
  }

  const order = orders.map(order => {
    return {
      productId: order.productId,
      productName: order.productName,
      price: order.price,
      productDimension: order.productDimension,
      recipient: order.recipient,
      recipientAddr: order.recipientAddr,
    }
  })

  const downloadExcel = () => {
    const workSheet = XLSX.utils.json_to_sheet(order);
    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, 'orders');
    let buf = XLSX.write(workBook, {bookType: 'xlsx', type: 'buffer'});
    XLSX.write(workBook, {bookType: 'xlsx', type: 'binary'});
    XLSX.writeFile(workBook, 'OrdersList.xlsx');
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
        <Nav defaultActiveKey="/home" as="ul">
          <Navbar.Brand><h4>Cherry Products Management</h4></Navbar.Brand>
          <LinkContainer to='/' style={{ color: 'black' }}>
            <Nav.Link ><Button variant='outline-primary' size='sm'>Home</Button></Nav.Link>
          </LinkContainer>
          <LinkContainer to='productlist' style={{ color: 'black' }}>
            <Nav.Link ><Button variant='outline-primary' size='sm'>Products List</Button></Nav.Link>
          </LinkContainer>
          <LinkContainer to='/' style={{ color: 'black' }}>
            <Nav.Link onClick={handleLogOut}><Button variant='outline-primary' size='sm'>Log out</Button></Nav.Link>
          </LinkContainer>
        </Nav>
      </Container>

      <MaterialTable
        title={<h3>Order List</h3>}
        icons={tableIcons}
        isLoading={isLoading}
        const columns={[
          { title: "Product ID", field: "productId" },
          { title: "Product", field: "productName" },
          { title: "Price", field: "price" },
          { title: "Product Dimension", field: "productDimension" },
          { title: "Recipient", field: "recipient" },
          { title: "Recipient Address", field: "recipientAddr" }
        ]}
        data={order}
        options={
          {
            headerStyle: { position: 'sticky', top: 0 }, maxBodyHeight: '70vh'
          }
        }

        actions={[
          {icon:() => <Button style={{fontSize: 'small'}}>Export</Button>,
          onClick:() => downloadExcel(),
          tooltip:'Export to Excel',
          isFreeAction:true
          }
        ]}

      />
    </div>
  )
}

export default OrderList
