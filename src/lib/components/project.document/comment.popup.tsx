import { AnnotationBody } from "@annotorious/react";
import { useState, useEffect } from "react";

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

  const autoSave = (newComment: string) => {
    const updated = {
      purpose: "commenting",
      value: newComment,
    };

    const commentBody = annotation.bodies.find(
      (body: AnnotationBody) => body.purpose === "commenting"
    );

    if (commentBody) {
      onUpdateBody(commentBody, updated); // Update existing comment
    } else {
      onCreateBody(updated); // Create a new comment
    }
  };

  return (
    <div className="h-20">
      <textarea
        value={comment}
        onChange={(e) => {
          const newComment = e.target.value;
          setComment(newComment);
          autoSave(newComment); // Save on every change
        }}
        onBlur={(e) => autoSave(e.target.value)} // Ensure save on blur as fallback
        placeholder="Add your comment..."
      />
    </div>
  );
};

export default CommentPopup;
