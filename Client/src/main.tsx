import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import { router } from './router/routes.tsx'
import { CartContextProvider } from './context/CartContext.tsx'
import { store } from './store/store.ts'
import { Provider } from 'react-redux'

createRoot(document.getElementById('root')!).render(
  <>
    <Provider store={store}>
      <CartContextProvider>
        <RouterProvider router={router} />
      </CartContextProvider>
    </Provider>
  </>,
)
