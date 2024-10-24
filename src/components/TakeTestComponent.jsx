import React, { useEffect, useState } from "react";
import {
  DateCalendarIcon,
  StopWatchIcon,
  ClockIcon,
  RedFlagIcon,
  BlackFlagIcon,
  CalculatorIcon,
  TakeNotesIcon,
  ArrowLeftOutlinedIcon24,
  ArrowRightOutlinedIcon24,
  ArrowLeftOutlinedIcon20,
  ArrowRightOutlinedIcon20,
  CheckedAnswerIcon,
  UnCheckedAnswerIcon,
  IKnowItIcon,
  ThinkSoIcon,
  NotSureIcon,
  NoIdeaIcon,
} from "./icons/take-test-icons";
import { convertToTwoDigits } from "../lib/TakeTest";
import { Carousel, Modal } from "react-bootstrap";
import CreateMarkup from "../Utils/CreateMarkup";
import Calc from "./Calc";
import { submitTest } from "../pages/menu/Tests/apis/TestAPIs";
import { toast } from "react-toastify";
import { getError } from "../Utils/error";
import { useNavigate } from "react-router-dom";
import CreateArea from "./CreateArea";

const UnFlaggedOption = (props) => {
  return (
    <div
      className="d-flex flex-column align-items-center py-1 px-3 rounded-lg cursor-pointer"
      style={{
        border: "1px solid #D9D9D9",
        boxShadow: "0px 2px 12px 0px #D1D1D10A",
        backgroundColor: "#9D9D9D0A",
      }}
      onClick={props.toggleQuestionFlag}
    >
      <span>
        <BlackFlagIcon />
      </span>
      <span className="text-8 font-medium">Flag Que.</span>
    </div>
  );
};

const FlaggedOption = (props) => {
  return (
    <div
      className="d-flex flex-column align-items-center py-1 px-3 rounded-lg cursor-pointer"
      style={{
        border: "1px solid #FFAEAE",
        boxShadow: "0px 2px 12px 0px #D1D1D10A",
        backgroundColor: "#FF16160A",
      }}
      onClick={props.toggleQuestionFlag}
    >
      <span>
        <RedFlagIcon />
      </span>
      <span className="text-8 font-medium" style={{ color: "#FF1616" }}>
        Flagged
      </span>
    </div>
  );
};

const CheckedOption = ({ option, optionNumber }) => {
  const questionMap = ["A", "B", "C", "D"];

  return (
    <div className="d-flex justify-content-between align-items-center rounded-xl px-2 py-2 bg-color-light">
      <div className="d-flex flex-grow-1 gap-3 text-color-primary text-16">
        <span className="font-bold">{`[${questionMap[optionNumber]}]`}</span>
        <p
          className="m-0 font-medium"
          style={{
            maxWidth: "75%",
            textWrap: "stable",
          }}
        >
          {option}
        </p>
      </div>
      <span className="cursor-pointer">
        <CheckedAnswerIcon />
      </span>
    </div>
  );
};

const UncheckedOption = ({ option, optionNumber, onUncheckedOptionClick }) => {
  const questionMap = ["A", "B", "C", "D"];

  return (
    <div className="d-flex justify-content-between align-items-center px-2 py-2">
      <div className="d-flex  flex-wrap flex-grow-1 gap-3 text-16">
        <span className="font-bold text-color-primary">{`[${questionMap[optionNumber]}]`}</span>
        <p
          className="m-0 font-normal"
          style={{
            maxWidth: "75%",
            textWrap: "stable",
            overflowX: "hidden",
          }}
        >
          {option}
        </p>
      </div>
      <span
        className="cursor-pointer"
        onClick={() => onUncheckedOptionClick(optionNumber)}
      >
        <UnCheckedAnswerIcon />
      </span>
    </div>
  );
};

