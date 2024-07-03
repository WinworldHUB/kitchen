export const getAttachmentBlob = (selectedFile: File) =>
  URL.createObjectURL(selectedFile);
// {
//   // create the preview
//     const objectUrl = URL.createObjectURL(selectedFile);

// //   setPreview(objectUrl);

// //   // free memory when ever this component is unmounted
// //   return () => URL.revokeObjectURL(objectUrl);
// };
