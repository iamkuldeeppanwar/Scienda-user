import React, { useEffect, useState } from "react";
import Stack from "react-bootstrap/Stack";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import {
  InProgressIcon,
  IssueResolvedIcon,
  UnResolvedIcon,
  FlyingArrowIcon,
} from "./components/tickets-icons";
import { ToastContainer, toast } from "react-toastify";
import { getError } from "../../../Utils/error";
import { useParams } from "react-router-dom";
import { getSingleTicket, postMessage } from "./apis/TicketApi";
import { useDispatch, useSelector } from "react-redux";
import { setTicket } from "../../../features/ticketSlice";
import { io } from "socket.io-client";

const TicketChat = () => {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const { ticketId } = useParams();
  const { ticket } = useSelector((state) => state.tickets);
  const { user } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [socket, setSocket] = useState("");
  const [chat, setChat] = useState("");

  useEffect(() => {
    getTicket();
  }, []);

  useEffect(() => {
    const newSocket = io("https://scienda-socket.onrender.com");
    setSocket(newSocket);

    return () => newSocket.close();
  }, []);

  useEffect(() => {
    if (user._id && socket) {
      socket.emit("login", { _id: user._id });
    }
  }, [socket, user]);

  useEffect(() => {
    if (!socket) return;
    socket.on("receiveMessage", (message) => {
      // setChat(message);
      console.log(message);
      getTicket();
    });
    return () => socket.off("receiveMessage");
  }, [socket]);

  const getTicket = async () => {
    try {
      const response = await getSingleTicket(token, ticketId);
      dispatch(setTicket(response));
    } catch (error) {
      toast.error(getError(error));
    }
  };

  function formatDateTime(dateString) {
    const date = new Date(dateString);

    const options = {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };

    return new Intl.DateTimeFormat("en-US", options).format(date);
  }

  const handleChat = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await postMessage(token, { message: chat }, ticketId);
      socket.emit("sendMessage", {
        chat,
        to: ticket.to,
        from: user._id,
        ticket: ticketId,
      });
      setChat("");
      getTicket();
      setLoading(false);
    } catch (error) {
      toast.error(getError(error));
      setLoading(false);
    }
  };

  return (
    <div>
      <ToastContainer />
      <div className="p-4 bg-color-light d-flex justify-content-between sticky-top">
        <div>
          <p className="text-16 font-medium">
            Topic Name:{" "}
            <span
              className="text-14 font-semibold"
              style={{ color: "#525252" }}
            >
              {ticket.subject && ticket.topic.topic_name}
            </span>
          </p>
          <p className="text-16 font-medium">
            Title:{" "}
            <span
              className="text-14 font-semibold"
              style={{ color: "#525252" }}
            >
              {ticket.subject && ticket.subject}
            </span>
          </p>
          <p className="text-16 font-medium">
            Description:
            <span
              className="text-14 font-normal ms-2"
              style={{ color: "#525252" }}
            >
              {ticket.subject && ticket.description}
            </span>
          </p>
        </div>
        <div className="d-flex flex-column justify-content-between">
          <div className="text-end text-16">
            <p className="my-0 font-semibold">
              Raised On:{" "}
              <span className="text-color-secondary">
                {ticket.subject && formatDateTime(ticket.createdAt)}
              </span>
            </p>
            {/* <p className="my-0 font-normal">7:30 PM</p> */}
          </div>
          {ticket.subject && ticket.status === "Closed" && (
            <p className="text-end text-12 font-normal text-color-progress">
              {ticket.status} <IssueResolvedIcon />
            </p>
          )}
          {ticket.subject && ticket.status === "Open" && (
            <p className="text-end text-12 font-normal text-color-progress">
              {ticket.status} <InProgressIcon />
            </p>
          )}
          {ticket.subject && ticket.status === "Pending" && (
            <p className="text-end text-12 font-normal text-color-progress">
              {ticket.status} <UnResolvedIcon />
            </p>
          )}
        </div>
      </div>

      <div className="p-4">
        <div
          className="p-3 pt-5 bg-white rounded-xl"
          style={{
            border: "1px solid #EFEFEF",
            boxShadow: "0px 4px 12px 0px #0000000A",
          }}
        >
          {ticket.status && ticket.chats.length > 0 ? (
            ticket.chats.map((data) => {
              return (
                <div
                  className={`${
                    data.from === user._id
                      ? "d-flex flex-row-reverse"
                      : "d-flex flex-row-start"
                  } mt-3`}
                >
                  <div
                    className="me-2"
                    // style={{ width: "35%", minWidth: "24rem" }}
                  >
                    <p
                      className="my-0 p-4"
                      style={{
                        fontSize: "0.75rem",
                        fontWeight: 400,
                        backgroundColor: "#EEEEEE",
                        borderRadius: "22px",
                        borderTopRightRadius: "4px",
                      }}
                    >
                      {data.message}
                    </p>
                    <p
                      className="my-1 text-end"
                      style={{
                        fontWeight: 400,
                        fontSize: "0.75rem",
                        color: "#797979",
                      }}
                    >
                      Sent at :{" "}
                      <span style={{ fontWeight: 300 }}>
                        {formatDateTime(data.date)}
                      </span>
                    </p>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center">No Chats</div>
          )}
        </div>
      </div>

      <section className="sticky-bottom px-4 py-3 z-3">
        <div className="bg-white py-3 rounded-xl">
          {ticket && ticket.status === "Open" && (
            <Form onSubmit={handleChat}>
              <Form.Group className="w-75 mx-auto">
                <Stack direction="horizontal" gap={3}>
                  <Form.Control
                    // disabled={currentTicket[0].status === 'Closed'}
                    type="text"
                    value={chat}
                    onChange={(e) => setChat(e.target.value)}
                    placeholder="Write something here..."
                    className="py-2 px-3"
                    style={{
                      border: "1px solid #8098F9",
                    }}
                  />

                  <Button
                    type="submit"
                    disabled={loading}
                    style={{
                      backgroundColor: "var(--primary-color)",
                      border: "none",
                      minWidth: "max-content",
                      padding: "0.5rem 0.75rem",
                      borderRadius: "0.75rem",
                    }}
                  >
                    <span className="me-2">Send</span>
                    <FlyingArrowIcon />
                  </Button>
                </Stack>
              </Form.Group>
            </Form>
          )}
        </div>
      </section>
    </div>
  );
};

export default TicketChat;
