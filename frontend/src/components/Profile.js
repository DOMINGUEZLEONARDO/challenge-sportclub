import React, { useState, useEffect } from "react";
import { getProfile, updateProfile } from "../services/api";
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

const Profile = () => {
  const [profile, setProfile] = useState({});
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await getProfile();
        setProfile(data.profile);
        setName(data.profile.name);
      } catch (err) {
        setError("Error al cargar el perfil.");
      }
    };
    fetchProfile();
  }, []);

  console.log(profile)

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }
    try {
      await updateProfile({ name, password });
      setSuccess("Perfil actualizado exitosamente.");
      setError("");
      setTimeout(() => {
        navigate('/login')
      }, 1500);
    } catch (err) {
      alert("Error al actualizar el perfil.");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 5 }}>
        <Typography variant="h4" gutterBottom>
          Perfil
        </Typography>
        {success && <Alert severity="success">{success}</Alert>}
        {error && <Alert severity="error">{error}</Alert>}
        <form onSubmit={handleUpdate}>
          <TextField
            label="Nombre"
            variant="outlined"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <TextField            
            fullWidth
            margin="normal"
            value={profile.email}
            disabled            
          />
          <TextField
            label="Nueva Contraseña"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            label="Repetir Contraseña"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
            Cambiar contraseña
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Profile;
