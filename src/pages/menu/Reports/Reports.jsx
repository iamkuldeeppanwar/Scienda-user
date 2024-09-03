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
      {/* <h2
        style={{
          fontWeight: 600,
          fontSize: "24px",
        }}
      >
        Your Reports
      </h2> */}
      <h4
        className="m-3"
        style={{ color: "#8098F9", fontSize: "1.25rem", fontWeight: 600 }}
      >
        Topic Performance
      </h4>

      <Container>
        <Row className="g-2">
          <Col lg={6}>
            <Card>
              <Card.Body>
                <p
                  className="m-3"
                  style={{
                    fontSize: "0.8rem",
                    color: "#475467",
                    fontWeight: 500,
                  }}
                >
                  Number of Test Given
                </p>
                <div className="d-flex flex-column align-items-center">
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

          <Col lg={6}>
            <Card>
              <Card.Body>
                <div className="d-flex align-items-center justify-content-between">
                  <div>
                    <p
                      className="m-3"
                      style={{
                        fontSize: "0.8rem",
                        color: "#475467",
                        fontWeight: 500,
                      }}
                    >
                      Overall Confidence Level{" "}
                      {pieGraph?.confidence ? pieGraph?.confidence : 0} %
                    </p>
                  </div>

                  <div>
                    <span
                      style={{
                        fontSize: "0.8rem",
                        color: "#475467",
                        fontWeight: 500,
                      }}
                    >
                      Total Marks:{" "}
                    </span>
                    <span
                      className="px-4 py-1"
                      style={{
                        backgroundColor: "#F3F3F3",
                        borderRadius: "20px",
                        fontWeight: 500,
                      }}
                    >
                      <span style={{ color: "#9BCF53" }}>
                        {pieGraph?.correct_answer}
                      </span>{" "}
                      / {pieGraph?.total}
                    </span>
                  </div>
                </div>

                <p
                  className="text-capitalize px-3"
                  style={{
                    color: "#1F2A37",
                    fontWeight: 700,
                  }}
                >
                  {pieGraph?.test_name}
                </p>
                <div className="d-flex align-items-center">
                  <PieChart
                    series={[{ data: pieGraphReport, innerRadius: 60 }]}
                    {...size}
                  />
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="mt-4 g-3">
          <Col lg={6}>
            <Card>
              <Card.Body>
                <p
                  className="m-3"
                  style={{
                    fontSize: "0.8rem",
                    color: "#475467",
                    fontWeight: 500,
                  }}
                >
                  Confidence VS Performance
                </p>
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

          <Col lg={6}>
            <Card>
              <Card.Body>
                <p
                  className="m-3"
                  style={{
                    fontSize: "0.8rem",
                    color: "#475467",
                    fontWeight: 500,
                  }}
                >
                  Number of Questions Attempted
                </p>
                <div className="d-flex justify-content-center align-items-center">
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
