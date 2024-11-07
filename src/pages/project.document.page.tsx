import React, { useState, useEffect } from "react";
import { Alert, ListGroup, Spinner } from "react-bootstrap";
import useApi from "../lib/hooks/useApi";
import { PROJECT_APIS } from "../lib/constants/api-constants";

const ProjectDocumentPage = () => {
  const [documents, setDocuments] = useState<GetDocument[]>([]);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const { postFormData: uploadProjectFiles } = useApi<UploadFileResponse>();
  const { getData: getProjectFiles } = useApi<GetProjectDocsResponse>();

  // Fetch project documents on component mount
  useEffect(() => {
    const fetchDocuments = async () => {
      setLoading(true);
      try {
        const response = await getProjectFiles(
          `${PROJECT_APIS.GET_PROJECT_DOCUMENTS_API}/1`
        );
        if (response.success) {
          setDocuments(response.data);
        } else if (response.error) {
          console.error("Error fetching documents:", response.error);
          setUploadStatus(
            `Failed to load project documents: ${response.error}`
          );
        }
      } catch (err) {
        console.error("Unexpected error:", err);
        setUploadStatus(
          "An unexpected error occurred while loading documents."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, []);

  // Function to handle file uploads
  const handleFileUpload = async (files: FileList) => {
    const formData = new FormData();
    Array.from(files).forEach((file) => formData.append("files", file));

    setLoading(true);
    try {
      const response = await uploadProjectFiles(
        `${PROJECT_APIS.UPLOAD_PROJECT_DOCUMENT_API}/1`,
        formData
      );
      if (response.success) {
        setUploadStatus("Files uploaded successfully.");

        // Map FileData to GetDocument and append to documents
        const newDocuments: GetDocument[] = response.data.map(
          (fileData: FileData) => ({
            key: fileData.key,
            lastModified: new Date().toISOString(), // Placeholder date
            size: 0, // Placeholder as size is not provided in FileData
          })
        );
        setDocuments((prevDocs) => [...prevDocs, ...newDocuments]);
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
  };

  return (
    <div className="container">
      <h1 className="my-4">Project Documents</h1>

      {uploadStatus && (
        <Alert variant={uploadStatus.includes("failed") ? "danger" : "success"}>
          {uploadStatus}
        </Alert>
      )}

      <div className="mb-3">
        <label htmlFor="fileUpload" className="form-label">
          Upload Documents
        </label>
        <input
          id="fileUpload"
          type="file"
          multiple
          ref={(input) => input && (input.webkitdirectory = true)}
          onChange={(e) => {
            const target = e.target as HTMLInputElement;
            if (target.files) handleFileUpload(target.files);
          }}
          className="form-control"
        />
      </div>

      {loading && (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}

      <h2 className="my-4">Documents List</h2>
      {documents.length > 0 ? (
        <ListGroup>
          {documents.map((doc) => (
            <ListGroup.Item key={doc.key}>
              <a href={doc.key} target="_blank" rel="noopener noreferrer">
                {doc.key} - {doc.size} bytes - Last Modified:{" "}
                {new Date(doc.lastModified).toLocaleDateString()}
              </a>
            </ListGroup.Item>
          ))}
        </ListGroup>
      ) : (
        <Alert variant="info">No documents found.</Alert>
      )}
    </div>
  );
};

export default ProjectDocumentPage;
