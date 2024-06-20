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
// import CreateTicketSuccessModal from "./components/CreateTicketSuccessModal";
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
      to: prof,
      subject: subject,
      description: description,
      topic: topicName,
      image: ticketImage,
    };
    // console.log(createTicket);
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

  // console.log(subAdmins);

  return (
    <ModuleLayout>
      <ToastContainer />
      <div className="px-3 py-3">
        <h3 className="text-36 font-semibold text-color-secondary">
          Manage Tickets
        </h3>

        <div className="d-flex justify-content-between flex-wrap align-items-center my-4">
          <h5 className="text-22 font-medium">My Tickets</h5>
          <Link to="view-all" className="text-decoration-none">
            <p className="m-0 text-16 font-medium text-color-primary d-flex align-items-center gap-2">
              View All{" "}
              <span>
                <RightArrowOutlinedIcon />
              </span>
            </p>
          </Link>
        </div>

        <div className="d-flex justify-content-center flex-wrap gap-2">
          {!ticketLoader ? (
            tickets.length > 0 &&
            tickets.slice(0, 4).map((data) => {
              return (
                <div
                  key={data._id}
                  className="px-2 pt-2 rounded-xl bg-white d-flex flex-column justify-content-between"
                  style={{
                    border: "1px solid #EFEFEF",
                    boxShadow: "0px 4px 12px 0px #0000000A",
                    width: "273px",
                    height: "151px",
                    cursor: "pointer",
                  }}
                  onClick={() => navigate(`/menu/tickets/chat/${data._id}`)}
                >
                  <p
                    className="text-center text-12 font-normal"
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
                      <span className="text-12 font-normal text-color-secondary">
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
            })
          ) : (
            <div className="d-flex justify-content-center">
              <Spinner />
            </div>
          )}
        </div>

        <Form
          className="create-ticket-container mt-4"
          onSubmit={createTicketHandler}
        >
          <div className="info">
            <h4 className="text-22 font-medium">Create New Ticket</h4>
            <p className="text-20 font-light text-black">
              Do you want to provide a difficult question from the real exam? We
              will answer you...
            </p>
          </div>

          <div className="ticket-form">
            <Form.Group className="text-14 font-medium mt-2">
              <Form.Label>To</Form.Label>
              <Form.Control
                disabled
                type="text"
                className="text-12 font-light"
                value={subAdmins[0]?.first_name + " " + subAdmins[0]?.last_name}
                placeholder="Enter subject"
                required
              />
            </Form.Group>

            <Form.Group className="text-14 font-medium mt-2">
              <Form.Label>Topics</Form.Label>
              <Form.Select
                onChange={(e) => setTopicName(e.target.value)}
                className="text-14 font-medium"
                required
                aria-label="Default select example"
              >
                <option disabled>Select topic</option>
                {topics.length > 0 &&
                  topics.map((topic) => {
                    return (
                      <option value={topic._id} key={topic._id}>
                        {topic?.topic_name}
                      </option>
                    );
                  })}
              </Form.Select>
            </Form.Group>

            <Form.Group className="text-14 font-medium mt-2">
              <Form.Label>Subject</Form.Label>
              <Form.Control
                type="text"
                className="text-12 font-light"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Enter subject"
                required
              />
            </Form.Group>

            <Form.Group className="text-14 font-medium mt-2">
              <Form.Label>Describe your issue</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Describe in detail, please..."
                className="text-12 font-light"
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={7}
              />
            </Form.Group>

            <div className="d-flex flex-wrap justify-content-between align-items-center mt-4">
              <Stack>
                <p className="m-0 " style={{ fontSize: "11px", width: "9rem" }}>
                  Max 6MB each supported types, png, Jpg, Pdf, doc.
                </p>
                <div
                  className="d-flex align-items-center"
                  style={{
                    width: "5.75rem",
                    height: "1.5rem",
                    backgroundColor: "#DDDDDD",
                    borderRadius: "5px",
                    fontSize: "11px",
                    fontWeight: 300,
                    border: "none",
                  }}
                >
                  <input type="file" onChange={handleFileChange} />
                  <span>
                    <PaperClipIcon />
                  </span>
                </div>
              </Stack>

              {!loading ? (
                <button className="border-0 rounded-lg bg-color-primary px-3 py-2 text-16 font-bold text-white">
                  Create Ticket
                </button>
              ) : (
                <button className="border-0 rounded-lg bg-color-primary px-3 py-2 text-16 font-bold text-white">
                  <Spinner />
                </button>
              )}
              {/* <CreateTicketSuccessModal /> */}
            </div>
          </div>
        </Form>
      </div>
    </ModuleLayout>
  );
};

export default Tickets;
