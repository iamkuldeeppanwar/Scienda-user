import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Stack from "react-bootstrap/Stack";
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
  const [ticketImage, setTicketImage] = useState("");

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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type.startsWith("image/")) {
        setTicketImage(file);
      } else {
        toast.error("Please select a valid image file.");
        e.target.value = null;
        return;
      }
    }

    if (e.target.files.length > 1) {
      toast.error("Please select only one file.");
      e.target.value = null;
    }
  };

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
      image: ticketImage,
    };

    try {
      setLoading(true);
      await createTickets(createTicket, token);
      setLoading(false);
      getAllTickets();
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
    <ModuleLayout>
      <ToastContainer />
      <div className="px-3 py-3">
        <h3 style={{ color: "#8098F9", fontSize: "26px", fontWeight: 600 }}>
          Manage Tickets
        </h3>

        <div className="d-flex justify-content-between align-items-center my-2">
          {tickets.length > 0 && (
            <p style={{ fontWeight: 700, fontSize: "18px" }}>My Tickets</p>
          )}

          <Link to="view-all">
            <p
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
            </p>
          </Link>
        </div>

        {!ticketLoader ? (
          <div className="d-flex justify-content-between flex-wrap gap-2">
            {tickets.length > 0 &&
              tickets.slice(0, 4)?.map((data) => {
                return (
                  <div
                    key={data?._id}
                    className="px-2 pt-2 rounded-xl bg-white d-flex flex-column justify-content-between shadow"
                    style={{
                      border: "1px solid #EFEFEF",
                      boxShadow: "0px 4px 12px 0px #0000000A",
                      width: "273px",
                      height: "151px",
                      cursor: "pointer",
                    }}
                    onClick={() => navigate(`/menu/tickets/chat/${data?._id}`)}
                  >
                    <p
                      className="text-center text-12 font-medium"
                      style={{ color: "#475467" }}
                    >
                      {formatDate(data?.createdAt.split("T")[0])}
                    </p>
                    <p
                      className="w-85 mx-auto text-center text-14 font-medium text-truncate"
                      style={{ color: "#525252" }}
                    >
                      {data?.description}
                    </p>
                    {data?.status === "Pending" && (
                      <div className="mb-1 d-flex justify-content-end align-items-center gap-1">
                        <span className="text-12 font-medium text-color-secondary">
                          {data?.status}
                        </span>
                        <span className="">
                          <InProgressIcon />{" "}
                        </span>
                      </div>
                    )}

                    {data?.status === "Closed" && (
                      <div className="mb-1 d-flex justify-content-end align-items-center gap-1">
                        <span className="text-12 font-normal text-color-secondary">
                          {data?.status}
                        </span>
                        <span className="">
                          <IssueResolvedIcon />{" "}
                        </span>
                      </div>
                    )}

                    {data?.status === "Open" && (
                      <div className="mb-1 d-flex justify-content-end align-items-center gap-1">
                        <span className="text-12 font-normal text-color-secondary">
                          {data?.status}
                        </span>
                        <span className="">
                          <UnResolvedIcon />{" "}
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
        ) : (
          <div className="text-center">
            <Spinner size="sm" />
          </div>
        )}

        <Form
          className="create-ticket-container mt-4"
          onSubmit={createTicketHandler}
        >
          <div className="info">
            <p style={{ fontWeight: 700, fontSize: "18px" }}>
              Create New Ticket
            </p>
            <p style={{ fontWeight: 600, fontSize: "16px" }}>
              Do you want to provide a difficult question from the real exam? We
              will answer you...
            </p>
          </div>

          <div className="ticket-form shadow">
            <Form.Group>
              <Form.Label className="text-16 font-medium">To</Form.Label>
              <Form.Control
                disabled
                type="text"
                className="text-12 font-medium py-2 px-3"
                value={subAdmins[0]?.first_name + " " + subAdmins[0]?.last_name}
                placeholder="Enter subject"
                required
              />
            </Form.Group>

            <Form.Group className="mt-1">
              <Form.Label className="text-16 font-medium">Topics</Form.Label>
              <Form.Select
                onChange={(e) => setTopicName(e.target.value)}
                className="text-12 font-medium py-2 px-3"
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
                className="text-12 font-medium py-2 px-3"
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
                className="text-12 font-medium py-2 px-3"
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={7}
              />
            </Form.Group>

            <div className="d-flex flex-wrap justify-content-between align-items-center mt-2">
              <Stack>
                <p
                  className="m-0 "
                  style={{ fontSize: "12px", fontWeight: 600, width: "9rem" }}
                >
                  Max 6MB each supported types, png, Jpg, Pdf, doc.
                </p>
                <div
                  className="d-flex gap-1 align-items-center mt-1"
                  style={{
                    width: "5.75rem",
                    backgroundColor: "#DDDDDD",
                    borderRadius: "5px",
                    fontSize: "11px",
                    fontWeight: 300,
                    border: "none",
                  }}
                >
                  <span>
                    <PaperClipIcon />
                  </span>
                  <input
                    className="custom-file-input"
                    type="file"
                    onChange={handleFileChange}
                  />
                </div>
              </Stack>
              <button
                className="px-3 py-2"
                style={{
                  border: "none",
                  backgroundColor: "#00008B",
                  color: "white",
                  fontWeight: 500,
                  borderRadius: "5px",
                }}
              >
                {!loading ? "+ Create Ticket" : <Spinner size="sm" />}
              </button>
            </div>
          </div>
        </Form>
      </div>
    </ModuleLayout>
  );
};

export default Tickets;
