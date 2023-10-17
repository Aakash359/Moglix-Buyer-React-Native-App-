var year = new Date().getFullYear();

export const ERROR_MESSAGES = {
  EMPTY_EMAIL_MESSAGE: "Email field cannot be empty",
  EMPTY_EMAIL_TITLE: "Invalid Email",
  EMPTY_PASSWORD_MESSAGE: "Password field cannot be empty.",
  EMPTY_CONFIRM_PASSWORD_MESSAGE: "Confirm Password field cannot be empty.",
  PROFILE_PASSWORD_CONFIRMATION_PASSWORD_MISMATCH_MESSAGE:
    "Password and confirm password should be same.",

  PROFILE_EMPTY_PASSWORD_MESSAGE: "Please provide valid password",
  PROFILE_WRONG_CURRENT_PASSWORD_MESSAGE:
    "Please provide correct current password.",
  PROFILE_PASSWORD_NEW_PASSWORD_SAME_MESSAGE:
    "Current password and new password should not be same.",
  EMPTY_PHONE_TITLE: "Invalid Phone",
  EMPTY_PHONE_MESSAGE: "Phone field cannot be empty.",
  EMPTY_PASSWORD_TITLE: "Invalid Password",
  INVALID_EMAIL_TITLE: "Invalid Email",
  INVALID_EMAIL_MESSAGE: "Please enter a valid Email ID and proceed.",
  INAVLID_PASSWORD_TITLE: "Invalid Password",
  INVALID_PASSWORD_MESSAGE:
    "Password is not in accordance to supported format.",
  INVALID_EMIRATES_MESSAGE: "Please provide valid Emirates ID Number.",
  INVALID_PASSPORT_NUMBER_MESSAGE: "Please provide valid Passport Number.",
  INVALID_PASSPORT_EXPIRY_MESSAGE: "Please provide valid Expiry date.",
  NETWORK_ERROR: "Please connect to internet",
  INFORMATION_TITLE: "Information",
  VALID_PHONE_MESSAGE: "Please provide valid phone number.",
  PROFILE_PASSWORD_INVALID_MESSAGE: "Password should have 8-15 characters.",
  COPY_WRITE_TEXT: "©" + year + "Moglix. All Rights Reserved.",
};
export const PLACE_HOLDER_TEXT = {};

export const API_URLS = {
  GET_DASHBOARD_ACCESS: "/login/user/getBranchAccess",
  SEND_OTP_URL: "/login/auth/sendAndVerifyOtp",
  SEND_TOKEN_URL: "/login/pushToken/create",
  LOGIN_USER_URL: "/login/auth/login",
  LOGIN_GOOGLE_USER_URL: "/login/auth/loginwithsso",
  PROCUREMENT_SEARCH_URL: "po/es/search?page=1&pageSize=10",
  GET_SESSION_URL: "/login/user/getSession",
  PROCUREMENT_SEARCH_URL2: "po/es/search?page=1&pageSize=",
  FORGOT_PASSWORD_LINK: "/login/auth/forgotPasswordLink",
  RESET_PASSWORD_URL: "/login/auth/resetPassword",
  PROCUREMENT_ITEMS_SEARCH2: "item/es/search/v2?page=1&pageSize=10",
  PROCUREMENT_ITEMS_SEARCH: "item/es/search/v2?page=1&pageSize=",
  PROCUREMENT_ITEMS_SEARCH3: "item/es/search/v2",
  SEND_MAIL_URL: "/login/mail/sendMail",
  GET_OVERALL_SUMMARY_URL: "/report/getOverallsummary",
  LAST_SIX_MONTH_SPENT: "/report/lastSixMonth_spent",
  SPEND_BY_CATEGORY: "/report/spendByCategory",
  SPEND_BY_ALL_CATEGORY: "/report/spendByAllCategory",
  OTIF_VIEW: "/OTIFView/periodic_performance_view",
  TOP_ITEM_COUNT: "/report/top_itemCount",
  TOP_PLANT_COUNT: "/report/getTopPlants",
  DOWNLOAD_OTIF: "/download/otif/report",
  DOWNLOAD_LAST_SIX_MONTH: "/download/lastsixmonthspent/report",
  DOWNLOAD_SPEND_BY_CATEGORY: "/download/spendbycategory/report",
  DOWNLOAD_TOP_PLANTS: "/download/topplants/report",
  DOWNLOAD_ITEM_SHEET: "/po/file/downloadItemSheet/excel",
  USER_FILTER: "/login/dataAccess/getUserDataAccessByCompany",
  COMPANY_GET: "/login/company/get",
  INVOICE_DETAILS: '/item/invoice/search',
  INVOICE_TRACK_DETAILS: 'api/order/History?'
};

export const ASYNC_KEYS = {
  OTP: "false",
  TOKEN: "TOKEN",
  USER_ID: "user_id",
  USER_EMAIL: "userEmail",
  USER_PROFILE: "user_profile",
  USER_SESSION: "moglix_session",
  REMEMBER_ME: "remember_me",
  REMEMBER_PASSWORD: "remember_password",
  REMEMBER_EMAIL: "remember_email",
  SEARCHED_HISTORY: "search_history",
  FILTER_DATA: "filter_data",
  CHECKED_DATA: "checked_data",
  SESSION_DATA: "session_data",
  DASHBAORD_FILTER_DATA: "dashboard_filter_data",
  PARTILUCAR_USER_FILTER: "particular_user_filter",
};

export const CUSTOM_FONT = {
  ROBOTO_REGULAR: "RobotoSlab-Regular",
  ROBOTO_MEDIUM: "RobotoSlab-Medium",
  ROBOTO_BOLD: "RobotoSlab-Bold",
  HEEBO_REGULAR: "Heebo-Regular",
  HEEBO_MEDIUM: "Heebo-Medium",
  HEEBO_BOLD: "Heebo-Bold",
};
