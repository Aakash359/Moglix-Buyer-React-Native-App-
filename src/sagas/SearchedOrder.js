import { takeLatest, call, put } from "redux-saga/effects";
import { postProcurementAPICall } from "../utils/commonService";
import { ActionTypes, API_URLS } from "../constants";
import { Toast } from "native-base";

function fetchData(apiOptions, payload) {
  return postProcurementAPICall(
    API_URLS.PROCUREMENT_ITEMS_SEARCH2,
    apiOptions,
    payload
  );
}

function getInternalParams(key, text,) {
  if (key != "Item_Id" && key != 'poNo') {
    return {
      nested: {
        path: "product",
        query: {
          bool: {
            must: [
              {
                match: {
                  [`${key}`]: text,
                },
              },
            ],
          },
        },
      },
    };
  } else if (key == 'poNo') {
    return {
      nested: {
        path: "history",
        query: {
          bool: {
            must: [
              {
                nested: {
                  path: "history.po",
                  // query: {
                  //   bool: {
                  //     must: [
                  //       {
                  //         match: {
                  //           "history.po.customerPoNo.raw": text
                  //         }
                  //       },
                  //     ],
                  //   },
                  // },
                  "query": {
                    "wildcard": {
                        "history.po.customerPoNo.raw": {
                            "value": '*'+text.trim()+'*',
                            "boost": 1.0,
                            "rewrite":"constant_score"
                        }
                    }
                }
                },
              },
            ],
          },
        },
      },
    };
  }
  else {
    return {
      term: {
        _id: text,
      },
    };
  }
}

