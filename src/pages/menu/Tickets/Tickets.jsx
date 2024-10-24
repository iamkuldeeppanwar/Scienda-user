import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import "./Tickets.css";
import ModuleLayout from "../../../layout/ModuleLayout";
import {
  InProgressIcon,
  IssueResolvedIcon,
  PaperClipIcon,
  RightArrowOutlinedIcon,
  UnResolvedIcon,
} from "./components/tickets-icons";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { getError } from "../../../Utils/error";
import {
  createTickets,
  getAllSubAdmin,
  getSubTopics,
  getTickets,
} from "./apis/TicketApi";
import { setTopics } from "../../../features/subTopic";
import { setTickets } from "../../../features/ticketSlice";
import { Spinner } from "react-bootstrap";
import { setSubAdmins } from "../../../features/subAdminSlice";
import HeaderContent from "../../../components/HeaderContent";
import Skeleton from "react-loading-skeleton";

const Tickets = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const { user } = useSelector((state) => state.user);
  const { topics } = useSelector((state) => state.topics);
  const { subAdmins } = useSelector((state) => state.subAdmin);
  const { tickets } = useSelector((state) => state.tickets);
  const [loading, setLoading] = useState(false);
  const [ticketLoader, setTicketLoader] = useState(false);
  const [prof, setProf] = useState("");
  const [topicName, setTopicName] = useState("");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    getAllTickets();
    subTopics();
    subAdmin();
  }, [dispatch, token]);

  useEffect(() => {
    if (subAdmins.length > 0) {
      setProf(subAdmins[0]?.first_name + " " + subAdmins[0]?.last_name);
    }
  }, [subAdmins]);

  const subAdmin = async () => {
    try {
      const response = await getAllSubAdmin();
      dispatch(setSubAdmins(response));
    } catch (error) {
      toast.error(getError(error));
    }
  };

  const subTopics = async () => {
    try {
      const response = await getSubTopics(user.subdomain);
      dispatch(setTopics(response));
    } catch (error) {
      toast.error(getError(error));
    }
  };

  const getAllTickets = async () => {
    try {
      setTicketLoader(true);
      const response = await getTickets(token);
      dispatch(setTickets(response));
      setTicketLoader(false);
    } catch (error) {
      toast.error(getError(error));
      setTicketLoader(false);
    }
  };

  const createTicketHandler = async (e) => {
    e.preventDefault();

    const createTicket = {
      to: subAdmins[0]?._id,
      subject: subject,
      description: description,
      topic: !topicName ? topics[0]?._id : topicName,
    };

    try {
      setLoading(true);
      const data = await createTickets(createTicket, token);
      setLoading(false);
      getAllTickets();
      toast.success(data?.message);
    } catch (error) {
      toast.error(getError(error));
      setLoading(false);
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
      <HeaderContent content={"My Tickets"} />
      <ModuleLayout className="px-4" style={{ padding: 0 }}>
        <div className="px-1">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <div className="font-bold text-16">My Tickets</div>
            </div>
            <Link style={{ textDecoration: "none" }} to="view-all">
              <div
                style={{
                  color: "#00009b",
                  fontWeight: 500,
                  fontSize: "16px",
                  cursor: "pointer",
                }}
              >
                View All{" "}
                <span>
                  <RightArrowOutlinedIcon />
                </span>
              </div>
            </Link>
          </div>
          <hr />

          {!ticketLoader ? (
            <div
              className={`${
                tickets.length === 4
                  ? "d-flex flex-wrap justify-content-between"
                  : "d-flex flex-wrap gap-2"
              }`}
            >
              {tickets.length > 0 &&
                tickets.slice(0, 4)?.map((data) => {
                  return (
                    <div
                      key={data?._id}
                      className="px-3 border-1 rounded-xl bg-white d-flex flex-column justify-content-between shadow"
                      style={{
                        width: "285px",
                        // height: "151px",
                        cursor: "pointer",
                      }}
                      onClick={() =>
                        navigate(`/menu/tickets/chat/${data?._id}`)
                      }
                    >
                      <div className="text-center text-16 font-medium">
                        {data?.topic?.topic_name}
                      </div>
                      <hr />
                      <div className="d-flex align-items-center justify-content-between py-1">
                        <div className="text-14 font-medium">Subject</div>
                        <div
                          className="text-14 font-medium w-25 text-truncate"
                          style={{ color: "#475467" }}
                        >
                          {data?.subject}
                        </div>
                      </div>

                      <div className="d-flex align-items-center justify-content-between py-1">
                        <div className="text-14 font-medium">Created At</div>
                        <div
                          className="text-14 font-medium"
                          style={{ color: "#475467" }}
                        >
                          {data?.createdAt
                            .split("T")[0]
                            .split("-")
                            .reverse()
                            .join("-")}
                        </div>
                      </div>

                      <div className="d-flex align-items-center justify-content-between py-1">
                        <div className="text-14 font-medium">Status</div>
                        <div>
                          {data?.status === "Pending" && (
                            <div className="d-flex justify-content-end align-items-center gap-1">
                              <span className="text-14 font-medium text-color-secondary">
                                {data?.status}
                              </span>
                              <span className="">
                                <InProgressIcon />{" "}
                              </span>
                            </div>
                          )}

                          {data?.status === "Closed" && (
                            <div className="d-flex justify-content-end align-items-center gap-1">
                              <span className="text-14 font-medium text-color-secondary">
                                {data?.status}
                              </span>
                              <span className="">
                                <IssueResolvedIcon />{" "}
                              </span>
                            </div>
                          )}

                          {data?.status === "Open" && (
                            <div className="d-flex justify-content-end align-items-center gap-1">
                              <span className="text-14 font-medium text-color-secondary">
                                {data?.status}
                              </span>
                              <span className="">
                                <UnResolvedIcon />{" "}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      <p
                        className="w-85 mx-auto text-center text-14 font-medium text-truncate"
                        style={{ color: "#525252" }}
                      >
                        {data?.description}
                      </p>
                    </div>
                  );
                })}
            </div>
          ) : (
            <div className={`p-2 d-flex justify-conten-center gap-5 flex-wrap`}>
              {[1, 2, 3, 4].map((_, i) => (
                <Skeleton
                  className="rounded-4"
                  height={"250px"}
                  width={"250px"}
                />
              ))}
            </div>
          )}

          <Form
            className="create-ticket-container mt-4 border-1"
            onSubmit={createTicketHandler}
          >
            <div>
              <p className="font-bold text-16">Create New Ticket</p>
            </div>
            <hr />

            <div className="ticket-form shadow">
              <Form.Group>
                <Form.Label className="text-16 font-medium">To</Form.Label>
                <Form.Control
                  disabled
                  type="text"
                  className="text-12 font-medium py-2 px-3 input-border"
                  value={
                    subAdmins[0]?.first_name + " " + subAdmins[0]?.last_name
                  }
                  placeholder="Enter subject"
                  required
                />
              </Form.Group>

              <Form.Group className="mt-1">
                <Form.Label className="text-16 font-medium">Topics</Form.Label>
                <Form.Select
                  onChange={(e) => setTopicName(e.target.value)}
                  className="text-12 font-medium py-2 px-3 input-border"
                  required
                  aria-label="Default select example"
                >
                  <option disabled>Select topic</option>
                  {topics.length > 0 &&
                    topics?.map((topic) => {
                      return (
                        <option value={topic?._id} key={topic?._id}>
                          {topic?.topic_name}
                        </option>
                      );
                    })}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mt-1 ">
                <Form.Label className="text-16 font-medium">Subject</Form.Label>
                <Form.Control
                  type="text"
                  className="text-12 font-medium py-2 px-3 input-border"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Enter subject"
                  required
                />
              </Form.Group>

              <Form.Group className="mt-1">
                <Form.Label className="text-16 font-medium">
                  Describe your issue
                </Form.Label>
                <Form.Control
                  as="textarea"
                  placeholder="Describe in detail, please..."
                  className="text-12 font-medium py-2 px-3 input-border"
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={7}
                />
              </Form.Group>

              <div className="mt-3">
                <button
                  className="view-button text-center font-medium text-14 text-color-primary rounded py-2"
                  style={{
                    border: "1px solid #00008B",
                    boxShadow: "0px 4px 4px 0px #ACD4FF0A",
                    width: "8.5rem",
                  }}
                >
                  {!loading ? "+ Create Ticket" : <Spinner size="sm" />}
                </button>
              </div>
            </div>
          </Form>
        </div>
        <ToastContainer />
      </ModuleLayout>
    </>
  );
};

export default Tickets;
