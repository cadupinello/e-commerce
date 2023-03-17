import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// redux config
import { Provider } from 'react-redux'
import { store } from './store'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.Suspense>
    <Provider store={store}>
      <App />
    </Provider>
  </React.Suspense>,
)