import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { TextField } from '@mui/material';
import React from 'react'
import * as Yup from 'yup';
import FormProvider from '../../../components/hook-form';
import { useForm } from 'react-hook-form';



interface FormValuesProps {
     shipperId: string;
     shipId: string;
     portId: string;
     countryOriginId: string;
     countryReturnId: string;
     arrivalDate: string;
     returnDate: string;
}

function NewShipArrivalForm() {

     //hook form
     const newProductSchema = Yup.object().shape({
          supplier_id: Yup.string().required('Category is required'),
          warehouse_id: Yup.string().required('Warehouse is required'),
          payment_method_id: Yup.string().required('Payment Method is required'),
     });
     const methods = useForm<FormValuesProps>({
          resolver: yupResolver(newProductSchema),
     });
     const {
          handleSubmit,
          register,
          formState: { errors, isSubmitting },
     } = methods;

     const onSubmit = async (data: any) => {

     }
     //hook form
     
     return (
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>

               <LoadingButton
                    variant="contained"
                    color="success"
                    type="button"
                    onClick={handleSubmit(onSubmit)}
                    loading={isSubmitting}
               >
                    CheckOut
               </LoadingButton>
          </FormProvider>
     )
}

export default NewShipArrivalForm