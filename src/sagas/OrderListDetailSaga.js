import { takeLatest, call, put } from 'redux-saga/effects';
import { getAPICall,getInvoiceAPICall, postAPICallWithHeader2, postProcurementAPICall,getInvoicetTrackAPICall } from '../utils/commonService';
import { ActionTypes, API_URLS,} from '../constants';

function fetchData(baseURL, payload) {
    return getAPICall(baseURL, payload)
}

function fetchInvoiceData(baseURL,apiOptions, payload) {
    return getInvoiceAPICall(baseURL,apiOptions, payload)
}

function fetchInvoiceTrackData(baseURL,payload) {
  return getInvoicetTrackAPICall(baseURL,payload)
}

function fetchItemsDetails(baseURL, apiOptions, payload) {
    return postProcurementAPICall(baseURL, apiOptions, payload)
}

function fetchSessionData(apiOptions) {
    return postAPICallWithHeader2(API_URLS.SEND_MAIL_URL, apiOptions)
}


  function formatData(payload) {
    const {itemID} = payload
    const params = {"query":{"bool":{"must":[{"terms": {
        "buyerId": [
          global.GLOBAL_BRANCH_ID
        ]
      }},
    {"nested":{"path":"history","query":{"bool":
    {"must":[{"nested":{"path":"history.po","query":
    {"bool":{"must":[{"match":{"history.po.poId":itemID}}]}}}}]}}}}],
    "must_not":{"terms":
    {"status":["PR Created","Revised", "Cancelled","Closed"]}}}},
    "sort":{"creationDate":{"order":"desc","ignore_unmapped":true}},"aggs":{"statuses":{"terms":{"field":"status","size":20}}}}
    this.request = params
}

function formDataInvoice(payload) {
  let sourceID = payload.sourceId

  let params=  {
        "query": {
          "bool": {
            "must": [
              {
                "terms": {
                  "buyerId": [
                    global.GLOBAL_BRANCH_ID
                  ]
                }
              },
              {
                "term": {
                  "_id": sourceID
                }
              }
            ],
            "must_not": {
              "terms": {
                "status": [
                  "PR Created",
                  "Revised",
                  "Cancelled",
                  "Closed"
                ]
              }
            }
          }
        },
        "sort": {
          "creationDate": {
            "order": "desc"
          }
        },
        "aggs": {
          "statuses": {
            "terms": {
              "field": "status",
              "size": 30
            },
            "aggs": {
              "statusWiseSum": {
                "nested": {
                  "path": "amount"
                },
                "aggs": {
                  "total": {
                    "sum": {
                      "field": "amount.amountWithTax"
                    }
                  }
                }
              }
            }
          }
        }
      }
      
    this.request = params
}


function* getOrderListDetailData({ payload }) {
    try {
        const apiOptions = {
            data: new formatData(payload),
        }
        yield put({ type: ActionTypes.IS_ORDERLISTING_DETAIL_LOADING, loading: true })
        const response = yield call(() => fetchItemsDetails(API_URLS.PROCUREMENT_ITEMS_SEARCH+'100', apiOptions, payload))
        const {hits} = response.data
        yield put({ type: ActionTypes.ORDERLIST_DETAIL_DATA_RECEIVED, hits })
        yield put({ type: ActionTypes.IS_ORDERLISTING_DETAIL_LOADING, loading: false })
    }
    catch (error) {
         yield put({ type: ActionTypes.GLOBAL_ERROR, error })
        yield put({ type: ActionTypes.IS_ORDERLISTING_DETAIL_LOADING, loading: false })

    }
}


function* getTrackItemDetailData({ payload }) {
    const {itemID} = payload
    var subURL = 'item/'+itemID+'/getStatus'
    try {
        yield put({ type: ActionTypes.IS_ORDERLISTING_DETAIL_LOADING, loading: true })
        const response = yield call(() => fetchData(subURL,payload))
        yield put({ type: ActionTypes.ITEM_TRACK_DATA_RECEIVED, response })
        yield put({ type: ActionTypes.IS_ORDERLISTING_DETAIL_LOADING, loading: false })
    }
    catch (error) {
        yield put({ type: ActionTypes.GLOBAL_ERROR, error })
        yield put({ type: ActionTypes.IS_ORDERLISTING_DETAIL_LOADING, loading: false })

    }
}

function* getInvoiceRequest({ payload }) {
  
    try {
      const apiOptions = {
        data: new formDataInvoice(payload),
      };
        yield put({ type: ActionTypes.IS_ORDERLISTING_DETAIL_LOADING, loading: false })
        const response = yield call(() => fetchInvoiceData(API_URLS.INVOICE_DETAILS, apiOptions, payload));
        yield put({ type: ActionTypes.INVOICE_REQUEST_RECEIVED, response });
        yield put({ type: ActionTypes.IS_ORDERLISTING_DETAIL_LOADING, loading: false })
    } 
    catch (error) {
        yield put({ type: ActionTypes.GLOBAL_ERROR, error });
        yield put({ type: ActionTypes.IS_ORDERLISTING_DETAIL_LOADING, loading: false })
    }
  }



function formatGetSessionHeaderData(payload) {
    const { userId, token } = payload
    this.idUser = userId
    this.token = token
  }

function* callSendMessageAPI({ payload }) {
    try {
        yield put({ type: ActionTypes.IS_ORDERLISTING_DETAIL_LOADING, loading: true })
        const response = yield call(() => fetchSessionData(payload))
        const {data} = response
        yield put({ type: ActionTypes.SEND_MESSAGE_DATA_RECEIVED,  data})
        yield put({ type: ActionTypes.IS_ORDERLISTING_DETAIL_LOADING, loading: false })
    }
    catch (error) {
        
        yield put({ type: ActionTypes.GLOBAL_ERROR, error })
        yield put({ type: ActionTypes.IS_ORDERLISTING_DETAIL_LOADING, loading: false })

    }
}

function* showProgressProcess({ payload }) {
    try {
        yield put({ type: ActionTypes.IS_ORDERLISTING_DETAIL_LOADING, loading: payload })
    }
    catch (error) {
        yield put({ type: ActionTypes.GLOBAL_ERROR, error })
        yield put({ type: ActionTypes.IS_ORDERLISTING_DETAIL_LOADING, loading: false })

    }
}


export default function* watcherSaga() {
    yield takeLatest(ActionTypes.GET_ORDERLIST_DETAIL_DATA, getOrderListDetailData)
    yield takeLatest(ActionTypes.GET_ITEM_TRACK_DETAIL_DATA, getTrackItemDetailData)
    yield takeLatest(ActionTypes.GET_INVOICE_REQUEST_DATA, getInvoiceRequest)
    yield takeLatest(ActionTypes.GET_SEND_MESSAGE_RESPONSE, callSendMessageAPI)
    yield takeLatest(ActionTypes.RUN_ACTIVITY, showProgressProcess)
}
