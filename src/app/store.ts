import {
    configureStore,
    ThunkAction,
    Action,
    combineReducers,
} from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { countApi } from "../features/counter/counterQuery";

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["counter"],
};

const reducers = combineReducers({
    counter: counterReducer,
    [countApi.reducerPath]: countApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }).concat(countApi.middleware),
});
export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
