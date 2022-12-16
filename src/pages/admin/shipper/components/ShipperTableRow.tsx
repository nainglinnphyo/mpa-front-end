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
import { CountryList } from "../Shipper";
import moment from "moment";

// ----------------------------------------------------------------------

type Props = {
	row: CountryList;
	selected: boolean;
	onEditRow: VoidFunction;
	onSelectRow: VoidFunction;
	onDeleteRow: VoidFunction;
};

export default function ShipperTableRow({
	row,
	selected,
	onEditRow,
	onSelectRow,
	onDeleteRow,
}: Props) {
	const { countryOrigin, countryReturn, id, createdAt, createdBy } = row;

	const [openConfirm, setOpenConfirm] = useState(false);

	const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);

	const handleOpenConfirm = () => {
		setOpenConfirm(true);
	};

	const handleCloseConfirm = () => {
		setOpenConfirm(false);
	};

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

				<TableCell align="center">{countryOrigin}</TableCell>

				<TableCell align="center">{countryReturn}</TableCell>

				<TableCell align="center" sx={{ textTransform: "capitalize" }}>
					{createdBy}
				</TableCell>

				<TableCell align="center" sx={{ textTransform: "capitalize" }}>
					{moment(createdAt || moment()).format("DD/MM/YYYY hh:mm:ss A")}
				</TableCell>

				<TableCell align="right">
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
