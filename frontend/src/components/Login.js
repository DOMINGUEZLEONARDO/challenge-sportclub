import React, { useState } from "react";
import { loginUser } from "../services/api";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  Stack,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState('')
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await loginUser({ email, password });
      console.log(data);
      localStorage.setItem("token", data.token);
      setSuccess("Inicio de sesión exitoso");
      setTimeout(() => {
      navigate('/profile') 
    }, 1000);
    } catch (err) {
      setError("Credenciales inválidas. Inténtalo de nuevo.");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 5 }}>
        <Typography variant="h4" gutterBottom>
          Iniciar Sesión
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        {success && <Alert severity="success">{success}</Alert>}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Correo Electrónico"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            label="Contraseña"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Stack spacing={2} sx={{ mt: 2 }}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Iniciar Sesión
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              fullWidth
              onClick={() => navigate("/register")}
            >
              Registrarse
            </Button>
          </Stack>
        </form>
      </Box>
    </Container>
  );
};

export default Login;
