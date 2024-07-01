import { Carousel } from "react-bootstrap";
import { FC, useState } from "react";
import CardSimple from "../card.simple";
import ProjectContacts from "./create.project.contacts";
import NavigatorButtons from "../app.navigator";
import ProjectTypes from "./create.project.type";
import ProjectOtherDetails from "./create.project.other";

const PAGE_TITLES = ["Contact Details", "Type of project", "Other details"];

interface CreateProjectContainerProps {
  project: Project;
  onCreate: (projectId: string) => void;
}

const CreateProjectContainer: FC<CreateProjectContainerProps> = ({
  project,
  onCreate,
}) => {
  const [pageIndex, setPageIndex] = useState<number>(0);

  const handlePrevClick = () => {
    if (pageIndex > 0) {
      setPageIndex(pageIndex - 1);
    }
  };
  const handleNextClick = () => {
    if (pageIndex < PAGE_TITLES.length) {
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
        />
      }
      headerAction={<h6 className="text-title">{PAGE_TITLES[pageIndex]}</h6>}
    >
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
          <ProjectOtherDetails project={project} onSave={onCreate} />
        </Carousel.Item>
      </Carousel>
    </CardSimple>
  );
};

export default CreateProjectContainer;
