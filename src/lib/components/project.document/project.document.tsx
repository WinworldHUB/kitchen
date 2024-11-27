import { ListGroup, Row, Col, Card } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { FaFolder } from "react-icons/fa6";

import { useContext, useState, useEffect } from "react";
import { Loader } from "react-bootstrap-typeahead";
import { PROJECT_APIS } from "../../constants/api-constants";
import { AppContext } from "../../contexts/appcontext";
import useApi from "../../hooks/useApi";
import ProfileProjectLayout from "../profile.project/profile.project.layout";
import ProjectDocsDetails from "./project.docs.details";

const ProjectDocument: React.FC = () => {
  const { projectId } = useParams();
  const { appState } = useContext(AppContext);
  const [userDocuments, setUserDocuments] = useState<FolderData[]>([]);
  const [moietyDocuments, setMoietyDocuments] = useState<FolderData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedFolderKey, setSelectedFolderKey] = useState<string | null>(
    null
  );
  const [selectedFolderData, setSelectedFolderData] = useState<GetDocument[]>(
    []
  );

  const { postFormData: uploadProjectFiles } = useApi<UploadFileResponse>();
  const { getData: getProjectFiles } = useApi<GetProjectDocsResponse>();

  // Fetch project documents
  const fetchDocuments = async () => {
    setLoading(true);
    try {
      const response = await getProjectFiles(
        `${PROJECT_APIS.GET_PROJECT_DOCUMENTS_API}/${projectId}`
      );
      if (response.success) {
        const { user, moiety } = response.data;
        setUserDocuments(user);
        setMoietyDocuments(moiety || []);
      } else if (response.error) {
        console.error("Error fetching documents:", response.error);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  const handleFileUpload = async (files: FileList) => {
    const formData = new FormData();
    if (files.length > 0) {
      Array.from(files).forEach((file) => {
        formData.append("files", file);
      });
      formData.append("uploader", appState.isAdmin ? "admin" : "user");
      setLoading(true);
      try {
        const response = await uploadProjectFiles(
          `${PROJECT_APIS.UPLOAD_PROJECT_DOCUMENT_API}/${projectId}`,
          formData
        );

        if (response.success) {
          fetchDocuments(); // Re-fetch documents after successful upload
        } else if (response.error) {
          console.error("Error uploading files:", response.error);
        }
      } catch (err) {
        console.error("Unexpected error:", err);
      } finally {
        setLoading(false);
      }
    } else {
      console.error("No files selected for upload");
    }
  };

  const getFolderName = (folderName: string) => {
    if (folderName === "files") {
      return "Miscellaneous Files";
    }
    if (folderName === "siteVideosAndPics") {
      return "Site Videos And Pics";
    }
    if (folderName === "measurements") {
      return "Measurements";
    }
    if (folderName === "quotations") {
      return "Quotations";
    }
    if (folderName === "renders") {
      return "Renders";
    }
  };

  const handleFolderClick = (folderKey: string) => {
    setSelectedFolderKey(folderKey);

    // Flatten all folders into one array
    const flatFolders = [...userDocuments, ...moietyDocuments].flatMap(
      (folder) => folder.files
    );
    const folderData = flatFolders.filter((doc) => doc.key.includes(folderKey));

    setSelectedFolderData(folderData); // Set the filtered folder data
  };

  if (loading) {
    return <Loader />;
  }

  // If a folder is selected, render the ProjectDocsDetails component
  if (selectedFolderKey && selectedFolderData) {
    return (
      <ProjectDocsDetails
        folderKey={selectedFolderKey}
        projectId={projectId}
        folderData={selectedFolderData}
      />
    );
  }

  return (
    <ProfileProjectLayout>
      <h1 className="my-4">Project Documents</h1>

      {/* Section for user documents */}
      <Row className="mb-4 align-items-center">
        <Col>
          <h3>From Username</h3>
        </Col>
        {!appState.isAdmin && (
          <Col xs="auto">
            <label
              htmlFor="fileUpload"
              className="d-flex flex-column align-items-center cursor-pointer"
              style={{ cursor: "pointer" }}
            >
              <div className="rounded-pill px-4 bg-primary text-light fs-5 py-2">
                Upload File
              </div>
            </label>
            <input
              id="fileUpload"
              type="file"
              name="fileUpload"
              onChange={(e) => {
                const target = e.target;
                if (target.files) handleFileUpload(target.files);
              }}
              multiple
              accept=".jpg, .jpeg, .png, .mp4, .mov, .pdf"
              className="visually-hidden"
            />
          </Col>
        )}
      </Row>

      {/* List of user documents */}
      <div className="d-flex flex-row overflow-auto mb-4">
        <ListGroup horizontal>
          {userDocuments.map((folder, index) => (
            <ListGroup.Item key={index} className="p-3 border-0">
              <Card
                className="d-flex flex-column align-items-center justify-content-center shadow-sm border"
                onClick={() => handleFolderClick(folder.folderName)} // Handle folder click
              >
                <Card.Body className="text-center">
                  <Card.Title>
                    <FaFolder size={100} className="text-primary" />
                  </Card.Title>
                  <Card.Text className="text-dark fs-4 fw-semibold">
                    {getFolderName(folder.folderName)}
                  </Card.Text>
                </Card.Body>
              </Card>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>

      <hr />

      {/* Section for moiety documents */}
      <Row className="mb-4 align-items-center">
        <Col>
          <h3>From Moiety Team</h3>
        </Col>
        {appState.isAdmin && (
          <Col xs="auto">
            <label
              htmlFor="fileUpload"
              className="d-flex flex-column align-items-center cursor-pointer"
              style={{ cursor: "pointer" }}
            >
              <div className="rounded-pill px-4 bg-primary text-light fs-5 py-2">
                Upload File
              </div>
            </label>
            <input
              id="fileUpload"
              type="file"
              name="fileUpload"
              onChange={(e) => {
                const target = e.target;
                if (target.files) handleFileUpload(target.files);
              }}
              multiple
              accept=".jpg, .jpeg, .png, .mp4, .mov, .pdf"
              className="visually-hidden"
            />
          </Col>
        )}
      </Row>

      {/* List of moiety documents */}
      <div className="d-flex flex-row overflow-auto">
        {moietyDocuments.map((folder, index) => (
          <ListGroup.Item key={index} className="p-3 border-0">
            <Card
              className="d-flex flex-column align-items-center justify-content-center shadow-sm border"
              onClick={() => handleFolderClick(folder.folderName)} // Handle folder click
            >
              <Card.Body className="text-center">
                <Card.Title>
                  <FaFolder size={100} className="text-primary" />
                </Card.Title>
                <Card.Text className="text-dark fs-4 fw-semibold">
                  {getFolderName(folder.folderName)}
                </Card.Text>
              </Card.Body>
            </Card>
          </ListGroup.Item>
        ))}
      </div>
    </ProfileProjectLayout>
  );
};

export default ProjectDocument;
