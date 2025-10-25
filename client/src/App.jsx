import { useEffect, useRef, useState } from "react";
import ChooseTemplate from "./components/ChooseTemplate";
import TemplateForm from "./components/TemplateForm";

function App() {
  const [formOpen, setFormOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const formRef = useRef(null);

  const handleFormOpen = (value) => {
    setSelectedTemplate(value);
    setFormOpen(true);
  };

  useEffect(() => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [formOpen]);

  console.log("Template value is ", selectedTemplate);

  return (
    <>
      <ChooseTemplate handleFormOpen={handleFormOpen} />
      <TemplateForm formOpen={formOpen} formRef={formRef} selectedTemplate={selectedTemplate} />
    </>
  );
}

export default App;
