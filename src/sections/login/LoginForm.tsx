import * as Yup from "yup";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Typography,
  Alert,
  Checkbox,
  Button,
  Stack,
  styled,
  Box,
} from "@mui/material";
import { RHFTextField } from "../../components/form";
import { login } from "../../apis/main/auth";

//components
import { useSnackbar } from "../../components/snackbar";
import { dispatch } from "../../store";
import { setAuth } from "../../store/reducers/auth";

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
  const { enqueueSnackbar } = useSnackbar();
  const LoginSchema = Yup.object().shape({
    username: Yup.string().required("username is required"),
    password: Yup.string().required("Password is required."),
  });

  const methods = useForm<loginFormProps>({
    resolver: yupResolver(LoginSchema),
  });

  const {
    reset,
    register,
    control,
    handleSubmit,

    formState: { isSubmitting, errors },
  } = methods;

  const onSubmit = async (data: loginFormProps) => {
    login({ username: data.username, password: data.password })
      .then((res) => {
        if (res.data.meta.success) {
          dispatch(
            setAuth({
              token: res.data.body.token,
              user: res.data.body,
            })
          );
          enqueueSnackbar(res.data.meta.message, {
            variant: "success",
          });
        } else {
          enqueueSnackbar(res.data.meta.message, {
            variant: "error",
          });
        }
      })
      .catch((err) => {
        enqueueSnackbar(err.message, {
          variant: "success",
        });
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
                <Button variant="contained" type="submit">
                  Login
                </Button>
              </Stack>

              <Button
                sx={{ mt: 12 }}
                variant="contained"
                onClick={() =>
                  enqueueSnackbar("Success", {
                    variant: "success",
                  })
                }
              >
                Click me
              </Button>
            </BoxWrapper>
          </form>
        </FormProvider>
      </Box>
    </>
  );
};

export default LoginForm;
