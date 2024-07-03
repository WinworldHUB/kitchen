import { FC } from "react";
import { FaFile } from "react-icons/fa6";
import { getAttachmentBlob } from "../../utils/attachment.utils";

interface AttachmentTileProps {
  attachment: File;
}

const AttachmentTile: FC<AttachmentTileProps> = ({ attachment }) => {
  return (
    <div className="wish-tile border rounded">
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
