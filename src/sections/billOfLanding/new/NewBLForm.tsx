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
import { getProductList } from "../../../store/reducers/product";
import { UnitList } from "../../../pages/admin/unit";
import { getUnit } from "../../../store/reducers/unit";
import { useSnackbar } from "../../../components/snackbar";
import { useLocation, useNavigate } from "react-router-dom";
import { ProductList } from "../../../pages/admin/productList";
import { ShipperList } from "../../../pages/admin/shipper/Shipper";
import { getShipper } from "../../../store/reducers/shipper";
import { createBillOfLanding } from "../../../apis/main/ship";

interface FormValuesProps {
  blNo: string;
  shipperId: string;
  consigneeNotify: string;
  markAndNumber: string;
  productId: string;
  quantity: number;
  unitId: string;
  freightTon: number;
  rate: number;
  remark: string;
  shipArrivalId: string;
}

function NewBLForm() {
  //states
  const [productList, setProductList] = useState<ProductList[]>([]);
  const [unitList, setUnitList] = useState<UnitList[]>([]);
  const [shipperList, setShipperList] = useState<ShipperList[]>([]);

  const [blNo, setBlNo] = useState<any>("");
  const [shipperId, setShipperId] = useState<any>("");
  const [consigneeNotify, setConsigneeNotify] = useState<string>("");
  const [markAndNumber, setMarkAndNumber] = useState<string>("");
  const [productId, setProductId] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("");
  const [unitId, setUnitId] = useState<string>("");
  const [freightTon, setFreightTon] = useState<string>("");
  const [rate, setRate] = useState<string>("");
  const [remark, setRemark] = useState<string>("");


  const { data: productlists } = useAppSelector((state: RootState) => state.product);
  const { data: unitlists } = useAppSelector((state: RootState) => state.unit);
  const { data: shipperlists } = useAppSelector((state: RootState) => state.shipper);

  const { token } = useAppSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    dispatch(getShipper(token));
    dispatch(getProductList(token));
    dispatch(getUnit(token));
  }, []);

  useEffect(() => {
    if (unitlists.length > 0) {
      setUnitList(unitlists);
    }
  }, [unitlists]);


  useEffect(() => {
    if (productlists.length > 0) {
      setProductList(productlists);
    }
  }, [productlists]);

  useEffect(() => {
    if (shipperlists.length > 0) {
      setShipperList(shipperlists);
    }
  }, [shipperlists]);


  //hook form
  const handlProductValue = (value: any) => {
    setProductId(value.id);
  }

  const handleBLNumber = (e: any) => {
    setBlNo(e.target.value);
  }

  const handleShipper = (e: any) => {
    setShipperId(e.id);
  }

  const handleUnit = (e: any) => {
    setUnitId(e.id);
  }

  const handleConsigneeNoti = (e: any) => {
    setConsigneeNotify(e.target.value);
  }

  const handleMarkAndNumbers = (e: any) => {
    setMarkAndNumber(e.target.value);
  }

  const handleQty = (e: any) => {
    setQuantity(e.target.value);
  }
  const handleFreigthTon = (e: any) => {
    setFreightTon(e.target.value);
  }
  const handleRate = (e: any) => {
    setRate(e.target.value);
  }
  const handleRemark = (e: any) => {
    setRemark(e.target.value);
  }

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const data: FormValuesProps = {
      blNo: blNo,
      consigneeNotify: consigneeNotify,
      freightTon: parseInt(freightTon),
      rate: parseInt(rate),
      unitId: unitId,
      markAndNumber: markAndNumber,
      productId: productId,
      quantity: parseInt(quantity),
      remark: remark,
      shipperId: shipperId,
      shipArrivalId: location.state.shipArrivalId
    };
    createBillOfLanding(token, data)
      .then((data) => {
        if (data.data.meta.success) {
          navigate(-1);
          enqueueSnackbar("Create Success", { variant: "success" })
        }
      })
      .catch(err => {
        if (err.response.data.meta.devMessage.code === "P2002") {
          enqueueSnackbar("BL No Cannot Be Duplicated", { variant: "error" })
        } else {
          enqueueSnackbar("Something went wrong", { variant: "error" })
        }
      })

  };

  return (
    <Container sx={{ bgcolor: "white", padding: 5 }}>
      <CustomBreadcrumbs
        heading="New BL Create"
        links={[
          { name: "BL List", href: "/dashboard/ship-arrival/bill-of-landing-list" },
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
              label="BL Number"
              onChange={(e) => handleBLNumber(e)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Autocomplete
              disablePortal

              onChange={(event, value) => {
                if (value) {
                  handleShipper(value);
                }
              }}
              id="combo-box-demo"
              options={shipperList ? shipperList : []}
              getOptionLabel={(option) => option.name}
              renderInput={(params) => (
                <TextField required {...params} label="Select Shipper" />
              )}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Autocomplete
              disablePortal

              onChange={(event, value) => {
                if (value) {
                  handlProductValue(value);
                }
              }}
              id="combo-box-demo"
              options={productList ? productList : []}
              getOptionLabel={(option) => option.name}
              renderInput={(params) => (
                <TextField required {...params} label="Select Product" />
              )}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Autocomplete
              disablePortal

              onChange={(event, value) => {
                if (value) {
                  handleUnit(value);
                }
              }}
              id="combo-box-demo"
              options={unitList ? unitList : []}
              getOptionLabel={(option) => option.name}
              renderInput={(params) => (
                <TextField required {...params} label="Select Unit" />
              )}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              required
              label="Consignee Notify"
              onChange={(e) => handleConsigneeNoti(e)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Mark And Numbers"
              onChange={(e) => handleMarkAndNumbers(e)}
            />
          </Grid>
          <Grid item xs={4} md={2}>
            <TextField
              fullWidth
              required
              label="Quantity"
              onChange={(e) => handleQty(e)}
            />
          </Grid>
          <Grid item xs={4} md={2}>
            <TextField
              fullWidth
              required
              label="Freight Ton"
              onChange={(e) => handleFreigthTon(e)}
            />
          </Grid>
          <Grid item xs={4} md={2}>
            <TextField
              fullWidth
              required
              label="Rate"
              onChange={(e) => handleRate(e)}
            />
          </Grid>
          <Grid item xs={4} md={2}>
            <TextField
              fullWidth
              aria-readonly
              label="remark"
              onChange={(e) => handleRemark(e)}
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

export default NewBLForm;
