import React, { useState } from "react";
import ProfileProjectLayout from "../profile.project/profile.project.layout";
import { ListGroup, Container, Row, Col, Card } from "react-bootstrap";
import {
  Annotorious,
  ImageAnnotator,
  ImageAnnotationPopup,
} from "@annotorious/react";
import CommentPopup from "./comment.popup";

interface ProjectDocsDetailsProps {
  folderKey: string;
  projectId: string;
  folderData: GetDocument[];
}

interface GetDocument {
  key: string;
  size: number;
  downloadUrl: string;
}

const ProjectDocsDetails: React.FC<ProjectDocsDetailsProps> = ({
  folderKey,
  projectId,
  folderData,
}) => {
  const [selectedFile, setSelectedFile] = useState<GetDocument | null>(null);

  const handleFileClick = (file: GetDocument) => {
    setSelectedFile(file);
  };

  return (
    <ProfileProjectLayout>
      <Container fluid>
        <Row>
          {/* Left - File List */}
          <Col md={3} className="p-4">
            <h2>Files</h2>
            <ListGroup>
              {folderData.map((file) => (
                <ListGroup.Item
                  key={file.key}
                  action
                  onClick={() => handleFileClick(file)}
                  className="cursor-pointer"
                >
                  {file.key.split("/").pop()}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>

          {/* Right - Selected File with Annotorious */}
          <Col md={9} className="p-4">
            {selectedFile ? (
              <Card>
                <Card.Body>
                  <div id="annotorious-container">
                    <Annotorious>
                      <ImageAnnotator
                        containerClassName="annotation-layer"
                        tool="rectangle"
                        autoSave
                        style={{
                          fill: "rgba(255, 255, 255, 0.5)",
                          stroke: "#f00",
                        }}
                      >
                        <img
                          src={selectedFile.downloadUrl}
                          alt={
                            selectedFile.key.split("/").pop() || "Selected File"
                          }
                          style={{
                            width: "100%",
                            maxHeight: "500px",
                            objectFit: "cover",
                          }}
                        />
                      </ImageAnnotator>
                      <ImageAnnotationPopup
                        popup={(props) => <CommentPopup {...props} />}
                      />
                    </Annotorious>
                  </div>
                </Card.Body>
              </Card>
            ) : (
              <p>Select a file to view and annotate.</p>
            )}
          </Col>
        </Row>
      </Container>
    </ProfileProjectLayout>
  );
};

export default ProjectDocsDetails;
