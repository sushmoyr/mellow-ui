'use client';

import { ReactNode } from 'react';
import { MellowProvider, ToastProvider } from '@mellow-ui/react';

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <MellowProvider defaultTheme="system">
      <ToastProvider position="bottom-right">
        {children}
      </ToastProvider>
    </MellowProvider>
  );
}
