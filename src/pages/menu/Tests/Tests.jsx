import React, { useEffect, useState } from "react";
import ModuleLayout from "../../../layout/ModuleLayout";
import {
  TimerIcon,
  CalendarIcon,
  QuestionsIcon,
} from "./components/test-icons";
import TestStartModal from "./components/TestStartModal";
import { toast } from "react-toastify";
import { getError } from "../../../Utils/error";
import { getTests } from "./apis/TestAPIs";
import { useDispatch, useSelector } from "react-redux";
import { setTests } from "../../../features/TestSlice";
import { useNavigate } from "react-router-dom";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import { userProciencys } from "../ProficiencyPercentage/api/proficiencyAPI";
import { setProficiencies } from "../../../features/proficiencySlice";
import HeaderContent from "../../../components/HeaderContent";
import Skeleton from "react-loading-skeleton";

const TestCard = ({
  testId,
  testName,
  timeAlloted,
  completedOn,
  noOfQuestions,
  info,
  btnText,
  isActivePlan,
  completedExam,
}) => {
  const navigate = useNavigate();
  const [testStartModalShow, setTestStartModalShow] = useState(false);

  const openTestStartModal = () => {
    if (!isActivePlan) {
      navigate("/menu/membership");
    } else if (isActivePlan && !completedExam) {
      setTestStartModalShow(true);
    } else {
      navigate(`/menu/tests/check-answers/${testId}?viewScore=true`);
    }
  };

  const closeTestStartModal = () => setTestStartModalShow(false);

  const formatDateTime = (isoString) => {
    const date = new Date(isoString);

    const formattedDate = new Intl.DateTimeFormat("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(date);

    const formattedTime = new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }).format(date);

    return `${formattedDate}, ${formattedTime}`;
  };

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    if (hours === 0) {
      return `${remainingMinutes}min`;
    }

    return `${hours}h : ${remainingMinutes}min`;
  };

  return (
    <div
      className="rounded-lg bg-white p-3 shadow all-card"
      style={{
        border: "1px solid #8F8F8F17",
        boxShadow: "0px 12px 12px 0px #00000005",
      }}
    >
      <h6
        style={{ color: "#475467" }}
        className="text-center text-15 font-bold text-truncate"
      >
        {testName}
      </h6>
      <div className="d-flex flex-column gap-2 mt-4 mb-3">
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex justify-content-between align-items-center gap-1 text-14 font-semibold">
            <TimerIcon /> Allotted Time:
          </div>
          <div className="text-14 font-medium">
            {formatDuration(timeAlloted)}
          </div>
        </div>
        {completedOn && (
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex justify-content-between align-items-center gap-1 text-14 font-semibold">
              <CalendarIcon /> Completed On:
            </div>
            <div className="text-14 font-medium">
              {formatDateTime(completedOn)}
            </div>
          </div>
        )}

        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex justify-content-between align-items-center gap-1 text-14 font-semibold">
            <QuestionsIcon /> No. of Questions:
          </div>
          <div className="text-14 font-medium">{noOfQuestions}</div>
        </div>
      </div>
      {info && (
        <p
          style={{ color: "#475467" }}
          className="text-center text-12 font-medium"
        >
          {info}
        </p>
      )}
      <hr />
      <div className="w-100 d-flex justify-content-center">
        <button
          onClick={openTestStartModal}
          className="view-button text-center font-medium text-14 text-color-primary rounded py-1"
          style={{
            border: "1px solid #00008B",
            boxShadow: "0px 4px 4px 0px #ACD4FF0A",
            width: "8.5rem",
          }}
        >
          {btnText}
        </button>
        <TestStartModal
          testStartModalShow={testStartModalShow}
          closeTestStartModal={closeTestStartModal}
          testId={testId}
          testName={testName}
          timeAlloted={timeAlloted}
          noOfQuestions={noOfQuestions}
          button={btnText}
        />
      </div>
    </div>
  );
};

