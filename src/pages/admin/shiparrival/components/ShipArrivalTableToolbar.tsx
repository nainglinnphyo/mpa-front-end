import {
	Stack,
	InputAdornment,
	TextField,
	MenuItem,
	Button,
} from "@mui/material";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment, { Moment } from "moment";
import { useState } from "react";
// components
import Iconify from "../../../../components/iconify";

// ----------------------------------------------------------------------

type Props = {
	filterName: string;
	isFiltered: boolean;
	fromDate: Moment;
	toDate: Moment;
	onResetFilter: VoidFunction;
	onFilterName: (event: React.ChangeEvent<HTMLInputElement>) => void;
	onFromDateChange?: any;
	onToDateChange?: any;
};

export default function ShipArrivalTableToolbar({
	isFiltered,
	filterName,
	fromDate,
	toDate,
	onFilterName,
	onResetFilter,
	onFromDateChange,
	onToDateChange,
}: Props) {
	return (
		<Stack
			spacing={2}
			alignItems='center'
			direction={{
				xs: "column",
				sm: "row",
			}}
			sx={{ px: 2.5, py: 3 }}>
			<LocalizationProvider dateAdapter={AdapterMoment}>
				<DesktopDatePicker
					label='From'
					inputFormat="DD/MM/YYYY"
					value={fromDate}
					onChange={e => onFromDateChange(e)}
					renderInput={params => <TextField {...params} />}
				/>
				<DesktopDatePicker
					label='To'
					inputFormat="DD/MM/YYYY"
					value={toDate}
					onChange={e => onToDateChange(e)}
					renderInput={params => <TextField {...params} />}
				/>
			</LocalizationProvider>
			<TextField
				fullWidth
				value={filterName}
				onChange={onFilterName}
				placeholder='Search...'
				InputProps={{
					startAdornment: (
						<InputAdornment position='start'>
							<Iconify icon='eva:search-fill' sx={{ color: "text.disabled" }} />
						</InputAdornment>
					),
				}}
			/>

			{isFiltered && (
				<Button
					color='error'
					sx={{ flexShrink: 0 }}
					onClick={onResetFilter}
					startIcon={<Iconify icon='eva:trash-2-outline' />}>
					Clear
				</Button>
			)}
		</Stack>
	);
}