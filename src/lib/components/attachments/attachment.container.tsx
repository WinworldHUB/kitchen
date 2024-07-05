import { FC } from "react";
import AttachmentTile from "./attachment.tile";
import AddAttachmentTile from "./attachment.new";
import { Col, Container, Row } from "react-bootstrap";

interface AttachmentsContainerProps {
  attachments: File[];
  canAddAttachment?: boolean;
  onChange: (attachment: File) => void;
  onRemove: (index: number) => void;
}

const AttachmentsContainer: FC<AttachmentsContainerProps> = ({
  attachments,
  canAddAttachment = true,
  onChange,
  onRemove,
}) => {
  return (
    <Container fluid className="border p-5 bg-light rounded h-400">
      <Row className="gx-sm-2 gy-4">
        {canAddAttachment && (
          <Col sm="5" className="mx-xs-auto">
            <AddAttachmentTile onChange={onChange} />
          </Col>
        )}
        {(attachments ?? []).map((attachment, index) => (
          <Col sm="5" className="text-center" key={attachment.name + index}>
            <AttachmentTile
              key={attachment.name}
              attachment={attachment}
              onRemove={() => onRemove(index)}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default AttachmentsContainer;
