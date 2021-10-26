import '../index.css'
import React, { useEffect } from 'react'
import { useState } from 'react';
import axios from 'axios';
import MaterialTable from "material-table";
import { forwardRef } from 'react';
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



const ProductList = () => {

  const [products, setProducts] = useState([])
  const baseURL = "http://206.189.39.185:5031/api"


  useEffect(() => {
    axios.get(`${baseURL}/Product`)
      .then((response) => {
        setProducts(response.data.data);
        // console.log(response.data)
      })
  }, []);

  const product = products.map((product) => {
    return {
      productId: product.productId,
      productName: product.productName,
      desciption: product.desciption,
      price: product.price,
      price1212: product.price1212,
      productAgent: product.productAgent
    };
  })
  // console.log(product)

  const addRowHandler = (newData, resolve) => {
    axios.post(`${baseURL}/Product/ProductCreate`, {
      "productName": newData.productName,
      "desciption": newData.desciption,
      "price": parseInt(newData.price),
      "price1212": parseInt(newData.price1212)
    })
      .then((response) => {
        const addProduct = [...product, newData]
        setProducts([...addProduct])
        resolve()
      })
    // console.log(newData) 
  }

  function deleteRowHanlder(oldData, resolve) {
    // console.log(oldData.productId)
    axios.delete(`${baseURL}/Product/${oldData.productId}`)
      .then((response) => {
        const index = oldData.tableData.id;
        const deleteProduct = [...product];
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
      // "price": parseInt(newData.price),
      "price1212": parseInt(newData.price1212)
    })
      .then((response) => {
        const dataUpdate = [...product];
        const index = oldData.tableData.id;
        dataUpdate[index] = newData;
        setProducts([dataUpdate]);
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
    <MaterialTable
      title="Products Management Test 3"
      icons={tableIcons}
      const columns={[
        { title: "Product", field: "productName" },
        { title: "Description", field: "desciption" },
        { title: "Price", field: "price" },
        { title: "Price1212", field: "price1212" },
      ]}
      data={product}
      options={
        { actionsColumnIndex: -1, addRowPosition: "first" }
      }
      editable={{
        onRowAdd: newData =>
          new Promise((resolve) => {
            addRowHandler(newData, resolve)
          }),

        onRowDelete: oldData =>
          new Promise((resolve) => {
            deleteRowHanlder(oldData, resolve)
          }),

        onRowUpdate: (newData, oldData) => {
          new Promise((resolve) => {
            updateRowHanlder(newData, oldData, resolve)
          })
        }
      }}

      detailPanel={[
        {
          tolltip: "More Details",
          render: product => {
            return (
              <table className='table'>
                <tr className='th'>
                  <th>Product ID</th>
                  <th>Product Agent</th>
                </tr>
                <tr>
                  <td>{product.productId}</td>
                  <td>{product.productAgent}</td>
                </tr>
              </table>
            )
          }
        }
      ]}
    />
  )
}

export default ProductList
