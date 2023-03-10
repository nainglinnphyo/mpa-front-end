import { useState, useEffect, useRef } from "react";
// @mui
import {
  Card,
  Table,
  Button,
  Tooltip,
  TableBody,
  Container,
  IconButton,
  TableContainer,
  TextField,
  Stack,
  Box,
} from "@mui/material";
// // components
import Iconify from "../../../components/iconify/Iconify";
import {
  useTable,
  getComparator,
  emptyRows,
  TableNoData,
  TableEmptyRows,
  TableHeadCustom,
  TableSelectedAction,
  TablePaginationCustom,
  TableSkeleton,
} from "../../../components/table";
import { Link as RouterLink, useNavigate } from "react-router-dom";

// sections
import { ShipArrivalTableToolbar, ShipArrivalTableRow } from "./components";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import AddIcon from "@mui/icons-material/Add";
import { getShipArrival } from "../../../store/reducers/shipArrival";
import moment from "moment";
import { useReactToPrint } from "react-to-print";
import PrintIcon from "@mui/icons-material/LocalPrintshop";
import ShipArrivalPrint from "./components/ShipArrivalPrint";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "voyageNumber", label: "Voyage Number", align: "center" },
  { id: "blFinish", label: "BL Finish", align: "center" },
  { id: "ship", label: "Ship", align: "center" },
  { id: "port", label: "Port", align: "center" },
  { id: "countryOrigin", label: "Country Origin", align: "center" },
  { id: "countryReturn", label: "Country Return", align: "center" },
  { id: "arrivalDate", label: "Arrival Date", align: "center" },
  { id: "returnDate", label: "Return Date", align: "center" },
  { id: "", label: "action", align: "center" },
];

// ----------------------------------------------------------------------

export interface ShipArrivalList {
  id: string;
  voyageNumber: string;
  blFinish: boolean;
  ship: string;
  port: string;
  countryOrigin: string;
  countryReturn: string;
  arrivalDate: string;
  returnDate: string;
  dischargeData: any;
  loadingData: any;
  createdDate: string;
}