const TakeTestComponent = (props) => {
  const currentQuestion = props?.currentQuestion;
  const [active, setActive] = useState(1);
  const [openCalc, setOpenCalc] = useState(false);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [openNotes, setOpenNotes] = useState(false);

  useEffect(() => {
    if (currentQuestion?.confidence === "I KNOW IT") {
      setActive(1);
    } else if (currentQuestion?.confidence === "THINK SO") {
      setActive(2);
    } else if (currentQuestion?.confidence === "NOT SURE") {
      setActive(3);
    } else if (currentQuestion?.confidence === "NO IDEA") {
      setActive(4);
    } else {
      setActive(1);
    }
  }, [props]);

  function convertMinutesToHHMM(minutes) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;

    const paddedHours = String(hours).padStart(2, "0");
    const paddedMinutes = String(mins).padStart(2, "0");

    return `${paddedHours}h:${paddedMinutes}min`;
  }

  const localStorageKey = "timerTimeLeft";

  // Function to get the initial time left from localStorage or props
  const getInitialTime = () => {
    const savedTime = localStorage.getItem(localStorageKey);

    if (savedTime && !isNaN(savedTime)) {
      const parsedTime = parseInt(savedTime, 10);
      return parsedTime;
    }

    if (props.timeAlloted && !isNaN(props.timeAlloted)) {
      const initialTime = props.timeAlloted * 60;
      return initialTime;
    }

    return 0;
  };

  const [timeLeft, setTimeLeft] = useState(getInitialTime());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(intervalId);
          localStorage.removeItem(localStorageKey);
          submitTestOnTime();
          return 0;
        }
        const newTime = prevTime - 1;
        if (newTime !== NaN) {
          localStorage.setItem(localStorageKey, newTime);
        }
        return newTime;
      });
    }, 1000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  // Function to format the time left
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours < 10 ? "0" : ""}${hours}:${
      minutes < 10 ? "0" : ""
    }${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  useEffect(() => {
    const initialTime = props?.timeAlloted * 60;
    setTimeLeft(initialTime);
    if (
      !localStorage.getItem(localStorageKey) &&
      localStorage.getItem(localStorageKey) !== NaN
    ) {
      localStorage.setItem(localStorageKey, initialTime);
    }
  }, [props?.timeAlloted]);

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

  const submitTestOnTime = async () => {
    try {
      let questions = JSON.parse(localStorage.getItem(props?.testID));
      const arr = questions.map((qnts) => {
        let obj = {};
        if (qnts.hasOwnProperty("confidence")) {
          obj.comment = qnts.confidence;
        } else {
          obj.comment = "I KNOW IT";
        }
        if (qnts.hasOwnProperty("questionFlagged")) {
          obj.flag = qnts.questionFlagged;
        } else {
          obj.flag = false;
        }

        obj.selected = qnts.options[qnts.selectedOption];

        return obj;
      });
      const response = await submitTest(arr, props?.testID, token);
      localStorage.setItem("reportID", response?.reportcard);
      localStorage.removeItem(props?.testID);
      navigate(`/menu/tests/check-answers/${props?.testID}`);
    } catch (error) {
      toast.error(getError(error));
    }
  };

  return (
    <div>
      <Modal
        style={{ margin: "0", padding: "0" }}
        size="sm"
        show={openCalc}
        onHide={setOpenCalc}
      >
        <Calc />
      </Modal>

      <Modal
        style={{ margin: "0", padding: "0" }}
        show={openNotes}
        onHide={setOpenNotes}
      >
        <CreateArea
          questions={props?.questions}
          currentQuestionIndex={props?.currentQuestionIndex}
          setQuestions={props?.setQuestions}
        />
      </Modal>

      <header
        className="d-flex flex-wrap justify-content-between align-items-center px-4 py-0"
        style={{ backgroundColor: "#C3D3FF33" }}
      >
        <h5
          style={{ color: "rgb(128, 152, 249)" }}
          className="text-26 font-semibold"
        >
          {props?.subDomain} Test
        </h5>

        <div className="d-flex flex-wrap align-items-center justify-content-end gap-3 py-2">
          <div className="text-14 font-medium">
            <DateCalendarIcon /> Date:{" "}
            <span className="text-12 font-medium text-color-primary">
              {formattedDate}
            </span>
          </div>

          <div
            className="bg-white d-flex flex-column px-2 py-2"
            style={{
              borderLeft: "5px solid #A4BCFD",
              minWidth: "14rem",
              borderRadius: "10px",
            }}
          >
            <div className="d-flex justify-content-between align-items-center">
              <span className="text-14 font-semibold">Missing Question:</span>
              <span className="text-14 font-medium text-color-secondary">
                {convertToTwoDigits(props?.missingQuestions)}
              </span>
            </div>

            <div className="d-flex justify-content-between align-items-center mt-1 ">
              <span className="text-14 font-semibold">
                Attempted Question:{" "}
              </span>
              <span className="text-14 font-medium text-color-secondary">
                {convertToTwoDigits(props?.attemptedQuestions)}
              </span>
            </div>
          </div>

          <div
            className="bg-white d-flex flex-column justify-content-around align-items-center px-3 py-1"
            style={{
              borderLeft: "5px solid #A4BCFD",
              // minWidth: "14rem",
              borderRadius: "10px",
            }}
          >
            <div className="d-flex">
              <span className="bg-color-primary px-1 rounded-start">
                <StopWatchIcon />
              </span>
              <p className="m-0 p-1 px-2 bg-color-light rounded-end">
                <span className="text-14 font-medium">Time Left : </span>
                <span
                  className="text-12 font-medium"
                  style={{ color: "#FF3D00" }}
                >
                  {formatTime(timeLeft)}
                </span>
              </p>
            </div>

            <div className="d-flex justify-content-around align-items-center gap-2">
              <span
                className="text-14 font-medium"
                style={{ color: "#2D3282" }}
              >
                Allotted Time:
              </span>
              <span className="text-12 font-medium">
                {convertMinutesToHHMM(props.timeAlloted)}
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="px-4 py-2">
        <div className="d-flex flex-wrap justify-content-between align-items-center">
          <div className="d-flex flex-wrap justify-content-start align-items-center gap-4">
            <h5 className="text-18 font-bold" style={{ color: "#2B3674" }}>
              Question No. {props?.currentQuestionIndex + 1}
            </h5>
            {currentQuestion && currentQuestion?.questionFlagged ? (
              <FlaggedOption toggleQuestionFlag={props?.toggleQuestionFlag} />
            ) : (
              <UnFlaggedOption toggleQuestionFlag={props?.toggleQuestionFlag} />
            )}

            {/* {props.goToLastQuestion && (
              <Button onClick={props.goToLastQuestion}>
                Go to last question
              </Button>
            )} */}
          </div>

          <div className="d-flex flex-wrap justify-content-end align-items-center gap-3">
            <div
              className="shadow py-2 px-2 d-flex flex-column justify-content-center align-items-center gap-1 bg-white rounded-xl"
              style={{
                cursor: "pointer",
              }}
              onClick={() => setOpenCalc(true)}
            >
              <CalculatorIcon />
              <span
                className="text-10 font-medium"
                style={{
                  boxShadow: "0px 2px 12px 0px #D1D1D10A",
                }}
              >
                Calculator
              </span>
            </div>

            <div
              className="shadow py-2 px-2 d-flex flex-column justify-content-center align-items-center gap-1 bg-white rounded-xl"
              style={{
                cursor: "pointer",
              }}
              onClick={() => setOpenNotes(true)}
            >
              <TakeNotesIcon />
              <span
                className="text-10 font-medium"
                style={{
                  boxShadow: "0px 2px 12px 0px #D1D1D10A",
                }}
              >
                Take Notes
              </span>
            </div>

            <div
              className="d-flex justify-content-center align-items-center"
              style={{
                border: "1px solid #F7F7F7",
                boxShadow: "0px 2px 12px 0px #D2D6DB3D",
                height: "42px",
              }}
            >
              <div
                className="h-100 px-2 d-flex align-items-center rounded-start bg-white cursor-pointer"
                onClick={props?.goToPrevQuestion}
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
                <span className="font-medium">
                  {props?.currentQuestionIndex + 1}
                </span>
                <span>/</span>
                <span>{props?.questionsLength}</span>
              </div>
              <div
                className="h-100 px-2 d-flex align-items-center rounded-end bg-white cursor-pointer"
                onClick={props?.goToNextQuestion}
              >
                <ArrowRightOutlinedIcon24 />
              </div>
            </div>
          </div>
        </div>

        <hr />

        <div>
          <div
            className="text-16 "
            // style={{
            //   textWrap: "stable",
            //   overflowX: "hidden",
            // }}
          >
            {currentQuestion && (
              <CreateMarkup content={currentQuestion?.question} />
            )}
          </div>
          <div>
            {currentQuestion && (
              <CreateMarkup
                content={currentQuestion?.explanation?.description}
              />
            )}
          </div>
          <Carousel
            style={{ width: "400px" }}
            className="d-flex justify-content-center"
            prevIcon={false}
            nextIcon={false}
            touch={true}
            slide={true}
            interval={3000}
            controls={false}
          >
            {currentQuestion && currentQuestion?.images?.length > 0 ? (
              currentQuestion?.images?.map((img, idx) => {
                return (
                  <Carousel.Item key={idx}>
                    <img
                      style={{
                        height: "200px",
                        width: "100%",
                        borderRadius: "15px",
                      }}
                      src={`https://creative-story.s3.amazonaws.com${img}`}
                      alt="..."
                    />
                  </Carousel.Item>
                );
              })
            ) : (
              <></>
            )}
          </Carousel>

          <section className="my-4">
            {currentQuestion &&
              currentQuestion?.options?.map((item, idx) => {
                if (currentQuestion["selectedOption"] === idx) {
                  return (
                    <CheckedOption key={idx} option={item} optionNumber={idx} />
                  );
                }
                return (
                  <UncheckedOption
                    key={idx}
                    option={item}
                    optionNumber={idx}
                    onUncheckedOptionClick={props?.onUncheckedOptionClick}
                  />
                );
              })}
          </section>
        </div>
      </div>

      <footer
        className="sticky-bottom d-flex flex-wrap justify-content-between align-items-center px-4 py-2 bg-white rounded-top"
        style={{
          border: "1px solid #6D94FF33",
        }}
      >
        <div className="d-flex flex-wrap justify-content-start align-items-end gap-3">
          <div
            className="shadow font-medium d-flex flex-column justify-content-center align-items-center px-3 py-2 rounded-lg text-14 text-color-primary cursor-pointer"
            style={
              active === 1
                ? { border: "1px solid #007C23" }
                : { border: "1px solid #F1F1F1" }
            }
            onClick={() => {
              props.confidenceMeter("I KNOW IT"), setActive(1);
            }}
          >
            {active === 1 ? <IKnowItIcon /> : <ThinkSoIcon />} I KNOW IT
          </div>
          <div
            className="shadow font-medium d-flex flex-column justify-content-center align-items-center px-3 py-2 rounded text-14 font-light cursor-pointer"
            style={
              active === 2
                ? { border: "1px solid #007C23" }
                : { border: "1px solid #F1F1F1" }
            }
            onClick={() => {
              props.confidenceMeter("THINK SO"), setActive(2);
            }}
          >
            {active === 2 ? <IKnowItIcon /> : <ThinkSoIcon />} THINK SO
          </div>
          <div
            className="shadow font-medium d-flex flex-column justify-content-center align-items-center px-3 py-2 rounded text-14 font-light cursor-pointer"
            style={
              active === 3
                ? { border: "1px solid #007C23" }
                : { border: "1px solid #F1F1F1" }
            }
            onClick={() => {
              props.confidenceMeter("NOT SURE"), setActive(3);
            }}
          >
            {active === 3 ? <IKnowItIcon /> : <NotSureIcon />} NOT SURE
          </div>
          <div
            className="shadow font-medium d-flex flex-column justify-content-center align-items-center px-3 py-2 rounded text-14 font-light cursor-pointer"
            style={
              active === 4
                ? { border: "1px solid #007C23" }
                : { border: "1px solid #F1F1F1" }
            }
            onClick={() => {
              props.confidenceMeter("NO IDEA"), setActive(4);
            }}
          >
            {active === 4 ? <IKnowItIcon /> : <NoIdeaIcon />} NO IDEA
          </div>
        </div>
        <div className="d-flex gap-3">
          {props.currentQuestionIndex > 0 && (
            <button
              className="bg-white text-16 text-color-primary font-medium rounded-lg py-2 px-3"
              style={{ border: "1px solid var(--primary-color)" }}
              onClick={props.goToPrevQuestion}
            >
              <span className="me-2 d-inline-block">
                <ArrowLeftOutlinedIcon20 />
              </span>
              Previous
            </button>
          )}
          {props.currentQuestionIndex !== props.questionsLength - 1 && (
            <button
              className="bg-white text-16 text-color-primary font-medium rounded-lg py-2 px-3"
              style={{ border: "1px solid var(--primary-color)" }}
              onClick={props.goToNextQuestion}
            >
              Next
              <span className="ms-2 d-inline-block">
                <ArrowRightOutlinedIcon20 />
              </span>
            </button>
          )}
          {props.currentQuestionIndex === props.questionsLength - 1 && (
            <props.SubmitButton />
          )}
        </div>
      </footer>
    </div>
  );
};

export default TakeTestComponent;
