import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import ModuleLayout from "../../../layout/ModuleLayout";
import CustomDropdown from "./components/custom-dropdown";
import SearchableDropdown from "../../../components/SearchableDropdown";
import { getError } from "../../../Utils/error";
import { ToastContainer, toast } from "react-toastify";
import { getReacharge } from "./api/reachargeApi";
import { Spinner } from "react-bootstrap";
import "./Recharge.css";

const RechargeModalTest = (props) => {
  const [modalShow, setModalShow] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <div className="text-center">
        <button
          className="text-24 font-semibold text-white border-0 bg-color-primary rounded-lg"
          style={{ width: "428px", height: "72px" }}
          onClick={() => setModalShow(true)}
        >
          Recharge Now
        </button>
      </div>

      <Modal
        centered
        size="lg"
        onHide={() => setModalShow(false)}
        show={modalShow}
      >
        <div className="p-4">
          <h4 className="text-center text-24 font-semibold text-color-secondary">
            Mechanical Engineering
          </h4>
          <h5
            className="text-center my-4 text-24 font-medium"
            style={{ color: "#4D4D4D" }}
          >
            Select Topic & Subtopic from below
          </h5>
          <hr />
          <div className="w-90 mx-auto">
            <span className="text-14 font-medium d-block my-2">
              Search & Select Topic:
            </span>
            <CustomDropdown
              pl="0.5rem"
              pr="0.5rem"
              py="0.5rem"
              shadow="0 0 1rem #E0EAFF"
              options={[{ value: "1", title: "Control Engineering [CE]" }]}
            />
          </div>
          <div className="w-90 mx-auto my-3">
            <span className="text-14 font-medium d-block my-2">
              Search & Select Subtopic:
            </span>
            <SearchableDropdown label="name" id="id" />
          </div>

          <div className="d-flex justify-content-center align-items-center gap-4 mt-5">
            <button
              className="rounded border-color-primary bg-white text-color-primary text-16 font-semibold"
              style={{ width: "174px", height: "48px" }}
              onClick={() => setModalShow(false)}
            >
              Cancel
            </button>
            <button
              className="rounded border-0 bg-color-primary text-white text-16 font-semibold"
              style={{ width: "174px", height: "48px" }}
              onClick={() => navigate(`take-test/recharge-1`)}
            >
              Start Recharge
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

const Recharge = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(false);

  const handleRecharge = async () => {
    try {
      setLoading(true);
      const res = await getReacharge(token);
      if (res?.testId) {
        navigate(`/menu/tests/take-test/${res?.testId}`);
      } else {
        toast.error("Test not found");
      }
      setLoading(false);
    } catch (error) {
      toast.error(getError(error));
      setLoading(false);
    }
  };

  return (
    <ModuleLayout style={{ padding: "0" }}>
      <div className="blur-container">
        <div className="content d-flex flex-column align-items-center justify-content-center">
          <h5 className="text-white text-center w-55 text-28 font-medium">
            "Feeling stuck? Let's reboot your brain with a practice exam
            jumpstart! Get ready to conquer and recharge!"
          </h5>

          <div className="mb-3">
            <div>
              <h5 className="mt-3 text-22 text-white text-center">
                What will you get:
              </h5>
              <ul className="text-22">
                <li style={{ fontWeight: "300" }} className="text-white">
                  Unlimited Attempts
                </li>
                <li style={{ fontWeight: "300" }} className="text-white">
                  Improve Your Confidence.
                </li>
              </ul>
            </div>
          </div>

          <div style={{ border: "1px solid #FFFFFF6B", width: "50%" }} />
          <div className="text-center mt-4">
            <button
              className="text-24 font-semibold border-0 bg-color-white rounded-lg view-button"
              style={{ width: "350px", height: "60px" }}
              onClick={handleRecharge}
            >
              {loading ? <Spinner size="sm" /> : "Recharge Now"}
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </ModuleLayout>
  );
};

export default Recharge;
