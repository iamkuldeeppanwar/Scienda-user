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
import { Col, Container, Row } from "react-bootstrap";
import HeaderContent from "../../../components/HeaderContent";
import Skeleton from "react-loading-skeleton";

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
      className="rounded-lg bg-white p-3 shadow all-card"
      style={{
        border: "1px solid #8F8F8F17",
        boxShadow: "0px 12px 12px 0px #00000005",
      }}
    >
      <h6
        style={{ color: "#475467" }}
        className="text-center text-15 font-bold"
      >
        {examName}
      </h6>
      <ProficiencyProgressBar height={"12px"} current={percentage} />
      <div className="d-flex flex-column gap-2 mt-4 mb-3">
        <div className="d-flex justify-content-between align-items-center">
          <div className="text-14 font-medium">
            <StopwatchIcon /> Time Allotted:
          </div>
          <div className="text-14 font-medium">
            {formatDuration(timeAlloted)}
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <div className="text-14 font-medium">
            <CalendarIcon /> Completed On::
          </div>
          <div className="text-14 font-medium">
            {formatDateTime(completedOn)}
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <div className="text-14 font-medium">
            <QuestionsIcon /> No. of Questions:
          </div>
          <div className="text-14 font-medium">{noOfQuestions}</div>
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <div className="text-14 font-medium">
            <ScoreIcon /> Your Score:
          </div>
          <div className="text-14 font-medium">
            {correctAnswers}/{noOfQuestions}
          </div>
        </div>
      </div>
      <hr />
      <div className="text-center">
        <button
          onClick={() => navigate(`${examId}`)}
          className="view-button text-center font-medium text-14 text-color-primary rounded py-1"
          style={{
            border: "1px solid #00008B",
            boxShadow: "0px 4px 4px 0px #ACD4FF0A",
            width: "8.5rem",
          }}
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
    <>
      <HeaderContent content={"Proficiency Percentage"} />
      <ModuleLayout className="ps-3">
        <Container>
          <Row className="g-3">
            {proficiencies.length > 0 ? (
              <>
                {!loading ? (
                  [...proficiencies].reverse()?.map((obj) => (
                    <Col lg={4} key={obj?._id}>
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
                  <div
                    className={`p-2 d-flex justify-conten-center gap-5 flex-wrap mt-4`}
                  >
                    {[1, 2, 3, 4, 5, 6].map((_, i) => (
                      <Skeleton
                        key={i}
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
                <h5>No Report found!</h5>
              </div>
            )}
          </Row>
        </Container>
        <ToastContainer />
      </ModuleLayout>
    </>
  );
};

export default ProficiencyPercentage;
