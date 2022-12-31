import * as Yup from "yup";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Typography,
  Checkbox,
  Button,
  Stack,
  styled,
  Box,
} from "@mui/material";
import { RHFTextField } from "../../components/form";
import { login } from "../../apis/main/auth";
import { useAppDispatch } from "../../store/hooks";
import { setAuth, unSetAuth } from "../../store/reducers/auth";

import Cookies from "js-cookie";
// import LoadingButton from "../../theme/overrides/LoadingButton";
import { LoadingButton } from "@mui/lab";
import { useState } from "react";
import { useSnackbar } from "../../components/snackbar";

interface loginFormProps {
  username: string;
  password: string;
}

const BoxWrapper = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down("xl")]: {
    width: "100%",
  },
  [theme.breakpoints.down("md")]: {
    maxWidth: 400,
  },
}));
const TypographyStyled = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  marginBottom: theme.spacing(1.5),
  [theme.breakpoints.down("md")]: { mt: theme.spacing(8) },
}));

const LoginForm = () => {
  //state
  const [isloading, setIsLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const LoginSchema = Yup.object().shape({
    username: Yup.string().required("username is required"),
    password: Yup.string().required("Password is required."),
  });

  const methods = useForm<loginFormProps>({
    resolver: yupResolver(LoginSchema),
  });

  const { handleSubmit } = methods;
  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = async (data: loginFormProps) => {
    setIsLoading(true);
    login({ username: data.username, password: data.password })
      .then((res) => {
        if (res.data.meta.success) {
          setIsLoading(false);
          Cookies.set("token", res.data.body.token);
          enqueueSnackbar("Login Success.", { variant: "success" });

          dispatch(
            setAuth({
              token: res.data.body.token,
              user: {
                id: res.data.body.id,
                username: res.data.body.username,
              },
            })
          );
        } else {
          setIsLoading(false);
          enqueueSnackbar("Login Failed.", { variant: "error" });

          dispatch(unSetAuth());
        }
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        dispatch(unSetAuth());
      });
  };

  return (
    <>
      <Box
        sx={{
          padding: "20% 12%",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "background.paper",
        }}
      >
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <BoxWrapper>
              <Box sx={{ mb: 2 }}>
                <TypographyStyled variant="h4">
                  Welcome Back 👋🏻
                </TypographyStyled>
                <Typography variant="body2" color="text.secondary">
                  Please sign-in to your account and start the adventure
                </Typography>
              </Box>
              <Box mb={2}>
                <RHFTextField name="username" type="text" label={"Username"} />
              </Box>
              <Box mb={2}>
                <RHFTextField
                  name="password"
                  label="Password"
                  type="password"
                />
              </Box>
              <Stack
                direction="row"
                justifyContent={"space-between"}
                alignItems="center"
              >
                <Stack direction="row" alignItems="center">
                  <Checkbox />
                  <Typography variant="body2">Remember Me</Typography>
                </Stack>
              </Stack>
              <Stack mt={2}>
                <LoadingButton
                  loading={isloading}
                  variant="contained"
                  type="submit"
                  sx={{ height: "50px" }}
                >
                  Login
                </LoadingButton>
              </Stack>
            </BoxWrapper>
          </form>
        </FormProvider>
      </Box>
    </>
  );
};

export default LoginForm;
