import { FC } from "react";
import { FaPlus } from "react-icons/fa6";

interface AddAttachmentTileProps {
  onChange: (attachment: File) => void;
}

const AddAttachmentTile: FC<AddAttachmentTileProps> = ({ onChange }) => {
  return (
    <div className="wish-tile rounded shadow">
      <label htmlFor="newAttachment" className="clickable">
        <FaPlus size={"64px"} className="text-blue" />
      </label>
      <input
        type="file"
        className="d-none"
        id="newAttachment"
        placeholder="attach file"
        multiple={false}
        accept="application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint, text/plain, application/pdf, image/*"
        onChange={(e) => onChange(e.target.files[0])}
      />
      <label
        className="text-center text-truncate clickable"
        title={"Add document"}
        htmlFor="newAttachment"
      >
        Add document
      </label>
    </div>
  );
};

export default AddAttachmentTile;
