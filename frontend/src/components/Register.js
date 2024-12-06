import React, { useEffect, useState } from "react";
import { registerUser } from "../services/api";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  Paper,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";

import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }
    try {
        setError('')
      await registerUser({ name, email, password });
      setSuccess("Registro exitoso. Ahora puedes iniciar sesión.");
      setError("");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      if (err.response && err.response.data) {
        if (err.response.data.details && err.response.data.details.email) {
          setError(err.response.data.details.email[0]);
        } else {
          setError(err.response.data.error || "Error al registrar. Por favor, inténtalo de nuevo.");
        }
      } else {
        setError("Error al registrar. Por favor, inténtalo de nuevo.");
      }
      setSuccess("");
    }
  };
  useEffect(() => {
    
  }, [error])
  

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 5 }}>
        <Typography variant="h4" gutterBottom>
          Crear un nuevo usuario
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        {success && <Alert severity="success">{success}</Alert>}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Nombre y Apellido"
            variant="outlined"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
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
          <TextField
            label="Repetir Contraseña"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <Paper sx={{ p: 2, mb: 2, bgcolor: "#f5f5f5" }}>
            <Typography variant="subtitle1" gutterBottom>
              <InfoIcon sx={{ mr: 1, verticalAlign: "middle" }} />
              Requisitos de la contraseña:
            </Typography>
            <List dense>
              <ListItem>
                <ListItemText primary="• Mínimo 8 caracteres" />
              </ListItem>
              <ListItem>
                <ListItemText primary="• Al menos una letra mayúscula (A-Z)" />
              </ListItem>
              <ListItem>
                <ListItemText primary="• Al menos una letra minúscula (a-z)" />
              </ListItem>
              <ListItem>
                <ListItemText primary="• Al menos un número (0-9)" />
              </ListItem>
              <ListItem>
                <ListItemText primary="• Al menos un carácter especial (!@#$%^&(),.?\:{}|<>)" />
              </ListItem>
            </List>
          </Paper>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Crear Usuario
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Register;
