import { Card, Col, Container, Row, Table } from "react-bootstrap";
import ModuleLayout from "../../../layout/ModuleLayout";
import "./Dashboard.css";
import { useEffect, useState } from "react";
import { getError } from "../../../Utils/error";
import { toast } from "react-toastify";
import { getDashboardData } from "./api/dashboardapi";
import { TotalExamSVG, TotalQuizVG, TotalTestVG } from "./Icons";
import { IoEyeOutline } from "react-icons/io5";
import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const [dashboard, setDashboard] = useState("");

  useEffect(() => {
    dashboardData();
  }, []);

  const dashboardData = async () => {
    try {
      const res = await getDashboardData(token, user?.subdomain);
      setDashboard(res?.data);
    } catch (error) {
      toast.error(getError(error));
    }
  };

  const colors = [
    "rgba(255, 160, 18, 1)",
    "rgba(44, 217, 186, 1)",
    "rgba(131, 111, 255, 1)",
    "rgba(255, 64, 125, 1)",
    "rgba(250, 197, 21, 1)",
    "rgba(61, 178, 255, 1)",
  ];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: "numeric", month: "short", year: "numeric" };
    return date.toLocaleDateString("en-GB", options);
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const options = { hour: "numeric", minute: "numeric", hour12: true };
    return date.toLocaleTimeString("en-US", options).toLowerCase();
  };

  const formatDuration = (durationInMinutes) => {
    const hours = Math.floor(durationInMinutes / 60);
    const minutes = durationInMinutes % 60;

    if (hours > 0) {
      return `${hours}h:${minutes}min`;
    } else {
      return `${minutes}min`;
    }
  };

  // console.log(dashboard);

  return (
    <ModuleLayout>
      <Container>
        <h3
          style={{ color: "#8098F9", fontSize: "1.25rem", fontWeight: 600 }}
          className="text-color-secondary text-22 font-semibold text-capitalize"
        >
          Welcome{" "}
          <span
            style={{
              fontWeight: 600,
            }}
          >
            {user?.first_name + " " + user?.last_name + " " + "!!!"}
          </span>
        </h3>

        <Row className="g-3 mt-2">
          <Col>
            <Card
              className="shadow"
              style={{
                borderLeft: "10px solid rgba(251, 168, 52, 1)",
                borderRadius: "10px",
              }}
            >
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center">
                  <TotalExamSVG />
                  <div>
                    <div
                      style={{ color: "rgb(164, 164, 164)", fontSize: "16px" }}
                    >
                      Total Exam
                    </div>
                    <div
                      className="text-end"
                      style={{ fontWeight: 600, fontSize: "24px" }}
                    >
                      {dashboard?.totalExam}
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col>
            <Card
              className="shadow"
              style={{
                borderLeft: "10px solid rgba(131, 111, 255, 1)",
                borderRadius: "10px",
              }}
            >
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center">
                  <TotalTestVG />
                  <div>
                    <div
                      style={{ color: "rgb(164, 164, 164)", fontSize: "16px" }}
                    >
                      Total Test
                    </div>
                    <div
                      className="text-end"
                      style={{ fontWeight: 600, fontSize: "24px" }}
                    >
                      {dashboard?.examCount}
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col>
            <Card
              className="shadow"
              style={{
                borderLeft: "10px solid rgba(155, 207, 83, 1)",
                borderRadius: "10px",
              }}
            >
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center">
                  <TotalQuizVG />
                  <div>
                    <div
                      style={{ color: "rgb(164, 164, 164)", fontSize: "16px" }}
                    >
                      Total Quiz
                    </div>
                    <div
                      className="text-end"
                      style={{ fontWeight: 600, fontSize: "24px" }}
                    >
                      {dashboard?.quizCount}
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="g-3 mt-2">
          <Col md={8}>
            <Card className="shadow" style={{ height: "400px" }}>
              <div className="d-flex align-items-center justify-content-between px-3">
                <div
                  className="mt-2"
                  style={{
                    color: "#8098F9",
                    fontSize: "1.25rem",
                    fontWeight: 600,
                  }}
                >
                  Recently Completed Exams
                </div>
                <Link to="/menu/proficiency-percentage">
                  <div
                    style={{
                      color: "rgba(153, 153, 153, 1)",
                      fontWeight: 600,
                      fontSize: "12px",
                      cursor: "pointer",
                    }}
                  >
                    View All <IoIosArrowForward />
                  </div>
                </Link>
              </div>
              <Card.Body>
                {dashboard?.reports?.length > 0 ? (
                  <Table responsive>
                    <thead className="p-4 mb-4 custom-table-head">
                      <tr
                        className="rounded-xl border"
                        style={{
                          fontSize: "16px",
                          color: "rgba(33, 52, 70, 1)",
                        }}
                      >
                        <th className="text-center border-0">Exam Name</th>
                        <th className="text-center border-0">Test Type</th>
                        <th className="text-center border-0">
                          No. Of Questions
                        </th>
                        <th className="text-center border-0">Completed On</th>
                        <th className="text-center border-0">Score</th>
                        <th className="text-center border-0">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dashboard?.reports?.map((report) => {
                        return (
                          <tr key={report?._id}>
                            <td className="text-center">
                              {report?.test?.test_name}
                            </td>
                            <td className="text-center">
                              {report?.test?.test_type}
                            </td>
                            <td className="text-center">
                              {report?.test?.number_of_questions}
                            </td>
                            <td className="text-center">
                              {report?.test?.updatedAt.split("T")[0]}
                            </td>
                            <td className="text-center">
                              {report?.correct_answers}
                            </td>
                            <td className="text-center">
                              <Link
                                to={`/menu/tests/check-answers/${report?._id}?viewScore=true`}
                              >
                                <IoEyeOutline />
                              </Link>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                ) : (
                  <div className="text-center">
                    <h5>No data found!</h5>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>

          <Col>
            <Card
              className="shadow"
              style={{ height: "530px", overflowY: "scroll" }}
            >
              <Card.Body>
                {dashboard?.ticket?.length > 0 ? (
                  <>
                    <div
                      style={{
                        color: "#8098F9",
                        fontSize: "1.25rem",
                        fontWeight: "26px",
                      }}
                    >
                      New Tickets {dashboard?.tickets?.length}
                    </div>

                    {dashboard?.tickets?.map((ticket, index) => {
                      const color = colors[index % colors.length];
                      return (
                        <Card
                          key={ticket._id}
                          className="mt-2"
                          style={{
                            borderLeft: `5px solid ${color}`,
                            borderRadius: "10px",
                          }}
                        >
                          <Card.Body>
                            <div className="d-flex justify-content-between align-items-center">
                              <div
                                className="w-25 text-truncate"
                                style={{
                                  color: "rgba(82, 82, 82, 1)",
                                  fontWeight: 600,
                                  fontSize: "14px",
                                }}
                              >
                                {ticket?.subject}
                              </div>
                              <div
                                className="text-end"
                                style={{
                                  fontWeight: 400,
                                  fontSize: "12px",
                                  color: "rgba(108, 108, 108, 1)",
                                }}
                              >
                                {formatDate(ticket?.createdAt)}
                              </div>
                            </div>
                            <div className="d-flex justify-content-between align-items-center">
                              <div
                                style={{
                                  color: "rgba(82, 82, 82, 1)",
                                  fontWeight: 600,
                                  fontSize: "12px",
                                }}
                              >
                                Recieved new message
                              </div>
                              <div
                                className="text-end"
                                style={{
                                  fontWeight: 400,
                                  fontSize: "10px",
                                  color: "rgba(108, 108, 108, 1)",
                                }}
                              >
                                {formatTime(ticket?.createdAt)}
                              </div>
                            </div>
                          </Card.Body>
                        </Card>
                      );
                    })}
                  </>
                ) : (
                  <div className="text-center">
                    <h5>No ticket found!</h5>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="g-3 mt-2">
          <Col className="recent-test-created" md={8}>
            <Card className="shadow" style={{ height: "400px" }}>
              <div className="d-flex align-items-center justify-content-between px-3">
                <div
                  className="mt-2"
                  style={{
                    color: "#8098F9",
                    fontSize: "1.25rem",
                    fontWeight: 600,
                  }}
                >
                  Recently Created Tests
                </div>
                <Link to="/menu/tests">
                  <div
                    style={{
                      color: "rgba(153, 153, 153, 1)",
                      fontWeight: 600,
                      fontSize: "12px",
                      cursor: "pointer",
                    }}
                  >
                    View All <IoIosArrowForward />
                  </div>
                </Link>
              </div>
              <Card.Body>
                {dashboard?.tests?.length > 0 ? (
                  <Table responsive>
                    <thead className="p-4 mb-4 custom-table-head">
                      <tr
                        className="rounded-xl border"
                        style={{
                          fontSize: "16px",
                          color: "rgba(33, 52, 70, 1)",
                        }}
                      >
                        <th className="text-center border-0">Exam Name</th>
                        <th className="text-center border-0">Test Type</th>
                        <th className="text-center border-0">
                          No. Of Questions
                        </th>
                        <th className="text-center border-0">Time alloted</th>
                        <th className="text-center border-0">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dashboard?.tests?.map((test) => {
                        return (
                          <tr key={test?._id}>
                            <td className="text-center">{test?.test_name}</td>
                            <td className="text-center">{test?.test_type}</td>
                            <td className="text-center">
                              {test?.number_of_questions}
                            </td>
                            <td className="text-center">
                              {formatDuration(test?.duration_in_mins)}
                            </td>
                            <td
                              className="text-center px-2"
                              style={
                                test?.attempted
                                  ? {
                                      borderRadius: "20px",
                                      backgroundColor: "rgba(240, 253, 249, 1)",
                                      color: "rgba(21, 183, 158, 1)",
                                    }
                                  : {
                                      borderRadius: "20px",
                                      color: "#FF9C07",
                                    }
                              }
                            >
                              {test?.attempted ? "Attempted" : "Not Attempted"}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                ) : (
                  <div>
                    <h5 className="text-center">No data found!</h5>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>

          <Col>
            <Card className="shadow" style={{ height: "270px" }}>
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center">
                  <div
                    style={{
                      color: "#8098F9",
                      fontSize: "1.25rem",
                      fontWeight: 600,
                    }}
                  >
                    Your Membership Plan
                  </div>

                  <div
                    className="py-1 px-2"
                    style={{
                      fontSize: "10px",
                      color: "rgba(21, 183, 158, 1)",
                      backgroundColor: "rgba(240, 253, 249, 1)",
                      borderRadius: "20px",
                    }}
                  >
                    Active plan
                  </div>
                </div>

                <div
                  className="text-center mt-4"
                  style={{
                    fontSize: "28px",
                    color: "rgba(97, 114, 243, 1)",
                    fontWeight: 700,
                  }}
                >
                  £{" "}
                  {dashboard?.subscription?.amount
                    ? dashboard?.subscription?.amount
                    : 0}{" "}
                  / Month
                </div>

                <div className="d-flex justify-content-center mt-4">
                  <button
                    className="px-3 py-1"
                    style={{
                      backgroundColor: "rgba(0, 0, 139, 1)",
                      border: "none",
                      borderRadius: "5px",
                      color: "white",
                    }}
                  >
                    Upgrade
                  </button>
                </div>

                {dashboard?.subscription?.expiry && (
                  <div
                    className="mt-4"
                    style={{
                      fontSize: "12px",
                      textAlign: "center",
                      fontWeight: 600,
                    }}
                  >
                    Membership Expires on:{" "}
                    <span style={{ color: "rgba(255, 68, 64, 1)" }}>
                      {formatDate(dashboard?.subscription?.expiry)}
                    </span>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </ModuleLayout>
  );
};

export default Dashboard;
