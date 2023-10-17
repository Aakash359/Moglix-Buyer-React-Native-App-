import { fork } from 'redux-saga/effects';
import login from './login';
import home from './home';
import SearchedOrder from './SearchedOrder';
import OrderListSaga from './OrderListSaga';
import forgotpassword from './forgotpassword';
import OrderListDetailSaga from './OrderListDetailSaga';
import InvoiceListDetailsSaga from './InvoiceListDetailsSaga';

export default function* root() {
    yield fork(login)
    yield fork(home)
    yield fork(SearchedOrder)
    yield fork(OrderListSaga)
    yield fork(OrderListDetailSaga)
    yield fork(forgotpassword)
    yield fork(InvoiceListDetailsSaga)
}
