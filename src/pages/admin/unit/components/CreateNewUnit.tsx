import * as Yup from "yup";

import {
  Dialog,
  Button,
  DialogTitle,
  DialogActions,
  DialogContent,
  Stack,
  Box,
} from "@mui/material";
import { RHFTextField } from "../../../../components/form";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormProvider from "../../../../components/hook-form/FormProvider";
import { LoadingButton } from "@mui/lab";
import { createNewUnit } from "../../../../apis/main/unit";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { RootState } from "../../../../store";
import { useSnackbar } from "../../../../components/snackbar";
import { getUnit } from "../../../../store/reducers/unit";

interface ICreateNewUnit {
  title: string;
  onClose: () => void;
  open: boolean;
  other?: any;
}

const CreateNewUnit = ({ title, onClose, open, ...other }: ICreateNewUnit) => {
  const { token } = useAppSelector((state: RootState) => state.auth);
  const createUnitSchema = Yup.object().shape({
    name: Yup.string().required("name is required"),
  });

  interface IFormData {
    name: string;
  }

  const methods = useForm<IFormData>({
    resolver: yupResolver(createUnitSchema),
  });

  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useAppDispatch();

  const onSubmit = (data: IFormData) => {
    createNewUnit({ data, token })
      .then((res) => {
        if (res.data.meta.success) {
          enqueueSnackbar(res.data.meta.success, { variant: "success" });
        }
        onClose();
        reset();
        dispatch(getUnit(token));
      })
      .catch((err) => {
        enqueueSnackbar(err.response.data.meta.devMessage, {
          variant: "error",
        });
        onClose();
        reset();
      });
  };

  const { handleSubmit, reset } = methods;

  return (
    <Dialog fullWidth maxWidth="xs" open={open} onClose={onClose} {...other}>
      <DialogTitle sx={{ pb: 2 }}>{title}</DialogTitle>
      <Box sx={{ height: 150, px: 3 }}>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <RHFTextField name="name" label="name" />

          <Stack
            direction="row"
            sx={{ mt: 2 }}
            spacing={2}
            justifyContent={"end"}
            alignItems="center"
          >
            <LoadingButton
              variant="outlined"
              color="error"
              onClick={() => {
                reset();
                onClose();
              }}
            >
              Cancel
            </LoadingButton>
            <LoadingButton type="submit" variant="outlined" color="primary">
              Unit Create
            </LoadingButton>
          </Stack>
        </FormProvider>
      </Box>
    </Dialog>
  );
};

export default CreateNewUnit;
