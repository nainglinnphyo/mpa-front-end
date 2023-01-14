import React from 'react'
import { BLData } from '../../../../apis/main/ship';
interface IProp {
     printRef: any;
     data: BLData[]
}
function BLPrint({ printRef, data }: IProp) {
     var tableStyle = {
          "border": "1px solid black",
          "border-collapse": "collapse",
          "width": "100%",
          "text-align": "center",
          "font-size": 20,
          "margin-top": 10,

     };
     var trStyle = {
          "border": "1px",
          "border-style": "solid",
          "padding": "10px",
     };
     return (
          <div ref={printRef} style={{ padding: 50 }}>
               <div style={{ fontSize: 20, textAlign: "center" }}>
                    <p>MYANMA PORT AUTHORITY</p>
                    <p>SHIPPING AGENCY DEPARTMENT</p>
                    <p>EXPORT FREIGHT MANIFEST</p>
               </div>
               <div style={{ fontSize: 20, display: "flex", justifyContent: "space-between" }}>
                    <div>
                         <p>MV. VTC OCEAN</p>
                         <p>VOYAGE NO.& 1022</p>
                         <p>SAILED YANGON DATE 22.10.22</p>
                    </div>
                    <div>
                         <p>Sheet No.1</p>
                         <p>Mastr..........................................</p>
                         <p>Bound For:CHATTOGRAM,BANGLADESH</p>
                    </div>
               </div>

               <table style={tableStyle}>
                    <thead>
                         <tr>
                              <th style={trStyle}>B/L No</th>
                              <th style={trStyle}>Shipper</th>
                              <th style={trStyle}>Consignee Notify</th>
                              <th style={trStyle}>Marks & Number</th>
                              <th style={trStyle}>Product</th>
                              <th style={trStyle}>Qty</th>
                              <th style={trStyle}>Fregith Tons</th>
                              <th style={trStyle}>Rate</th>
                              <th style={trStyle}>Total Freight</th>
                              <th style={trStyle}>Remark</th>
                         </tr>
                    </thead>
                    <tbody>

                         {data.map((item: BLData) => {
                              return (
                                   <tr>
                                        <td style={trStyle}>{item.blNo}</td>
                                        <td style={trStyle}>{item.shipper}</td>
                                        <td style={trStyle}>{item.consigneeNotify}</td>
                                        <td style={trStyle}>{item.markAndNumber}</td>
                                        <td style={trStyle}>{item.product}</td>
                                        <td style={trStyle}>{item.quantity} {item.unit} </td>
                                        <td style={trStyle}>{item.freightTon}</td>
                                        <td style={trStyle}>{item.rate}</td>
                                        <td style={trStyle}>{item.freightTon * item.rate}</td>
                                        <td style={trStyle}>{item.remark}</td>
                                   </tr>
                              )
                         })}
                         <td style={trStyle}></td>
                         <td style={trStyle}></td>
                         <td style={trStyle}></td>
                         <td style={trStyle}></td>
                         <td style={trStyle}></td>
                         <td style={trStyle}></td>
                         <td style={trStyle}>
                              {data.reduce(function (prev, cur) {
                                   return prev + cur.freightTon;
                              }, 0)}
                         </td>
                         <td style={trStyle}></td>
                         <td style={trStyle}>
                              {data.reduce(function (prev, cur) {
                                   return prev + cur.freightTon * cur.rate;
                              }, 0)}
                         </td>
                         <td style={trStyle}></td>

                    </tbody>
               </table>
          </div >
     )
}

export default BLPrint