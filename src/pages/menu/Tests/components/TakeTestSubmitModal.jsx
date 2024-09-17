import React from "react";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { getError } from "../../../../Utils/error";
import { submitTest } from "../apis/TestAPIs";

function TakeTestSubmitModal({
  testID,
  questions,
  testSubmitModalShow,
  closeTestSubmitModal,
  questionsLength,
  missingQuestions,
  attemptedQuestions,
  openCheckScoreModal,
  CheckTestScoreButton,
}) {
  const token = localStorage.getItem("token");

  const handleSubmitTest = async (e) => {
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

      obj.notes = qnts.note || "";

      return obj;
    });

    try {
      const response = await submitTest(arr, testID, token);
      localStorage.setItem("reportID", response?.reportcard);
      localStorage.removeItem(testID);
      closeTestSubmitModal();
    } catch (error) {
      toast.error(getError(error));
    }
  };

  return (
    <Modal
      show={testSubmitModalShow}
      onHide={closeTestSubmitModal}
      aria-labelledby="help-modal"
      centered
      className="help-modal"
      // size='lg'
    >
      <div className="p-3">
        <h4 className="px-4 py-2 text-22 font-medium text-center">
          Are you sure you want to submit this exam? it cannot be reverted..!
        </h4>

        <div className="d-flex flex-column justify-content-center align-items-center">
          <p className="text-14 font-semibold" style={{ color: "#384250" }}>
            Missing Questions:{" "}
            <span className="ms-2 d-inline-block text-color-secondary">
              {missingQuestions}
            </span>
          </p>
          <p className="text-14 font-semibold" style={{ color: "#384250" }}>
            Answered Questions:{" "}
            <span className="ms-2 d-inline-block text-color-secondary">
              {attemptedQuestions}
            </span>
          </p>
          <p className="text-14 font-semibold" style={{ color: "#384250" }}>
            Total No. Of Questions:{" "}
            <span className="ms-2 d-inline-block text-color-secondary">
              {questionsLength} Questions
            </span>
          </p>
        </div>

        <div className="mt-3 d-flex justify-content-center align-items-center gap-2">
          {questionsLength > attemptedQuestions && (
            <button
              onClick={closeTestSubmitModal}
              className="view-button text-center font-medium text-14 text-color-primary rounded py-2"
              style={{
                border: "1px solid #00008B",
                boxShadow: "0px 4px 4px 0px #ACD4FF0A",
                width: "18.3125rem",
              }}
            >
              Go back & Add Response
            </button>
          )}
          {questionsLength === attemptedQuestions && (
            <button
              onClick={closeTestSubmitModal}
              className="view-button text-center font-medium text-14 text-color-primary rounded py-2"
              style={{
                border: "1px solid #00008B",
                boxShadow: "0px 4px 4px 0px #ACD4FF0A",
                width: "8.5rem",
              }}
            >
              Go back
            </button>
          )}
          {questionsLength === attemptedQuestions && (
            <CheckTestScoreButton>
              <button
                onClick={handleSubmitTest}
                className="view-button text-center font-medium text-14 text-color-primary rounded py-2"
                style={{
                  border: "1px solid #00008B",
                  boxShadow: "0px 4px 4px 0px #ACD4FF0A",
                  width: "8.5rem",
                }}
              >
                Submit Now
              </button>
            </CheckTestScoreButton>
          )}
        </div>
      </div>
    </Modal>
  );
}

export default TakeTestSubmitModal;
