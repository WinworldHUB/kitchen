import { FC } from "react";
import { FaFile, FaX } from "react-icons/fa6";
import { getAttachmentBlob } from "../../utils/attachment.utils";
import { Badge } from "react-bootstrap";

interface AttachmentTileProps {
  attachment: File;
  onRemove: VoidFunction;
}

const AttachmentTile: FC<AttachmentTileProps> = ({ attachment, onRemove }) => {
  return (
    <div className="wish-tile border rounded">
      <Badge bg="danger" className="remove-badge clickable" onClick={onRemove}>
        <FaX />
      </Badge>
      <a
        className="clickable"
        href={getAttachmentBlob(attachment)}
        target="_blank"
        rel="noreferrer"
        title={attachment.name}
      >
        <FaFile size={"64px"} className="text-blue" />
      </a>
      <label
        className="text-center text-truncate clickable"
        title={"Add document"}
      >
        {attachment.name}
      </label>
    </div>
  );
};

export default AttachmentTile;
