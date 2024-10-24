import React, { useEffect, useRef, useState } from "react";
import Table from "react-bootstrap/Table";
import "./Membership.css";
import ModuleLayout from "../../../layout/ModuleLayout";
import {
  CheckCalendarIcon,
  CheckCircleIcon,
  CheckFeaturesIcon,
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
import { Card, Col, Row, Spinner } from "react-bootstrap";
import { userGetProfile } from "../MyAccount/apis/UserProfileAPIs";
import { setUser } from "../../../features/userSlice";
import { setTransactions } from "../../../features/transactionSlice";
import HeaderContent from "../../../components/HeaderContent";
import Skeleton from "react-loading-skeleton";

const MembershipCard = ({
  price,
  dayAccess,
  planId,
  subdomain,
  userId,
  features,
}) => {
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
      className="rounded-xl bg-white p-0 shadow"
      style={{
        border: "1px solid #EAECF0",
        boxShadow: "0px 2.56px 3.85px -1.28px #10182808",
        width: "246px",
        height: "auto",
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
          {dayAccess} Access
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
            {features?.map((fet, index) => {
              return (
                <>
                  <span key={index}>
                    <CheckCircleIcon />
                  </span>{" "}
                  {fet}
                </>
              );
            })}
          </p>
        </div>

        <div className="mt-3 text-center">
          <button
            onClick={addPlan}
            className="view-button text-center font-medium text-14 text-color-primary rounded py-1"
            style={{
              border: "1px solid #00008B",
              boxShadow: "0px 4px 4px 0px #ACD4FF0A",
              width: "100%",
            }}
          >
            {!loading ? "Upgrade Now" : <Spinner size="sm" />}
          </button>
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
    if (user?.subdomain) {
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
      const response = await membershipPlans(user?.subdomain);
      dispatch(setPlans(response?.subDomain));
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
    <>
      <HeaderContent content={"Membership"} />
      <ModuleLayout>
        <Row>
          <Col lg={5}>
            <Table
              responsive
              bordered
              className="custom-table shadow"
              style={{ borderRadius: "20px", overflow: "hidden" }}
            >
              <tbody>
                <tr className="h-25">
                  <th
                    style={{ backgroundColor: "#EEF4FF" }}
                    scope="row"
                    className="text-center table-header"
                  >
                    <div className="p-3">Plan</div>
                  </th>
                  {transactionLoading ? (
                    <td className="text-center p-3">
                      <Skeleton width={"100%"} height={"20px"} />
                    </td>
                  ) : (
                    transactions?.transactions?.map((data, index) => (
                      <td key={index} className="text-center p-4">
                        <button
                          className="text-14 font-bold bg-color-light border-0 rounded px-2 py-1"
                          style={{ backgroundColor: "#FFECAA" }}
                        >
                          Basic Plan
                        </button>
                      </td>
                    ))
                  )}
                </tr>
                <tr className="h-25">
                  <th
                    style={{ backgroundColor: "#EEF4FF" }}
                    scope="row"
                    className="text-center"
                  >
                    <div className="p-3">Validity</div>
                  </th>
                  {transactionLoading ? (
                    <td className="text-center p-4">
                      <Skeleton width={"100%"} height={"20px"} />
                    </td>
                  ) : (
                    transactions?.transactions?.map((data, index) => (
                      <td key={index} className="text-center p-3">
                        <span className="text-14 font-bold">
                          {data?.validity} days
                        </span>
                      </td>
                    ))
                  )}
                </tr>
                <tr>
                  <th
                    style={{ backgroundColor: "#EEF4FF" }}
                    scope="row"
                    className="text-center"
                  >
                    <div className="p-3">Amount</div>
                  </th>
                  {transactionLoading ? (
                    <td className="text-center p-3">
                      <Skeleton width={"100%"} height={"20px"} />
                    </td>
                  ) : (
                    transactions?.transactions?.map((data, index) => (
                      <td key={index} className="text-center p-4">
                        <span className="text-14 font-bold text-color-secondary">
                          £ {data?.amount}
                        </span>
                      </td>
                    ))
                  )}
                </tr>
                <tr>
                  <th
                    style={{ backgroundColor: "#EEF4FF" }}
                    scope="row"
                    className="text-center"
                  >
                    <div className="p-3">Payment ID</div>
                  </th>
                  {transactionLoading ? (
                    <td className="text-center p-4">
                      <Skeleton width={"100%"} height={"20px"} />
                    </td>
                  ) : (
                    transactions?.transactions?.map((data, index) => (
                      <td key={index} className="text-center p-3">
                        <div className="" style={{ color: "#565656" }}>
                          {data?.payment_id.slice(0, 20)}
                        </div>
                      </td>
                    ))
                  )}
                </tr>
                <tr>
                  <th
                    style={{ backgroundColor: "#EEF4FF" }}
                    scope="row"
                    className="text-center"
                  >
                    <div className="p-3">Payment Date</div>
                  </th>
                  {transactionLoading ? (
                    <td className="text-center p-3">
                      <Skeleton width={"100%"} height={"20px"} />
                    </td>
                  ) : (
                    transactions?.transactions?.map((data, index) => (
                      <td key={index} className="text-center p-4">
                        <div className="text-12 font-bold text-center rounded">
                          {formatDate(data?.createdAt)}
                        </div>
                      </td>
                    ))
                  )}
                </tr>
                <tr>
                  <th
                    style={{ backgroundColor: "#EEF4FF" }}
                    scope="row"
                    className="text-center"
                  >
                    <div className="p-3">Invoice</div>
                  </th>
                  {transactionLoading ? (
                    <td className="text-center p-3">
                      <Skeleton width={"100%"} height={"20px"} />
                    </td>
                  ) : (
                    transactions?.transactions?.map((data, index) => (
                      <td key={index} className="text-center p-4">
                        <div className="text-center">
                          <a
                            className="view-button text-decoration-none text-center font-medium text-14 text-color-primary rounded px-3 py-1"
                            style={{
                              border: "1px solid #00008B",
                              boxShadow: "0px 4px 4px 0px #ACD4FF0A",
                            }}
                            href={`https://creative-story.s3.amazonaws.com${data?.invoice_url}`}
                          >
                            View
                          </a>
                        </div>
                      </td>
                    ))
                  )}
                </tr>
              </tbody>
            </Table>
          </Col>

          <Col>
            <Card style={{ height: "440px" }} className="rounded-xl shadow">
              <Card.Body className="p-0">
                <h3 className="text-18 text-center font-bold mt-3">
                  Active Plan
                </h3>

                <div
                  className="mt-3 py-3 px-4 d-flex justify-content-between align-items-center"
                  style={{
                    backgroundColor: "#DAE4FF",
                  }}
                >
                  <div className="d-flex gap-2 align-items-center ">
                    <div className="text-20 font-bold">My Subscription</div>
                    <div
                      className="py-0 px-2"
                      style={{
                        backgroundColor: "#FEFBE8",
                        borderRadius: "20px",
                      }}
                    >
                      Monthly
                    </div>
                  </div>
                  <div className="text-24 font-bold text-primary">
                    £{" "}
                    {transactions?.subscription &&
                      transactions?.subscription.amount}{" "}
                    / Month
                  </div>
                </div>

                <div className="px-4 mt-3">
                  <div
                    className="font-normal rounded-md p-2"
                    style={{
                      width: "53%",
                      backgroundColor: "#FF16160A",
                      color: "#C00000",
                    }}
                  >
                    Plan Expiring On :{" "}
                    {transactions?.subscription &&
                      transactions?.subscription?.expiry
                        ?.split("T")[0]
                        ?.split("-")
                        ?.reverse()
                        ?.join("-")}
                  </div>
                </div>

                <h4
                  className="text-18 text-center mt-3"
                  style={{ color: "#6172F3" }}
                >
                  Why Upgrade ?
                </h4>

                <div className="d-flex align-items-center gap-4 mt-4 mb-1 px-4">
                  <Card className="rounded-xl">
                    <Card.Body>
                      <div className="border-1 text-center">
                        <CheckCalendarIcon />
                        <div className="text-14 font-normal mt-2">
                          Unlock All Features
                        </div>
                        <div className="text-12 font-normal mt-1">
                          Gain access to a comprehensive set of features
                          designed to maximize your learning potential.
                        </div>
                      </div>
                    </Card.Body>
                  </Card>

                  <Card className="rounded-xl">
                    <Card.Body>
                      <div className="border-1 text-center">
                        <CheckFeaturesIcon />
                        <div className="text-14 font-normal mt-2">
                          Timeline will extend
                        </div>
                        <div className="text-12 font-normal mt-1">
                          Enjoy tailored recommendations and insights based on
                          your performance and preferences.
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <div className="membership-card-container">
          {!planLoader ? (
            plans?.length > 0 ? (
              plans?.map((data) => {
                return (
                  <MembershipCard
                    key={data._id}
                    price={`${data.price}`}
                    dayAccess={data.validity}
                    planId={data._id}
                    subdomain={user.subdomain}
                    userId={user._id}
                    features={data?.features}
                  />
                );
              })
            ) : (
              ""
            )
          ) : (
            <div className="d-flex gap-3 align-items-center justify-content-between ">
              {[1, 2, 3].map((_, i) => (
                <Skeleton
                  key={i}
                  className="rounded-4"
                  width={"270px"}
                  height={"350px"}
                />
              ))}
            </div>
          )}
        </div>
        <ToastContainer />
      </ModuleLayout>
    </>
  );
};

export default Membership;
