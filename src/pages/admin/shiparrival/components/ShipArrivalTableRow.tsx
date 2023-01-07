import { useState } from "react";
// @mui
import {
	Checkbox,
	TableRow,
	MenuItem,
	TableCell,
	IconButton,
} from "@mui/material";
import Iconify from "../../../../components/iconify";
import MenuPopover from "../../../../components/menu-popover";
import { ShipArrivalList } from "../ShipArrival";
import moment from "moment";
import { useNavigate } from "react-router-dom";

// ----------------------------------------------------------------------

type Props = {
	row: ShipArrivalList;
	selected: boolean;
	onEditRow: VoidFunction;
	onSelectRow: VoidFunction;
	onDeleteRow: VoidFunction;
};

export default function ShipArrivalTableRow({
	row,
	selected,
	onEditRow,
	onSelectRow,
	onDeleteRow,
}: Props) {
	const { id, arrivalDate, blFinish, countryOrigin, countryReturn, returnDate, createdDate, port, ship, voyageNumber } = row;
	const [openConfirm, setOpenConfirm] = useState(false);

	const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);
	const navigate = useNavigate();


	const handleOpenConfirm = () => {
		setOpenConfirm(true);
	};

	const handleCloseConfirm = () => {
		setOpenConfirm(false);
	};

	const handleBlList = () => {
		navigate("/dashboard/ship-arrival/bill-of-landing-list", { state: { id: row.id, voyageNumber: row.voyageNumber, shipName: row.ship, arrivalDate: row.arrivalDate } })
	}

	const handleOpenPopover = (event: React.MouseEvent<HTMLElement>) => {
		setOpenPopover(event.currentTarget);
	};

	const handleClosePopover = () => {
		setOpenPopover(null);
	};

	return (
		<>
			<TableRow hover selected={selected}>
				<TableCell padding="checkbox">
					<Checkbox checked={selected} onClick={onSelectRow} />
				</TableCell>

				<TableCell align="center">{voyageNumber}</TableCell>

				<TableCell align="center">{blFinish ? "Finish" : "Unfinish"}</TableCell>
				<TableCell align="center">{ship}</TableCell>
				<TableCell align="center">{port}</TableCell>
				<TableCell align="center">{countryOrigin}</TableCell>
				<TableCell align="center">{countryReturn}</TableCell>
				<TableCell align="center" sx={{ textTransform: "capitalize" }}>
					{moment(arrivalDate || moment()).format("DD/MM/YYYY")}
				</TableCell>
				<TableCell align="center" sx={{ textTransform: "capitalize" }}>
					{moment(returnDate || moment()).format("DD/MM/YYYY")}
				</TableCell>

				<TableCell align="center">
					<IconButton
						color={openPopover ? "inherit" : "default"}
						onClick={handleOpenPopover}
					>
						<Iconify icon="eva:more-vertical-fill" />
					</IconButton>
				</TableCell>
			</TableRow>

			<MenuPopover
				open={openPopover}
				onClose={handleClosePopover}
				arrow="right-top"
				sx={{ width: 140 }}
			>
				<MenuItem
					onClick={() => {
						handleBlList();
						handleClosePopover();
					}}
					sx={{ color: "green" }}
				>
					<Iconify icon="eva:eye-outline" />
					Bill Of Landing
				</MenuItem>
				<MenuItem
					onClick={() => {
						handleOpenConfirm();
						handleClosePopover();
					}}
					sx={{ color: "error.main" }}
				>
					<Iconify icon="eva:trash-2-outline" />
					Delete
				</MenuItem>

				<MenuItem
					onClick={() => {
						onEditRow();
						handleClosePopover();
					}}
				>
					<Iconify icon="eva:edit-fill" />
					Edit
				</MenuItem>
			</MenuPopover>
		</>
	);
}
