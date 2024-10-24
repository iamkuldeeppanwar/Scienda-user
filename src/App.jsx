import { Route, Routes } from "react-router-dom";
import React, { Suspense, lazy, useEffect, useState } from "react";
import "./styles/App.css";
// import MenuLayout from "./layout/MenuLayout";
const MenuLayout = lazy(() => import("./layout/MenuLayout"));
import { Dashboard } from "./pages/menu/Dashboard";
import { Tests, TakeTest, CheckAnswer } from "./pages/menu/Tests";
import {
  Recharge,
  RechargeCheckAnswer,
  RechargeTakeTest,
} from "./pages/menu/Recharge";
import {
  ExamProficiencyPercentage,
  ProficiencyPercentage,
} from "./pages/menu/ProficiencyPercentage";
import {
  SpecialityModules,
  ViewSpecialitySummary,
  TopicDetail,
  ModuleTakeTest,
} from "./pages/menu/SpecialityModules";
import { Reports } from "./pages/menu/Reports";
import { Membership } from "./pages/menu/Membership";
import { MyAccount } from "./pages/menu/MyAccount";
import {
  FirstTimeTicketChat,
  TicketChat,
  Tickets,
  ViewTickets,
} from "./pages/menu/Tickets";
import Registration from "./pages/UserAuthentication/Registration";
import Login from "./pages/UserAuthentication/Login";
import OTPComponent from "./pages/UserAuthentication/OTP";
import ForgetPassword from "./pages/UserAuthentication/FogetPassword";
import { ResetPassword } from "./pages/UserAuthentication/ResetPassword";
import PaymentFailed from "./pages/menu/Membership/PaymentFailed";

function App() {
  const [isRestricted, setIsRestricted] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsRestricted(window.innerWidth <= 1024);
    };

    handleResize(); // Check on initial load
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (isRestricted) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          color: "white",
        }}
      >
        This application is not available on mobile or tablet devices. Please
        use a desktop browser.
      </div>
    );
  }

  return (
    <Suspense fallback={<div>Redirecting...</div>}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/user-signup" element={<Registration />} />
        <Route path="/user-otp" element={<OTPComponent />} />
        <Route path="/user-forget-password" element={<ForgetPassword />} />
        <Route path="/user-reset-password" element={<ResetPassword />} />

        <Route path="/menu" element={<MenuLayout />}>
          <Route path="" element={<Dashboard />} />
          <Route path="tests">
            <Route path="" element={<Tests />} />
            <Route path="take-test/:testID" element={<TakeTest />} />
            <Route path="check-answers/:testID" element={<CheckAnswer />} />
          </Route>
          <Route path="recharge">
            <Route path="" element={<Recharge />} />
            <Route path="take-test/:testID" element={<RechargeTakeTest />} />
            <Route
              path="check-answers/:testID"
              element={<RechargeCheckAnswer />}
            />
          </Route>
          <Route path="proficiency-percentage">
            <Route path="" element={<ProficiencyPercentage />} />
            <Route path=":examId" element={<ExamProficiencyPercentage />} />
          </Route>
          <Route path="speciality-modules">
            <Route path="" element={<SpecialityModules />} />
            <Route path="view-summary" element={<ViewSpecialitySummary />} />
            <Route path="topic-detail/:topicID">
              <Route path="" element={<TopicDetail />} />
              <Route path="take-test" element={<ModuleTakeTest />} />
            </Route>
          </Route>
          <Route path="reports" element={<Reports />} />
          <Route path="membership" element={<Membership />} />
          <Route path="payment-failed" element={<PaymentFailed />} />
          <Route path="my-account" element={<MyAccount />} />
          <Route path="tickets">
            <Route path="" element={<Tickets />} />
            <Route path="view-all" element={<ViewTickets />} />
            <Route path="chat/:ticketId" element={<TicketChat />} />
            <Route path="chat/new" element={<FirstTimeTicketChat />} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
