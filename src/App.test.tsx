import React from 'react';
import { render, screen } from '@testing-library/react';
import { HashRouter } from 'react-router-dom';
import App from './App';

test('opens on the main menu', () => {
  render(<HashRouter><App /></HashRouter>);
  expect(screen.getByText('Main Menu')).toBeInTheDocument();
  expect(screen.getByText('Publications')).toBeInTheDocument();
});
