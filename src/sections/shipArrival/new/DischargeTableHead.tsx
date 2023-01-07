import { Table, TableBody, TableCell, TableRow } from '@mui/material'
import React from 'react'
import { TableHeadCustom } from '../../../components/table'

const TABLE_HEAD = [
  { id: "productName", label: "Product Name", align: "center" },
  { id: "quantity", label: "Quantity", align: "center" },
  { id: "unit", label: "Unit", align: "center" },
  { id: "", label: "", align: "" },

];

function DischargeTableHead() {
  return (
      <TableHeadCustom headLabel={TABLE_HEAD} />
  )
}

export default DischargeTableHead