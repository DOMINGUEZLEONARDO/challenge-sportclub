import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Login from '../Login';
import { loginUser } from '../../services/api';
import { MemoryRouter } from 'react-router-dom';

jest.mock('../../services/api');

describe('Login Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('debería renderizar el formulario de inicio de sesión', () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    expect(screen.getByLabelText(/correo electrónico/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/contraseña/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /iniciar sesión/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /registrarse/i })).toBeInTheDocument();
  });

  it('debería mostrar un mensaje de error al ingresar credenciales inválidas', async () => {
    loginUser.mockRejectedValueOnce(new Error("Credenciales inválidas"));
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/correo electrónico/i), {
      target: { value: "test@test.com" },
    });
    fireEvent.change(screen.getByLabelText(/contraseña/i), {
      target: { value: "wrongpassword" },
    });
    fireEvent.click(screen.getByRole('button', { name: /iniciar sesión/i }));

    expect(await screen.findByText(/credenciales inválidas/i)).toBeInTheDocument();
  });

  it('debería redirigir al perfil después de un inicio de sesión exitoso', async () => {
    const userData = { token: 'fakeToken' };
    loginUser.mockResolvedValueOnce({ data: userData });

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/correo electrónico/i), {
      target: { value: "test@test.com" },
    });
    fireEvent.change(screen.getByLabelText(/contraseña/i), {
      target: { value: "correctpassword" },
    });
    fireEvent.click(screen.getByRole('button', { name: /iniciar sesión/i }));

  });
});
