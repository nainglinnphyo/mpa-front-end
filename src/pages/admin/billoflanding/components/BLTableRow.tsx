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

import moment from "moment";
import { BLData } from "../../../../apis/main/ship";

// ----------------------------------------------------------------------

type Props = {
	row: BLData;
	selected: boolean;
	onEditRow: VoidFunction;
	onSelectRow: VoidFunction;
	onDeleteRow: VoidFunction;
};

export default function BLTableRow({
	row,
	selected,
	onEditRow,
	onSelectRow,
	onDeleteRow,
}: Props) {
	const { id, blNo, consigneeNotify, markAndNumber, freightTon, quantity, createdDate, product, rate, remark, shipper, totalFreight, unit } = row;
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

				<TableCell align="center">{blNo.toUpperCase()}</TableCell>
				<TableCell align="center">{shipper.toUpperCase()}</TableCell>
				<TableCell align="center">{consigneeNotify.toUpperCase()}</TableCell>
				<TableCell align="center">{markAndNumber.toUpperCase()}</TableCell>
				<TableCell align="center">{product.toUpperCase()}</TableCell>
				<TableCell align="center">{quantity}  {unit}</TableCell>
				<TableCell align="center">{freightTon}</TableCell>
				<TableCell align="center">{rate}</TableCell>
				<TableCell align="center">{totalFreight}</TableCell>
				<TableCell align="center">{remark}</TableCell>

				{/* <TableCell align="center" sx={{ textTransform: "capitalize" }}>
					{moment(createdDate || moment()).format("DD/MM/YYYY hh:mm:ss A")}
				</TableCell> */}

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
