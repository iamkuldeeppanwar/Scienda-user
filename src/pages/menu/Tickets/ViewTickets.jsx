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
import Skeleton from "react-loading-skeleton";

function CreateTicketModal(props) {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const { subAdmins } = useSelector((state) => state.subAdmin);
  const { topics } = useSelector((state) => state.topics);
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
  }, [dispatch, token, loading]);

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
      to: subAdmins[0]?._id,
      subject: subject,
      description: description,
      topic: !topicName ? topics[0]?._id : topicName,
      image: ticketImage,
    };
    try {
      setLoading(true);
      const data = await createTickets(createTicket, token);
      setLoading(false);
      getAllTickets();
      toast.success(data?.message);
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
      <div>
        <Form
          className="create-ticket-container"
          onSubmit={createTicketHandler}
        >
          <div className="ticket-form-modal">
            <Form.Group className="mt-1">
              <Form.Label className="text-16 font-medium ">To</Form.Label>
              <Form.Control
                disabled
                type="text"
                className="text-12 font-medium py-2 px-3 input-border"
                value={subAdmins[0]?.first_name + " " + subAdmins[0]?.last_name}
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

            <Form.Group className="mt-1">
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

            {/* <CreateTicketSuccessModal /> */}
          </div>
        </Form>
      </div>
    </Modal>
  );
}

const CreateTicketButton = () => {
  const [createTicketModalShow, setCreateTicketModalShow] =
    React.useState(false);

  const openCreateTicketModal = () => setCreateTicketModalShow(true);
  const closeCreateTicketModal = () => setCreateTicketModalShow(false);

  return (
    <>
      <div className="mt-1">
        <button
          onClick={openCreateTicketModal}
          className="view-button text-center font-medium text-14 text-color-primary rounded py-2"
          style={{
            border: "1px solid #00008B",
            boxShadow: "0px 4px 4px 0px #ACD4FF0A",
            width: "8.5rem",
          }}
        >
          + Create Ticket
        </button>
      </div>
      <CreateTicketModal
        createTicketModalShow={createTicketModalShow}
        closeCreateTicketModal={closeCreateTicketModal}
      />
    </>
  );
};

const ViewTickets = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const { tickets } = useSelector((state) => state.tickets);
  const [ticketLoader, setTicketLoader] = useState(false);

  useEffect(() => {
    getAllTickets();
  }, [dispatch, token]);

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
      <div className="d-flex justify-content-between align-items-center bg-color-light py-3 px-3">
        <h3 style={{ color: "#8098F9", fontSize: "26px", fontWeight: 600 }}>
          Manage Tickets
        </h3>
        <CreateTicketButton />
      </div>

      <div className="p-4">
        <p style={{ fontWeight: 700, fontSize: "18px" }}>My Tickets</p>
        <hr />

        <Stack gap={3}>
          {!ticketLoader ? (
            tickets?.map((ticket, idx) => (
              <div
                key={idx}
                className="pb-2 pt-3 px-4 bg-white rounded-xl d-flex flex-column cursor-pointer shadow"
                style={{
                  border: "1px solid #EFEFEF",
                  boxShadow: "0px 4px 12px 0px #0000000A",
                }}
                onClick={() => navigate(`/menu/tickets/chat/${ticket?._id}`)}
              >
                <div className="d-flex justify-content-between align-items-center">
                  <p className="text-14 font-bold" style={{ color: "#525252" }}>
                    Topic: {ticket?.topic?.topic_name}
                  </p>

                  {ticket?.status === "Closed" && (
                    <p className="text-color-secondary text-14 font-medium">
                      Issue Resolved{" "}
                      <span>
                        <IssueResolvedIcon />
                      </span>
                    </p>
                  )}

                  {ticket?.status === "Pending" && (
                    <p className="text-color-progress text-14 font-medium">
                      In Progress{" "}
                      <span>
                        <InProgressIcon />
                      </span>
                    </p>
                  )}

                  {ticket?.status === "Open" && (
                    <p className="text-secondary text-14 font-medium">
                      Issue Not Resolved{" "}
                      <span>
                        <UnResolvedIcon />
                      </span>
                    </p>
                  )}
                </div>

                <p className="text-14 font-medium">
                  Subject: {ticket?.subject}
                </p>

                <div className="d-flex flex-wrap justify-content-between align-items-start">
                  <p
                    className="text-14 font-medium"
                    style={{ color: "#525252", wordBreak: "break-all" }}
                  >
                    {ticket?.description}
                  </p>
                  <p
                    className="text-12 font-medium"
                    style={{ color: "#475467" }}
                  >
                    {formatDate(ticket?.createdAt.split("T")[0])}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className={`p-2 d-flex flex-column gap-5`}>
              {[1, 2, 3].map((_, i) => (
                <Skeleton
                  className="rounded-4"
                  height={"150px"}
                  width={"100%"}
                />
              ))}
            </div>
          )}
        </Stack>
      </div>
    </div>
  );
};

export default ViewTickets;
