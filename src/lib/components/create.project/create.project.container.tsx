import { Carousel, Col, ListGroup, Row } from "react-bootstrap";
import { FC, useState } from "react";
import CardSimple from "../card.simple";
import ProjectContacts from "./create.project.contacts";
import NavigatorButtons from "../app.navigator";
import ProjectTypes from "./create.project.type";
import ProjectPropertyDetails from "./create.project.property";
import ProjectLayoutDetails from "./create.project.layout";
import ProjectAttachments from "./create.project.attachments";

const PAGE_TITLES = [
  "Contact Details",
  "Type of project",
  "Property details",
  "Layout details",
  "Attachments",
];

interface CreateProjectContainerProps {
  project: Project;
  onCreate: (projectId: string) => void;
}

const CreateProjectContainer: FC<CreateProjectContainerProps> = ({
  project,
  onCreate,
}) => {
  const TOTAL_PAGES = PAGE_TITLES.length - 1;
  const [pageIndex, setPageIndex] = useState<number>(0);

  const handlePrevClick = () => {
    if (pageIndex > 0) {
      setPageIndex(pageIndex - 1);
    }
  };
  const handleNextClick = () => {
    if (pageIndex < TOTAL_PAGES) {
      setPageIndex(pageIndex + 1);
    }
  };

  return (
    <CardSimple
      title="Project Details"
      footer={
        <NavigatorButtons
          onNextClick={handleNextClick}
          onPreviousClick={handlePrevClick}
          isFirstPage={pageIndex === 0}
          buttonTitles={[
            "Previous",
            pageIndex === TOTAL_PAGES ? "Submit" : "Next",
          ]}
        />
      }
      headerAction={<h6 className="text-title">{PAGE_TITLES[pageIndex]}</h6>}
    >
      <Row>
        <Col sm="4" className="d-none d-sm-block">
          <CardSimple noShadow className="p-0 m-0">
            <ListGroup as="ol" numbered>
              {PAGE_TITLES.map((title, index) => (
                <ListGroup.Item
                  action={index <= pageIndex}
                  key={title}
                  className={`border-0 ${
                    index === pageIndex && "bg-blue text-white fw-bold"
                  } ${index < pageIndex && "text-success"} ${
                    index > pageIndex && "text-darkgrey"
                  }`}
                  onClick={() => {
                    if (index <= pageIndex) {
                      setPageIndex(index);
                    }
                  }}
                >
                  {title}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </CardSimple>
        </Col>
        <Col sm="8">
          <Carousel
            variant="dark"
            controls={false}
            indicators={false}
            activeIndex={pageIndex}
            interval={null}
          >
            <Carousel.Item>
              <ProjectContacts project={project} onSave={onCreate} />
            </Carousel.Item>
            <Carousel.Item>
              <ProjectTypes project={project} onSave={onCreate} />
            </Carousel.Item>
            <Carousel.Item>
              <ProjectPropertyDetails project={project} onSave={onCreate} />
            </Carousel.Item>
            <Carousel.Item>
              <ProjectLayoutDetails project={project} onSave={onCreate} />
            </Carousel.Item>
            <Carousel.Item>
              <ProjectAttachments project={project} onSave={onCreate} />
            </Carousel.Item>
          </Carousel>
        </Col>
      </Row>
    </CardSimple>
  );
};

export default CreateProjectContainer;
