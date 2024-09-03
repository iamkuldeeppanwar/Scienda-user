import React, { useEffect, useState } from "react";
import {
  StopwatchIcon,
  CalendarIcon,
  QuestionsIcon,
  ScoreIcon,
} from "./components/proficiency-percentage-icons";
import ModuleLayout from "../../../layout/ModuleLayout";
import ProficiencyProgressBar from "./components/ProficiencyProgressBar";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { getError } from "../../../Utils/error";
import { userProciencys } from "./api/proficiencyAPI";
import { setProficiencies } from "../../../features/proficiencySlice";
import { Col, Container, Row, Spinner } from "react-bootstrap";

const ProficiencyPercentageCard = ({
  timeAlloted,
  noOfQuestions,
  correctAnswers,
  completedOn,
  examName,
  percentage,
  examId,
}) => {
  const navigate = useNavigate();

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
      className="bg-white w-100 p-3 rounded-lg"
      style={{
        border: "1px solid #8F8F8F17",
        boxShadow: "0px 12px 12px 0px #00000005",
      }}
    >
      <h5 className="text-14 font-medium text-center my-2 mb-3 w-100">
        {examName}
      </h5>
      <ProficiencyProgressBar current={percentage} />
      <div className="d-flex flex-column gap-2 my-2">
        <div className="d-flex justify-content-between align-items-center">
          <p className="m-0 text-10 font-semibold">
            <StopwatchIcon /> Time Allotted:
          </p>
          <p className="m-0 text-10 font-normal">
            {formatDuration(timeAlloted)}
          </p>
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <p className="m-0 text-10 font-semibold">
            <CalendarIcon /> Completed On::
          </p>
          <p className="m-0 text-10 font-normal">
            {formatDateTime(completedOn)}
          </p>
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <p className="m-0 text-10 font-semibold">
            <QuestionsIcon /> No. of Questions:
          </p>
          <p className="m-0 text-10 font-normal">{noOfQuestions}</p>
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <p className="m-0 text-10 font-semibold">
            <ScoreIcon /> Your Score:
          </p>
          <p className="m-0 text-10 font-normal">
            {correctAnswers}/{noOfQuestions}
          </p>
        </div>
      </div>
      <hr />
      <div className="text-center">
        <button
          className="text-12 font-semibold text-color-primary bg-white rounded"
          style={{
            width: "9.75rem",
            height: "2rem",
            border: "1px solid #00008B",
            boxShadow: "0px 4px 4px 0px #ACD4FF0A",
          }}
          onClick={() => navigate(`${examId}`)}
        >
          View Proficiency
        </button>
      </div>
    </div>
  );
};

const ProficiencyPercentage = () => {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const { proficiencies } = useSelector((state) => state.proficiency);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAllProficiencys();
  }, []);

  const getAllProficiencys = async () => {
    try {
      setLoading(true);
      const res = await userProciencys(token);
      dispatch(setProficiencies(res?.reports));
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error(getError(error));
    }
  };

  return (
    <ModuleLayout>
      <Container>
        <Row className="mt-4 g-3">
          {proficiencies.length > 0 ? (
            <>
              {!loading ? (
                [...proficiencies].reverse()?.map((obj) => (
                  <Col lg={3} key={obj?._id}>
                    <ProficiencyPercentageCard
                      timeAlloted={obj?.test?.duration_in_mins}
                      noOfQuestions={obj?.total}
                      correctAnswers={obj?.correct_answers}
                      completedOn={obj?.createdAt}
                      examId={obj?._id}
                      examName={obj?.test?.test_name}
                      percentage={obj?.percentage}
                    />
                  </Col>
                ))
              ) : (
                <div className="text-center">
                  <Spinner size="sm" />
                </div>
              )}
            </>
          ) : (
            <div className="text-center">
              <h5>No Report found!</h5>
            </div>
          )}
        </Row>
      </Container>
      <ToastContainer />
    </ModuleLayout>
  );
};

export default ProficiencyPercentage;
