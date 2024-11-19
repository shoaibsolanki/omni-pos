import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import ComponentPropsManagement from "./actions-reducers/ComponentProps/ComponentPropsManagement";
import logger from "redux-logger";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas";

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    ComponentPropsManagement,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(logger, sagaMiddleware),
});

// then run the saga
sagaMiddleware.run(rootSaga);
