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
import ship, { getShip } from "../../../store/reducers/ship";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CustomBreadcrumbs from "../../../components/custom-breadcrumbs/CustomBreadcrumbs";
import {
  Chip,
  Container,
  FormControl,
  FormHelperText,
  Grid,
} from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

import { Box } from "@mui/system";

interface FormValuesProps {
  shipId: string;
  portId: string;
  countryOriginId: string;
  countryReturnId: string;
  arrivalDate: string;
  returnDate: string;
}

function NewShipArrivalForm() {
  //states
  const [shipList, setShipList] = useState<ShipList[]>([]);
  const [countryList, setCountryList] = useState<ICountryData[]>([]);
  const [portList, setPortList] = useState<PortList[]>([]);

  const [arrivalDate, setArrivalDate] = useState<any>("");
  const [returnDate, setReturnDate] = useState<any>("");
  const [shipListData, setShipListData] = useState<string>("");
  const [portListData, setPortListData] = useState<string>("");
  const [countryOrigin, setCountryOrigin] = useState<string>("");
  const [countryReturn, setCountryReturn] = useState<string>("");

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

  //toadd country list

  //hook form

  const handleArrivalDate = (newValue: Dayjs | null) => {
    setArrivalDate(newValue);
  };

  const handleReturnDate = (newValue: Dayjs | null) => {
    setReturnDate(newValue);
  };

  const handleValueShip = (value: ShipList) => {
    setShipListData(value.id);
  };

  const handleValuePort = (value: ShipList) => {
    setPortListData(value.id);
  };

  const handleCountryOrigin = (value: ShipList) => {
    setCountryOrigin(value.id);
  };

  const handleCountryReturn = (value: ShipList) => {
    setCountryReturn(value.id);
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const data: FormValuesProps = {
      shipId: shipListData,
      portId: portListData,
      arrivalDate: arrivalDate,
      countryOriginId: countryOrigin,
      countryReturnId: countryReturn,
      returnDate: returnDate,
    };
    console.log("data", data);
  };

  return (
    <Container>
      {/* <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}> */}
      <CustomBreadcrumbs
        heading="New Arrival Create"
        links={[
          { name: "Ship Arrival List", href: "/dashboard/ship-arrival/list" },
          {
            name: "New",
          },
        ]}
      />
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Autocomplete
              disablePortal
              onChange={(event, value) => {
                if (value) {
                  handleValueShip(value);
                }
              }}
              id="combo-box-demo"
              options={shipList ? shipList : []}
              getOptionLabel={(option) => option.name}
              renderInput={(params) => (
                <TextField required {...params} label="Ship List" />
              )}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={portList ? portList : []}
              onChange={(event, value) => {
                if (value) {
                  handleValuePort(value);
                }
              }}
              getOptionLabel={(option) => option.name}
              renderInput={(params) => (
                <TextField required {...params} label="Port List" />
              )}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={countryList ? countryList : []}
              onChange={(event, value) => {
                if (value) {
                  handleCountryOrigin(value);
                }
              }}
              getOptionLabel={(option) => option.name}
              renderInput={(params) => (
                <TextField required {...params} label="Country Origin" />
              )}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={countryList ? countryList : []}
              onChange={(event, value) => {
                if (value) {
                  handleCountryReturn(value);
                }
              }}
              getOptionLabel={(option) => option.name}
              renderInput={(params) => (
                <TextField required {...params} label="Country Return" />
              )}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <DesktopDatePicker
              label="Arrival Date"
              inputFormat="MM/dd/yyyy"
              value={arrivalDate || null}
              onChange={handleArrivalDate}
              renderInput={(params) => (
                <TextField required fullWidth {...params} />
              )}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <DesktopDatePicker
              label="Return Date"
              inputFormat="MM/dd/yyyy"
              value={returnDate || null}
              onChange={handleReturnDate}
              renderInput={(params) => (
                <TextField required fullWidth {...params} />
              )}
            />
          </Grid>
        </Grid>
        <Box
          sx={{ mt: 4, display: "flex", width: "100%", justifyContent: "end" }}
        >
          <LoadingButton
            variant="contained"
            sx={{ width: "120px", height: "40px" }}
            color="success"
            type="submit"

            // loading={isSubmitting}
          >
            Create
          </LoadingButton>
        </Box>
      </form>
    </Container>
  );
}

export default NewShipArrivalForm;
