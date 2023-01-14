import React from 'react'

function BLPrint({ printRef, data }: any) {
     return (
          <div ref={printRef} style={{ padding: 10 }}>
               <div style={{ fontSize: 18, textAlign: "center" }}>
                    <p>MYANMA PORT AUTHORITY</p>
                    <p>SHIPPING AGENCY DEPARTMENT</p>
                    <p>EXPORT FREIGHT MANIFEST</p>
               </div>
               <div style={{ fontSize: 18, display: "flex", justifyContent: "space-between" }}>
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

               <table style={{width:"100%",border:'1px',borderStyle:"solid",borderColor:"black"}}>
                    <thead style={{border:'1px',borderStyle:"solid",borderColor:"black"}}>
                         <tr style={{border:'1px',borderStyle:"solid",borderColor:"black"}}>
                              <th style={{border:'1px',borderStyle:"solid",borderColor:"black"}}>Firstname</th>
                              <th style={{border:'1px',borderStyle:"solid",borderColor:"black"}}>Lastname</th>
                              <th style={{border:'1px',borderStyle:"solid",borderColor:"black"}}>Age</th>
                         </tr>
                    </thead>
                    <tbody style={{border:'1px',borderStyle:"solid",borderColor:"black"}}>
                         <tr>
                              <td>GG</td>
                              <td>GG</td>
                              <td>GG</td>
                         </tr>
                    </tbody>
               </table>
          </div>
     )
}

export default BLPrint