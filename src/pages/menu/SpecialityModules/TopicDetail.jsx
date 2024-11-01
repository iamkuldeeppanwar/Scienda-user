import React, { useEffect, useState } from "react";
import { Card, Carousel, Container, Spinner, Stack } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getError } from "../../../Utils/error";
import { getSpecialityModule } from "./apis/specialityAPI";
import { useDispatch, useSelector } from "react-redux";
import { setSpeciality } from "../../../features/specialityModuleSlice";
import CreateMarkup from "../../../Utils/CreateMarkup";
import HeaderContent from "../../../components/HeaderContent";

const TopicDetail = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const { topicID } = useParams();
  const { speciality } = useSelector((state) => state.speciality);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getSingleSpecialityModule();
  }, []);

  const getSingleSpecialityModule = async () => {
    try {
      setLoading(true);
      const res = await getSpecialityModule(token, topicID);
      dispatch(setSpeciality(res));
      setLoading(false);
    } catch (error) {
      toast.error(getError(error));
      setLoading(false);
    }
  };

  console.log(speciality);

  return (
    <>
      <HeaderContent content={window.location.host} />
      {!loading ? (
        <>
          <div className="p-2">
            <div className="d-flex flex-wrap gap-3 align-items-center">
              <Carousel
                style={{ maxWidth: "300px" }}
                className="d-flex justify-content-center"
                fade
              >
                {speciality?.images?.map((img, idx) => {
                  return (
                    <Carousel.Item style={{ width: "300px" }} key={idx}>
                      <img
                        style={{
                          height: "200px",
                          width: "300px",
                          objectFit: "contain",
                        }}
                        src={`https://creative-story.s3.amazonaws.com${img}`}
                        alt="..."
                      />
                    </Carousel.Item>
                  );
                })}
              </Carousel>

              <div className="flex-1">
                <h3 className="text-color-primary">{speciality?.topic_name}</h3>
                <hr style={{ border: "2.37px solid #0000001F" }} />
                <Stack direction="horizontal" gap={3}>
                  <div
                    className="text-16 font-semibold px-3 py-2 rounded"
                    style={{
                      background: "#EEF4FF",
                      boxShadow: "0px 28.39px 56.78px 0px #DBEAF10A",
                      maxWidth: "max-content",
                    }}
                  >
                    Subtopics: {speciality?.subtopic_count}
                  </div>
                  <div
                    className="text-16 font-semibold px-3 py-2 rounded"
                    style={{
                      background: "#F1F1F1",
                      boxShadow: "0px 28.39px 56.78px 0px #DBEAF10A",
                      maxWidth: "max-content",
                    }}
                  >
                    Total No. of Questions: {speciality?.questionCount}
                  </div>
                </Stack>
                <Stack
                  direction="horizontal"
                  gap={3}
                  className="align-items-start mt-3"
                >
                  <div
                    className="text-16 font-semibold"
                    style={{ color: "#131B24" }}
                  >
                    {speciality?.references?.length > 0 && "References:"}
                  </div>
                  <Stack>
                    {speciality?.references?.map((data, idx) => {
                      return (
                        <a
                          key={idx}
                          href={data}
                          className="text-14 font-normal text-color-secondary"
                        >
                          {data}
                        </a>
                      );
                    })}
                  </Stack>
                </Stack>
              </div>
            </div>

            <p className="px-3 mt-2" style={{ color: "#292929" }}>
              <CreateMarkup content={speciality?.description} />
            </p>

            <div
              className="p-4 bg-white rounded"
              style={{
                boxShadow: "0px 4px 32px 0px #0000000A",
              }}
            >
              <h4 className="text-center text-20 font-bold">Subtopics List</h4>
              {speciality?.subtopics?.map((subTopics, idx) => {
                return (
                  <Card key={idx} className="shadow mt-2">
                    <Card.Body className="d-flex justify-content-between gap-2 align-items-start">
                      <p className="m-0 text-14 font-normal w-75">
                        <span className="font-semibold">
                          Subtopic {idx + 1}:{" "}
                        </span>
                        {subTopics?.sub_topic_name}
                        {/* {<CreateMarkup content={subTopics?.description} />} */}
                      </p>
                      <div
                        className="bg-color-light text-12 font-semibold px-2 py-1 rounded"
                        style={{
                          color: "#101828",
                        }}
                      >
                        No. Questions: {subTopics?.questionCount}
                      </div>
                    </Card.Body>
                  </Card>
                );
              })}
            </div>
          </div>
          <div
            className="position-fixed bottom-0 w-100 py-4 d-flex justify-content-center"
            style={{
              backgroundColor: "#F3F4F6",
            }}
          ></div>
        </>
      ) : (
        <Container>
          <div className="d-flex justify-content-center mt-5">
            <Spinner size="sm" />
          </div>
        </Container>
      )}
    </>
  );
};

export default TopicDetail;
