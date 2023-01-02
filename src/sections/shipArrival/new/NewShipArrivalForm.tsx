import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";

import * as Yup from "yup";
import FormProvider, {
  RHFAutocomplete,
  RHFSelect,
} from "../../../components/hook-form";
import { Controller, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";

import { ShipList } from "../../../pages/admin/ship/Ship";
import { CountryList } from "../../../pages/admin/country/Country";
import { PortList } from "../../../pages/admin/port/Port";
import { getCountry, ICountryData } from "../../../store/reducers/country";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { RootState } from "../../../store";
import { getPort } from "../../../store/reducers/port";
import { getShip } from "../../../store/reducers/ship";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Chip, FormControl, FormHelperText, Grid } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

import { Box } from "@mui/system";

interface FormValuesProps {
  shipId: string;
  portId: string;
  countryOriginId: any;
  countryReturnId: any;
  arrivalDate: string;
  returnDate: string;
}

function NewShipArrivalForm() {
  const [shipList, setShipList] = useState<ShipList[]>([]);
  const [countryList, setCountryList] = useState<ICountryData[]>([]);
  const [portList, setPortList] = useState<PortList[]>([]);

  const [arrivalDate, setArrivalDate] = useState<any>("");

  const [returnDate, setReturnDate] = useState<any>("");

  const { data: countryLists } = useAppSelector(
    (state: RootState) => state.country
  );
  const { data: portlists } = useAppSelector((state: RootState) => state.port);
  const { data: shiplists } = useAppSelector((state: RootState) => state.ship);

  const { token } = useAppSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCountry(token));
    dispatch(getPort(token));
    dispatch(getShip(token));
  }, []);

  useEffect(() => {
    if (portlists.length > 0) {
      setPortList(portlists);
    }
  }, [portlists]);

  useEffect(() => {
    if (shiplists.length > 0) {
      setShipList(shiplists);
    }
  }, [shiplists]);

  useEffect(() => {
    if (countryLists.length > 0) {
      setCountryList(countryLists);
    }
  }, [countryLists]);

  console.log(countryList);

  //toadd country list

  //hook form

  const newShipArrivalForm = Yup.object().shape({
    ship_id: Yup.string().required("Ship is required"),
    portId: Yup.string().required("port is required"),
    countryOriginId: Yup.string().required(" country Origin is required"),
    countryReturnId: Yup.string().required("country return is required"),
    arrivalDate: Yup.string().required("arrival date is required"),
    returnDate: Yup.string().required("return date is required"),
  });

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(newShipArrivalForm),
  });
  const {
    handleSubmit,
    register,
    setValue,
    setError,
    trigger,
    control,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data: any) => {
    console.log(data);
  };

  const handleArrivalDate = (newValue: Dayjs | null) => {
    setArrivalDate(newValue);
  };

  const handleReturnDate = (newValue: Dayjs | null) => {
    setReturnDate(newValue);
  };

  useEffect(() => {
    setValue("arrivalDate", arrivalDate);
  }, [arrivalDate]);

  useEffect(() => {
    setValue("returnDate", returnDate);
  }, [returnDate]);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={shipList}
            renderInput={(params) => (
              <TextField {...params} label="Ship List" />
            )}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={portList.map((item) => item.name)}
            renderInput={(params) => (
              <TextField {...params} label="Port List" />
            )}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            //   options={countryList}
            options={countryList.map((item) => item.name)}
            renderInput={(params) => (
              <TextField {...params} label="Country List" />
            )}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            //   options={shipList}
            options={shipList.map((item) => item.name)}
            renderInput={(params) => (
              <TextField {...params} label="Ship List" />
            )}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <DesktopDatePicker
            label="Arrival Date"
            inputFormat="MM/dd/yyyy"
            value={arrivalDate || null}
            onChange={handleArrivalDate}
            renderInput={(params) => <TextField fullWidth {...params} />}
          />
          {errors.arrivalDate?.message && (
            <FormHelperText error>{errors.arrivalDate.message}</FormHelperText>
          )}
        </Grid>

        <Grid item xs={12} md={6}>
          <DesktopDatePicker
            label="Return Date"
            inputFormat="MM/dd/yyyy"
            value={returnDate || null}
            onChange={handleReturnDate}
            renderInput={(params) => <TextField fullWidth {...params} />}
          />
          {errors.returnDate?.message && (
            <FormHelperText error>{errors.returnDate.message}</FormHelperText>
          )}
        </Grid>
      </Grid>

      <Box sx={{ mt: 4 }}>
        <LoadingButton
          variant="contained"
          color="success"
          type="button"
          onClick={handleSubmit(onSubmit)}
          loading={isSubmitting}
        >
          CheckOut
        </LoadingButton>
      </Box>
    </FormProvider>
  );
}

export default NewShipArrivalForm;
