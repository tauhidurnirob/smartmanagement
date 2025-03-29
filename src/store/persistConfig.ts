import storage from 'redux-persist/lib/storage';

const config = {
  key: 'rp-fm-smart-platform',
  storage,
  whitelist: [
    'auth'
  ]
}

export default config;