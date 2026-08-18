// src/features/checkout/components/CheckoutForm.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CheckoutForm } from './CheckoutForm';

jest.mock('@/features/cart/store/useCartStore', () => ({
  useCartStore: jest.fn((selector) => {
    const state = {
      items: [{ id: '1', quantity: 1 }],
      clearCart: jest.fn(),
    };
    return selector(state);
  }),
}));

global.alert = jest.fn();
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ orderId: '12345' }),
  })
) as jest.Mock;

describe('CheckoutForm', () => {
  it('deve renderizar os campos do formulário corretamente', () => {
    render(<CheckoutForm />);
    
    expect(screen.getByLabelText(/Nome Completo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/E-mail/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/CPF/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Finalizar Pedido/i })).toBeInTheDocument();
  });

  it('deve exibir erros de validação ao enviar um formulário vazio', async () => {
    render(<CheckoutForm />);
    const user = userEvent.setup();

    const submitButton = screen.getByRole('button', { name: /Finalizar Pedido/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/O nome completo é obrigatório/i)).toBeInTheDocument();
      expect(screen.getByText(/E-mail inválido/i)).toBeInTheDocument();
      expect(screen.getByText(/CEP inválido/i)).toBeInTheDocument();
      expect(screen.getByText(/Selecione um método de pagamento/i)).toBeInTheDocument();
    });
    
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('deve submeter o formulário com sucesso quando todos os dados estiverem válidos', async () => {
    render(<CheckoutForm />);
    const user = userEvent.setup();

    await user.type(screen.getByLabelText(/Nome Completo/i), 'João da Silva');
    await user.type(screen.getByLabelText(/E-mail/i), 'joao@email.com');
    await user.type(screen.getByLabelText(/CPF/i), '12345678909');
    await user.type(screen.getByLabelText(/CEP/i), '70000000');
    await user.type(screen.getByLabelText(/Número/i), '123');
    await user.selectOptions(screen.getByLabelText(/Pagamento/i), 'PIX');

    const submitButton = screen.getByRole('button', { name: /Finalizar Pedido/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1);
    });
    
    expect(global.alert).toHaveBeenCalledWith(expect.stringContaining('Pedido finalizado! Código: 12345'));
  });
});