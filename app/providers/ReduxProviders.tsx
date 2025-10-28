// src/providers/ReduxProvider.tsx
'use client'

import { store } from '@/Data'
import { Provider } from 'react-redux'

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>
}