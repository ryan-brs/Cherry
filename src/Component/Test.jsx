import React, { useState } from "react";

import MaterialTable from "material-table";
import { Input } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import CheckIcon from "@material-ui/icons/Check";
import SearchIcon from "@material-ui/icons/Search";

export default function App() {
  const [data, setData] = useState([
    { name: "Jon", job: "Software Dev", age: 29 }
  ]);
  return (
    <div className="App">
      <h1>Material Table AutoFocus</h1>
      <a href="https://smartdevpreneur.com/material-table-autofocus-on-row-add/">
        Click here for a detailed explanation of this code.
      </a>
      <div style={{ maxWidth: "100%", paddingTop: "12px" }}>
        <MaterialTable
          columns={[
            {
              title: "Name",
              field: "name",
              editComponent: editProps => (
                <Input
                  autoFocus={true}
                  onChange={e => editProps.onChange(e.target.value)}
                />
              )
            },
            { title: "Occupation", field: "job" },
            { title: "Age", field: "age", type: "numeric" }
          ]}
          data={data}
          title="AutoFocus Demo"
          icons={{
            Add: props => <AddIcon />,
            Edit: props => <EditIcon />,
            Delete: props => <DeleteIcon />,
            Clear: props => <DeleteIcon />,
            Check: props => <CheckIcon />,
            Search: props => <SearchIcon />,
            ResetSearch: props => <DeleteIcon />
          }}
          editable={{
            onRowAdd: newData =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  setData([...data, newData]);


                  resolve();
                }, 1000);
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  const dataUpdate = [...data];
                  const index = oldData.tableData.id;
                  dataUpdate[index] = newData;
                  setData([...dataUpdate]);

                  resolve();
                }, 1000);
              }),
            onRowDelete: oldData =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  const dataDelete = [...data];
                  const index = oldData.tableData.id;
                  dataDelete.splice(index, 1);
                  setData([...dataDelete]);

                  resolve();
                }, 1000);
              })
          }}
        />
      </div>
    </div>
  );
}