function formatData(data) {

  const { text, userFilter, key, isCheck, userId } = data;
  var status = ["PR Created", "Revised", "Cancelled", "Closed"];

  var params = {};

  if (data.selectedTab == "DELAYED") {
    status = "Delayed";
  }
  if (data.selectedTab == "IN-PROCESS") {
    status = ["Processing"];
  }
  if (data.selectedTab == "SHIPPED") {
    status = ["Shipped", "Partially Shipped"];
  }
  if (data.selectedTab == "DELIVERED") {
    status = ["Delivered", "Partially Delivered"];
  }

  let filter = {
    bool: {
      should: [
        {
          bool: {
            must_not: [
              {
                nested: {
                  path: "history",
                  score_mode: "avg",
                  query: {
                    nested: {
                      path: "history.po",
                      score_mode: "avg",
                      query: {
                        multi_match: {
                          query: text,
                          type: "most_fields",
                          operator: "OR",
                          boost: 1,
                          fields: ["history.po.customerPoNo"],
                        },
                      },
                    },
                  },
                },
              },
            ],
          },
        },
        {
          terms: {
            createdBy: userFilter,
          },
        },
        {
          terms: {
            purchaserId: userFilter,
          },
        },
      ],
    },
  };

  params = {
    sort: {
      _score: {
        order: "desc",
      },
    },
    query: {
      bool: {
        filter,
        must: [
          {
            terms: {
              buyerId: [global.GLOBAL_BRANCH_ID],
            },
          },
          {
            range: {
              creationDate: {
                gt: 1617215400000,
              },
            },
          },
          {
            ...getInternalParams(key, text),
          },
        ],
        must_not: {
          terms: {
            status: ["PR Created", "Revised", "Cancelled", "Closed"],
          },
        },
      },
    },
    aggs: {
      statuses: {
        terms: {
          field: "status",
          size: 30,
        },
        aggs: {
          statusWiseSum: {
            nested: {
              path: "amount",
            },
            aggs: {
              total: {
                sum: {
                  field: "amount.amountWithTax",
                },
              },
            },
          },
        },
      },
    },
  };

  if (data.selectedTab == "OTHER") {
    params = {
      sort: {
        _score: {
          order: "desc",
        },
      },
      query: {
        bool: {
          filter,
          must: [
            {
              terms: {
                buyerId: [global.GLOBAL_BRANCH_ID],
              },
            },
            {
              term: {
                status: "Others",
              },
            },
            {
              ...getInternalParams(key, text),
            },
          ],
        },
      },
    };
  }

  if (data.selectedTab == "ALL") {
    params = {
      sort: {
        _score: {
          order: "desc",
        },
      },
      query: {
        bool: {

          filter,
          must: [
            {
              terms: {
                buyerId: [global.GLOBAL_BRANCH_ID],
              },
            },
            {
              range: {
                creationDate: {
                  gt: 1617215400000,
                },
              },
            },
            {
              ...getInternalParams(key, text),
            },
          ],
          must_not: {
            terms: {
              status: ["PR Created", "Revised", "Cancelled",
                "Closed"
              ],
            },
          },
        },
      },
      aggs: {
        statuses: {
          terms: {
            field: "status",
            size: 30,
          },
          aggs: {
            statusWiseSum: {
              nested: {
                path: "amount",
              },
              aggs: {
                total: {
                  sum: {
                    field: "amount.amountWithTax",
                  },
                },
              },
            },
          },
        },
      },
    };
  }

  if (data.selectedTab == "OTHER") {
    params = {
      sort: {
        _score: {
          order: "desc",
        },
      },
      query: {
        bool: {
          filter,
          must: [
            {
              terms: {
                buyerId: [global.GLOBAL_BRANCH_ID],
              },
            },
            {
              range: {
                creationDate: {
                  gt: 1617215400000,
                },
              },
            },
            {
              term: {
                status: "Others",
              },
            },
            {
              ...getInternalParams(key, text),
            },
          ],
          must_not: {
            terms: {
              status: [
                "PR Created",
                "Revised",
                "Cancelled",
                "Closed"
              ],
            },
          },
        },
      },
      aggs: {
        statuses: {
          terms: {
            field: "status",
            size: 30,
          },
          aggs: {
            statusWiseSum: {
              nested: {
                path: "amount",
              },
              aggs: {
                total: {
                  sum: {
                    field: "amount.amountWithTax",
                  },
                },
              },
            },
          },
        },
      },
    };
  }

  if (data.isUserFilter) {
    params = {
      query: {
        bool: {
          must: [
            {
              terms: {
                buyerId: [global.GLOBAL_BRANCH_ID],
              },
            },
            {
              ...getInternalParams(key, text),
            },
          ],
          filter: {
            bool: {
              should: [
                {
                  bool: {
                    must_not: [
                      {
                        exists: {
                          field: "createdBy",
                        },
                      },
                    ],
                  },
                },
                {
                  terms: {
                    createdBy: [data.userId],
                  },
                },
              ],
            },
          },
          must_not: {
            terms: {
              status: ["PR Created", "Revised", "Cancelled", "Closed"],
            },
          },
        },
      },
      sort: {
        creationDate: {
          order: "desc",
        },
      },
      aggs: {
        statuses: {
          terms: {
            field: "status",
            size: 30,
          },
          aggs: {
            statusWiseSum: {
              nested: {
                path: "amount",
              },
              aggs: {
                total: {
                  sum: {
                    field: "amount.amountWithTax",
                  },
                },
              },
            },
          },
        },
      },
    };
  }
  // Query for combination of all three filters like all Days filter and select by date and Serach data accodingly 
  if (!userFilter || (userFilter && userFilter.length == 0)) {
    let startDate = data.startDate

    if (data.startDate) {
      if (data.isCheck) {
        params = {
          sort: {
            creationDate: {
              order: "desc",
            },
          },
          query: {
            bool: {
              filter: {
                bool: {
                  should: [
                    {
                      terms: {
                        createdBy: [
                          userId
                        ]
                      }
                    },
                    {
                      terms: {
                        purchaserId: [
                          userId
                        ]
                      }
                    }
                  ]
                }
              },
              must: [
                {
                  terms: {
                    buyerId: [global.GLOBAL_BRANCH_ID],
                  },
                },
                {
                  range: {
                    creationDate: {
                      gte: startDate,
                    },
                  },
                },
                {
                  range: {
                    creationDate: {
                      gt: 1617215400000,
                    },
                  },
                },
                {
                  ...getInternalParams(key, text),
                },
              ],
              must_not: {
                terms: {
                  status: ["PR Created", "Revised", "Cancelled", "Closed"],
                },
              },
            },
          },
          aggs: {
            statuses: {
              terms: {
                field: "status",
                size: 30,
              },
              aggs: {
                statusWiseSum: {
                  nested: {
                    path: "amount",
                  },
                  aggs: {
                    total: {
                      sum: {
                        field: "amount.amountWithTax",
                      },
                    },
                  },
                },
              },
            },
          },
        };
      }

    }
    else if (data.isCheck) {

      params = {
        sort: {
          creationDate: {
            order: "desc",
          },
        },
        query: {
          bool: {
            filter: {
              bool: {
                should: [
                  {
                    terms: {
                      createdBy: [
                        userId
                      ]
                    }
                  },
                  {
                    terms: {
                      purchaserId: [
                        userId
                      ]
                    }
                  }
                ]
              }
            },
            must: [
              {
                terms: {
                  buyerId: [global.GLOBAL_BRANCH_ID],
                },
              },
              {
                range: {
                  creationDate: {
                    gt: 1617215400000,
                  },
                },
              },
              {
                ...getInternalParams(key, text),
              },
            ],
            must_not: {
              terms: {
                status: ["PR Created", "Revised", "Cancelled", "Closed"],
              },
            },
          },
        },
        aggs: {
          statuses: {
            terms: {
              field: "status",
              size: 30,
            },
            aggs: {
              statusWiseSum: {
                nested: {
                  path: "amount",
                },
                aggs: {
                  total: {
                    sum: {
                      field: "amount.amountWithTax",
                    },
                  },
                },
              },
            },
          },
        },
      };

    }

    else {
      params = {
        sort: {
          creationDate: {
            order: "desc",
          },
        },
        query: {
          bool: {
            must: [
              {
                terms: {
                  buyerId: [global.GLOBAL_BRANCH_ID],
                },
              },
              {
                range: {
                  creationDate: {
                    gt: 1617215400000,
                  },
                },
              },
              {
                ...getInternalParams(key, text),

              },
            ],
            must_not: {
              terms: {
                status: ["PR Created", "Revised", "Cancelled", "Closed"],
              },
            },
          },
        },
        aggs: {
          statuses: {
            terms: {
              field: "status",
              size: 30,
            },
            aggs: {
              statusWiseSum: {
                nested: {
                  path: "amount",
                },
                aggs: {
                  total: {
                    sum: {
                      field: "amount.amountWithTax",
                    },
                  },
                },
              },
            },
          },
        },
      };
    }
    if (data.selectedTab == "ALL") {
      params = {
        sort: {
          creationDate: {
            order: "desc",
          },
        },
        query: {
          bool: {
            filter: data.isCheck ? {
              bool: {
                should: [
                  {
                    terms: {
                      createdBy: [
                        userId
                      ]
                    }
                  },
                  {
                    terms: {
                      purchaserId: [
                        userId
                      ]
                    }
                  }
                ]
              }
            } : null,
            must: [
              {
                terms: {
                  buyerId: [global.GLOBAL_BRANCH_ID],
                },
              },
              {
                range: {
                  creationDate: {
                    gt: 1617215400000,
                  },
                },
              },
              {
                ...getInternalParams(key, text),
              },
            ],
            must_not: {
              terms: {
                status: ["PR Created", "Revised", "Cancelled",
                ],
              },
            },
          },
        },
        aggs: {
          statuses: {
            terms: {
              field: "status",
              size: 30,
            },
            aggs: {
              statusWiseSum: {
                nested: {
                  path: "amount",
                },
                aggs: {
                  total: {
                    sum: {
                      field: "amount.amountWithTax",
                    },
                  },
                },
              },
            },
          },
        },
      };
    }
    if (data.selectedTab == "OTHER") {
      params = {
        sort: {
          _score: {
            order: "desc",
          },
        },
        query: {
          bool: {
            filter: data.isCheck ? {
              bool: {
                should: [
                  {
                    terms: {
                      createdBy: [
                        userId
                      ]
                    }
                  },
                  {
                    terms: {
                      purchaserId: [
                        userId
                      ]
                    }
                  }
                ]
              }
            } : null,
            must: [
              {
                terms: {
                  buyerId: [global.GLOBAL_BRANCH_ID],
                },
              },
              {
                range: {
                  creationDate: {
                    gt: 1617215400000,
                  },
                },
              },
              {
                term: {
                  status: "Others",
                },
              },
              {
                ...getInternalParams(key, text),
              },
            ],
            must_not: {
              terms: {
                status: ["PR Created", "Revised", "Cancelled",
                ],
              },
            },
          },
        },
        aggs: {
          statuses: {
            terms: {
              field: "status",
              size: 30,
            },
            aggs: {
              statusWiseSum: {
                nested: {
                  path: "amount",
                },
                aggs: {
                  total: {
                    sum: {
                      field: "amount.amountWithTax",
                    },
                  },
                },
              },
            },
          },
        },
      };
    }
    if (data.selectedTab == "DELAYED") {
      params = {
        sort: { _score: { order: "desc" } },
        query: {
          bool: {
            must: [
              { terms: { buyerId: [global.GLOBAL_BRANCH_ID] } },
              { term: { status: "Delayed" } },
              {
                ...getInternalParams(key, text),
              },
            ],
            must_not: {
              terms: {
                status: ["PR Created", "Revised", "Cancelled", "Closed"],
              },
            },
          },
        },
        aggs: {
          statuses: {
            terms: { field: "status", size: 30 },
            aggs: {
              statusWiseSum: {
                nested: { path: "amount" },
                aggs: { total: { sum: { field: "amount.amountWithTax" } } },
              },
            },
          },
        },
      };

      if (data.selectedTab == "DELAYED") {
        params = {
          sort: { _score: { order: "desc" } },
          query: {
            bool: {
              filter: data.isCheck ? {
                bool: {
                  should: [
                    {
                      terms: {
                        createdBy: [
                          userId
                        ]
                      }
                    },
                    {
                      terms: {
                        purchaserId: [
                          userId
                        ]
                      }
                    }
                  ]
                }
              } : null,
              must: [
                { terms: { buyerId: [global.GLOBAL_BRANCH_ID] } },
                {
                  range: {
                    creationDate: {
                      gt: 1617215400000,
                    },
                  },
                },
                { term: { status: "Delayed" } },
                {
                  ...getInternalParams(key, text),
                },
              ],
              must_not: {
                terms: {
                  status: ["PR Created", "Revised", "Cancelled", "Closed"],
                },
              },
            },
          },
          aggs: {
            statuses: {
              terms: { field: "status", size: 30 },
              aggs: {
                statusWiseSum: {
                  nested: { path: "amount" },
                  aggs: { total: { sum: { field: "amount.amountWithTax" } } },
                },
              },
            },
          },
        };
      }
    }

    this.request = params;
  }
}

function* getSearchedOrderData({ payload }) {

  try {
    const apiOptions = {
      data: new formatData(payload),
    };
    var hitsData = [];
    yield put({ type: ActionTypes.SEARCHED_ORDER_DATA_RECEIVED, hitsData });
    yield put({ type: ActionTypes.IS_SEARCHED_ORDER_LOADING, loading: true });
    const response = yield call(() => fetchData(apiOptions, payload));

    const { hits } = response.data;
    const arrData = hits.hits;
    if (!arrData || (arrData && !arrData.length)) {
      Toast.show({
        text: "No search item found",
        buttonText: "Okay",
        duration: 1000,
        position: "top",
      });
    }
    yield put({ type: ActionTypes.SEARCHED_ORDER_DATA_RECEIVED, arrData });
    yield put({ type: ActionTypes.IS_SEARCHED_ORDER_LOADING, loading: false });
  } catch (error) {


    yield put({ type: ActionTypes.GLOBAL_ERROR, error });
    yield put({ type: ActionTypes.IS_SEARCHED_ORDER_LOADING, loading: false });
  }
}


export default function* watcherSaga() {

  yield takeLatest(ActionTypes.GET_SEARCHED_ORDER_DATA, getSearchedOrderData);
}
