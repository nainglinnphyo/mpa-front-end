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
import { ShipperList } from "../ShipArrival";
import moment from "moment";

// ----------------------------------------------------------------------

type Props = {
	row: ShipperList;
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
	const { id, name, address, created_at } = row;

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

				<TableCell align="center">{name}</TableCell>

				<TableCell align="center">{address}</TableCell>

				<TableCell align="center" sx={{ textTransform: "capitalize" }}>
					{moment(created_at || moment()).format("DD/MM/YYYY hh:mm:ss A")}
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
