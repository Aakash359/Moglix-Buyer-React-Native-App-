import React, { Component } from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux';
import { combineReducers } from 'redux-immutable';
import { Root } from "native-base";
import reducer from './reducers';
import saga from './sagas';
import MoglixApp from './containers/App';
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();

const sagaMiddleware = createSagaMiddleware()
const middlewares = [];

const configureStore = (() => {
    let store
    return {
        create() {
            if (!store) {
                store = createStore(combineReducers(reducer), compose(applyMiddleware(sagaMiddleware)))
            }
            return store
        },
    }
})()

export const store = configureStore.create()
sagaMiddleware.run(saga)

export default class App extends Component {


    render() {
        return (


            <Root>
                <Provider store={store}>
                    <MoglixApp />
                </Provider>
            </Root>

        )
    }
}