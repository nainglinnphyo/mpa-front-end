import { Table, TableBody, TableCell, TableRow } from '@mui/material'
import React from 'react'
import { AiOutlineDelete } from 'react-icons/ai'


function LoadingTableRow({ row, removeLoadingProduct }: any) {
  return (
    <TableRow hover>
      <TableCell align="center">{row.productName}</TableCell>
      <TableCell align="center">{row.quantity}</TableCell>
      <TableCell align="center">{row.unitName}</TableCell>
      <TableCell align="center"><AiOutlineDelete style={{ cursor: "pointer" }} onClick={() => removeLoadingProduct(row.productId)} size={15} /></TableCell>
    </TableRow>
  )
}

export default LoadingTableRow