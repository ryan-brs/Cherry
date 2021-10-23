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



const Test2 = () => {

  const [products, setProducts] = useState([])

  useEffect(() => {
    axios.get('http://206.189.39.185:5031/api/Product')
      .then((response) => {
        setProducts(response.data.data);
        console.log(response)
      })
    }, []);
    // console.log(products)
    
    const product = products.map((product) => {
      return {
        productId: product.productId,
        productName: product.productName,
        description: product.desciption,
        price: product.price,
        price1212: product.price1212
      };
    })
    console.log(product)
    
  
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
  
  // const product = [
  //   { productId: 1, productName: "cherry1", description: "good cherry", price: 50, price1212: 45 }
  // ]

  return (
    <MaterialTable 
      title="Products Management"
      icons={tableIcons}    
      const columns = {[
        { title: "ID", field: "productId" },
        { title: "Product", field: "productName" },
        { title: "Description", field: "description" },
        { title: "Price", field: "price" },
        { title: "Price1212", field: "price1212" }
      ]}
      data={product}
      // editable={{
      //   onRowAdd: newProduct => 
      //     new Promise((resolve, reject) => {
      //       const addProduct=[...product, newProduct]
      //       setProducts([...addProduct])
      //       resolve()
      //     })
      // }}

    
    />
  )
}

export default Test2
