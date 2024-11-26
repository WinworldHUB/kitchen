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


type FileFormData = {
  measurements: File[];
  siteVideosAndPics: File[];
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
  const { postData: postPlansData } = useApi<GeneralAPIResponse>();
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
    const { name, value } = e.target;
    setProjectData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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

  const handleSave = async () => {
    try {
      // Create a new FormData instance
      const formData = new FormData();
  
      if (fileFormData.measurements.length > 0) {
        Array.from(fileFormData.measurements).forEach((file) => {
          formData.append("measurements", file);
        });
      }
      if (fileFormData.siteVideosAndPics.length > 0) {
        Array.from(fileFormData.siteVideosAndPics).forEach((file) => {
          formData.append("siteVideosAndPics", file);
        });
      }
  
      // Add the uploader (either 'user' or 'admin') to the form data
      formData.append("uploader", appState.isAdmin ? "admin" : "user");
  
      // Call the API to upload the files
      const fileDataResponse = await postFileData(
        `${PROJECT_APIS.UPLOAD_PROJECT_DOCUMENT_API}/${projectid}`,
        formData // Send FormData as the request body
      );
  
      // Check for the response status or handle success
      if (fileDataResponse.success) {
        console.log("Files uploaded successfully", fileDataResponse.data);
      } else {
        console.error("File upload failed:", fileDataResponse.message);
      }
  
      // Optionally, close the modal after saving
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error in file upload:", error);
    }
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
                    accept=".jpg, .jpeg, .png, .mp4, .mov, .pdf, .txt, .docx, .xlsx"
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
                    accept=".jpg, .jpeg, .png, .mp4, .mov, .pdf, .txt, .docx, .xlsx"
                    className="visually-hidden"
                  />
                </Col>
                <hr />
              </Row>
              <div>
                <Row>
                  {/* Form Fields */}
                  <div className="mb-3 d-flex justify-content-between align-items-center">
                    <label htmlFor="textField">
                      What's Your Cieling Height
                    </label>
                    <Form.Control
                      type="text"
                      name="textField"
                      value={projectData.ceilingHeight}
                      className="w-75"
                      onChange={handleFormInputChange}
                    />
                  </div>
                  <hr />
                  <Row>
                    <div className="mb-3 d-flex justify-content-between align-items-center">
                      <label htmlFor="dropdown">What's Your Cieling Type</label>
                      <Form.Control
                        as="select"
                        name="dropdown"
                        value={
                          projectData.isPitchedCeiling
                            ? CielingType.Pitched
                            : CielingType.Flat
                        }
                        className="w-75"
                        onChange={handleFormInputChange}
                      >
                        <option value="">Select an option</option>
                        <option value="Option 1">{CielingType.Pitched}</option>
                        <option value="Option 2">{CielingType.Flat}</option>
                      </Form.Control>
                    </div>
                  </Row>
                  <hr />
                  <div className="mb-3 d-flex justify-content-between align-items-center">
                    <label>Do You have Sky Lights</label>
                    <div className="d-flex">
                      <Form.Check
                        type="radio"
                        label="Option 1"
                        name="radioOption"
                        value="Option 1"
                        className="mx-2"
                        checked={projectData.isPitchedCeiling}
                        onChange={handleFormInputChange}
                      />
                      <Form.Check
                        type="radio"
                        label="Option 2"
                        name="radioOption"
                        value="Option 2"
                        className="mx-2"
                        checked={!projectData.isPitchedCeiling}
                        onChange={handleFormInputChange}
                      />
                    </div>
                  </div>
                  <hr />
                </Row>
                <div className="mb-3 d-flex justify-content-between align-items-center">
                  <label htmlFor="numberField">Number Of Skylights</label>
                  <Form.Control
                    type="number"
                    name="numberField"
                    value={projectData.skylightDetails}
                    className="w-75"
                    onChange={handleFormInputChange}
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
                  <label>
                    Are there any changes in floor levels in the kitchen area,
                    i.e steps
                  </label>
                  <div className="d-flex">
                    <Form.Check
                      type="radio"
                      label="Option 1"
                      name="radioOption"
                      value="Option 1"
                      checked={projectData.isStepInKitchen}
                      onChange={handleFormInputChange}
                      className="mx-2"
                    />
                    <Form.Check
                      type="radio"
                      label="Option 2"
                      name="radioOption"
                      value="Option 2"
                      className="mx-2"
                      checked={!projectData.isStepInKitchen}
                      onChange={handleFormInputChange}
                    />
                  </div>
                </div>
                <hr />
              </Row>
              <Row>
                <div className="mb-3 d-flex justify-content-between align-items-center">
                  <label htmlFor="textArea">Text Area</label>
                  <Form.Control
                    as="textarea"
                    name="textArea"
                    value={projectData.kitchenStepsDetails}
                    rows={3}
                    onChange={handleFormInputChange}
                    className="w-75"
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
