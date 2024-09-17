import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import ModuleLayout from "../../../layout/ModuleLayout";
import CustomDropdown from "./components/custom-dropdown";
import SearchableDropdown from "../../../components/SearchableDropdown";
import { getError } from "../../../Utils/error";
import { ToastContainer, toast } from "react-toastify";
import { getReacharge } from "./api/reachargeApi";
import { Carousel, Spinner } from "react-bootstrap";
import "./Recharge.css";
import HeaderContent from "../../../components/HeaderContent";

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
    <>
      <HeaderContent content={"Recharge"} />
      <ModuleLayout style={{ padding: "0" }}>
        <div className="d-flex justify-content-center mt-3">
          <Carousel
            prevIcon={false}
            nextIcon={false}
            touch={true}
            slide={true} // Ensure slide is enabled for a sliding effect
            interval={3000} // 3 seconds interval between slides, adjust as needed
            controls={false}
          >
            <Carousel.Item>
              <img src="/images/Rectangle 6127.png" alt="..." />
              <Carousel.Caption>
                <div
                  className="p-3"
                  style={{
                    border: "1px solid #FFFFFF",
                    borderRadius: "15px",
                    height: "5rem",
                    backdropFilter: "blur(5px)",
                    WebkitBackdropFilter: "blur(5px)",
                    backgroundColor: "rgba(1, 4, 22, 0.12)",
                    boxShadow: "0px 8px 42px 0px #FFFFFF0A",
                  }}
                >
                  "Feeling stuck? Let's reboot your brain with a practice exam
                  jumpstart! Get ready to conquer and recharge!"
                </div>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img src="/images/image.png" alt="..." />
              <Carousel.Caption>
                <div
                  className="p-3"
                  style={{
                    border: "1px solid #FFFFFF",
                    borderRadius: "15px",
                    height: "5rem",
                    backdropFilter: "blur(5px)",
                    WebkitBackdropFilter: "blur(5px)",
                    backgroundColor: "rgba(1, 4, 22, 0.12)",
                    boxShadow: "0px 8px 42px 0px #FFFFFF0A",
                  }}
                >
                  "Feeling stuck? Let's reboot your brain with a practice exam
                  jumpstart! Get ready to conquer and recharge!"
                </div>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img src="/images/image (1).png" alt="..." />
              <Carousel.Caption>
                <div
                  className="p-3"
                  style={{
                    border: "1px solid #FFFFFF",
                    borderRadius: "15px",
                    height: "5rem",
                    backdropFilter: "blur(5px)",
                    WebkitBackdropFilter: "blur(5px)",
                    backgroundColor: "rgba(1, 4, 22, 0.12)",
                    boxShadow: "0px 8px 42px 0px #FFFFFF0A",
                  }}
                >
                  "Feeling stuck? Let's reboot your brain with a practice exam
                  jumpstart! Get ready to conquer and recharge!"
                </div>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </div>

        <div className="mb-3 d-flex flex-column align-items-center justify-content-center">
          <div>
            <h5 className="mt-3 text-20 px-4 font-bold">What will you get:</h5>
            <ul className="text-18 font-medium">
              <li>Unlimited Attempts</li>
              <li>Improve Your Confidence.</li>
            </ul>
          </div>

          <div className="text-center mt-2">
            <button
              className="text-24 font-semibold border-1 bg-color-white rounded-lg view-button"
              style={{ width: "350px", height: "60px" }}
              onClick={handleRecharge}
            >
              {loading ? <Spinner size="sm" /> : "Recharge Now"}
            </button>
          </div>
        </div>
        <ToastContainer />
      </ModuleLayout>
    </>
  );
};

export default Recharge;
