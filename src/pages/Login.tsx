import { useState, useContext } from 'react';
import { Button, TextField, Container, Typography } from '@mui/material';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext)!;
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const response = await axios.post('https://fakestoreapi.com/auth/login', {
        username,
        password,
      });
      login(response.data.token);
      navigate('/products');
    } catch {
      alert('Login falhou!');
    }
  };

  return (
    <Container>
      <Typography variant="h4" color='black'>Login</Typography>
      <TextField label="Username" value={username} onChange={(e) => setUsername(e.target.value)} fullWidth margin="normal" />
      <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} fullWidth margin="normal" />
      <Button onClick={handleSubmit} variant="contained" fullWidth>Login</Button>
    </Container>
  );
};

export default Login;
