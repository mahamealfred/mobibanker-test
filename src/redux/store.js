import { createStore, applyMiddleware} from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import promise from "redux-promise-middleware";
import allReducers from "./reducers";
import { persistStore } from 'redux-persist';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/es/storage/session';
const persistConfig = {
    key: 'root',
    storage,
}
const persistedReducer = persistReducer(persistConfig, allReducers)

const middleware=applyMiddleware(thunk, promise);

export const store=createStore(persistedReducer, {}, middleware);
export const persistor = persistStore(store)
//const store=createStore(allReducers, {}, composeWithDevTools(middleware));
//const store=createStore(allReducers, {}, middleware);

  