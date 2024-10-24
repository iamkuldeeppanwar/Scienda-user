import React, { useEffect, useState } from "react";
import Stack from "react-bootstrap/Stack";
import ModuleLayout from "../../../layout/ModuleLayout";
import { SearchIcon } from "./components/speciality-modules-icons";
import { QuestionsIcon } from "../Tests/components/test-icons";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getError } from "../../../Utils/error";
import { toast, ToastContainer } from "react-toastify";
import { getSpecialityModules } from "./apis/specialityAPI";
import { setSpecialitys } from "../../../features/specialityModuleSlice";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import CreateMarkup from "../../../Utils/CreateMarkup";
import HeaderContent from "../../../components/HeaderContent";
import Skeleton from "react-loading-skeleton";

const SearchTopics = ({ onChange }) => {
  return (
    <div
      className="d-flex align-items-center rounded-lg shadow"
      style={{
        boxShadow: "0px 4px 12px 0px #0000000A",
        backgroundColor: "white",
        padding: "4px 1rem",
        minWidth: "300px",
        height: "2.5rem",
      }}
    >
      <SearchIcon />
      <input
        onChange={(e) => onChange(e.target.value)}
        type="text"
        placeholder="Search Topics"
        className="w-100 p-1"
        style={{
          outline: "none",
          border: "none",
        }}
      />
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
      className="rounded-lg bg-white p-3 shadow mt-4 all-card"
      style={{
        border: "1px solid #8F8F8F17",
        boxShadow: "0px 12px 12px 0px #00000005",
      }}
    >
      <h5
        className="text-center mt-2"
        style={{ color: "#475467", fontWeight: 500, fontSize: "16px" }}
      >
        Topic Name: {topicName}
      </h5>
      <Stack direction="horizontal" gap={2} className="justify-content-between">
        <div className="flex-grow-1 text-center rounded-sm bg-color-yellow-100 text-12 font-medium p-1">
          {topicName}
        </div>
        <div className="flex-grow-1 text-center rounded-sm bg-color-light text-12 font-medium p-1">
          Subtopics: {subTopicCount}
        </div>
      </Stack>
      <p className="d-flex justify-content-center align-items-center font-bold gap-2 text-12 font-medium my-2">
        <QuestionsIcon /> No. of questions:{" "}
        <span className="font-medium">{questionCount} Questions</span>
      </p>
      <p
        className="text-center text-12 font-medium"
        style={{ color: "#475467" }}
      >
        <CreateMarkup content={description} />
      </p>
      <hr />
      <div className="text-center mt-2">
        <Link
          to={`topic-detail/${idx}`}
          className="view-button text-12 font-bold text-color-primary text-decoration-none rounded border-color-primary px-4 py-2"
          style={{ boxShadow: "0px 4px 4px 0px #0000000A" }}
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

const SpecialityModules = () => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");
  const token = localStorage.getItem("token");
  const { user } = useSelector((state) => state.user);
  const { specialities } = useSelector((state) => state.speciality);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user?.subdomain) {
      getAllSpecialityModules();
    }
  }, [user?.subdomain, query]);

  const getAllSpecialityModules = async () => {
    try {
      setLoading(true);
      const res = await getSpecialityModules(token, user?.subdomain, query);
      dispatch(setSpecialitys(res));
      setLoading(false);
    } catch (error) {
      toast.error(getError(error));
      setLoading(false);
    }
  };

  return (
    <>
      <HeaderContent content={"Speciality Modules"} />
      <ModuleLayout style={{ padding: 0 }} className="ps-3">
        <Container>
          <div className="d-flex justify-content-end align-items-center">
            <SearchTopics onChange={setQuery} />
          </div>
          <Row className="g-3">
            {!loading ? (
              specialities?.map((data) => (
                <Col lg={4} key={data?._id}>
                  <TopicCard
                    topicName={data?.topic_name}
                    subTopicCount={data?.subtopic_count}
                    questionCount={data?.questionCount}
                    description={data?.description}
                    idx={data?._id}
                  />
                </Col>
              ))
            ) : (
              <div
                className={`p-2 d-flex justify-conten-center gap-5 flex-wrap mt-4`}
              >
                {[1, 2, 3, 4, 5, 6].map((_, i) => (
                  <Skeleton
                    className="rounded-4"
                    width={"350px"}
                    height={"250px"}
                  />
                ))}
              </div>
            )}
          </Row>
        </Container>
        <ToastContainer />
      </ModuleLayout>
    </>
  );
};

export default SpecialityModules;
