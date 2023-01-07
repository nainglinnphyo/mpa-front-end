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
  Button,
  Chip,
  Container,
  FormControl,
  FormHelperText,
  Grid,
  Modal,
  Table,
  TableBody,
  Typography,
} from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AiOutlineDelete } from 'react-icons/ai';

import { Box } from "@mui/system";
import PortOfDischargeForm from "./PortOfDischargeForm";
import { ProductList } from "../../../pages/admin/productList";
import { getProductList } from "../../../store/reducers/product";
import { UnitList } from "../../../pages/admin/unit";
import { getUnit } from "../../../store/reducers/unit";
import DischargeTableHead from "./DischargeTableHead";
import DischargeTableRow from "./DischargeTableRow";
import PortOfLoadingForm from "./PortOfLoadingFrom";
import LoadingTableRow from "./LoadingTableRow";
import LoadingTableHead from "./LoadingTableHead";
import { createShipArrival } from "../../../apis/main/ship";
import { useSnackbar } from "../../../components/snackbar";
import { useNavigate } from "react-router-dom";

interface FormValuesProps {
  voyageNumber: string;
  shipId: string;
  portId: string;
  countryOriginId: string;
  countryReturnId: string;
  arrivalDate: string;
  returnDate: string;
  dischargeOnProduct: any;
  loadingOnProduct: any
}

function NewShipArrivalForm() {
  //states
  const [shipList, setShipList] = useState<ShipList[]>([]);
  const [countryList, setCountryList] = useState<ICountryData[]>([]);
  const [portList, setPortList] = useState<PortList[]>([]);
  const [productList, setProductList] = useState<ProductList[]>([]);
  const [unitList, setUnitList] = useState<UnitList[]>([]);

  const [arrivalDate, setArrivalDate] = useState<any>("");
  const [returnDate, setReturnDate] = useState<any>("");
  const [shipListData, setShipListData] = useState<string>("");
  const [portListData, setPortListData] = useState<string>("");
  const [countryOrigin, setCountryOrigin] = useState<string>("");
  const [countryReturn, setCountryReturn] = useState<string>("");
  const [voyageNumber, setVoyageNumber] = useState<string>("");

  const [dischargeData, setDischargeData] = useState({
    productId: '',
    productName: '',
    quantity: '',
    unitId: '',
    unitName: '',
  })

  const [loadingData, setLoadingData] = useState({
    productId: '',
    productName: '',
    quantity: '',
    unitId: '',
    unitName: '',
  })

  const [dischargeList, setDischargeList] = useState<any>([])
  const [loadingList, setLoadingList] = useState<any>([])


  const [openDischargeModel, setOpenDischargeModel] = useState(false);
  const [openLoadingModel, setOpenLoadingModel] = useState(false);
  const handleOpenDischarge = () => setOpenDischargeModel(true);
  const handleOpenLoading = () => setOpenLoadingModel(true);
  const handleCloseDischarge = () => setOpenDischargeModel(false);
  const handleCloseLoading = () => setOpenLoadingModel(false);

  const { data: countryLists } = useAppSelector(
    (state: RootState) => state.country
  );
  const { data: portlists } = useAppSelector((state: RootState) => state.port);
  const { data: shiplists } = useAppSelector((state: RootState) => state.ship);
  const { data: productlists } = useAppSelector((state: RootState) => state.product);
  const { data: unitlists } = useAppSelector((state: RootState) => state.unit);

  const { token } = useAppSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getCountry(token));
    dispatch(getPort(token));
    dispatch(getShip(token));
    dispatch(getProductList(token));
    dispatch(getUnit(token));
  }, []);

  useEffect(() => {
    if (portlists.length > 0) {
      setPortList(portlists);
    }
  }, [portlists]);

  useEffect(() => {
    if (productlists.length > 0) {
      setProductList(productlists);
    }
  }, [productlists]);

  useEffect(() => {
    if (unitlists.length > 0) {
      setUnitList(unitlists);
    }
  }, [unitlists]);

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

  const handleVoyageNumber = (e: any) => {
    setVoyageNumber(e.target.value);
  };

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

  const handleSubmitDischargeProductAdd = (e: React.SyntheticEvent) => {
    e.preventDefault();
    handleCloseDischarge();
    dischargeList.push(dischargeData)
  }
  const handleSubmitLoadingProductAdd = (e: React.SyntheticEvent) => {
    e.preventDefault();
    handleCloseLoading();
    loadingList.push(loadingData)
  }

  const removeDischargeProduct = (productId: any) => {
    const filterData = dischargeList.filter((e: any) => {
      return e.productId !== productId;
    })
    setDischargeList(filterData)
  }

  const removeLoadingProduct = (productId: any) => {
    const filterData = loadingList.filter((e: any) => {
      return e.productId !== productId;
    })
    setLoadingList(filterData)
  }

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const data: FormValuesProps = {
      voyageNumber: voyageNumber,
      shipId: shipListData,
      portId: portListData,
      arrivalDate: arrivalDate,
      countryOriginId: countryOrigin,
      countryReturnId: countryReturn,
      returnDate: returnDate,
      dischargeOnProduct: dischargeList,
      loadingOnProduct: loadingList,
    };
    createShipArrival(token, data)
      .then((data) => {
        if (data.data.meta.success) {
          enqueueSnackbar("Create Success", { variant: "success" })
          navigate("/dashboard/ship-arrival/list");
          
        } else {
          enqueueSnackbar("Create Fail", { variant: "error" })
        }
      })
      .catch(err => console.log(err))
  };

  return (
    <Container sx={{ bgcolor: "white", padding: 5 }}>
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
            <TextField
              fullWidth
              required
              label="Voyage Number"
              onChange={(e) => handleVoyageNumber(e)}
            />
          </Grid>
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
                <TextField fullWidth {...params} />
              )}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} marginTop={1}>
          <Grid item xs={12} md={6}>
            <Button onClick={handleOpenDischarge}>Add Discharge Product</Button>
            {dischargeList.length > 0 &&
              <Grid item xs={12} md={12} marginTop={2}>
                <Table>
                  <DischargeTableHead />
                  <TableBody>
                    {
                      dischargeList.map((row: any) => {
                        console.log(row)
                        return (
                          <DischargeTableRow row={row} key={row.productId} removeDischargeProduct={removeDischargeProduct} />
                        )
                      })
                    }
                  </TableBody>
                </Table>

              </Grid>
            }
          </Grid>

          <Grid item xs={12} md={6}>
            <Button onClick={handleOpenLoading}>Add Loading Product</Button>
            {loadingList.length > 0 &&
              <Grid item xs={12} md={12} marginTop={2}>
                <Table>
                  <LoadingTableHead />
                  <TableBody>
                    {
                      loadingList.map((row: any) => {
                        return (
                          <LoadingTableRow row={row} key={row.productId} removeLoadingProduct={removeLoadingProduct} />
                        )
                      })
                    }
                  </TableBody>
                </Table>

                {/* <TableBody>
                  
                </TableBody> */}

              </Grid>
            }


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
      <PortOfDischargeForm handleClose={handleCloseDischarge} open={openDischargeModel} handleSubmitDischargeProductAdd={handleSubmitDischargeProductAdd} data={productList} unit={unitList} dischargeData={dischargeData} setDischargeData={setDischargeData} />
      <PortOfLoadingForm handleClose={handleCloseLoading} open={openLoadingModel} handleSubmitLoadingProductAdd={handleSubmitLoadingProductAdd} data={productList} unit={unitList} loadingData={loadingData} setLoadingData={setLoadingData} />
    </Container>
  );
}

export default NewShipArrivalForm;
