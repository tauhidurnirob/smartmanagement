import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

// Redux store
import { store, persistor } from './store/configureStore'

// App
import App from './App'

// globale Style
import './assets/scss/style.scss'
import 'react-responsive-carousel/lib/styles/carousel.min.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
)
