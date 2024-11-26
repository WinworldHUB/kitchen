import React, { useState } from "react";
import { Modal, Row, Col, Form } from "react-bootstrap";
import { FaFolder } from "react-icons/fa6";


interface ProjectPlansModalProps {
    isModalOpen: boolean;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProjectPlansModal: React.FC<ProjectPlansModalProps> = ({
    isModalOpen,
    setIsModalOpen,
}) => {

  const [fileFormData, setFileFormData] = useState({
    measurement: [],
    siteVideosAndPics: [],
  });
  const [otherFormData, setOtherFormData] = useState({
    textField: "",
    radioOption: "",
    dropdown: "",
    numberField: 0,
    textArea: "", // Added text area state
  });

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
    setOtherFormData((prevData) => ({
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

  const handleSave = () => {
    console.log("Saving project data...");
    console.log("File Data: ", fileFormData);
    console.log("Other Data: ", otherFormData);
    setIsModalOpen(false);
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
                    <label htmlFor="textField">Text Field</label>
                    <Form.Control
                      type="text"
                      name="textField"
                      value={otherFormData.textField}
                      className="w-75"
                      onChange={handleFormInputChange}
                    />
                  </div>
                  <hr />
                  <div className="mb-3 d-flex justify-content-between align-items-center">
                    <label>Radio Option</label>
                    <div className="d-flex">
                      <Form.Check
                        type="radio"
                        label="Option 1"
                        name="radioOption"
                        value="Option 1"
                        className="mx-2"
                        checked={otherFormData.radioOption === "Option 1"}
                        onChange={handleFormInputChange}
                      />
                      <Form.Check
                        type="radio"
                        label="Option 2"
                        name="radioOption"
                        value="Option 2"
                        className="mx-2"
                        checked={otherFormData.radioOption === "Option 2"}
                        onChange={handleFormInputChange}
                      />
                    </div>
                  </div>
                  <hr />
                </Row>
                <Row>
                  <div className="mb-3 d-flex justify-content-between align-items-center">
                    <label htmlFor="dropdown">Dropdown</label>
                    <Form.Control
                      as="select"
                      name="dropdown"
                      value={otherFormData.dropdown}
                      className="w-75"
                      onChange={handleFormInputChange}
                    >
                      <option value="">Select an option</option>
                      <option value="Option 1">Option 1</option>
                      <option value="Option 2">Option 2</option>
                    </Form.Control>
                  </div>
                  <hr />
                  <div className="mb-3 d-flex justify-content-between align-items-center">
                    <label htmlFor="numberField">Number Field</label>
                    <Form.Control
                      type="number"
                      name="numberField"
                      value={otherFormData.numberField}
                      className="w-75"
                      onChange={handleFormInputChange}
                    />
                  </div>
                </Row>
              </div>
            </div>
          )}

          {currentSlide === 2 && (
            <div>
              {/* Added Text Area field */}
              <Row>
                <div className="mb-3 d-flex justify-content-between align-items-center">
                  <label>Radio Option</label>
                  <div className="d-flex">
                    <Form.Check
                      type="radio"
                      label="Option 1"
                      name="radioOption"
                      value="Option 1"
                      checked={otherFormData.radioOption === "Option 1"}
                      onChange={handleFormInputChange}
                      className="mx-2"
                    />
                    <Form.Check
                      type="radio"
                      label="Option 2"
                      name="radioOption"
                      value="Option 2"
                      className="mx-2"
                      checked={otherFormData.radioOption === "Option 2"}
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
                    value={otherFormData.textArea}
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
