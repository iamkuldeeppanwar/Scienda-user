import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";

import "./Membership.css";
import ModuleLayout from "../../../layout/ModuleLayout";
// import { ViewEyeIcon } from "../Reports/components/reports-icons";
import {
  CheckCircleIcon,
  CrownIcon,
  ViewEyeIcon2,
} from "./components/membership-icons";
import { ToastContainer, toast } from "react-toastify";
import { getError } from "../../../Utils/error";
import {
  getTransaction,
  membershipPlans,
  upgradeNow,
} from "./apis/MembershipAPIs";
import { useDispatch, useSelector } from "react-redux";
import { setPlans } from "../../../features/planSlice";
import { Spinner } from "react-bootstrap";
import { userGetProfile } from "../MyAccount/apis/UserProfileAPIs";
import { setUser } from "../../../features/userSlice";
import { setTransactions } from "../../../features/transactionSlice";

const MembershipCard = ({ price, dayAccess, planId, subdomain, userId }) => {
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(false);

  const addPlan = async () => {
    const planData = {
      price,
      plan_type: dayAccess,
      planId,
      subdomain,
      userId,
    };
    try {
      setLoading(true);
      const response = await upgradeNow(planData, token);
      setLoading(false);
      window.location.href = response.url;
    } catch (error) {
      toast.error(getError(error));
      setLoading(false);
    }
  };

  return (
    <div
      className="rounded-xl bg-white p-0"
      style={{
        border: "1px solid #EAECF0",
        boxShadow: "0px 2.56px 3.85px -1.28px #10182808",
        width: "246px",
        height: "342px",
      }}
    >
      <div style={{ height: "114.27px" }} className="px-4 pt-4 pb-2">
        <h3 className="font-semibold text-32 text-color-secondary text-center">
          £{price}
        </h3>
        <p
          style={{ color: "#424242" }}
          className="text-12 font-medium text-center my-0"
        >
          {dayAccess} Days Access
        </p>
      </div>

      <hr className="" />

      <div className="px-3 py-4">
        <h6 className="text-10 font-semibold" style={{ color: "#101828" }}>
          FEATURES
        </h6>

        <div>
          <p
            className="d-flex align-items-center gap-2 my-2 text-12 font-normal"
            style={{ color: "#475467" }}
          >
            <span>
              <CheckCircleIcon />
            </span>{" "}
            Full QBank Access
          </p>
          <p
            className="d-flex align-items-center gap-2 my-2 text-12 font-normal"
            style={{ color: "#475467" }}
          >
            <span>
              <CheckCircleIcon />
            </span>{" "}
            2 -Self Assessments
          </p>
          <p
            className="d-flex align-items-center gap-2 my-2 text-12 font-normal"
            style={{ color: "#475467" }}
          >
            <span>
              <CheckCircleIcon />
            </span>{" "}
            One- Time reset option
          </p>
        </div>

        <div className="text-center mt-4">
          {!loading ? (
            <button
              onClick={addPlan}
              className="w-100 border-0 rounded bg-color-primary py-2 text-white text-10 font-semibold"
            >
              Upgrade Now
            </button>
          ) : (
            <button className="w-100 border-0 rounded bg-color-primary py-2 text-white text-10 font-semibold">
              <Spinner size="sm" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const Membership = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const { user } = useSelector((state) => state.user);
  const { plans } = useSelector((state) => state.plan);
  const { transactions } = useSelector((state) => state.transaction);
  const [planLoader, setPlanLoader] = useState(false);
  const [transactionLoading, setTransactionLoading] = useState(false);

  useEffect(() => {
    getProfile();
    getTransactionPlans();
  }, [dispatch, token]);

  useEffect(() => {
    if (user.subdomain) {
      getUserPlans();
    }
  }, [user, dispatch]);

  const getProfile = async () => {
    try {
      const response = await userGetProfile(token);
      dispatch(setUser(response));
    } catch (error) {
      toast.error(getError(error));
    }
  };

  const getUserPlans = async () => {
    try {
      setPlanLoader(true);
      const response = await membershipPlans(user.subdomain);
      dispatch(setPlans(response.subDomain));
      setPlanLoader(false);
    } catch (error) {
      toast.error(getError(error));
      setPlanLoader(false);
    }
  };

  const getTransactionPlans = async () => {
    try {
      setTransactionLoading(true);
      const response = await getTransaction(token);
      dispatch(setTransactions(response));
      setTransactionLoading(false);
    } catch (error) {
      toast.error(getError(error));
      setTransactionLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short", // "Mon"
      day: "2-digit", // "23"
      month: "short", // "May"
      year: "numeric", // "2024"
    });
  };

  return (
    <ModuleLayout>
      <ToastContainer />
      <Table responsive className="my-4 ">
        <thead className="p-4 mb-4 custom-table-head">
          <tr className="rounded-xl border">
            <th className="text-center border-0">
              <div className="p-3 text-20 font-normal">Plan</div>
            </th>
            <th className="text-center border-0">
              <div className="p-3 text-20 font-normal">Validity</div>
            </th>
            <th className="text-center border-0">
              <div className="p-3 text-20 font-normal">Amount</div>
            </th>
            <th className="text-center border-0">
              <div className="p-3 text-20 font-normal">Payment ID</div>
            </th>
            <th className="text-center border-0">
              <div className="w-60 mx-auto text-20 font-normal">
                Payment Date
              </div>
            </th>
            <th className="text-center border-0">
              <div className="p-3 text-20 font-normal">Invoice</div>
            </th>
          </tr>
        </thead>
        <tbody className="">
          {transactions?.transactions &&
            transactions?.transactions?.map((data) => {
              return (
                <tr key={data?._id} className="border bg-white">
                  <td className="text-center">
                    <div className="p-4">
                      <button
                        className="text-14 font-bold bg-color-light border-0 rounded px-3 py-2"
                        style={{ backgroundColor: "#E0EAFF" }}
                      >
                        Basic Plan
                      </button>
                    </div>
                  </td>
                  <td className="text-center">
                    <div className="p-4">
                      <span className="text-14 font-bold">
                        {data?.validity} days
                      </span>
                    </div>
                  </td>
                  <td className="text-center">
                    <div className="p-4">
                      <span className="text-14 font-bold text-color-secondary">
                        £ {data?.amount}
                      </span>
                    </div>
                  </td>
                  <td className="text-center">
                    <div className="p-4" style={{ color: "#565656" }}>
                      {data?.payment_id.slice(0, 20)}
                    </div>
                  </td>
                  <td className="text-center">
                    <div
                      className="mt-3 text-12 font-bold text-center px-3 py-3 rounded"
                      style={{ backgroundColor: "#DADADA96" }}
                    >
                      {formatDate(data?.createdAt)}
                    </div>
                  </td>
                  <td className="text-center">
                    <div className="p-4">
                      <button className="rounded-lg px-3 py-1 border-color-primary bg-white text-color-primary text-14 font-semibold">
                        <a
                          href={`https://creative-story.s3.amazonaws.com${data?.invoice_url}`}
                        >
                          View <ViewEyeIcon2 />
                        </a>
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>

      <div className="w-90 mx-auto">
        <h5 className="text-16 font-medium">Your Active Plan</h5>
        <div
          className="px-4 py-3 bg-white"
          style={{
            border: "1px solid #EAEAEA",
            boxShadow: "0px 2px 32px 2px #0000000A",
            borderRadius: "10px",
          }}
        >
          <div className="d-flex flex-wrap justify-content-between align-items-center">
            <h6>My Subscription Plan</h6>
            <div
              className="font-normal p-2 rounded-sm"
              style={{
                backgroundColor: "#F3F4F6",
                color: "#101828",
                fontSize: "15px",
              }}
            >
              Plan Expiring On :{" "}
              {formatDate(
                transactions?.subscription && transactions?.subscription.expiry
              )}
            </div>
          </div>
          <hr />
          <div className="d-flex flex-wrap justify-content-between align-items-center">
            <div className="font-normal text-20">
              Active Plan :{" "}
              <span className="text-color-secondary font-bold">
                £{" "}
                {transactions?.subscription &&
                  transactions?.subscription.amount}
              </span>
            </div>
            <div>
              <button className="border-0 bg-color-primary text-white text-14 font-semibold py-2 px-4 rounded-md">
                Renew Plan{" "}
                <span>
                  <CrownIcon />
                </span>{" "}
              </button>
            </div>
          </div>
        </div>
      </div>

      <h3 className="mt-5 text-center text-24 font-bold text-color-primary">
        Upgrade & Continue With Business Plan
      </h3>

      <h5 className="my-4 text-center text-24 font-medium text-color-secondary">
        Why Upgrade?
      </h5>

      <div className="text-center">
        <h6 className="text-16 font-medium">Unlock All Features:</h6>
        <p
          className="text-12 font-normal w-35 mx-auto"
          style={{ color: "#475467" }}
        >
          Gain access to a comprehensive set of features designed to maximize
          your learning potential.
        </p>
      </div>
      <div className="text-center mt-4">
        <h6 className="text-16 font-medium">Timeline Will Extend:</h6>
        <p
          className="text-12 font-normal w-35 mx-auto"
          style={{ color: "#475467" }}
        >
          Enjoy tailored recommendations and insights based on your performance
          and preferences.
        </p>
      </div>

      <div className="membership-card-container">
        {!planLoader ? (
          plans.length > 0 ? (
            plans.map((data) => {
              return (
                <MembershipCard
                  key={data._id}
                  price={`${data.price}`}
                  dayAccess={data.validity}
                  planId={data._id}
                  subdomain={user.subdomain}
                  userId={user._id}
                />
              );
            })
          ) : (
            ""
          )
        ) : (
          <Spinner size="sm" />
        )}
      </div>
    </ModuleLayout>
  );
};

export default Membership;
