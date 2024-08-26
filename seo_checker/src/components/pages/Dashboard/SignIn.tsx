import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from './SupabaseClient';
import { Grid, TextField, Button, Typography, Box } from '@mui/material';
import './SignIn.css';
const SignIn: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError('Error signing in. Please check your credentials and try again.');
    } else {
      setSuccess('Signed in successfully!');
      navigate('/admin');
    }
  };

  const handleGoogleSignIn = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });

    if (error) {
      setError('Error signing in with Google. Please try again.');
    } else {
      setSuccess('Signed in successfully!');
      navigate('/admin');
    }
  };

  return (
    <Box className="sign-in-container">
      <Grid container className="sign-in-box">
        <Grid item xs={12}>
          <Typography variant="h4" component="h1" gutterBottom align="center" className="sign-in-header">
            Sign In
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <form onSubmit={handleSignIn} className="sign-in-form">
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              className="sign-in-button"
            >
              Sign In
            </Button>
          </form>
        </Grid>

        <Grid item xs={12}>
          <Button
            onClick={handleGoogleSignIn}
            variant="outlined"
            fullWidth
            className="google-sign-in-button"
          >
            Sign In with Google
          </Button>
        </Grid>

        {error && (
          <Grid item xs={12}>
            <Typography variant="body2" color="error" align="center" className="sign-in-error">
              {error}
            </Typography>
          </Grid>
        )}

        {success && (
          <Grid item xs={12}>
            <Typography variant="body2" color="success" align="center" className="sign-in-success">
              {success}
            </Typography>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default SignIn;
