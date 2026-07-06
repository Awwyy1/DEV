import { createContext, useContext, useState, type ReactNode } from 'react';

/** The card being built — carried from the archive through the editor to done. */
export interface Order {
  plateId: string;
  title: string;
  place: string;
  coords?: string;
  date: string;
  gradient: string;
  image?: string; // real photo (data URL or /photos/...), overrides gradient
  inscription: string;
  preset: string;
  align: string;
  recipient?: string;
}

const Ctx = createContext<{ order: Order | null; setOrder: (o: Order) => void }>({
  order: null,
  setOrder: () => {},
});

export function OrderProvider({ children }: { children: ReactNode }) {
  const [order, setOrder] = useState<Order | null>(null);
  return <Ctx.Provider value={{ order, setOrder }}>{children}</Ctx.Provider>;
}

export const useOrder = () => useContext(Ctx);
