import React, { useEffect, useState } from "react";
import ModuleLayout from "../../../layout/ModuleLayout";
import { Container, Row, Col, Card } from "react-bootstrap";
import { BarChart } from "@mui/x-charts";
import { toast, ToastContainer } from "react-toastify";
import { getError } from "../../../Utils/error";
import {
  getReportConfidenceGraph,
  getReportGraph,
  getReportPieGraph,
  getReportQuestionGraph,
} from "./api/reportApi";
import { PieChart } from "@mui/x-charts/PieChart";

const size = {
  width: 400,
  height: 200,
};

const Reports = () => {
  const token = localStorage.getItem("token");
  const [reportGraph, setReportGraph] = useState([]);
  const [pieGraph, setPieGraph] = useState("");
  const [pieGraphReport, setPieGraphReport] = useState([]);
  const [uData, setUData] = useState([]);
  const [pData, setPData] = useState([]);
  const [xLabels, setXLabels] = useState([]);
  const [toatalQuestions, setTotalQuestions] = useState([]);

  useEffect(() => {
    getGraphReport();
    getPieGraphReport();
    getReportConfidence();
    getReportQuestions();
  }, []);

  const getGraphReport = async () => {
    try {
      const res = await getReportGraph(token);
      setReportGraph(res?.data);
    } catch (error) {
      toast.error(getError(error));
    }
  };

  const getPieGraphReport = async () => {
    try {
      const res = await getReportPieGraph(token);
      setPieGraph(res?.data);
      setPieGraphReport(res?.data?.graphdata);
    } catch (error) {
      toast.error(getError(error));
    }
  };

  const getReportConfidence = async () => {
    try {
      const res = await getReportConfidenceGraph(token);
      setUData(res?.data?.uData);
      setPData(res?.data?.pData);
      setXLabels(res?.data?.xLabels);
    } catch (error) {
      toast.error(getError(error));
    }
  };

  const getReportQuestions = async () => {
    try {
      const res = await getReportQuestionGraph(token);
      setTotalQuestions(res?.data);
    } catch (error) {
      toast.error(getError(error));
    }
  };

  return (
    <ModuleLayout>
      <ToastContainer />
      <h2
        style={{
          fontWeight: 600,
          //   fontSize: "18px",
        }}
      >
        Your Reports
      </h2>
      <h4
        className="m-3"
        style={{
          fontWeight: 600,
          fontSize: "18px",
          color: "rgba(97, 114, 243, 1)",
        }}
      >
        Topic Performance
      </h4>

      <Container>
        <Row className="g-3">
          <Col>
            <Card>
              <Card.Body>
                <div className="d-flex flex-column align-items-center">
                  <h4
                    className="m-3"
                    style={{
                      fontWeight: 600,
                      fontSize: "18px",
                      color: "rgba(97, 114, 243, 1)",
                    }}
                  >
                    No. Of Test Given
                  </h4>
                  <BarChart
                    sx={{ marginLeft: "-50px" }}
                    dataset={reportGraph}
                    xAxis={[{ scaleType: "band", dataKey: "month" }]}
                    series={[{ dataKey: "count" }]}
                    // width={350}
                    height={225}
                  />
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col>
            <Card>
              <Card.Body>
                <div className="d-flex flex-column align-items-center">
                  <h4
                    className="m-3"
                    style={{
                      fontWeight: 600,
                      fontSize: "18px",
                      color: "rgba(97, 114, 243, 1)",
                    }}
                  >
                    Overall Confidence Level {pieGraph?.confidence} %
                  </h4>

                  <div className="d-flex gap-5">
                    <div
                      className="text-capitalize"
                      style={{
                        color: "#1F2A37",
                        fontWeight: 600,
                      }}
                    >
                      {pieGraph?.test_name}
                    </div>
                    <div>
                      <span
                        style={{
                          color: "#667085",
                          fontWeight: 600,
                        }}
                      >
                        Total Marks:{" "}
                      </span>
                      <span
                        className="px-3"
                        style={{
                          backgroundColor: "#F3F3F3",
                          padding: "5px",
                          borderRadius: "20px",
                          fontWeight: 600,
                        }}
                      >
                        <span style={{ color: "#9BCF53" }}>
                          {pieGraph?.correct_answer}
                        </span>{" "}
                        / {pieGraph?.total}
                      </span>
                    </div>
                  </div>
                  <PieChart
                    series={[{ data: pieGraphReport, innerRadius: 60 }]}
                    {...size}
                  />
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="mt-4">
          <Col md={6}>
            <Card>
              <Card.Body>
                <h4
                  className="m-3 text-center"
                  style={{
                    fontWeight: 600,
                    fontSize: "18px",
                    color: "rgba(97, 114, 243, 1)",
                  }}
                >
                  Confidence VS Performance
                </h4>
                <div className="d-flex justify-content-center">
                  <BarChart
                    // width={350}
                    height={300}
                    series={[
                      {
                        data: pData,
                        label: "Confidence",
                        id: "pvId",
                        color: "#F5BE08",
                      },
                      {
                        data: uData,
                        label: "Performance",
                        id: "uvId",
                        color: "#FFE99F",
                      },
                    ]}
                    barLabel={(item, context) => {
                      return item.value?.toString();
                    }}
                    xAxis={[{ data: xLabels, scaleType: "band" }]}
                  />
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col>
            <Card>
              <Card.Body>
                <div className="d-flex flex-column align-items-center">
                  <h4
                    className="m-3"
                    style={{
                      fontWeight: 600,
                      fontSize: "18px",
                      color: "rgba(97, 114, 243, 1)",
                    }}
                  >
                    No. Of Questions
                  </h4>
                  <BarChart
                    sx={{ marginLeft: "-50px" }}
                    dataset={toatalQuestions}
                    xAxis={[{ scaleType: "band", dataKey: "month" }]}
                    series={[{ dataKey: "count" }]}
                    // width={350}
                    height={300}
                  />
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </ModuleLayout>
  );
};

export default Reports;
