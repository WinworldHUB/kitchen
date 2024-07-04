import { FC, useState } from "react";
import AttachmentsContainer from "../attachments/attachment.container";

interface ProjectAttachmentsProps {
  project: Project;
  onSave: (projectId: string) => void;
}

const ProjectAttachments: FC<ProjectAttachmentsProps> = ({
  project,
  onSave,
}) => {
  const [attachments, setAttachments] = useState<File[]>([]);
  const handleAttachmentRemove = (attachmentIndex: number) => {
    setAttachments(
      attachments.filter((attachment, index) => index !== attachmentIndex)
    );
  };
  const handleAddAttachment = (newAttachment: File) =>
    setAttachments([newAttachment, ...(attachments ?? [])]);

  return (
    <AttachmentsContainer
      attachments={attachments}
      onChange={handleAddAttachment}
      onRemove={handleAttachmentRemove}
    />
  );
};

export default ProjectAttachments;
