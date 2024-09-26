import React, { useEffect, useState } from "react";
import { Spinner, Stack } from "react-bootstrap";
import ProficiencyProgressBar from "./components/ProficiencyProgressBar";
import { ToastContainer, toast } from "react-toastify";
import { getError } from "../../../Utils/error";
import { userProciency } from "./api/proficiencyAPI";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setProficiency } from "../../../features/proficiencySlice";
import HeaderContent from "../../../components/HeaderContent";

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
    <>
      <HeaderContent content={proficiency?.exam_name} />
      <div className="px-4">
        <hr />
        <div>
          <span className="text-16 font-medium">Overall Exam percentage</span>
          <div className="mt-2" style={{ width: "304px" }}>
            <ProficiencyProgressBar
              current={proficiency?.overall_percentage}
              height="1.5rem"
            />
          </div>
        </div>
        <hr />

        <Stack gap={4} className="mt-3">
          <div className="d-flex justify-content-around flex-wrap gap-3 w-100">
            {!loading ? (
              proficiency?.topic_wise?.map((data, idx) => {
                return (
                  <div
                    key={idx}
                    className=" bg-white rounded-xl p-3 shadow"
                    style={{
                      border: "0.82px solid #F3F3F3",
                      width: "540px",
                    }}
                  >
                    <div className="d-flex justify-content-between flex-wrap align-items-center gap-3 ">
                      <p
                        className="my-0 text-16 font-medium"
                        style={{ minWidth: "max-content" }}
                      >
                        Topic Name:{" "}
                        <span
                          style={{ color: "#475467" }}
                          className="text-center text-15 font-bold"
                        >
                          {data?.topic}
                        </span>
                      </p>
                      <ProficiencyProgressBar
                        labelColor="white"
                        current={
                          data?.percent !== 0
                            ? parseFloat(data?.percent).toFixed(2)
                            : 0
                        }
                      />
                    </div>
                    <hr />
                    <p className="text-14 font-medium">
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
                            className="py-2 px-3 w-75 font-medium"
                            style={{
                              borderLeft: "0.82px solid #3538CD",
                              background: "#F9FAFB",
                            }}
                          >
                            {subTopic?.subtopic}
                          </div>
                          <div className="text-14 font-medium text-color-primary">
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
          </div>
        </Stack>
        <ToastContainer />
      </div>
    </>
  );
};

export default ExamProficiencyPercentage;
