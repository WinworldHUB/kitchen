import React, { useContext, useState } from "react";
import { Modal, Row, Col, Form } from "react-bootstrap";
import { FaFolder } from "react-icons/fa6";
import { CielingType } from "../../constants";
import useApi from "../../hooks/useApi";
import { PROJECT_APIS } from "../../constants/api-constants";
import { AppContext } from "../../contexts/appcontext";

interface ProjectPlansModalProps {
  projectid: string;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProjectPlansModal: React.FC<ProjectPlansModalProps> = ({
  projectid,
  isModalOpen,
  setIsModalOpen,
}) => {
  const [fileFormData, setFileFormData] = useState<FileFormData>({
    measurements: [],
    siteVideosAndPics: [],
  });
  const [projectData, setProjectData] = useState<Partial<Project>>({});
  const { postFormData: postFileData } = useApi<UploadFileResponse>();
  const { putData: postPlansData } = useApi<GeneralAPIResponse>();
  const { appState } = useContext(AppContext);
  const [currentSlide, setCurrentSlide] = useState(1); // Track the current slide (step)

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    setFileFormData((prevData) => ({
      ...prevData,
      [name]: files ? Array.from(files) : [],
    }));
  };

  const handleFormInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;

    if (type === "radio") {
      // Handle radio button logic
      setProjectData((prevData) => ({
        ...prevData,
        [name]: value === "Yes",
      }));
    } else if (type === "select-one") {
      // Handle select input change (e.g., for ceiling type)
      setProjectData((prevData) => ({
        ...prevData,
        [name]: value === CielingType.Pitched,
      }));
    } else {
      setProjectData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleNextSlide = () => {
    if (currentSlide < 2) {
      setCurrentSlide(currentSlide + 1); // Move to the next slide
    }
  };

  const handlePreviousSlide = () => {
    if (currentSlide > 1) {
      setCurrentSlide(currentSlide - 1); // Move to the previous slide
    }
  };

  const handleFormSave = async () => {
    try {
      // Create a new FormData instance
      const formData = new FormData();

      if (fileFormData.measurements.length > 0) {
        Array.from(fileFormData.measurements).forEach((file) => {
          formData.append("files", file);
        });
      }
      if (fileFormData.siteVideosAndPics.length > 0) {
        Array.from(fileFormData.siteVideosAndPics).forEach((file) => {
          formData.append("files", file);
        });
      }

      // Add the uploader (either 'user' or 'admin') to the form data
      formData.append("uploader", appState.isAdmin ? "admin" : "user");

      // Call the API to upload the files
      const fileDataResponse = await postFileData(
        `${PROJECT_APIS.UPLOAD_PROJECT_DOCUMENT_API}/${projectid}`,
        formData // Send FormData as the request body
      );

      if (fileDataResponse?.error) {
        console.error("Error in file upload:", fileDataResponse.error);
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error in file upload:", error);
    }
  };

  const handleProjectPlansSave = async () => {
    try {
      // Prepare the data to match the UpdateProjectRequest type
      const data: UpdateProjectRequest = {
        isExistingProject: projectData.isExistingProject,
        isPitchedCeiling: projectData.isPitchedCeiling,
        isSkylights: projectData.isSkylights,
        isStepInKitchen: projectData.isStepInKitchen,

        ceilingHeight: projectData.ceilingHeight,
        numberOfSkylights: projectData.numberOfSkylights,
        kitchenStepsDetails: projectData.kitchenStepsDetails,
      };

      // Remove undefined values from the object before sending it to the API
      const cleanData: UpdateProjectRequest = Object.fromEntries(
        Object.entries(data).filter(([_, value]) => value !== undefined)
      ) as UpdateProjectRequest;

      // Call the API to update the project with the clean data
      const plansDataResponse = await postPlansData(
        `${PROJECT_APIS.UPDATE_PROJECT_API}/${projectid}/update`,
        cleanData // Send the updated project data as the request body
      );
      console.log("data", cleanData);

      if (plansDataResponse?.error) {
        console.error(
          "Error in saving project plans data:",
          plansDataResponse.error
        );
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error in saving project plans data:", error);
    }
  };

  const handleSave = async () => {
    handleFormSave();
    handleProjectPlansSave();
  };

  return (
    <Modal
      show={isModalOpen}
      onHide={() => setIsModalOpen(false)}
      centered
      size="lg"
    >
      <Modal.Header closeButton>
        <Modal.Title>Plans</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {currentSlide === 1 && (
            <div>
              <Row>
                {/* File Input Section (in one row) */}
                <Col md={6} className="mb-3">
                  <label
                    htmlFor="measurement"
                    className="d-flex flex-column align-items-center cursor-pointer"
                    style={{ cursor: "pointer" }}
                  >
                    <FaFolder size={100} className="mb-2" />
                    <span>Measurement</span>
                  </label>
                  <Form.Control
                    id="measurement"
                    type="file"
                    name="measurement"
                    onChange={handleFileInputChange}
                    multiple
                    accept=".jpg, .jpeg, .png, .mp4, .mov, .pdf"
                    className="visually-hidden"
                  />
                </Col>
                <Col md={6} className="mb-3">
                  <label
                    htmlFor="siteVideosAndPics"
                    className="d-flex flex-column align-items-center cursor-pointer"
                    style={{ cursor: "pointer" }}
                  >
                    <FaFolder size={100} className="mb-2" />
                    <span>Site Videos and Pics</span>
                  </label>
                  <Form.Control
                    id="siteVideosAndPics"
                    type="file"
                    name="siteVideosAndPics"
                    onChange={handleFileInputChange}
                    multiple
                    accept=".jpg, .jpeg, .png, .mp4, .mov, .pdf"
                    className="visually-hidden"
                  />
                </Col>
                <hr />
              </Row>
              <div>
                <Row>
                  {/* Form Fields */}
                  <div className="mb-3 d-flex justify-content-between align-items-center">
                    <label htmlFor="ceilingHeight">
                      What's Your Cieling Height
                    </label>
                    <Form.Control
                      type="text"
                      name="ceilingHeight"
                      value={projectData.ceilingHeight}
                      className="w-75"
                      onChange={handleFormInputChange}
                    />
                  </div>
                  <hr />
                  <Row>
                    <div className="mb-3 d-flex justify-content-between align-items-center">
                      <label htmlFor="isPitchedCeiling">
                        What's Your Cieling Type
                      </label>
                      <Form.Control
                        as="select"
                        name="isPitchedCeiling"
                        value={
                          projectData.isPitchedCeiling
                            ? CielingType.Pitched
                            : CielingType.Flat
                        }
                        onChange={handleFormInputChange}
                        className="w-75"
                      >
                        <option value={CielingType.Pitched}>
                          {CielingType.Pitched}
                        </option>
                        <option value={CielingType.Flat}>
                          {CielingType.Flat}
                        </option>
                      </Form.Control>
                    </div>
                  </Row>
                  <hr />
                  <div className="mb-3 d-flex justify-content-between align-items-center">
                    <label htmlFor="isSkylights">Do You have Sky Lights</label>
                    <div className="d-flex">
                      <Form.Check
                        type="radio"
                        label="Yes"
                        name="isSkylights"
                        value="Yes"
                        checked={projectData.isSkylights === true}
                        onChange={handleFormInputChange}
                        className="mx-2"
                      />
                      <Form.Check
                        type="radio"
                        label="No"
                        name="isSkylights"
                        value="No"
                        checked={!projectData.isSkylights === true}
                        onChange={handleFormInputChange}
                        className="mx-2"
                      />
                    </div>
                  </div>
                  <hr />
                </Row>
                <div className="mb-3 d-flex justify-content-between align-items-center">
                  <label htmlFor="numberOfSkylights">Number Of Skylights</label>
                  <Form.Control
                    type="number"
                    name="numberOfSkylights"
                    value={projectData.numberOfSkylights}
                    onChange={handleFormInputChange}
                    className="w-75"
                    disabled={!projectData.isSkylights}
                  />
                </div>
              </div>
            </div>
          )}

          {currentSlide === 2 && (
            <div>
              {/* Added Text Area field */}
              <Row>
                <div className="mb-3 d-flex justify-content-between align-items-center">
                  <label htmlFor="isStepInKitchen">
                    Are there any changes in floor levels in the kitchen area,
                    i.e steps
                  </label>
                  <div className="d-flex">
                    <Form.Check
                      type="radio"
                      label="Yes"
                      name="isStepInKitchen"
                      value="Yes"
                      checked={projectData.isStepInKitchen}
                      onChange={handleFormInputChange}
                      className="mx-2"
                    />
                    <Form.Check
                      type="radio"
                      label="No"
                      name="isStepInKitchen"
                      value="No"
                      checked={!projectData.isStepInKitchen}
                      onChange={handleFormInputChange}
                      className="mx-2"
                    />
                  </div>
                </div>
                <hr />
              </Row>
              <Row>
                <div className="mb-3 d-flex justify-content-between align-items-center">
                  <label htmlFor="kitchenStepsDetails">
                    If Yes, let us know where
                  </label>
                  <Form.Control
                    as="textarea"
                    name="kitchenStepsDetails"
                    value={projectData.kitchenStepsDetails}
                    rows={3}
                    onChange={handleFormInputChange}
                    className="w-75"
                    disabled={!projectData.isStepInKitchen}
                  />
                </div>
              </Row>
            </div>
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        {currentSlide > 1 && (
          <button className="btn btn-secondary" onClick={handlePreviousSlide}>
            Previous
          </button>
        )}
        {currentSlide < 2 ? (
          <button className="btn btn-primary" onClick={handleNextSlide}>
            Next Slide
          </button>
        ) : (
          <button className="btn btn-success" onClick={handleSave}>
            Save
          </button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default ProjectPlansModal;
