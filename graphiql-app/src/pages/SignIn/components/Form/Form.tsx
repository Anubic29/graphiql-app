import {
  Avatar,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../../contexts';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { LockOutlined } from '@mui/icons-material';

interface IFormData {
  email: string;
  password: string;
  showPassword: boolean;
}

const API_KEY = 'AIzaSyAysgr5Plp1IojvpjX_GR_h_rRMZ2_Q41Q';

const Form: React.FC = () => {
  const navigate = useNavigate();
  const authCtx = useAuth();
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const schema = yup.object().shape({
    email: yup
      .string()
      .email('Email should have correct format')
      .required('Email is a required field'),
    password: yup
      .string()
      .min(8, 'Password is too short - should be 8 chars minimum.')
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
      )
      .required('No password provided.'),
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IFormData>({
    mode: 'onBlur',
    resolver: yupResolver(schema),
    shouldUseNativeValidation: false,
  });

  const onSubmit: SubmitHandler<IFormData> = async (data) => {
    setIsLoading(true);
    let url: string;

    if (isLogin) {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;
    } else {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;
    }
    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        email: data.email,
        password: data.password,
        returnSecureToken: true,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        setIsLoading(false);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = 'Authentication failed!';
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        const expirationTime = new Date(new Date().getTime() + +data.expiresIn * 1000);
        authCtx.login(data.idToken, expirationTime.toISOString());
        navigate('/', { replace: true });
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const showPassword = watch('showPassword');

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        m: '3rem auto',
        p: '1rem',
        borderRadius: '6px',
        width: '95%',
        maxWidth: '35rem',
        boxShadow: ' 0 1px 4px rgba(0, 0, 0, 0.2)',
      }}
    >
      <Avatar sx={{ color: 'white', backgroundColor: '#172e4a' }}>
        <LockOutlined />
      </Avatar>
      <Typography component="h2" variant="h4" sx={{ my: '.5rem' }}>
        {isLogin ? 'Login' : 'Registration'}
      </Typography>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <TextField
          {...register('email')}
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          error={!!errors.email}
          helperText={errors?.email?.message}
        />
        <TextField
          {...register('password')}
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          id="password"
          autoComplete="current-password"
          error={!!errors.password}
          helperText={errors?.password?.message}
        />

        <FormControlLabel
          control={<Checkbox {...register('showPassword')} color="primary" />}
          label="Show password"
          sx={{ my: '1rem' }}
        />

        {!isLoading && (
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ color: 'white', backgroundColor: '#172e4a', py: '.8rem' }}
          >
            {isLogin ? 'Sign In' : 'Sign Up'}
          </Button>
        )}

        {isLoading && <p>Sending request...</p>}

        <Grid container sx={{ mt: '1rem' }}>
          <Grid item>
            <Link href="#" variant="body2" onClick={switchAuthModeHandler}>
              {isLogin ? "Don't have an account? Sign Up" : 'Do you have an account? Sign In'}
            </Link>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default Form;