import { render, screen } from '@testing-library/react';
import { PaymentSummary } from './PaymentSummary';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router';

describe('PaymentSummary', () => {
  it('renders correctly with given payment summary data', () => {
    const mockData = {
      totalItems: 3,
      productCostCents: 1500,
      shippingCostCents: 499,
      totalCostBeforeTaxCents: 1999,
      taxCents: 200,
      totalCostCents: 2199,
    };

    render(
      <MemoryRouter>
        <PaymentSummary paymentSummary={mockData} setCart={vi.fn()} />
      </MemoryRouter>
    );

    // Verify key elements are rendered correctly
    expect(screen.getByText('Items (3):')).toBeInTheDocument();
    expect(screen.getByText('$15.00')).toBeInTheDocument();
    expect(screen.getByText('$4.99')).toBeInTheDocument();
    expect(screen.getByText('$21.99')).toBeInTheDocument();
    
    // Check that Place your order button exists
    expect(screen.getByRole('button', { name: /Place your order/i })).toBeInTheDocument();
  });
});
