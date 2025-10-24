import React from "react";

const FormSectionWrapper = ({
  activeSection,
  section,
  sectionName,
  children,
}) => {
  return (
    <div className={`${activeSection === section ? "block" : "hidden"}`}>
      <div className="mt-10">
        <h1 className="text-xl font-semibold">{sectionName}</h1>
      </div>

      {children}
    </div>
  );
};

export default FormSectionWrapper;
