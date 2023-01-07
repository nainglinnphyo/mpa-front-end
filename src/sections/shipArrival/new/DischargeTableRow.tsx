import { Table, TableBody, TableCell, TableRow } from '@mui/material'
import React from 'react'
import {AiOutlineDelete} from 'react-icons/ai'


function DischargeTableRow({row,removeDischargeProduct}:any) {
  console.log(row.productName)
  return (
    <TableRow hover>
      <TableCell align="center">{row.productName}</TableCell>
      <TableCell align="center">{row.quantity}</TableCell>
      <TableCell align="center">{row.unitName}</TableCell>
      <TableCell align="center"><AiOutlineDelete style={{cursor:"pointer"}} onClick={()=>removeDischargeProduct(row.productId)} size={15}/></TableCell>
    </TableRow>
  )
}

export default DischargeTableRow