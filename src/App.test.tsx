import React from 'react';
import { render, screen } from '@testing-library/react';
import { HashRouter } from 'react-router-dom';
import App from './App';

test('opens on the about page', () => {
  render(<HashRouter><App /></HashRouter>);
  expect(screen.getByText('About me')).toBeInTheDocument();
  expect(screen.getByText('Selected Publications')).toBeInTheDocument();
});
