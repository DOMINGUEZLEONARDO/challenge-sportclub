import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Register from '../Register';
import { registerUser } from '../../services/api';
import { MemoryRouter } from 'react-router-dom';

jest.mock('../../services/api');

describe('Register Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('debería renderizar el formulario de registro', () => {
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    expect(screen.getByLabelText(/nombre y apellido/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/correo electrónico/i)).toBeInTheDocument();

    const passwordFields = screen.getAllByLabelText(/contraseña/i);
    expect(passwordFields.length).toBeGreaterThan(0);
    expect(passwordFields[0]).toBeInTheDocument();

    expect(screen.getByLabelText(/repetir contraseña/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /crear usuario/i })).toBeInTheDocument();
  });

  it('debería mostrar un mensaje de error al ingresar contraseñas que no coinciden', () => {
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    const passwordFields = screen.getAllByLabelText(/contraseña/i);
    fireEvent.change(passwordFields[0], {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByLabelText(/repetir contraseña/i), {
      target: { value: "differentpassword" },
    });
    fireEvent.click(screen.getByRole('button', { name: /crear usuario/i }));

    expect(screen.getByText(/las contraseñas no coinciden/i)).toBeInTheDocument();
  });

  it('debería registrar al usuario y redirigir al inicio de sesión en caso de éxito', async () => {
    registerUser.mockResolvedValueOnce({});
    
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/nombre y apellido/i), {
      target: { value: "Gonzalo Garbuio" },
    });
    fireEvent.change(screen.getByLabelText(/correo electrónico/i), {
      target: { value: "test@test.com" },
    });
    const passwordFields = screen.getAllByLabelText(/contraseña/i);
    fireEvent.change(passwordFields[0], {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByLabelText(/repetir contraseña/i), {
      target: { value: "password123" },
    });
    fireEvent.click(screen.getByRole('button', { name: /crear usuario/i }));

    // Aquí podrías verificar que la redirección se realiza correctamente
    // Esto puede requerir un mock adicional o un spy en el método navigate
  });

  it('debería mostrar un mensaje de error al fallar el registro', async () => {
    registerUser.mockRejectedValueOnce({ response: { data: { error: 'Error al registrar' } } });

    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/nombre y apellido/i), {
      target: { value: "Gonzalo Garbuio" },
    });
    fireEvent.change(screen.getByLabelText(/correo electrónico/i), {
      target: { value: "test@test.com" },
    });
    const passwordFields = screen.getAllByLabelText(/contraseña/i);
    fireEvent.change(passwordFields[0], {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByLabelText(/repetir contraseña/i), {
      target: { value: "password123" },
    });
    fireEvent.click(screen.getByRole('button', { name: /crear usuario/i }));

    expect(await screen.findByText(/error al registrar/i)).toBeInTheDocument();
  });
});
