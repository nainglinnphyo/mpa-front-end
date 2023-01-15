import moment from 'moment';
import React from 'react'
import { ShipArrivalList } from '../ShipArrival';
interface IProp {
     printRef: any;
     data: ShipArrivalList[]
}
function ShipArrivalPrint({ printRef, data }: IProp) {

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
          "borderStyle": "solid",
          "padding": "10px",
     };
     return (
          <div ref={printRef} style={{ padding: 50 }}>
               <div style={{ fontSize: 20, textAlign: "center" }}>
                    <p>ရန်ကုန်ဆိပ်ကမ်းသို့၀င်ရောက်ကုန်တင်/ကုန်ချ ပြုလုပ်သည့် သ‌ေ င်္ဘာဆိုင်ရာ အချက်အလက်</p>
               </div>
               <div style={{ fontSize: 20, display: "flex", justifyContent: "flex-end" }}>
                    <div>
                         <p>September , 2022</p>
                    </div>
               </div>

               <table style={tableStyle}>
                    <thead>
                         <tr>
                              <th style={trStyle}>No</th>
                              <th style={trStyle}>Ship Name</th>
                              <th style={trStyle}>Port</th>
                              <th style={trStyle}>Country Origin</th>
                              <th style={trStyle}>Country Return</th>
                              <th style={trStyle}>Dischagre Product</th>
                              <th style={trStyle}>Loading Product</th>
                              <th style={trStyle}>Arrival Date</th>
                              <th style={trStyle}>Return Date</th>
                         </tr>
                    </thead>
                    <tbody>

                         {data.map((item: ShipArrivalList, index) => {
                              console.log(item)
                              return (
                                   <tr>
                                        <td style={trStyle}>{index + 1}</td>
                                        <td style={trStyle}>{item.ship}</td>
                                        <td style={trStyle}>{item.port}</td>
                                        <td style={trStyle}>{item.countryOrigin}</td>
                                        <td style={trStyle}>{item.countryReturn}</td>
                                        <td style={trStyle}>
                                             {item.dischargeData.map((d: any) => {
                                                  return (
                                                       <>
                                                            <p>{d.Product.name} {d.quantity} {d.Unit.name}</p>
                                                       </>
                                                  )
                                             })}
                                        </td>
                                        <td style={trStyle}>
                                             {item.loadingData.map((d: any) => {
                                                  return (
                                                       <>
                                                            <p>{d.Product.name} {d.quantity} {d.Unit.name}</p>
                                                       </>
                                                  )
                                             })}
                                        </td>
                                        <td style={trStyle}>{moment(item.arrivalDate).format("DD-MM-YYYY")}</td>
                                        <td style={trStyle}>{moment(item.returnDate).format("DD-MM-YYYY")}</td>
                                   </tr>
                              )
                         })}
                         <td style={trStyle}></td>
                         <td style={trStyle}></td>
                         <td style={trStyle}></td>
                         <td style={trStyle}></td>
                         <td style={trStyle}></td>
                         <td style={trStyle}></td>
                         {/* <td style={trStyle}>
                              {data.reduce(function (prev, cur) {
                                   return prev + cur.freightTon;
                              }, 0)}
                         </td>
                         <td style={trStyle}></td>
                         <td style={trStyle}>
                              {data.reduce(function (prev, cur) {
                                   return prev + cur.freightTon * cur.rate;
                              }, 0)}
                         </td> */}
                         <td style={trStyle}></td>

                    </tbody>
               </table>
          </div >
     )
}

export default ShipArrivalPrint