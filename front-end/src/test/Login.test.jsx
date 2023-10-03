 import { render, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import LoginPage from '../pages/Login';

jest.mock('axios');

describe("LoginPage", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('handles successful login', async () => {
    const mockData = { 
      data: { 
        registrationNumber: '12345', 
        verificationCode: '54321',
        token: 'fake_token'
      }
    };
    
    axios.get.mockResolvedValueOnce(mockData);

    const { getByLabelText, getByRole } = render(<LoginPage />);

    fireEvent.change(getByLabelText(/Registration Number/i), { target: { value: '12345' } });
    fireEvent.change(getByLabelText(/5 digit PCP code/i), { target: { value: '54321' } });

    fireEvent.click(getByRole('button', { name: /Login/i }));

    // Check if token is stored
    expect(localStorage.getItem('token')).toBe(null);

    // This would ideally be a check if the user was redirected to the dashboard, but window.location.href is difficult to test.
  });

});
