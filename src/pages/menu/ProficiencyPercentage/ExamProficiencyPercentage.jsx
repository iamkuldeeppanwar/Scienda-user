import React, { useEffect, useState } from "react";
import { Spinner, Stack } from "react-bootstrap";
import ProficiencyProgressBar from "./components/ProficiencyProgressBar";
import { ToastContainer, toast } from "react-toastify";
import { getError } from "../../../Utils/error";
import { userProciency } from "./api/proficiencyAPI";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setProficiency } from "../../../features/proficiencySlice";

const ExamProficiencyPercentage = () => {
  const dispatch = useDispatch();
  const { examId } = useParams();
  const token = localStorage.getItem("token");
  const { proficiency } = useSelector((state) => state.proficiency);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getSingleProficiency();
  }, []);

  const getSingleProficiency = async () => {
    try {
      setLoading(true);
      const res = await userProciency(token, examId);
      dispatch(setProficiency(res?.data));
      setLoading(false);
    } catch (error) {
      toast.error(getError(error));
      setLoading(false);
    }
  };

  return (
    <div className="py-3">
      <ToastContainer />
      <div className="px-5 py-2 bg-white d-flex flex-wrap gap-2 justify-content-between align-items-center">
        <div className="d-flex align-items-end gap-4">
          <h3 className="text-24 font-medium">{proficiency?.exam_name}</h3>
          <Stack>
            <span className="text-10 font-medium">Overall Exam percentage</span>
            <div style={{ width: "304px" }}>
              <ProficiencyProgressBar
                current={proficiency?.overall_percentage}
                height="2rem"
              />
            </div>
          </Stack>
        </div>
      </div>

      <Stack gap={4} className="px-5 py-5">
        <div className="d-flex flex-wrap gap-3 w-100">
          {!loading ? (
            proficiency?.topic_wise?.map((data, idx) => {
              return (
                <div
                  key={idx}
                  className=" bg-white rounded-xl p-3"
                  style={{
                    border: "0.82px solid #F3F3F3",
                    width: "540px",
                  }}
                >
                  <div className="d-flex justify-content-between flex-wrap align-items-center gap-3 px-3">
                    <p
                      className="my-0 text-16 font-normal"
                      style={{ minWidth: "max-content" }}
                    >
                      Topic Name:{" "}
                      <span className="font-medium text-color-primary">
                        {data?.topic}
                      </span>
                    </p>
                    <ProficiencyProgressBar
                      labelColor="black"
                      current={
                        data?.percent !== 0
                          ? parseFloat(data?.percent).toFixed(2)
                          : 0
                      }
                    />
                  </div>
                  <hr />
                  <p className="text-14 font-semibold">
                    Subtopics Proficiency:
                  </p>
                  <hr />
                  <Stack gap={2}>
                    {data?.subtopic?.map((subTopic, index) => (
                      <div
                        key={index}
                        className="d-flex justify-content-between align-items-center"
                      >
                        <div
                          className="py-2 px-3 w-75"
                          style={{
                            borderLeft: "0.82px solid #3538CD",
                            background: "#F9FAFB",
                          }}
                        >
                          {subTopic?.subtopic}
                        </div>
                        <div className="text-14 font-bold text-color-primary">
                          {parseFloat(subTopic?.percent).toFixed(2)}%
                        </div>
                      </div>
                    ))}
                  </Stack>
                </div>
              );
            })
          ) : (
            <div style={{ margin: "auto" }}>
              <Spinner size="sm" />
            </div>
          )}

          {/* <div className="d-flex gap-3">
          <div
            className="flex-1 bg-white rounded-xl p-3"
            style={{
              border: "0.82px solid #F3F3F3",
            }}
          >
            <div className="d-flex justify-content-between align-items-center gap-3">
              <p
                className="my-0 text-16 font-normal"
                style={{ minWidth: "max-content" }}
              >
                Topic Name:{" "}
                <span className="font-medium text-color-primary">
                  Control Engineering
                </span>
              </p>
              <ProficiencyProgressBar labelColor="black" current={65} />
            </div>
            <hr />
            <p className="text-14 font-semibold">Subtopics Proficiency:</p>
            <hr />
            <Stack gap={2}>
              {[12, 4, 8, 4, 2].map((percentage, idx) => (
                <div
                  key={idx}
                  className="d-flex justify-content-between align-items-center"
                >
                  <div
                    className="py-2 px-3 w-75"
                    style={{
                      borderLeft: "0.82px solid #3538CD",
                      background: "#F9FAFB",
                    }}
                  >
                    Subtopic 1
                  </div>
                  <div className="text-14 font-bold text-color-primary">
                    {percentage}%
                  </div>
                </div>
              ))}
            </Stack>
          </div>

          <div
            className="flex-1 bg-white rounded-xl p-3"
            style={{
              border: "0.82px solid #F3F3F3",
            }}
          >
            <div className="d-flex justify-content-between align-items-center gap-3">
              <p
                className="my-0 text-16 font-normal"
                style={{ minWidth: "max-content" }}
              >
                Topic Name:{" "}
                <span className="font-medium text-color-primary">
                  Robotics Engineering
                </span>
              </p>
              <ProficiencyProgressBar labelColor="black" current={85} />
            </div>
            <hr />
            <p className="text-14 font-semibold">Subtopics Proficiency:</p>
            <hr />
            <Stack gap={2}>
              {[12, 4, 8, 4, 2].map((percentage, idx) => (
                <div
                  key={idx}
                  className="d-flex justify-content-between align-items-center"
                >
                  <div
                    className="py-2 px-3 w-75"
                    style={{
                      borderLeft: "0.82px solid #3538CD",
                      background: "#F9FAFB",
                    }}
                  >
                    Subtopic 1
                  </div>
                  <div className="text-14 font-bold text-color-primary">
                    {percentage}%
                  </div>
                </div>
              ))}
            </Stack>
          </div>
        </div> */}
        </div>
      </Stack>
    </div>
  );
};

export default ExamProficiencyPercentage;
