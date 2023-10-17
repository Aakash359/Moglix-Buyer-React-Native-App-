import { takeLatest, call, put } from "redux-saga/effects";
import {
  getInvoicetTrackAPICall,
  getNormalOrderAPICall,
} from "../utils/commonService";
import { ActionTypes, API_URLS } from "../constants";
// import {invoiceTrackDataReceived} from '../actions/InvoiceListAction'

function fetchInvoiceTrackData(baseURL, payload) {
  return getInvoicetTrackAPICall(baseURL, payload);
}

function fetchNormalData(baseURL, payload) {
  return getNormalOrderAPICall(baseURL, payload);
}

function* getInvoiceTrackRequest({ payload }) {
  const { invoiceNo } = payload;

  var invoiceTrackURL =
    "/api/order/History?orderId=" + invoiceNo + "&shipmentType=1";
  try {
    const response = yield call(() =>
      fetchInvoiceTrackData(invoiceTrackURL, payload)
    );
    yield put({ type: ActionTypes.INVOICE_TRACK_DATA_RECEIVED, response });
  } catch (error) {
    yield put({ type: ActionTypes.GLOBAL_ERROR, error });
  }
}

function* getNormalOrderRequest({ payload }) {
  const { invoiceNo } = payload;
  var normalOrderURL = "/item/invoice/getInvoiceTrack?invoiceNo=" + invoiceNo;

  try {
    const response = yield call(() => fetchNormalData(normalOrderURL, payload));
    yield put({ type: ActionTypes.NORMAL_ORDER_DATA_RECEIVED, response });
  } catch (error) {
    yield put({ type: ActionTypes.GLOBAL_ERROR, error });
  }
}

export default function* watcherSaga() {
  yield takeLatest(
    ActionTypes.GET_INVOICE_TRACK_REQUEST,
    getInvoiceTrackRequest
  );
  yield takeLatest(ActionTypes.GET_NORMAL_ORDER_REQUEST, getNormalOrderRequest);
}
