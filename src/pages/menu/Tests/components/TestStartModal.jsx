import React from "react";
import Modal from "react-bootstrap/Modal";

import { InfoIcon, QuestionsIcon, TimerIcon } from "./test-icons";
import { Link } from "react-router-dom";

const TestStartModal = (props) => {
  return (
    <Modal
      show={props.testStartModalShow}
      onHide={props.closeTestStartModal}
      aria-labelledby="help-modal"
      centered
      className="help-modal"
    >
      <div className="p-3 ">
        <div className="d-flex justify-content-center align-items-center gap-2">
          <span>
            <InfoIcon />
          </span>
          <p className="text-18 font-medium m-0">
            <span className="font-medium">Note:</span> Practice exams can only
            be taken once
          </p>
        </div>
        <hr />
        <h4
          className="text-center text-18 font-bold"
          style={{ color: "#4D4D4D" }}
        >
          {props.testName}
        </h4>

        <div className="w-50 mx-auto d-flex justify-content-center align-items-center gap-2 mt-2 mb-1">
          <span className="mb-1">
            <TimerIcon />
          </span>
          <p className="m-0 p-0 text-14 font-semibold">
            Time Allotted:{" "}
            <span className="font-medium">{props.timeAlloted}min</span>
          </p>
        </div>
        <div className="w-60 mx-auto d-flex justify-content-center align-items-center gap-2">
          <span className="mb-1">
            <QuestionsIcon />
          </span>
          <p className="m-0 p-0 text-14 font-semibold">
            No. of Questions:{" "}
            <span className="font-medium">{props.noOfQuestions}</span>
          </p>
        </div>

        <div className="d-flex justify-content-center align-items-center gap-3">
          <div className="mt-3">
            <button
              className="view-button text-center font-medium text-14 text-color-primary rounded py-2"
              onClick={props.closeTestStartModal}
              style={{
                border: "1px solid #00008B",
                boxShadow: "0px 4px 4px 0px #ACD4FF0A",
                width: "8.5rem",
              }}
            >
              Go back
            </button>
          </div>
          <Link to={`/menu/tests/take-test/${props.testId}`}>
            <div className="mt-3">
              <button
                className="view-button text-center font-medium text-14 text-color-primary rounded py-2"
                style={{
                  border: "1px solid #00008B",
                  boxShadow: "0px 4px 4px 0px #ACD4FF0A",
                  width: "8.5rem",
                }}
              >
                {props.button}
              </button>
            </div>
          </Link>
        </div>
      </div>
    </Modal>
  );
};

export default TestStartModal;
