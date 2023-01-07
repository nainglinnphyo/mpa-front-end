import { Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField } from '@mui/material'

export function PortOfLoadingForm({ handleClose, open, data, unit, loadingData, setLoadingData, handleSubmitLoadingProductAdd }: any) {
     let filterData = data.filter((e: { id: any; }) => e.id !== loadingData.productId)
     const handleDischargeProduct = (value: any) => {
          setLoadingData({ ...loadingData, productId: value.id, productName: value.name })
     }
     const handleUnit = (value: any) => {
          setLoadingData({ ...loadingData, unitId: value.id, unitName: value.name })
     }
     const handleQuantity = (value: any) => {
          setLoadingData({ ...loadingData, quantity: value })
     }

     return (
          <>

               <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
               >
                    <form onSubmit={handleSubmitLoadingProductAdd}>
                         <DialogTitle id="alert-dialog-title">
                              Add Loading Product
                         </DialogTitle>
                         <DialogContent>
                              <Grid container spacing={2} width={500} padding={2}>
                                   <Grid item xs={12} md={6}>
                                        <Autocomplete
                                             disablePortal
                                             id="combo-box-demo"
                                             options={filterData ? filterData : []}
                                             onChange={(event, value: any) => {
                                                  if (value) {
                                                       handleDischargeProduct(value);
                                                  }
                                             }}
                                             getOptionLabel={(option) => option.name}
                                             renderInput={(params) => (
                                                  <TextField required {...params} label="Select Product" />
                                             )}
                                        />
                                   </Grid>
                                   <Grid item xs={12} md={6}>
                                        <Autocomplete
                                             disablePortal
                                             id="combo-box-demo"
                                             options={unit ? unit : []}
                                             onChange={(event, value: any) => {
                                                  if (value) {
                                                       handleUnit(value);
                                                  }
                                             }}
                                             getOptionLabel={(option) => option.name}
                                             renderInput={(params) => (
                                                  <TextField required {...params} label="Select Unit" />
                                             )}
                                        />
                                   </Grid>
                                   <Grid item xs={12} md={6}>
                                        <TextField required type="number" placeholder={'[1-1000]'} onChange={(e) => handleQuantity(e.target.value)} label="Add Quantity" />
                                   </Grid>
                              </Grid>
                         </DialogContent>
                         <DialogActions>
                              <Button onClick={handleClose} color='error'>Cancel</Button>
                              <Button type='submit'> Add </Button>
                         </DialogActions>
                    </form>
               </Dialog>
          </>
     )
}

export default PortOfLoadingForm