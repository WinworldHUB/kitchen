import React, { useState, useEffect } from "react";
import { Alert, ListGroup, Spinner, Row, Col } from "react-bootstrap";
import useApi from "../lib/hooks/useApi";
import { PROJECT_APIS } from "../lib/constants/api-constants";
import ProfileProjectLayout from "../lib/components/profile.project/profile.project.layout";

const ProjectDocumentPage = () => {
  const [userDocuments, setUserDocuments] = useState<GetDocument[]>([]);
  const [moietyDocuments, setMoietyDocuments] = useState<GetDocument[]>([]);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const { postFormData: uploadProjectFiles } = useApi<UploadFileResponse>();
  const { getData: getProjectFiles } = useApi<GetProjectDocsResponse>();

  // Fetch project documents
  const fetchDocuments = async () => {
    setLoading(true);
    try {
      const response = await getProjectFiles(
        `${PROJECT_APIS.GET_PROJECT_DOCUMENTS_API}/1`
      );
      if (response.success) {
        const { userDocs, moietyDocs } = response.data;
        setUserDocuments(userDocs || []);
        setMoietyDocuments(moietyDocs || []);
      } else if (response.error) {
        console.error("Error fetching documents:", response.error);
        setUploadStatus(`Failed to load project documents: ${response.error}`);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      setUploadStatus("An unexpected error occurred while loading documents.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  // Function to handle file uploads
  const handleFileUpload = async (files: FileList) => {
    const formData = new FormData();
    if (files.length > 0) {
      Array.from(files).forEach((file) => {
        formData.append("files", file);
      });

      setLoading(true);
      try {
        const response = await uploadProjectFiles(
          `${PROJECT_APIS.UPLOAD_PROJECT_DOCUMENT_API}/1`,
          formData
        );

        if (response.success) {
          setUploadStatus("Files uploaded successfully.");
          fetchDocuments(); // Re-fetch documents from API after successful upload
        } else if (response.error) {
          console.error("Error uploading files:", response.error);
          setUploadStatus(`File upload failed: ${response.error}`);
        }
      } catch (err) {
        console.error("Unexpected error:", err);
        setUploadStatus("An unexpected error occurred while uploading files.");
      } finally {
        setLoading(false);
      }
    } else {
      setUploadStatus("No files selected.");
    }
  };

  return (
    <ProfileProjectLayout>
      <h1 className="my-4">Project Documents</h1>

      {uploadStatus && (
        <Alert
          variant={
            uploadStatus.includes("failed") || uploadStatus.includes("error")
              ? "danger"
              : "success"
          }
        >
          {uploadStatus}
        </Alert>
      )}

      {loading && (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}

      <Row className="mb-4 align-items-center">
        <Col>
          <h3>From Username</h3>
        </Col>
        <Col xs="auto">
          <input
            type="file"
            multiple
            accept="*"
            onChange={(e) => {
              const target = e.target as HTMLInputElement;
              if (target.files) handleFileUpload(target.files);
            }}
            className="form-control"
            style={{ display: "inline-block", width: "auto" }}
          />
        </Col>
      </Row>

      <div className="d-flex flex-row overflow-auto mb-4">
        <ListGroup horizontal>
          {userDocuments.map((doc) => (
            <ListGroup.Item key={doc.key} className="me-2">
              <a href={doc.key} target="_blank" rel="noopener noreferrer">
                {doc.key} - {doc.size} bytes - Last Modified:{" "}
                {new Date(doc.lastModified).toLocaleDateString()}
              </a>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
      <hr className="my-4 w-100 border-primary border-2" />
      <h3>From Moiety Team</h3>
      <div className="d-flex flex-row overflow-auto">
        <ListGroup horizontal>
          {moietyDocuments.map((doc) => (
            <ListGroup.Item key={doc.key} className="me-2">
              <a href={doc.key} target="_blank" rel="noopener noreferrer">
                {doc.key} - {doc.size} bytes - Last Modified:{" "}
                {new Date(doc.lastModified).toLocaleDateString()}
              </a>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
    </ProfileProjectLayout>
  );
};

export default ProjectDocumentPage;