export default function ShipArrivalPage() {
  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,
    setPage,
    //
    selected,
    setSelected,
    onSelectRow,
    onSelectAllRows,
    //
    onSort,
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable();

  const [tableData, setTableData] = useState<ShipArrivalList[]>([]);

  const [filterName, setFilterName] = useState("");

  const [filterRole, setFilterRole] = useState("all");

  const [filterStatus, setFilterStatus] = useState("all");

  const dispatch = useAppDispatch();
  const { data, isLoading } = useAppSelector((state) => state.shipArrival);
  const { token } = useAppSelector((state) => state.auth);
  const date = new Date();
  const [value, setValue] = useState({
    fromDate: moment(new Date(date.getFullYear(), date.getMonth(), 1)),
    toDate: moment(new Date(date.getFullYear(), date.getMonth() + 1, 0)),
    // toDate: moment(new Date(date.getFullYear(), date.getMonth() + 1, 0)).format("DD/MM/YYYY"),
  });

  const onFromDateChange = (newValue: any) => {
    setValue({ ...value, fromDate: newValue });
  };
  const onToDateChange = (newValue: any) => {
    setValue({ ...value, toDate: newValue });
  };

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(order, orderBy),
    filterName,
    filterRole,
    filterStatus,
  });

  const dataInPage = dataFiltered.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const denseHeight = dense ? 52 : 72;

  const isFiltered =
    filterName !== "" || filterRole !== "all" || filterStatus !== "all";

  const isNotFound =
    (!dataFiltered.length && !!filterName) ||
    (!dataFiltered.length && !!filterRole) ||
    (!dataFiltered.length && !!filterStatus);

  const handleFilterName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const handleDeleteRow = (id: string) => {
    const deleteRow = tableData.filter((row: any) => row.id !== id);
    setSelected([]);
    setTableData(deleteRow);

    if (page > 0) {
      if (dataInPage.length < 2) {
        setPage(page - 1);
      }
    }
  };

  const handleEditRow = (id: string) => {
    alert("edit");
  };

  const handleResetFilter = () => {
    setFilterName("");
    setFilterRole("all");
    setFilterStatus("all");
  };

  useEffect(() => {
    dispatch(getShipArrival(token, value));
    setTableData(data);
  }, [token, dispatch, value]);

  useEffect(() => {
    if (data.length > 0) {
      setTableData(data);
    } else {
      setTableData([]);
    }
  }, [data]);

  const navigate = useNavigate();

  const printRef = useRef(null);

  const printHandler = useReactToPrint({
    documentTitle: "",
    content: () => printRef.current,
  });


  return (
    <Container maxWidth="xl">
      <Box sx={{ width: "100%", display: "flex", justifyContent: "end" }}>
        <Button sx={{ marginRight: 1, height: "40px" }} onClick={printHandler} startIcon={<PrintIcon />} variant="contained" color="primary">Print</Button>
        <Button
          sx={{ height: "40px" }}
          onClick={() => {
            navigate("/dashboard/ship-arrival/new");
          }}
          startIcon={<AddIcon />}
          variant="contained"
        >
          Create New Ship Arrival
        </Button>
      </Box>
      <Card
        sx={{
          width: "100%",
          height: "100%",
          overflowY: "scroll",
          mt: 2,
        }}
      >
        <ShipArrivalTableToolbar
          fromDate={value.fromDate}
          toDate={value.toDate}
          onToDateChange={onToDateChange}
          onFromDateChange={onFromDateChange}
          isFiltered={isFiltered}
          filterName={filterName}
          onFilterName={handleFilterName}
          onResetFilter={handleResetFilter}
        />

        <TableContainer sx={{ position: "relative", overflow: "unset" }}>
          <TableSelectedAction
            dense={dense}
            numSelected={selected.length}
            rowCount={tableData.length}
            onSelectAllRows={(checked) =>
              onSelectAllRows(
                checked,
                tableData.map((row) => row.id)
              )
            }
            action={
              <Tooltip title="Delete">
                <IconButton color="primary">
                  <Iconify icon="eva:trash-2-outline" />
                </IconButton>
              </Tooltip>
            }
          />

          {/* <Scrollbar> */}
          <Table size={dense ? "small" : "medium"} sx={{ minWidth: 800 }}>
            <TableHeadCustom
              order={order}
              orderBy={orderBy}
              headLabel={TABLE_HEAD}
              rowCount={tableData.length}
              numSelected={selected.length}
              onSort={onSort}
              onSelectAllRows={(checked) =>
                onSelectAllRows(
                  checked,
                  tableData.map((row) => row.id)
                )
              }
            />

            <TableBody>
              {(isLoading ? [...Array(rowsPerPage)] : dataFiltered)
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) =>
                  row ? (
                    <ShipArrivalTableRow
                      key={row.id}
                      row={row}
                      selected={selected.includes(row.id)}
                      onSelectRow={() => onSelectRow(row.id)}
                      onDeleteRow={() => handleDeleteRow(row.id)}
                      onEditRow={() => handleEditRow(row.id)}
                    />
                  ) : (
                    !isNotFound && (
                      <TableSkeleton key={index} sx={{ height: denseHeight }} />
                    )
                  )
                )}

              <TableEmptyRows
                height={denseHeight}
                emptyRows={emptyRows(page, rowsPerPage, tableData.length)}
              />

              <TableNoData isNotFound={isNotFound} />
            </TableBody>
          </Table>
          {/* </Scrollbar> */}
        </TableContainer>

        <TablePaginationCustom
          count={dataFiltered.length}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={onChangePage}
          onRowsPerPageChange={onChangeRowsPerPage}
          //
          dense={dense}
          onChangeDense={onChangeDense}
        />
      </Card>
      <Box sx={{ display: "none" }}>
        <ShipArrivalPrint printRef={printRef} data={tableData} />
      </Box>
    </Container>
  );
}

// ----------------------------------------------------------------------

function applyFilter({
  inputData,
  comparator,
  filterName,
  filterStatus,
  filterRole,
}: {
  inputData: ShipArrivalList[];
  comparator: (a: any, b: any) => number;
  filterName: string;
  filterStatus: string;
  filterRole: string;
}) {
  const stabilizedThis = inputData.map((el, index) => [el, index] as const);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  if (filterName) {
    inputData = inputData.filter(
      (user) =>
        user.voyageNumber.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
    );
  }

  return inputData;
}
