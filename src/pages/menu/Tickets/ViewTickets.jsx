import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Stack from "react-bootstrap/Stack";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

import "./Tickets.css";
import {
  CreatePlusIcon,
  InProgressIcon,
  IssueResolvedIcon,
  UnResolvedIcon,
  PaperClipIcon,
} from "./components/tickets-icons";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";
import { createTickets, getTickets } from "./apis/TicketApi";
import { ToastContainer, toast } from "react-toastify";
import { getError } from "../../../Utils/error";
import { setTickets } from "../../../features/ticketSlice";

function CreateTicketModal(props) {
  const token = localStorage.getItem("token");
  const { subAdmins } = useSelector((state) => state.subAdmin);
  const { topics } = useSelector((state) => state.topics);
  const [prof, setProf] = useState("");
  const [topicName, setTopicName] = useState("");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [ticketImage, setTicketImage] = useState("");
  const [loading, setLoading] = useState(false);

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

  useEffect(() => {
    getAllTickets();
  }, []);

  const getAllTickets = async () => {
    try {
      const response = await getTickets(token);
      dispatch(setTickets(response));
    } catch (error) {
      toast.error(getError(error));
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
    try {
      setLoading(true);
      await createTickets(createTicket, token);
      setLoading(false);
      getAllTickets();
      props.closeCreateTicketModal(true);
    } catch (error) {
      toast.error(getError(error));
      setLoading(false);
    }
  };

  return (
    <Modal
      {...props}
      size="lg"
      onHide={props.closeCreateTicketModal}
      centered
      show={props.createTicketModalShow}
    >
      <ToastContainer />
      <div className="">
        <Form
          className="create-ticket-container"
          onSubmit={createTicketHandler}
        >
          <div className="ticket-form-modal">
            <Form.Group className="text-14 font-medium mt-2">
              <Form.Label>To</Form.Label>
              <Form.Select
                onChange={(e) => setProf(e.target.value)}
                className="text-14 font-medium"
                required
                aria-label="Default select example"
              >
                <option disabled>Select topic</option>
                {subAdmins.length > 0 &&
                  subAdmins.map((data) => {
                    return (
                      <option value={data._id} key={data._id}>
                        {data.name}
                      </option>
                    );
                  })}
              </Form.Select>
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
                        {topic.topic_name}
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
    </Modal>
  );
}

const CreateTicketButton = (props) => {
  const [createTicketModalShow, setCreateTicketModalShow] =
    React.useState(false);

  const openCreateTicketModal = () => setCreateTicketModalShow(true);
  const closeCreateTicketModal = () => setCreateTicketModalShow(false);

  return (
    <>
      <button
        onClick={openCreateTicketModal}
        className="border-0 rounded-lg bg-color-primary py-2 px-3 d-flex gap-2"
      >
        <span>
          <CreatePlusIcon />
        </span>
        <span className="text-16 font-bold text-white">Create Ticket</span>
      </button>
      <CreateTicketModal
        createTicketModalShow={createTicketModalShow}
        closeCreateTicketModal={closeCreateTicketModal}
      />
    </>
  );
};

const ViewTickets = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const { tickets } = useSelector((state) => state.tickets);
  const [ticketLoader, setTicketLoader] = useState(false);

  useEffect(() => {
    getAllTickets();
  }, []);

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
    <div>
      <div className="d-flex justify-content-between align-items-center bg-color-light py-4 px-3">
        <h3 className="text-36 font-semibold text-color-secondary">
          Manage Tickets
        </h3>
        <CreateTicketButton />
      </div>

      <div className="p-4">
        <h4 className="text-22 font-medium mb-4">My Tickets</h4>

        <Stack gap={3}>
          {!ticketLoader ? (
            tickets.map((ticket, idx) => (
              <div
                key={idx}
                className="pb-2 pt-3 px-4 bg-white rounded-xl d-flex flex-column cursor-pointer"
                style={{
                  border: "1px solid #EFEFEF",
                  boxShadow: "0px 4px 12px 0px #0000000A",
                }}
                onClick={() => navigate(`/menu/tickets/chat/${ticket._id}`)}
              >
                <div className="d-flex justify-content-between align-items-center">
                  <p
                    className="text-14 font-semibold"
                    style={{ color: "#525252" }}
                  >
                    {ticket.topic.topic_name}
                  </p>

                  {ticket.status === "Closed" && (
                    <p className="text-color-secondary text-12 font-normal">
                      Issue Resolved{" "}
                      <span>
                        <IssueResolvedIcon />
                      </span>
                    </p>
                  )}

                  {ticket.status === "Pending" && (
                    <p className="text-color-progress text-12 font-normal">
                      In Progress{" "}
                      <span>
                        <InProgressIcon />
                      </span>
                    </p>
                  )}

                  {ticket.status === "Open" && (
                    <p className="text-secondary text-12 font-normal">
                      Issue Not Resolved{" "}
                      <span>
                        <UnResolvedIcon />
                      </span>
                    </p>
                  )}
                </div>
                <div className="d-flex justify-content-between align-items-start">
                  <p
                    className="text-14 font-normal"
                    style={{ color: "#525252" }}
                  >
                    {ticket.description}
                  </p>
                  <p
                    className="text-12 font-normal"
                    style={{ color: "#475467" }}
                  >
                    {formatDate(ticket.createdAt.split("T")[0])}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="d-flex justify-content-center">
              <Spinner />
            </div>
          )}
        </Stack>
      </div>
    </div>
  );
};

export default ViewTickets;
