import React, { useEffect, useState } from "react";
import ProfileProjectLayout from "../profile.project/profile.project.layout";
import { ListGroup, Container, Row, Col, Card, Button } from "react-bootstrap";
import {
  Annotorious,
  ImageAnnotationPopup,
  ImageAnnotator,
  AnnotationBody,
} from "@annotorious/react";

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

const CommentPopup = (props: {
  annotation: any;
  onCreateBody: any;
  onUpdateBody: any;
}) => {
  const { annotation, onCreateBody, onUpdateBody } = props;

  const [comment, setComment] = useState("");

  // Initialize comment from existing annotation body (if any)
  useEffect(() => {
    const commentBody = annotation.bodies.find(
      (body: AnnotationBody) => body.purpose === "commenting"
    );
    setComment(commentBody ? commentBody.value : "");
  }, [annotation.bodies]);

  const onSave = () => {
    const updated = {
      purpose: "commenting",
      value: comment,
    };

    const commentBody = annotation.bodies.find(
      (body: AnnotationBody) => body.purpose === "commenting"
    );
    if (commentBody) {
      onUpdateBody(commentBody, updated);
    } else {
      onCreateBody(updated);
    }
  };

  return (
    <div>
      <textarea value={comment} onChange={(e) => setComment(e.target.value)} />
      <button onClick={onSave}>Save</button>
    </div>
  );
};

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
              <>
                <Card>
                  <Card.Body>
                    <Card.Title>{selectedFile.key.split("/").pop()}</Card.Title>
                    <Card.Text>
                      <Button
                        variant="link"
                        href={selectedFile.downloadUrl}
                        target="_blank"
                      >
                        Download File
                      </Button>
                    </Card.Text>
                    <div id="annotorious-container">
                      <Annotorious>
                        <ImageAnnotator
                          containerClassName="annotation-layer"
                          tool="rectangle"
                          autoSave
                        >
                          {/* Image inside ImageAnnotator */}
                          <img
                            src={selectedFile.downloadUrl}
                            alt={
                              selectedFile.key.split("/").pop() ||
                              "Selected File"
                            }
                            style={{
                              width: "100%",
                              maxHeight: "500px",
                              objectFit: "contain",
                            }}
                          />
                        </ImageAnnotator>

                        {/* Popup for annotations */}
                        <ImageAnnotationPopup
                          popup={(props) => <CommentPopup {...props} />}
                        />
                      </Annotorious>
                    </div>
                  </Card.Body>
                </Card>
              </>
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
