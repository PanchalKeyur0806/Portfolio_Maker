import { useState } from "react";
import ChooseTemplate from "./components/ChooseTemplate";
import TemplateForm from "./components/TemplateForm";
import { useActionState } from "react";

function App() {
  const [formOpen, setFormOpen] = useState(false);

  const [, action, pending] = useActionState(handleFormData, null);

  function handleFormData(preData, formData) {}

  const handleFormOpen = () => {
    setFormOpen(true);
  };
  return (
    <>
      <ChooseTemplate onclick={handleFormOpen} />
      <TemplateForm formOpen={formOpen} action={action} pending={pending} />
    </>
  );
}

export default App;
