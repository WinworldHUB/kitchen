import { FC } from "react";
import AttachmentTile from "./attachment.tile";
import AddAttachmentTile from "./attachment.new";
import { Col, Container, Row } from "react-bootstrap";

interface AttachmentsContainerProps {
  attachments: File[];
  canAddAttachment?: boolean;
  onChange: (attachment: File) => void;
}

const AttachmentsContainer: FC<AttachmentsContainerProps> = ({
  attachments,
  canAddAttachment = true,
  onChange,
}) => {
  return (
    <Container fluid className="border p-5 bg-light rounded">
      <Row className="gx-2 gy-4">
        {canAddAttachment && (
          <Col sm="3" xs="2">
            <AddAttachmentTile onChange={onChange} />
          </Col>
        )}
        {(attachments ?? []).map((attachment) => (
          <Col sm="3" xs="2">
            <AttachmentTile key={attachment.name} attachment={attachment} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default AttachmentsContainer;
