import React, { useEffect, useState } from "react";
import Stack from "react-bootstrap/Stack";
import ModuleLayout from "../../../layout/ModuleLayout";
import ViewSummaryBtn from "./components/ViewSummaryBtn";
import { SearchIcon } from "./components/speciality-modules-icons";
import { QuestionsIcon } from "../Tests/components/test-icons";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getError } from "../../../Utils/error";
import { toast } from "react-toastify";
import { getSpecialityModules } from "./apis/specialityAPI";
import { setSpecialitys } from "../../../features/specialityModuleSlice";
import { Spinner } from "react-bootstrap";

const SearchTopics = () => {
  return (
    <div className="d-flex column-gap-3">
      <div
        style={{
          boxShadow: "0px 4px 12px 0px #0000000A",
          borderRadius: "5px",
          backgroundColor: "white",
          padding: "4px 1rem",
          minWidth: "300px",
          height: "2.5rem",
        }}
      >
        <SearchIcon />
        <input
          type="text"
          placeholder="Search Topics"
          className="border-0 mx-2 mt-1 w-75"
          style={{
            outline: "none",
          }}
        />
      </div>
      <button
        className="border-0 d-block text-white rounded-2"
        style={{
          boxShadow: "0px 4px 4px 0px #0000000A",
          height: "2.5rem",
          width: "5.35rem",
          backgroundColor: "var(--primary-color)",
          fontSize: "14px",
          fontWeight: 500,
        }}
      >
        Search
      </button>
    </div>
  );
};

const TopicCard = ({
  topicName,
  subTopicCount,
  questionCount,
  description,
  idx,
}) => {
  return (
    <div
      className="rounded-lg bg-white p-3 "
      style={{
        width: "24.35%",
        border: "1px solid #8F8F8F17",
        boxShadow: "0px 12px 12px 0px #00000005",
      }}
    >
      <h5 className="text-center text-14 font-medium mt-2">
        Topic Name {topicName}
      </h5>
      <hr className="my-2" />
      <Stack direction="horizontal" gap={2} className="justify-content-between">
        <div className="flex-grow-1 text-center rounded-sm bg-color-yellow-100 text-10 font-medium">
          {topicName}
        </div>
        <div className="flex-grow-1 text-center rounded-sm bg-color-light text-10 font-medium">
          Subtopics: {subTopicCount}
        </div>
      </Stack>
      <p className="d-flex justify-content-center align-items-center gap-2 text-12 font-semibold my-2">
        <QuestionsIcon /> No. of questions:{" "}
        <span className="font-light">{questionCount} Questions</span>
      </p>
      {/* <p
        className="text-center text-12 font-light "
        style={{ color: "#475467" }}
      >
        {description}
      </p> */}
      <div className="text-center">
        <Link
          to={`topic-detail/${idx}`}
          className="text-12 font-medium text-color-primary text-decoration-none rounded bg-white border-color-primary px-4 py-2"
          style={{ boxShadow: "0px 4px 4px 0px #0000000A" }}
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

const SpecialityModules = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const { user } = useSelector((state) => state.user);
  const { specialities } = useSelector((state) => state.speciality);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user?.subdomain) {
      getAllSpecialityModules();
    }
  }, []);

  const getAllSpecialityModules = async () => {
    try {
      setLoading(true);
      const res = await getSpecialityModules(token, user?.subdomain);
      dispatch(setSpecialitys(res));
      setLoading(false);
    } catch (error) {
      toast.error(getError(error));
      setLoading(false);
    }
  };

  //   console.log(specialities);

  return (
    <ModuleLayout>
      <div className="my-4 d-flex justify-content-between align-items-start">
        <h5 className="text-20 font-medium text-color-secondary">
          Mechanical Engineering
        </h5>
        <Stack direction="horizontal" gap={3}>
          <ViewSummaryBtn
            text={"View Summary"}
            onClick={() => navigate("view-summary")}
          />
          <SearchTopics />
        </Stack>
      </div>

      <div className="d-flex flex-wrap row-gap-3 gap-2">
        {!loading ? (
          specialities?.map((data) => (
            <TopicCard
              key={data?._id}
              topicName={data?.topic_name}
              subTopicCount={data?.subtopic_count}
              questionCount={data?.questionCount}
              description={data?.description}
              idx={data?._id}
            />
          ))
        ) : (
          <div className="text-center">
            <Spinner size="sm" />
          </div>
        )}
      </div>

      <h5 className="text-22 font-medium py-3">Topic Completed</h5>

      <div className="d-flex flex-wrap row-gap-3 justify-content-between">
        {[...Array(4)].map((num, idx) => (
          <TopicCard key={idx} topicNumber={idx + 9} />
        ))}
      </div>
    </ModuleLayout>
  );
};

export default SpecialityModules;
