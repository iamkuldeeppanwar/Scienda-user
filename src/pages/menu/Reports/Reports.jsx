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
import HeaderContent from "../../../components/HeaderContent";
import Skeleton from "react-loading-skeleton";

const size = {
  width: 400,
  height: 188,
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
  const [reportLoading, setReportLoading] = useState(false);
  const [pieLoading, setPieLoading] = useState(false);
  const [confidenceLoading, setConfidenceLoading] = useState(false);
  const [questionLoading, setQuestionLoading] = useState(false);

  useEffect(() => {
    getGraphReport();
    getPieGraphReport();
    getReportConfidence();
    getReportQuestions();
  }, []);

  const getGraphReport = async () => {
    try {
      setReportLoading(true);
      const res = await getReportGraph(token);
      setReportGraph(res?.data);
      setReportLoading(false);
    } catch (error) {
      toast.error(getError(error));
      setReportLoading(false);
    }
  };

  const getPieGraphReport = async () => {
    try {
      setPieLoading(true);
      const res = await getReportPieGraph(token);
      setPieGraph(res?.data);
      setPieGraphReport(res?.data?.graphdata);
      setPieLoading(false);
    } catch (error) {
      toast.error(getError(error));
      setPieLoading(false);
    }
  };

  const getReportConfidence = async () => {
    try {
      setConfidenceLoading(true);
      const res = await getReportConfidenceGraph(token);
      setUData(res?.data?.uData);
      setPData(res?.data?.pData);
      setXLabels(res?.data?.xLabels);
      setConfidenceLoading(false);
    } catch (error) {
      toast.error(getError(error));
      setConfidenceLoading(false);
    }
  };

  const getReportQuestions = async () => {
    try {
      setQuestionLoading(true);
      const res = await getReportQuestionGraph(token);
      setTotalQuestions(res?.data);
      setQuestionLoading(false);
    } catch (error) {
      toast.error(getError(error));
      setQuestionLoading(false);
    }
  };

  return (
    <>
      <HeaderContent content={"Reports"} />
      <ModuleLayout className="ps-3">
        <Container>
          <Row className="g-2">
            {!reportLoading ? (
              <Col lg={6}>
                <Card className="shadow border-1 rounded-xl">
                  <Card.Body>
                    <p
                      style={{
                        fontSize: "14px",
                        color: "#475467",
                        fontWeight: 500,
                      }}
                    >
                      Number of Test Given
                    </p>
                    <div className="d-flex justify-content-center">
                      <BarChart
                        dataset={reportGraph}
                        xAxis={[{ scaleType: "band", dataKey: "month" }]}
                        series={[{ dataKey: "count" }]}
                        height={225}
                        borderRadius={10}
                        colors={["#00008b"]}
                      />
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ) : (
              <Col>
                {[1].map((_, i) => (
                  <Skeleton
                    className="rounded-4"
                    width={"550px"}
                    height={"290px"}
                  />
                ))}
              </Col>
            )}

            {!pieLoading ? (
              <Col lg={6}>
                <Card className="shadow border-1 rounded-xl">
                  <Card.Body>
                    <div className="d-flex align-items-center justify-content-between">
                      <div>
                        <p
                          style={{
                            fontSize: "14px",
                            color: "#475467",
                            fontWeight: 500,
                          }}
                        >
                          Overall Confidence Level{" "}
                          {pieGraph?.confidence ? pieGraph?.confidence : 0} %
                        </p>
                      </div>
                    </div>

                    <div className="d-flex align-items-center justify-content-between">
                      <p
                        className="text-capitalize font-medium text-14"
                        style={{
                          color: "#1F2A37",
                          fontWeight: 700,
                        }}
                      >
                        {pieGraph?.test_name}
                      </p>

                      <div>
                        <span
                          style={{
                            fontSize: "14px",
                            color: "#475467",
                            fontWeight: 500,
                          }}
                        >
                          Total Marks:{" "}
                        </span>
                        {pieGraph?.total && (
                          <span
                            className="px-2"
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
                        )}
                      </div>
                    </div>

                    <div className="d-flex align-items-center">
                      <PieChart
                        series={[{ data: pieGraphReport, innerRadius: 60 }]}
                        {...size}
                      />
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ) : (
              <Col>
                {[1].map((_, i) => (
                  <Skeleton
                    className="rounded-4"
                    width={"550px"}
                    height={"290px"}
                  />
                ))}
              </Col>
            )}
          </Row>

          <Row className="mt-1 g-2">
            {!confidenceLoading ? (
              <Col lg={6}>
                <Card className="shadow rounded-xl border-1">
                  <Card.Body>
                    <p
                      style={{
                        fontSize: "14px",
                        color: "#475467",
                        fontWeight: 500,
                      }}
                    >
                      Confidence VS Performance
                    </p>
                    <div className="d-flex justify-content-center">
                      <BarChart
                        height={225}
                        borderRadius={10}
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
                          return <span>{item?.value?.toString()}</span>;
                        }}
                        xAxis={[{ data: xLabels, scaleType: "band" }]}
                      />
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ) : (
              <Col>
                {[1].map((_, i) => (
                  <Skeleton
                    className="rounded-4"
                    width={"550px"}
                    height={"290px"}
                  />
                ))}
              </Col>
            )}

            {!questionLoading ? (
              <Col lg={6}>
                <Card className="shadow border-1 rounded-xl">
                  <Card.Body>
                    <p
                      style={{
                        fontSize: "14px",
                        color: "#475467",
                        fontWeight: 500,
                      }}
                    >
                      Number of Questions Attempted
                    </p>
                    <div className="d-flex justify-content-center">
                      <BarChart
                        dataset={toatalQuestions}
                        xAxis={[{ scaleType: "band", dataKey: "month" }]}
                        series={[{ dataKey: "count" }]}
                        height={225}
                        borderRadius={10}
                        colors={["#00008b"]}
                      />
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ) : (
              <Col>
                {[1].map((_, i) => (
                  <Skeleton
                    className="rounded-4"
                    width={"550px"}
                    height={"290px"}
                  />
                ))}
              </Col>
            )}
          </Row>
        </Container>
        <ToastContainer />
      </ModuleLayout>
    </>
  );
};

export default Reports;
