import { createStore, combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
// import { AsyncStorageStatic } from "react-native";
// import {AsyncStorage} from ""
import AsyncStorage from '@react-native-async-storage/async-storage';

import userReducer from "./Reducers/userReducer";
import productReducer from "./Reducers/productReducer";
import cartReducer from "./Reducers/cartReducer";
import categoryReducer from "./Reducers/categoryReducer";
import linkReducer from './Reducers/linkReducer.js'
const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  blackList: [linkReducer]
};

const rootReducer = combineReducers({
  userReducer,
  productReducer,
  cartReducer,
  categoryReducer,
  linkReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const configStore = () => {
  let store = createStore(persistedReducer);
  let persistor = persistStore(store);
  return { store, persistor };
};
export default configStore;
