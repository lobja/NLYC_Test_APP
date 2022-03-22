import { applyMiddleware, createStore, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import thunk from "redux-thunk";
import {MenuReducer} from './Reducers/MenuReducer';
import { SearchKey } from './Reducers/SearchKey';
import  {cartReducers}  from './Reducers/cartReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};


const reducer = combineReducers ({
    mycart : persistReducer(persistConfig, cartReducers),
    menu : MenuReducer,
    Skey : SearchKey,
})



export const store = createStore(
    reducer,
    applyMiddleware(thunk)
)



export const persistor = persistStore(store);



