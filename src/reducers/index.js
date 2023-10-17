import user from './user'
import home from './home'
import OrderListReducer from './OrderListReducer'
import SearchOrder from './SearchOrder'
import OrderListDetailReducer from './OrderListDetailReducer'
import forgotpassword from './forgotpassword'
import InvoiceDetailListReducer from './InvoiceDetailListReducer'


export default {
    ...user,
    ...home,
    ...OrderListReducer,
    ...SearchOrder,
    ...OrderListDetailReducer,
    ...forgotpassword,
    ...InvoiceDetailListReducer
}
