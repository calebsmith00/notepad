let store = ""

import test from './reducer'
import { createStore } from 'redux'

if (typeof window !== "undefined") {
  store = createStore(test, 
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
} else { store = createStore(test) }

export default store;