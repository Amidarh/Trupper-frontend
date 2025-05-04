// Only imports allowed outside dynamic() are TypeScript types
"use client"; // ensures it's treated as a client component (if using app/ directory)

import dynamic from "next/dynamic";
import { useEffect } from "react";
import { useState } from "react";

// Import Quill dynamically so it's only run on the client
const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading editor...</p>,
});

// You must also import CSS *inside* the dynamic component or through next.config.js
import "react-quill/dist/quill.snow.css";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const QuillEditor: React.FC<Props> = ({ value, onChange }: { value?: string, onChange?: any }) => {
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      ["clean"],
    ],
  };

  const formats = [
    "header", "bold", "italic", "underline",
    "list", "bullet", "link", "image"
  ];

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <ReactQuill
      theme="snow"
      value={value}
      onChange={onChange}
      modules={modules}
      formats={formats}
    />
  );
};

export default QuillEditor;
