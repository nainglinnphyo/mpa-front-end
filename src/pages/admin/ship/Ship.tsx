import { useState, useEffect } from "react";
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
// sections
import { ShipTableToolbar, ShipTableRow } from "./components";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { getShip } from "../../../store/reducers/ship";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
	{ id: "name", label: "Shipper Name", align: "center" },
	{ id: "created_at", label: "Created Date", align: "center" },
	{ id: "", label: "action", align: "center" },
];

// ----------------------------------------------------------------------

export interface ShipList {
	id: string;
	name: string;
	created_at: string;
}

export default function Ship() {
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

	const [tableData, setTableData] = useState<ShipList[]>([]);

	const [filterName, setFilterName] = useState("");

	const [filterRole, setFilterRole] = useState("all");

	const [filterStatus, setFilterStatus] = useState("all");

	const dispatch = useAppDispatch();
	const { data, isLoading } = useAppSelector((state) => state.ship);
	const { token } = useAppSelector((state) => state.auth);


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
		dispatch(getShip(token))
	}, [token, dispatch]);

	useEffect(() => {
		if (data.length) {
			setTableData(data);
		}
	}, [data]);

	return (
		<Container maxWidth="xl">
			<Card
				sx={{
					width: "100%",
					height: "100%",
					overflowY: "scroll",
					mt: 2,
				}}
			>
				<ShipTableToolbar
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
										<ShipTableRow
											key={row.id}
											row={row}
											selected={selected.includes(row.id)}
											onSelectRow={() => onSelectRow(row.id)}
											onDeleteRow={() => handleDeleteRow(row.id)}
											onEditRow={() => handleEditRow(row.id)}
										/>
									) : (
										!isNotFound && <TableSkeleton key={index} sx={{ height: denseHeight }} />
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
	inputData: ShipList[];
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
				user.name.toLowerCase().indexOf(filterName.toLowerCase()) !==
				-1
		);
	}

	return inputData;
}
