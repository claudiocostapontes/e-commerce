// src/features/cart/store/useCartStore.test.ts
import { act } from '@testing-library/react';
import { useCartStore } from './useCartStore';

const mockProduct = {
  id: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
  name: 'Produto Teste',
  description: 'Descrição do produto teste',
  price: 150.0,
  imageUrl: 'https://exemplo.com/img.jpg',
  category: 'MÓVEIS' as const,
  slug: 'produto-teste',
};

describe('useCartStore', () => {
  beforeEach(() => {
    act(() => {
      useCartStore.getState().clearCart();
    });
  });

  it('deve inicializar com o estado zerado', () => {
    const state = useCartStore.getState();
    expect(state.items).toHaveLength(0);
    expect(state.totalItems).toBe(0);
    expect(state.totalPrice).toBe(0);
  });

  it('deve adicionar um novo produto ao carrinho', () => {
    act(() => {
      useCartStore.getState().addItem(mockProduct);
    });

    const state = useCartStore.getState();
    expect(state.items).toHaveLength(1);
    expect(state.items[0].quantity).toBe(1);
    expect(state.totalItems).toBe(1);
    expect(state.totalPrice).toBe(150.0);
  });

  it('deve incrementar a quantidade se o produto já existir no carrinho', () => {
    act(() => {
      useCartStore.getState().addItem(mockProduct);
      useCartStore.getState().addItem(mockProduct);
    });

    const state = useCartStore.getState();
    expect(state.items).toHaveLength(1);
    expect(state.items[0].quantity).toBe(2);
    expect(state.totalItems).toBe(2);
    expect(state.totalPrice).toBe(300.0);
  });

  it('deve remover um produto do carrinho', () => {
    act(() => {
      useCartStore.getState().addItem(mockProduct);
      useCartStore.getState().removeItem(mockProduct.id);
    });

    const state = useCartStore.getState();
    expect(state.items).toHaveLength(0);
    expect(state.totalItems).toBe(0);
    expect(state.totalPrice).toBe(0);
  });
});