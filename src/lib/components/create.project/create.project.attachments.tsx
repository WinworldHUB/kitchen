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
  return (
    <AttachmentsContainer
      attachments={attachments}
      onChange={(newAttachment) =>
        setAttachments([newAttachment, ...attachments])
      }
    />
  );
};

export default ProjectAttachments;
