import React, { useEffect, useState } from "react";
import Stack from "react-bootstrap/Stack";
import {
  DateCalendarIcon,
  ClockIcon,
  ArrowLeftOutlinedIcon24,
  ArrowRightOutlinedIcon24,
} from "./icons/take-test-icons";
import {
  ExplanationIcon,
  FlagIcon,
  RightAnswerCheckIcon,
  WrongAnswerCrossIcon,
} from "./icons/check-answers-icons";
import { ToastContainer, toast } from "react-toastify";
import { getError } from "../Utils/error";
import { getReport } from "../pages/menu/Tests/apis/TestAPIs";
import { useDispatch, useSelector } from "react-redux";
import { setReport } from "../features/reportSlice";
import { Carousel, Spinner } from "react-bootstrap";
import CreateMarkup from "../Utils/CreateMarkup";
import { useLocation, useParams } from "react-router-dom";

const CheckAnswerComponent = ({ hideDateTimeAlloted }) => {
  const location = useLocation();
  const from = location.search.includes("viewScore");
  const { testID } = useParams();
  const opt = ["A", "B", "C", "D"];
  const dispatch = useDispatch();
  const reportID = from ? testID : localStorage.getItem("reportID");
  const token = localStorage.getItem("token");
  const { report } = useSelector((state) => state.reports);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const currentQuestion =
    report.test &&
    report.test.questions_reference.length > 0 &&
    report.test.questions_reference[currentQuestionIndex];
  const [answers, setAnswers] = useState([]);
  const [questions, setQuestion] = useState([]);
  const [correctOption, setCorrectOption] = useState("");

  useEffect(() => {
    if (reportID) {
      getResult();
    }
  }, []);

  useEffect(() => {
    if (report?.test) {
      setAnswers(report?.answers);
      setQuestion(currentQuestion.options);
      for (let option in currentQuestion.options) {
        if (
          currentQuestion.options[option] === currentQuestion.correct_option
        ) {
          setCorrectOption(opt[option]);
        }
      }
    }
  }, [report, currentQuestionIndex]);

  const getResult = async () => {
    try {
      const response = await getReport(reportID, token);
      dispatch(setReport(response));
    } catch (error) {
      toast.error(getError(error));
    }
  };

  // ========= current date and time ==========
  const formatDate = (date) => {
    const options = {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };
    return date.toLocaleString("en-GB", options).replace(",", "");
  };
  const now = new Date();
  const formattedDate = formatDate(now);

  function convertMinutesToHHMM(minutes) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;

    const paddedHours = String(hours).padStart(2, "0");
    const paddedMinutes = String(mins).padStart(2, "0");

    return `${paddedHours}h:${paddedMinutes}min`;
  }

  const goToPrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((p) => p - 1);
    }
  };

  const goToNextQuestion = () => {
    if (currentQuestionIndex < report?.test?.questions_reference.length - 1) {
      setCurrentQuestionIndex((p) => p + 1);
    }
  };

  return (
    <div className="bg-white position-relative">
      <ToastContainer />
      <div
        className="position-fixed d-flex justify-content-center align-items-center"
        style={{
          border: "1px solid #F7F7F7",
          boxShadow: "0px 2px 12px 0px #D2D6DB3D",
          height: "42px",
          bottom: "1rem",
          right: "1rem",
          zIndex: 1000,
        }}
      >
        <div
          className="h-100 px-2 d-flex align-items-center rounded-start bg-white cursor-pointer"
          onClick={goToPrevQuestion}
        >
          <ArrowLeftOutlinedIcon24 />
        </div>
        <div
          className="h-100 px-2 d-flex align-items-center gap-1 bg-white text-14 font-light"
          style={{
            borderLeft: "1px solid #E5E7EB",
            borderRight: "1px solid #E5E7EB",
            minWidth: "4rem",
          }}
        >
          <span className="font-medium">{currentQuestionIndex + 1}</span>
          <span>/</span>
          <span>{report?.total && report?.total}</span>
        </div>
        <div
          className="h-100 px-2 d-flex align-items-center rounded-end bg-white cursor-pointer"
          onClick={goToNextQuestion}
        >
          <ArrowRightOutlinedIcon24 />
        </div>
      </div>
      <div
        className="d-flex flex-wrap gap-2 justify-content-between py-2 px-4"
        style={{
          backgroundColor: "#C3D3FF33",
        }}
      >
        <div className="d-flex flex-column justify-content-center align-items-center gap-2">
          <h5 className="text-14 font-semibold">
            {report?.test && report?.test?.test_name}:
          </h5>
          <button
            className="rounded text-16 font-medium bg-white"
            style={{
              border: "1px solid #4AFF3A",
              boxShadow: "0px 12px 42px 0px #12DD001A",
              height: "2rem",
              width: "10.5rem",
              color: "#14FF00",
            }}
          >
            View score
          </button>
        </div>
        <div className="d-flex flex-wrap gap-4">
          <div
            className="bg-white py-2 px-3 rounded d-flex flex-column justify-content-between"
            style={{
              borderLeft: "5px solid #A4BCFD",
              height: "6rem",
              width: "10.5rem",
            }}
          >
            <p className="my-0 text-14 font-semibold">
              Overall Confidence Level:
            </p>
            <p className="my-0 text-14 font-bold" style={{ color: "#12DD00" }}>
              {report?.confidence && report?.confidence}%
            </p>
          </div>
          {!hideDateTimeAlloted && (
            <div
              className="bg-white py-3 px-3 rounded d-flex flex-column justify-content-between"
              style={{
                borderLeft: "5px solid #A4BCFD",
                height: "6rem",
              }}
            >
              <div className="d-flex gap-2 align-items-center">
                <span>
                  <DateCalendarIcon />
                </span>
                <span className="text-14 font-semibold">Date:</span>
                <span className="text-12 font-medium text-color-primary">
                  {report?.test && formattedDate}
                </span>
              </div>
              <div className="d-flex gap-2 align-items-center">
                <span>
                  <ClockIcon />
                </span>
                <span className="text-14 font-semibold">Time Allotted: </span>
                <span className="text-12 font-medium text-color-primary">
                  {report?.test &&
                    convertMinutesToHHMM(report?.test.duration_in_mins)}
                </span>
              </div>
            </div>
          )}
          <div
            className="bg-white py-3 px-3 rounded d-flex flex-column justify-content-between"
            style={{
              borderLeft: "5px solid #A4BCFD",
              height: "6rem",
              width: "13.5rem",
            }}
          >
            <div className="d-flex justify-content-between align-items-center">
              <span className="text-14 font-semibold">Wrong Answers:</span>
              <span className="text-14 font-bold" style={{ color: "#FF1616" }}>
                {report?.wrong_answers && report?.wrong_answers}
              </span>
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <span className="text-14 font-semibold">
                Attempted Questions:
              </span>
              <span className="text-14 font-bold text-color-secondary">
                {report?.attempt && report?.attempt}
              </span>
            </div>
          </div>
          <div
            className="bg-white py-3 px-3 rounded d-flex flex-column justify-content-between"
            style={{
              borderLeft: "5px solid #A4BCFD",
              height: "6rem",
              width: "11rem",
            }}
          >
            <div className="d-flex justify-content-between align-items-center">
              <span className="text-14 font-semibold">Your Score:</span>
              <div className="text-16">
                <span className="font-bold" style={{ color: "#00B132" }}>
                  {report?.correct_answers && report?.correct_answers}
                </span>
                <span className="font-semibold" style={{ color: "#4E4E4E" }}>
                  /{report?.total && report?.total}
                </span>
              </div>
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <span className="text-14 font-semibold">Percentage:</span>
              <span className="text-16 font-bold" style={{ color: "#00B132" }}>
                {report?.percentage && report?.percentage}%
              </span>
            </div>
          </div>
        </div>
      </div>

      <div
        className="my-3 py-2 px-4 d-flex gap-3 flex-wrap"
        style={{
          backgroundColor: "#F3F4F6",
        }}
      >
        {report?.test && report?.answers.length > 0 ? (
          report?.answers.map((ans, idx) => {
            if (ans?.flag) {
              return (
                <div
                  key={idx}
                  className="d-flex flex-column justify-content-center align-items-center text-white"
                  style={{
                    width: "1.95rem",
                    height: "42px",
                    backgroundColor:
                      ans?.status === "Wrong" ? "#FF1616" : " #0C9400",
                    borderRadius: "4.46px",
                  }}
                >
                  <FlagIcon />
                  <span>{idx + 1}</span>
                </div>
              );
            }
            return (
              <div
                key={idx}
                className="d-flex flex-column justify-content-center align-items-center text-white"
                style={{
                  width: "1.95rem",
                  height: "42px",
                  backgroundColor:
                    ans?.status === "Correct" ? "#0C9400" : "#FF1616",
                  borderRadius: "4.46px",
                }}
              >
                {idx + 1}
              </div>
            );
          })
        ) : (
          <div>
            <Spinner />
          </div>
        )}
      </div>

      <hr className="my-0 mx-4" style={{ border: "1px solid #B4B4B4" }} />

      <div className="px-4 py-2">
        <h5 className="text-18 font-bold text-color-navy">
          Question No {currentQuestionIndex + 1}
        </h5>
        <p className="text-16 font-semibold">
          {<CreateMarkup content={report?.test && currentQuestion?.question} />}
        </p>

        <div className="d-flex gap-4">
          <div className="flex-1">
            <div
              className="rounded-xl text-center py-1"
              // style={currentQuestion?.images && { border: "1px solid #D2D6DB" }}
            >
              <Carousel>
                {report?.test &&
                  currentQuestion?.images?.map((img, idx) => {
                    return (
                      <Carousel.Item key={idx}>
                        <img
                          style={{
                            height: "200px",
                            width: "100%",
                            objectFit: "contain",
                          }}
                          src={`https://creative-story.s3.amazonaws.com${img}`}
                          alt="..."
                        />
                      </Carousel.Item>
                    );
                  })}
              </Carousel>
            </div>

            <div className="my-2">
              <div className="d-flex gap-2 align-items-end">
                <span>
                  <ExplanationIcon />
                </span>
                <h6 className="my-0 text-16 font-semibold text-color-navy">
                  Explanation:
                </h6>
              </div>
              <p className="my-2 text-14 font-medium">
                The correct answer is :{" "}
                <span
                  style={{ backgroundColor: "#12DD001F", color: "#008D28" }}
                  className="text-16 font-semibold p-1 rounded"
                >
                  {correctOption}
                </span>{" "}
              </p>

              <p className="text-16 font-normal" style={{ color: "#292929" }}>
                {
                  <CreateMarkup
                    content={
                      report?.test && currentQuestion?.explanation?.description
                    }
                  />
                }
              </p>
            </div>

            <div className="d-flex gap-3">
              <div className="flex-1">
                <h5 className="text-16 font-semibold text-color-navy">
                  Reference Links:
                </h5>
                <ul>
                  {report?.test &&
                    currentQuestion?.sub_topic_reference?.references?.map(
                      (ref, idx) => {
                        return (
                          <li className="my-2" key={idx}>
                            <a className="text-color-secondary" href={ref}>
                              {ref}
                            </a>
                          </li>
                        );
                      }
                    )}
                </ul>
              </div>
              <div className="flex-1">
                <h5 className="text-16 font-semibold text-color-navy">
                  Images:
                </h5>
                <div className="d-flex gap-3">
                  {report?.test &&
                    currentQuestion?.sub_topic_reference?.images?.map(
                      (img, idx) => {
                        return (
                          <img
                            style={{ width: "50px", height: "50px" }}
                            key={idx}
                            src={`https://creative-story.s3.amazonaws.com${img}`}
                            alt="check-answer-2"
                          />
                        );
                      }
                    )}
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1">
            <Stack gap={2}>
              {questions?.map((data, idx) => {
                return (
                  <>
                    <div
                      className="d-flex gap-1 p-1"
                      style={{
                        backgroundColor:
                          data === currentQuestion?.correct_option
                            ? "#02D33D14"
                            : "",
                      }}
                      key={idx}
                    >
                      <span>
                        {data === currentQuestion?.correct_option && (
                          <RightAnswerCheckIcon />
                        )}
                      </span>

                      <span>
                        {answers[currentQuestionIndex]?.status === "Wrong" &&
                          answers[currentQuestionIndex]?.selected === data && (
                            <WrongAnswerCrossIcon />
                          )}
                      </span>
                      <span
                        className="text-16 font-bold"
                        style={{
                          minWidth: "max-content",
                          color:
                            data === currentQuestion?.correct_option
                              ? "#00BA00"
                              : "",
                        }}
                      >
                        {opt[idx]}
                      </span>
                      <p
                        className="my-0 text-16 font-medium"
                        style={{
                          color:
                            data === currentQuestion?.correct_option
                              ? "#00BA00"
                              : "",
                        }}
                      >
                        {data}
                      </p>
                    </div>
                  </>
                );
              })}
            </Stack>
            <hr />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckAnswerComponent;
