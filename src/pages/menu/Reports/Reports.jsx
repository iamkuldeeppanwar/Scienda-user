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
} from "./api/reportApi";
import { PieChart } from "@mui/x-charts/PieChart";

const size = {
  width: 400,
  height: 200,
};

// const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
// const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
// const xLabels = [
//   "Page A",
//   "Page B",
//   "Page C",
//   "Page D",
//   "Page E",
//   "Page F",
//   "Page G",
// ];

const Reports = () => {
  const token = localStorage.getItem("token");
  const [reportGraph, setReportGraph] = useState([]);
  const [pieGraph, setPieGraph] = useState("");
  const [pieGraphReport, setPieGraphReport] = useState([]);
  const [uData, setUData] = useState([]);
  const [pData, setPData] = useState([]);
  const [xLabels, setXLabels] = useState([]);

  useEffect(() => {
    getGraphReport();
    getPieGraphReport();
    getReportConfidence();
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
                    No. of test given
                  </h4>
                  <BarChart
                    sx={{ marginLeft: "-50px" }}
                    dataset={reportGraph}
                    xAxis={[{ scaleType: "band", dataKey: "month" }]}
                    series={[{ dataKey: "count" }]}
                    width={350}
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
                    series={[{ data: pieGraphReport, innerRadius: 80 }]}
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
                        label: "pv",
                        id: "pvId",
                        color: "#F5BE08",
                      },
                      {
                        data: uData,
                        label: "uv",
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
        </Row>
      </Container>
    </ModuleLayout>

    // <ModuleLayout>
    //     <h2 className='font-semibold text-32'>Your Reports</h2>

    //     <div className='bg-white p-3 d-flex justify-content-between my-3 rounded-xl'
    //         style={{
    //             border: '1px solid #BABABA1F',
    //             boxShadow: '0px 4px 12px 2px #4D4D4D0A'
    //         }}
    //     >
    //         <div className='w-45 ps-2 pe-4 border-end border-2'>
    //             <div className='d-flex justify-content-between align-items-center'>
    //                 <h4 className='text-20 font-semibold text-color-secondary'>Specialty Modules</h4>
    //                 <span><ThreeDotsIcon /></span>
    //             </div>
    //             <div className='d-flex justify-content-between align-items-center my-3 gap-5'>
    //                 <div className='d-flex justify-content-between align-items-center flex-grow-1'>
    //                     <p className='m-0 text-16 font-light flex-grow-1'>Enrolled Modules</p>
    //                     <span className='text-16 font-bold text-color-secondary text-decoration-underline'>12</span>
    //                 </div>
    //                 <div className='text-12 font-medium text-color-primary cursor-pointer'>View <span><ViewEyeIcon /></span></div>
    //             </div>
    //             <div className='d-flex justify-content-between align-items-center my-3 gap-5'>
    //                 <div className='d-flex justify-content-between align-items-center flex-grow-1'>
    //                     <p className='m-0 text-16 font-light flex-grow-1'>Completed Modules</p>
    //                     <span className='text-16 font-bold text-color-secondary text-decoration-underline'>12</span>
    //                 </div>
    //                 <div className='text-12 font-medium text-color-primary cursor-pointer'>View <span><ViewEyeIcon /></span></div>
    //             </div>
    //             <div className='d-flex justify-content-between align-items-center my-3 gap-5'>
    //                 <div className='d-flex justify-content-between align-items-center flex-grow-1'>
    //                     <p className='m-0 text-16 font-light flex-grow-1'>Topics Covered</p>
    //                     <span className='text-16 font-bold text-color-secondary text-decoration-underline'>12</span>
    //                 </div>
    //                 <div className='text-12 font-medium text-color-primary cursor-pointer'>View <span><ViewEyeIcon /></span></div>
    //             </div>
    //             <div className='d-flex justify-content-between align-items-center my-3 gap-5'>
    //                 <div className='d-flex justify-content-between align-items-center flex-grow-1'>
    //                     <p className='m-0 text-16 font-light flex-grow-1'>Best Performance Modules</p>
    //                     <span className='text-16 font-bold text-color-secondary text-decoration-underline'>12</span>
    //                 </div>
    //                 <div className='text-12 font-medium text-color-primary cursor-pointer'>View <span><ViewEyeIcon /></span></div>
    //             </div>
    //         </div>
    //         <div className='ps-3 flex-grow-1'>
    //             <h4 className='text-20 font-semibold text-color-secondary'>Ongoing Specialty Modules</h4>
    //             <div className='d-flex justify-content-between align-items-center my-2 text-14 font-medium'>
    //                 <p className='m-0'>Speciality Module 1: <span className='font-semibold text-color-secondary'>Robotics</span></p>
    //                 <span><ThreeDotsIcon /></span>
    //             </div>
    //             <div className='d-flex justify-content-between align-items-center'>
    //                 <span className="cursor-pointer"><LeftArrowFilledIcon /></span>
    //                 <div
    //                     className='font-normal text-12 p-2 rounded-lg'
    //                     style={{
    //                         height: '7.5rem',
    //                         width: '9.25rem',
    //                         border: '0.9px solid #CDCDCD3D',
    //                         boxShadow: '0px 3.59px 10.77px 0px #BEBEBE0A',
    //                         color: '#595959',
    //                     }}
    //                 >
    //                     Topic Wise
    //                 </div>
    //                 <div
    //                     className='font-normal text-12 p-2 rounded-lg'
    //                     style={{
    //                         height: '7.5rem',
    //                         width: '9.25rem',
    //                         border: '0.9px solid #CDCDCD3D',
    //                         boxShadow: '0px 3.59px 10.77px 0px #BEBEBE0A',
    //                         color: '#595959',
    //                     }}
    //                 >
    //                     Topic Wise Time Spent
    //                 </div>
    //                 <div
    //                     className='font-normal text-12 p-2 rounded-lg'
    //                     style={{
    //                         height: '7.5rem',
    //                         width: '9.25rem',
    //                         border: '0.9px solid #CDCDCD3D',
    //                         boxShadow: '0px 3.59px 10.77px 0px #BEBEBE0A',
    //                         color: '#595959',
    //                     }}
    //                 >
    //                     Performance wise Topics
    //                 </div>
    //                 <span className="cursor-pointer"><RightArrowFilledIcon /></span>
    //             </div>
    //             <hr />
    //             <div className='d-flex justify-content-center align-items-center gap-2'>
    //                 <span className="cursor-pointer"><LeftArrowFilledIcon /></span>
    //                 <span className="cursor-pointer"><RightArrowFilledIcon /></span>
    //             </div>
    //         </div>
    //     </div>

    //     <div className='w-65 bg-white p-3 py-4 rounded-xl'
    //         style={{
    //             border: '1px solid #BABABA1F',
    //             boxShadow: '0px 4px 12px 2px #4D4D4D0A'
    //         }}
    //     >
    //         <h4 className='text-20 font-semibold text-color-secondary'>Most Challenging Specialty</h4>
    //         <div className='d-flex justify-content-between'>
    //             <div className='d-flex flex-column row-gap-3 pe-3 py-3 flex-grow-1 border-end'>
    //                 <div className='d-flex justify-content-between align-items-center'>
    //                     <span className='text-16 font-light' style={{ color: '#424242' }}>Robotics</span>
    //                     <span className='text-12 font-medium text-color-primary cursor-pointer'>View <span><ViewEyeIcon /></span></span>
    //                 </div>
    //                 <div className='d-flex justify-content-between align-items-center'>
    //                     <span className='text-16 font-light' style={{ color: '#424242' }}>Science & Tech</span>
    //                     <span className='text-12 font-medium text-color-primary cursor-pointer'>View <span><ViewEyeIcon /></span></span>
    //                 </div>
    //                 <div className='d-flex justify-content-between align-items-center'>
    //                     <span className='text-16 font-light' style={{ color: '#424242' }}>Mathematics</span>
    //                     <span className='text-12 font-medium text-color-primary cursor-pointer'>View <span><ViewEyeIcon /></span></span>
    //                 </div>
    //                 <div className='d-flex justify-content-between align-items-center'>
    //                     <span className='text-16 font-light' style={{ color: '#424242' }}>Banking</span>
    //                     <span className='text-12 font-medium text-color-primary cursor-pointer'>View <span><ViewEyeIcon /></span></span>
    //                 </div>
    //             </div>
    //             <div className='d-flex flex-column row-gap-3 px-3 py-3 flex-grow-1'>
    //                 <div className='d-flex justify-content-between align-items-center'>
    //                     <span className='text-16 font-light' style={{ color: '#424242' }}>Robotics</span>
    //                     <span className='text-12 font-medium text-color-primary cursor-pointer'>View <span><ViewEyeIcon /></span></span>
    //                 </div>
    //                 <div className='d-flex justify-content-between align-items-center'>
    //                     <span className='text-16 font-light' style={{ color: '#424242' }}>Science & Tech</span>
    //                     <span className='text-12 font-medium text-color-primary cursor-pointer'>View <span><ViewEyeIcon /></span></span>
    //                 </div>
    //                 <div className='d-flex justify-content-between align-items-center'>
    //                     <span className='text-16 font-light' style={{ color: '#424242' }}>Mathematics</span>
    //                     <span className='text-12 font-medium text-color-primary cursor-pointer'>View <span><ViewEyeIcon /></span></span>
    //                 </div>
    //                 <div className='d-flex justify-content-between align-items-center'>
    //                     <span className='text-16 font-light' style={{ color: '#424242' }}>Banking</span>
    //                     <span className='text-12 font-medium text-color-primary cursor-pointer'>View <span><ViewEyeIcon /></span></span>
    //                 </div>
    //             </div>
    //         </div>
    //     </div>

    //     <div className='w-100 bg-white p-3 py-4 rounded-xl my-4'
    //         style={{
    //             border: '1px solid #BABABA1F',
    //             boxShadow: '0px 4px 12px 2px #4D4D4D0A'
    //         }}
    //     >
    //         <h4 className='text-20 font-semibold text-color-secondary'>Confidence VS Performance</h4>
    //         <div className='d-flex justify-content-around align-items-center mt-4'>
    //             <Stack gap={3} direction="horizontal">
    //                 <Stack gap={2} direction="horizontal" className='text-14 font-normal' style={{ color: '#475467'}}>
    //                     <span className='d-block rounded' style={{ height: '8px', width: '8px', backgroundColor: '#7F56D9'}}></span>
    //                     Robotics
    //                 </Stack>
    //                 <Stack gap={2} direction="horizontal" className='text-14 font-normal' style={{ color: '#475467'}}>
    //                     <span className='d-block rounded' style={{ height: '8px', width: '8px', backgroundColor: '#B692F6'}}></span>
    //                     Maths
    //                 </Stack>
    //                 <Stack gap={2} direction="horizontal" className='text-14 font-normal' style={{ color: '#475467'}}>
    //                     <span className='d-block rounded' style={{ height: '8px', width: '8px', backgroundColor: '#53389E'}}></span>
    //                     Coding
    //                 </Stack>
    //             </Stack>
    //             <Stack gap={3} direction="horizontal">
    //                 <Stack gap={2} direction="horizontal" className='text-14 font-normal' style={{ color: '#475467'}}>
    //                     <span className='d-block rounded' style={{ height: '8px', width: '8px', backgroundColor: '#7F56D9'}}></span>
    //                     Series 1
    //                 </Stack>
    //                 <Stack gap={2} direction="horizontal" className='text-14 font-normal' style={{ color: '#475467'}}>
    //                     <span className='d-block rounded' style={{ height: '8px', width: '8px', backgroundColor: '#B692F6'}}></span>
    //                     Series 2
    //                 </Stack>
    //                 <Stack gap={2} direction="horizontal" className='text-14 font-normal' style={{ color: '#475467'}}>
    //                     <span className='d-block rounded' style={{ height: '8px', width: '8px', backgroundColor: '#53389E'}}></span>
    //                     Series 3
    //                 </Stack>
    //             </Stack>
    //         </div>
    //         {/* <hr className='w-90 mx-auto' /> */}
    //     </div>
    // </ModuleLayout>
  );
};

export default Reports;
