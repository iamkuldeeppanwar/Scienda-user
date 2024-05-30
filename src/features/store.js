import { configureStore } from "@reduxjs/toolkit";
import generalReducer from "./generalSlice";
import authSlice from "./authSlice";
import userSlice from "./userSlice";
import transactionSlice from "./transactionSlice";
import planSlice from "./planSlice";
import getURLSlice from "./getURLSlice";
import querySlice from "./querySlice";
import pageSlice from "./pageSlice";
import homeSlice from "./homeSlice";
import faqSlice from "./faqSlice";
import carouselSlice from "./carouselSlice";
import subTopic from "./subTopic";
import ticketSlice from "./ticketSlice";
import subAdminSlice from "./subAdminSlice";

export default configureStore({
  reducer: {
    general: generalReducer,
    auth: authSlice,
    user: userSlice,
    topics: subTopic,
    tickets: ticketSlice,
    subAdmin: subAdminSlice,
    transaction: transactionSlice,
    plan: planSlice,
    url: getURLSlice,
    query: querySlice,
    page: pageSlice,
    home: homeSlice,
    faq: faqSlice,
    carousel: carouselSlice,
  },
});
