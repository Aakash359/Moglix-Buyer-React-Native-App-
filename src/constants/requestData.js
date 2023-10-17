import moment from "moment";

export default class RequestData {
  //This query will be apply when filter is applied and you come back form previos screen    
  static getAllOrderDataRequest(idBranch, starDate, endDate, userFilter, originalFIlter,
    isCheck = isCheck == undefined || null ? global.isCheck : isCheck, userid) {
    if (userFilter && userFilter.length && originalFIlter && originalFIlter.length != userFilter.length) {

      filter = {
        "bool": {
          "should": [
            {
              "terms": {
                "createdBy": userFilter
              }
            },
            {
              "terms": {
                "purchaserId": userFilter
              }
            }
          ]
        }
      }
    }
    var statusArr = [
      "PR Created",
      "Revised",
      "Cancelled",
    ]

    const params = {
      "query": {
        "bool": {
          "filter": isCheck ? {
            "bool": {
              "should": [
                {
                  "terms": {
                    "createdBy": [
                      userid
                    ]
                  }
                },
                {
                  "terms": {
                    "purchaserId": [
                      userid
                    ]
                  }
                }
              ]
            }
          } : null,

          "must": [
            {
              "terms": {
                "buyerId": [
                  idBranch
                ]
              }
            },
            {
              "range": {
                "creationDate": {
                  "gt": starDate,
                  "lte": endDate
                }
              }
            }
          ],
          "must_not": {
            "terms": {
              "status": statusArr
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
    return params


  }
  // When filter is applied then filtered data is showing in all tab list with this function 
  static getEnterTabsDataOrderDataRequest(tabSelected, idBranch, starDate = '', endDate = '',
    isCheck = isCheck == undefined || null ? global.isCheck : isCheck, userid) {
    var statusString = tabSelected
    if (tabSelected == "In-Process") {
      statusString = "Processing"
    }
    if (tabSelected == "Other") {
      statusString = "Others"
    }
    const params = {
      "query": {
        "bool": {
          "filter": isCheck ? {
            "bool": {
              "should": [
                {
                  "terms": {
                    "createdBy": [
                      userid
                    ]
                  }
                },
                {
                  "terms": {
                    "purchaserId": [
                      userid
                    ]
                  }
                }
              ]
            }
          } : null,
          "must": [
            {
              "terms": {
                "buyerId": [
                  idBranch
                ]
              }
            },
            {
              "term": {
                "status": statusString
              }
            }
            , {
              "range":
              {
                "creationDate":
                {
                  "gt": starDate,
                  "lte": endDate
                }
              }
            }
          ],
          "must_not": {
            "terms": {
              "status": [
                "PR Created", "Revised", "Cancelled",
              ]
            }
          }
        }
      },
      "sort": {
        "creationDate": {
          "order": "desc",
          "ignore_unmapped": true
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
        },
        "subStatuses": {
          "terms": {
            "field": "subStatus.keyword",  // .keyword
            "size": 30
          },
          "aggs": {
            "subStatusWiseSum": {
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
    return params
  }

  static getAllOrderDataWithoutFilterRequest(idBranch, userFilter, originalFIlter, isCheck, userid) {
    let filter = {
      "bool": {
        "should": [
          {
            "bool": {
              "must_not": [
                {
                  "exists": {
                    "field": "createdBy"
                  }
                }
              ]
            }
          },
          {
            "terms": {
              "createdBy": userFilter
            }
          },
          {
            "terms": {
              "purchaserId": userFilter
            }
          }
        ]
      }
    }

    if (userFilter && userFilter.length && originalFIlter && originalFIlter.length != userFilter.length) {
      filter = {
        "bool": {
          "should": [
            {
              "terms": {
                "createdBy": userFilter
              }
            },
            {
              "terms": {
                "purchaserId": userFilter
              }
            }
          ]
        }
      }
    }

    let params = {
      "query": {
        "bool": {
          "must": [
            {
              "terms": {
                "buyerId": [
                  idBranch
                ]
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
          },
          filter,
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
    if (!userFilter || userFilter.length == 0) {
      //alert(moment().subtract('months', 6).unix())
      params = {
        "query": {
          "bool": {
            "filter": isCheck ? {
              "bool": {
                "should": [
                  {
                    "terms": {
                      "createdBy": [
                        userid
                      ]
                    }
                  },
                  {
                    "terms": {
                      "purchaserId": [
                        userid
                      ]
                    }
                  }
                ]
              }
            } : null,
            "must": [
              {
                "terms": {
                  "buyerId": [
                    idBranch
                  ]
                }
              }, {
                "range": {
                  "creationDate": {
                    "gt": moment().subtract('months', 6).unix()  // changed due to 6 month 1617215400000
                  }
                }
              }
            ],
            "must_not": {
              "terms": {
                "status": [
                  "PR Created",
                  "Revised",
                  "Cancelled",
                  "vendor cancelled",
                  "Vendor Cancelled",
                  "Buyer Cancelled",
                  "buyer cancelled",
                  "Partially Cancelled",
                  "Returns"
                ]
              }
            },

          }
        },
        "sort": {
          "creationDate": {
            "order": "desc",
            "ignore_unmapped": true
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
    }
    return params
  }
  //All defualt tabs(In-Process to Delayed tab) Single All Tab Not Included in This + selection of show my order check box data load with this function
  static getEnterTabsDataOrderDataWithoutFilterRequest(tabSelected, idBranch, userFilter, originalFIlter, isCheck, userid, upcomingIds) {

    var statusString = tabSelected
    if (tabSelected == "In-Process") {
      statusString = "Processing"
    }
    var statusArr = [
      "PR Created",
      "Revised",
      "Cancelled",
      "Closed"
    ]
    if (statusString == 'Delivered') {
      statusArr = [
        "PR Created",
        "Revised",
        "Cancelled",
        "Closed"
      ]
    }
    if (statusString == 'Other') {
      statusArr = [
        "PR Created",
        "Revised",
        "Cancelled"
      ]
    }


    var params = ''

    let filter = {
      "bool": {
        "should": [
          {
            "bool": {
              "must_not": [
                {
                  "exists": {
                    "field": "createdBy"
                  }
                }
              ]
            }
          },
          {
            "terms": {
              "createdBy": userFilter
            }
          },
          {
            "terms": {
              "purchaserId": userFilter
            }
          }
        ]
      }
    }

    if (userFilter && userFilter.length && originalFIlter && originalFIlter.length != userFilter.length) {
      filter = {
        "bool": {
          "should": [
            {
              "terms": {
                "createdBy": userFilter
              }
            },
            {
              "terms": {
                "purchaserId": userFilter
              }
            }
          ]
        }
      }
    }
    if (userFilter.length == 0) {
      params = {
        "query": {
          "bool": {
            "filter": isCheck ? {
              "bool": {
                "should": [
                  {
                    "terms": {
                      "createdBy": [
                        userid
                      ]
                    }
                  },
                  {
                    "terms": {
                      "purchaserId": [
                        userid
                      ]
                    }
                  }
                ]
              }
            } : null,
            "must": [
              {
                "terms": {
                  "buyerId": [
                    idBranch
                  ]
                }
              },
              {
                "range": {
                  "creationDate": {
                    "gt": moment().subtract('months', 6).unix()  // changed due to 6 month 1617215400000
                  }
                }
              },
              statusString == 'Other' ?
                {
                  "term": {
                    "status": "Others"
                  }
                } : statusString == 'Shipped' ?
                  {
                    "terms": {
                      "status": ["Shipped", "Partially Shipped", "GE Created", "Asn Created"]
                    }
                  } : statusString == 'Delivered' ?
                    {
                      "terms": {
                        "status": [
                          "Delivered",
                          "Partially Delivered",
                          "Received",
                          "Accepted",
                          "Moglix Delivered",
                          "GRN Created",
                          "GRN Done",
                          "GRN",
                          "Grn",
                          "DELIVERED",
                          "Partially Received"
                        ]
                      }
                    } : statusString == 'Delayed' ?
                      {
                        "term": {
                          "status": statusString
                        }
                      } : statusString == 'Processing' ?
                        {
                          "term": {
                            "status": statusString
                          }
                        } : null,

            ],

            "must_not": [
              statusString == "Shipped" ?
                {
                  "terms": {
                    "id": global.sourceID
                  }

                } :
                {
                  "terms": {
                    "status": statusArr
                  }

                },

            ]
          }
        },
        "sort": {
          "creationDate": {
            "order": "desc",
            "ignore_unmapped": true
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
          },
          "subStatuses": {
            "terms": {
              "field": "subStatus.keyword",  //.keyword
              "size": 30
            },
            "aggs": {
              "subStatusWiseSum": {
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
    }
    else {
      if (statusString == 'Delivered') {
        params = {
          "query": {
            "bool": {
              filter,
              "must": [
                {
                  "terms": {
                    "buyerId": [
                      idBranch
                    ]
                  }
                },
                {
                  "terms": {
                    "status": [
                      "Delivered",
                      "Partially Delivered"
                    ]
                  }
                },
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
      }
      else if (statusString == 'Other') {
        params = {
          "query": {
            "bool": {
              filter,
              "must": [
                {
                  "terms": {
                    "buyerId": [
                      idBranch
                    ]
                  }
                },
                {
                  "term": {
                    "status": "Others"
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


      }

      else if (statusString == 'Shipped') {
        params = {
          "query": {
            "bool": {
              filter,
              "must": [
                {
                  "terms": {
                    "buyerId": [
                      idBranch
                    ]
                  }
                },
                {
                  "terms": {
                    "status": ["Shipped", "Partially Shipped"]
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
              "order": "desc",
              "ignore_unmapped": true
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

      }
      else if (tabSelected == 'Delayed') {
        params = {
          "query": {
            "bool": {
              filter,
              "must": [
                {
                  "terms": {
                    "buyerId": [
                      idBranch
                    ]
                  }
                },
                {
                  "term": {
                    "status": statusString
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
      }

      else {

        params = {
          "query": {
            "bool": {
              filter,
              "must": [
                {
                  "terms": {
                    "buyerId": [
                      idBranch
                    ]
                  }
                },
                {
                  "term": {
                    "status": statusString
                  }
                }
              ],
              "must_not": {
                "terms": {
                  "status": statusArr
                }
              }
            }
          },
          "sort": {
            "creationDate": {
              "order": "desc",

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
      }

    }
    return params
  }

  static getPOAndSADataRequest() {
    var POType = "open"
    if (global.PO_SA_Value == 'PO') {
      POType = "closed"
    }
    const params = {
      "query": {
        "bool": {
          "must": [{
            "terms": {
              "buyerId": [
                global.GLOBAL_BRANCH_ID
              ]
            }
          },
          {
            "nested": {
              "path": "history", "query": {
                "bool": {
                  "must": [{
                    "nested":
                    {
                      "path": "history.po", "query": {
                        "bool": {
                          "must": [{
                            "match":
                              { "history.po.poState": POType }
                          }]
                        }
                      }
                    }
                  }]
                }
              }
            }
          }], "must_not": {
            "terms":
              { "status": ["PR Created", "Revised", "Cancelled"] }
          }
        }
      }, "sort": {
        "creationDate":
          { "order": "desc", "ignore_unmapped": true }
      }, "aggs": {
        "statuses": {
          "terms":
            { "field": "status", "size": 20 }
        }
      }
    }

    return params
  }

  static getUserFilterRequest(filters, selectedTab, startTime, endTime, originalFIlter) {
    let filter = {
      "bool": {
        "should": [
          {
            "bool": {
              "must_not": [
                {
                  "exists": {
                    "field": "createdBy"
                  }
                }
              ]
            }
          },
          {
            "terms": {
              "createdBy": filters
            }
          },
          {
            "terms": {
              "purchaserId": filters
            }
          }
        ]
      }
    }
    if (filters && filters.length && originalFIlter && originalFIlter.length != filters.length) {
      filter = {
        "bool": {
          "should": [
            {
              "terms": {
                "createdBy": filters
              }
            },
            {
              "terms": {
                "purchaserId": filters
              }
            }
          ]
        }
      }
    }


    if (startTime && endTime) {
      const params = {
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
                "range": {
                  "creationDate": {
                    "gt": startTime,
                    "lte": endTime
                  }
                }
              }
            ],
            filter,
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
      return params
    }
    if (selectedTab == 'Shipped') {
      const params = {
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
                "terms": {
                  "status": [
                    "Partially Shipped",
                    "Shipped"
                  ]
                }
              }
            ],
            filter,
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
      return params
    }

    if (selectedTab == 'In-Process') {
      const params = {
        "query": {
          "bool": {
            "must": [
              {
                "terms": {
                  "buyerId": [global.GLOBAL_BRANCH_ID]
                }
              },
              {
                "term": {
                  "status": "Processing"
                }
              }
            ],
            filter,
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
      return params
    }

    if (selectedTab == 'Delayed') {
      const params = {
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
                  "status": "Delayed"
                }
              }
            ],
            filter,
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
      return params
    }

    if (selectedTab == 'Delivered') {
      const params = {
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
                "terms": {
                  "status": [
                    "Partially Delivered",
                    "Delivered"
                  ]
                }
              }
            ],
            filter,
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
      return params
    }

    if (selectedTab == 'Other') {
      const params = {
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
                "terms": {
                  "status":
                    "Others"

                }
              }
            ],
            filter,
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
      return params
    }

    if (selectedTab == '') {
      const params = {
        "query": {
          "bool": {
            "must": [
              {
                "terms": {
                  "buyerId": [
                    global.GLOBAL_BRANCH_ID
                  ]
                }
              }
            ],
            filter,
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
    }

    const params =
    {
      "query": {
        "bool": {
          "must": [
            {
              "terms": {
                "buyerId": [
                  global.GLOBAL_BRANCH_ID
                ]
              }
            }
          ],
          filter,
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
    return params

  }

  static upComingData(isCheck, userid) {
    const upcomingDate = new Date(new Date().setDate(new Date().getDate() + 7)).getTime()
    const currentDate = new Date(new Date().setDate(new Date().getDate())).getTime(); // Unix timestamp in milliseconds
    let params = {
      query: {
        bool: {
          filter: isCheck ? {
            bool: {
              should: [
                {
                  terms: {
                    createdBy: [
                      userid
                    ]
                  }
                },
                {
                  terms: {
                    purchaserId: [
                      userid
                    ]
                  }
                }
              ]
            }
          } : null,
          must: [
            {
              terms: {
                buyerId: [
                  global.GLOBAL_BRANCH_ID
                ],
              },
            },
            {
              range: {
                customerETA: {
                  "lte": upcomingDate,
                  "gte": currentDate,
                }
              }
            },
            {
              terms:
              {
                status: ["Partially Shipped", "Shipped", "GE Created", "Asn Created"]
              }
            }

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
      sort: {
        creationDate: {
          order: "desc"
        }
      },
      aggs: {
        statuses: {
          terms: {
            field: "status",
            size: 30
          },
          aggs: {
            statusWiseSum: {
              nested: {
                path: "amount"
              },
              aggs: {
                total: {
                  sum: {
                    field: "amount.amountWithTax"
                  }
                }
              }
            }
          }
        }
      }
    }
    return params
  };

  static upComingDataWithFilter(isCheck, userid, starDate = '', endDate = '', startDate1) {
    console.log('====================================');
    console.log("Ookkk====>");
    console.log('====================================');
    const upcomingDate = new Date(new Date().setDate(new Date().getDate() + 50)).getTime()
    const currentDate = new Date(new Date().setDate(new Date().getDate())).getTime(); // Unix timestamp in milliseconds
    if (isCheck) {
      let params = {
        query: {
          bool: {
            filter: {
              bool: {
                should: [
                  {
                    terms: {
                      createdBy: [
                        userid
                      ]
                    }
                  },
                  {
                    terms: {
                      purchaserId: [
                        userid
                      ]
                    }
                  }
                ]
              }
            },
            must: [
              {
                terms: {
                  buyerId: [
                    String(global.GLOBAL_BRANCH_ID)

                  ],
                },
              },
              {
                range: {
                  customerETA: {
                    "lte": upcomingDate,
                    "gte": currentDate,
                  }
                }
              },
              {
                terms:
                {
                  status: ["Partially Shipped", "Shipped"]
                }
              }

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
        sort: {
          creationDate: {
            order: "desc"
          }
        },
        aggs: {
          statuses: {
            terms: {
              field: "status",
              size: 30
            },
            aggs: {
              statusWiseSum: {
                nested: {
                  path: "amount"
                },
                aggs: {
                  total: {
                    sum: {
                      field: "amount.amountWithTax"
                    }
                  }
                }
              }
            }
          }
        }
      }
      return params
    }
    else {
      let params = {
        query: {
          bool: {
            must: [
              {
                terms: {
                  buyerId: [
                    global.GLOBAL_BRANCH_ID
                  ],
                },
              },
              {
                range: {
                  creationDate: {
                    "gt": startDate1,//1642012199757 ,//starDate,
                    "lte": endDate,// 1642577051757 //endDate
                  }
                }
              },
              {
                range: {
                  customerETA: {
                    "lte": upcomingDate,
                    "gte": currentDate,
                  }
                }
              },
              {
                terms:
                {
                  status: ["Partially Shipped", "Shipped"]
                }
              }

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
        sort: {
          creationDate: {
            order: "desc"
          }
        },
        aggs: {
          statuses: {
            terms: {
              field: "status",
              size: 30
            },
            aggs: {
              statusWiseSum: {
                nested: {
                  path: "amount"
                },
                aggs: {
                  total: {
                    sum: {
                      field: "amount.amountWithTax"
                    }
                  }
                }
              }
            }
          }
        }
      }
      return params
    }
  };

  static subStatusFilterQuery(isCheck, userid, startTime, endTime = '', label) {

    let subStatusFilter = () => {
      if ([...label].includes('ALL')) {
        return [...label].filter(_ => _ != "ALL" && _ != "Other")
      }
      else {
        return [...label]
      }
    }
    let params = {
      query: {
        bool: {
          filter: isCheck ? {
            bool: {
              should: [
                {
                  terms: {
                    createdBy: [
                      userid
                    ]
                  }
                },
                {
                  terms: {
                    purchaserId: [
                      userid
                    ]
                  }
                }
              ]
            }
          } : null,
          must: [
            {
              terms: {
                buyerId: [
                  global.GLOBAL_BRANCH_ID
                ]
              }
            },
            startTime ? {
              range: {
                creationDate: {
                  "gt": startTime,
                  "lte": endTime,
                }
              }
            } : {
              range: {
                creationDate: {
                  "gt": 1617215400000
                }
              }
            },
            {
              term: {
                status: "Processing"
              }
            },
            {
              bool: {
                should: [
                  ...(!(label.length == 1 && label.includes("Other")) &&
                    [{
                      terms: {
                        "subStatus.keyword": subStatusFilter()  //.keyword
                      }
                    }] || []),
                  ...(label.length && label.includes("Other") &&
                    [{
                      bool: {
                        must_not: [
                          {
                            exists: {
                              field: "subStatus"
                            }
                          }
                        ]
                      }
                    }] || [])
                ]
              }
            }
          ],
          must_not: [
            {
              terms: {
                status: [
                  "PR Created",
                  "Revised",
                  "Cancelled",
                  "Closed"
                ]
              }
            }
          ]
        }
      },
      sort: {
        creationDate: {
          order: "desc"
        }
      },
      aggs: {
        statuses: {
          terms: {
            field: "status",
            size: 30
          },
          aggs: {
            statusWiseSum: {
              nested: {
                path: "amount"
              },
              aggs: {
                total: {
                  sum: {
                    field: "amount.amountWithTax"
                  }
                }
              }
            }
          }
        },
        subStatuses: {
          terms: {
            field: "subStatus.keyword",  // .keyword removed for QA
            size: 30
          },
          aggs: {
            subStatusWiseSum: {
              nested: {
                path: "amount"
              },
              aggs: {
                total: {
                  sum: {
                    field: "amount.amountWithTax"
                  }
                }
              }
            }
          }
        }
      }

    }
    return params
  };
}