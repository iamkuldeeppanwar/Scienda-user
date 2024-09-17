import React from "react";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";

import { TestSubmitCheckIcon } from "./test-icons";

const CheckTestScoreModal = ({
  checkScoreModalShow,
  closeCheckScoreModal,
  testID,
}) => {
  return (
    <Modal show={checkScoreModalShow} onHide={closeCheckScoreModal} centered>
      <div className="p-5">
        <div className="text-center">
          <TestSubmitCheckIcon />
        </div>
        <p
          className="text-24 font-semibold text-center mt-2"
          style={{ color: "#111927" }}
        >
          You have successfully submitted the Exam
        </p>
        <Link
          to={`/menu/tests/check-answers/${testID}`}
          className="text-center d-block"
        >
          <button
            className="view-button text-center font-medium text-14 text-color-primary rounded py-2"
            style={{
              border: "1px solid #00008B",
              boxShadow: "0px 4px 4px 0px #ACD4FF0A",
              width: "263px",
            }}
          >
            Check Score
          </button>
        </Link>
      </div>
    </Modal>
  );
};

export default CheckTestScoreModal;