const Tests = () => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  const { tests } = useSelector((state) => state.tests);
  const { proficiencies } = useSelector((state) => state.proficiency);
  const [testsLoading, setTestsLoading] = useState(false);

  useEffect(() => {
    getAllTest();
    getCompletedExams();
  }, []);

  const getAllTest = async () => {
    try {
      setTestsLoading(true);
      const response = await getTests(user.subdomain, token);
      dispatch(setTests(response));
      setTestsLoading(false);
    } catch (error) {
      toast.error(getError(error));
      setTestsLoading(false);
    }
  };

  const getCompletedExams = async () => {
    try {
      const res = await userProciencys(token);
      dispatch(setProficiencies(res?.reports));
    } catch (error) {
      getError(error);
    }
  };

  return (
    <>
      <HeaderContent content={"Tests"} />
      <ModuleLayout className="ps-3">
        <Container>
          <Row className="g-3">
            {tests.length > 0 ? (
              <>
                <h4
                  style={{
                    color: "#8098F9",
                    fontSize: "1.25rem",
                    fontWeight: 600,
                  }}
                >
                  Exams
                </h4>
                <hr />
                {!testsLoading ? (
                  tests
                    ?.filter(
                      (test) =>
                        test?.status === "Active" && test.test_type === "Exam"
                    )
                    ?.map((test) => (
                      <>
                        <Col lg={4} key={test?._id}>
                          <TestCard
                            testId={test?._id}
                            testName={test?.test_name}
                            timeAlloted={test?.duration_in_mins}
                            noOfQuestions={test?.questions_reference.length}
                            info="Test your knowledge with this MCQ."
                            btnText="Take Exam"
                            isActivePlan={user?.is_active_plan}
                          />
                        </Col>
                      </>
                    ))
                ) : (
                  <div
                    className={`p-2 d-flex justify-conten-center gap-5 flex-wrap mt-4`}
                  >
                    {[1, 2, 3, 4, 5, 6].map((_, i) => (
                      <Skeleton
                        className="rounded-4"
                        width={"350px"}
                        height={"250px"}
                      />
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="text-center">
                <h5>No Exams found!</h5>
              </div>
            )}
          </Row>

          <Row className="mt-2 g-3">
            {tests.length > 0 ? (
              <>
                <h4
                  style={{
                    color: "#8098F9",
                    fontSize: "1.25rem",
                    fontWeight: 600,
                  }}
                >
                  Quiz
                </h4>
                <hr />
                {tests
                  ?.filter(
                    (test) =>
                      test?.status === "Active" && test?.test_type === "Quiz"
                  )
                  ?.map((test) => (
                    <>
                      <Col lg={4} key={test?._id}>
                        <TestCard
                          testId={test?._id}
                          testName={test?.test_name}
                          timeAlloted={test?.duration_in_mins}
                          noOfQuestions={test?.questions_reference.length}
                          info="Test your knowledge with this MCQ."
                          btnText="Take Quiz"
                          isActivePlan={user?.is_active_plan}
                        />
                      </Col>
                    </>
                  ))}
              </>
            ) : (
              <div className="text-center">
                <h5>No Quiz found!</h5>
              </div>
            )}
          </Row>

          <Row className="mt-2 g-3">
            {proficiencies.length > 0 ? (
              <>
                <h4
                  style={{
                    color: "#8098F9",
                    fontSize: "1.25rem",
                    fontWeight: 600,
                  }}
                >
                  Review Completed Exam-Scoreboard
                </h4>
                <hr />
                {proficiencies?.map((num, idx) => (
                  <>
                    <Col md={4}>
                      <TestCard
                        key={idx}
                        testId={num?._id}
                        testName={num?.test?.test_name}
                        timeAlloted={num?.test?.duration_in_mins}
                        completedOn={num?.createdAt}
                        noOfQuestions={num?.total}
                        btnText="View Score"
                        completedExam={true}
                        isActivePlan={user?.is_active_plan}
                      />
                    </Col>
                  </>
                ))}
              </>
            ) : (
              <div className="text-center">
                <h5>No Completed exams found!</h5>
              </div>
            )}
          </Row>
        </Container>
      </ModuleLayout>
    </>
  );
};

export default Tests;
