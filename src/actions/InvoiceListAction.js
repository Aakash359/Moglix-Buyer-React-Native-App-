import { ActionTypes } from "../constants";

export const getInvoiceTrackRequest = (payload) => ({
  type: ActionTypes.GET_INVOICE_TRACK_REQUEST,
  payload,
});

export const getNormalOrderRequest = (payload) => {
  return { type: ActionTypes.GET_NORMAL_ORDER_REQUEST, payload };
};

export const normalOrderDataReceived = (payload) => {
  return { type: ActionTypes.NORMAL_ORDER_DATA_RECEIVED, payload };
};

export const invoiceTrackDataReceived = (payload) => {
  return { type: ActionTypes.INVOICE_TRACK_DATA_RECEIVED, payload };
};
