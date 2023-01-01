// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { Autocomplete, AutocompleteProps } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import ListSubheader from '@mui/material/ListSubheader';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import React from 'react';

// ----------------------------------------------------------------------

interface Props<
  T,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined
> extends AutocompleteProps<T, Multiple, DisableClearable, FreeSolo> {
  name: string;
  grouping?: boolean;
  label?: string;
}

export default function RHFAutocomplete<
  T,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined
>({ name, label, grouping = false, ...other }: Props<T, Multiple, DisableClearable, FreeSolo>) {
  const { control } = useFormContext();

  return (
    <>
      {!grouping ? (
        <Controller
          name={name}
          control={control}
          render={({ field }) => <Autocomplete {...field} {...other} />}
        />
      ) : (
        <Controller
          name={name}
          control={control}
          render={({ field }) => {
            console.log(other);
            return (
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel htmlFor="grouped-select">{label}</InputLabel>
                <Select defaultValue="" id="grouped-select" label="Grouping">
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>

                  {other.options.map((lab: any) => (
                    <div key={lab.label}>
                      <ListSubheader>{lab.label}</ListSubheader>
                      {lab.options.map((log: any) => (
                        <MenuItem key={log.label} value={log.value}>
                          {log.label}
                        </MenuItem>
                      ))}
                    </div>
                  ))}
                </Select>
              </FormControl>
            );
          }}
        />
      )}
    </>
  );
}
