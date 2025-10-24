import React from "react";
import { useState } from "react";
import FormSectionWrapper from "./parts/FormSectionWrapper";
import { Plus, Trash, X } from "lucide-react";

function InputFields({
  labelId,
  labelName,
  inputType,
  inputName,
  inputId,
  placeHolder,
}) {
  return (
    <div className="flex gap-3 flex-col">
      <label htmlFor={labelId}>{labelName}</label>
      <input
        type={inputType}
        name={inputName}
        id={inputId}
        placeholder={placeHolder}
        className="bg-gray-100 text-gray-500 focus:outline-none px-5 py-2 rounded-md"
      />
    </div>
  );
}

const TemplateForm = ({ formOpen, action, pending }) => {
  const [activeSection, setActiveSection] = useState("BasicDetails");
  const [services, setServices] = useState([{ title: "", description: "" }]);
  const [products, setProducts] = useState([
    { productName: "", productDes: "", productLink: "" },
  ]);
  const [clients, setClients] = useState([
    { clientName: "", clientLogo: "", clientTestimonial: "" },
  ]);
  const [skillVal, setSkillVal] = useState("");
  const [skills, setSkills] = useState([]);

  //   createServices
  const createServices = () => {
    if (services.length >= 3) return;
    setServices((prev) => [...prev, { title: "", description: "" }]);
  };

  //   delete Services
  const deleteService = (index) => {
    const update = [...services];
    update.splice(index, 1);
    setServices(update);
  };

  //   createProducts
  const createProduct = () => {
    if (products.length >= 3) return;
    setProducts((prev) => [
      ...prev,
      { productName: "", productDes: "", productLink: "" },
    ]);
  };

  //   deleteProducts
  const deleteProduct = (index) => {
    const update = [...products];
    update.splice(index, 1);
    setProducts(update);
  };

  //   createClients
  const createClient = () => {
    if (clients.length >= 3) return;
    setClients((prev) => [
      ...prev,
      { clientName: "", clientLogo: "", clientTestimonial: "" },
    ]);
  };

  //   deleteClient
  const deleteClient = (index) => {
    const update = [...clients];
    update.splice(index, 1);
    setClients(update);
  };

  //   handleSkills
  const handleSkillsValue = (e) => {
    setSkillVal(e.target.value);
  };

  const handleSkills = () => {
    if (skills.length >= 7) return;
    setSkills((prev) => [...prev, skillVal]);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && e.target.value.trim() !== "") {
      handleSkills();
    }
  };

  const skillDelete = (index) => {
    const findSkill = [...skills];
    findSkill.splice(index, 1);
    setSkills(findSkill);
  };

  const sections = [
    { id: "BasicDetails", label: "BasicDetails" },
    { id: "Hero", label: "Hero" },
    { id: "AboutSection", label: "AboutSection" },
    { id: "Services", label: "Services" },
    { id: "Products", label: "Products" },
    { id: "Clients", label: "Clients" },
    { id: "Skills", label: "Skills" },
  ];

  return (
    <div
      className={`max-w-[800px] mx-auto  mt-20 shadow-lg font-open-sans ${
        formOpen === true ? "block" : "hidden"
      }`}
    >
      <div className="shadow rounded-xl bg-white px-5 py-3">
        {/* Show all the sections */}
        <div className="flex gap-3 flex-wrap">
          {sections &&
            sections.map((sec) => (
              <button
                key={sec.id}
                onClick={() => setActiveSection(sec.id)}
                className={`px-5 py-2 cursor-pointer shadow rounded-lg transition-colors duration-300 ease-in-out ${
                  activeSection === sec.id
                    ? "bg-red-600 text-white"
                    : "bg-white text-slate-900"
                }`}
              >
                {sec.label}
              </button>
            ))}
        </div>

        {/* Form */}
        <form action={action}>
          {/* Show Basic Details page */}
          <FormSectionWrapper
            activeSection={activeSection}
            section={"BasicDetails"}
            sectionName={"Basic Details"}
          >
            <div className="mt-6 grid sm:grid-cols-2 gap-3">
              {/* User Name */}
              <InputFields
                labelId={"name"}
                labelName={"Enter Your Name"}
                inputType={"text"}
                inputId={"name"}
                inputName={"name"}
                placeHolder={"Ex:- Keyur Panchal"}
              />

              {/* Email */}
              <InputFields
                labelId={"email"}
                labelName={"Enter Your Email"}
                inputType={"email"}
                inputId={"email"}
                inputName={"email"}
                placeHolder={"Ex:- test@gmail.com"}
              />

              {/* PhoneNumber */}
              <InputFields
                labelId={"phoneNumber"}
                labelName={"Enter Your PhoneNumber"}
                inputType={"tel"}
                inputId={"phoneNumber"}
                inputName={"phoneNumber"}
                placeHolder={"Ex:- 1234567890"}
              />

              {/* Company Name */}
              <InputFields
                labelId={"address"}
                labelName={"Enter Your Address"}
                inputType={"text"}
                inputId={"address"}
                inputName={"address"}
                placeHolder={"Ex:- Vastral, Ahmedabad"}
              />
            </div>
          </FormSectionWrapper>

          {/* Show Hero page Details */}
          <FormSectionWrapper
            activeSection={activeSection}
            sectionName={"Hero"}
            section={"Hero"}
          >
            <div className="mt-6 grid sm:grid-cols-2 gap-3">
              {/* Title Field */}
              <InputFields
                labelId={"title"}
                labelName={"Enter Your Title"}
                inputType={"text"}
                inputName={"title"}
                inputId={"title"}
                placeHolder={"Ex:- Node.Js Developer..."}
              />

              {/* Sub Title Field */}
              <InputFields
                labelId={"subtitle"}
                labelName={"Enter Your SubTitle"}
                inputType={"text"}
                inputName={"subtitle"}
                inputId={"subtitle"}
                placeHolder={"Ex:- Building scalable and efficient applic..."}
              />
            </div>

            <div className="mt-3">
              {/* Img Field */}
              <InputFields
                labelId={"heroImg"}
                labelName={"Enter Your Img"}
                inputType={"file"}
                inputName={"heroImg"}
                inputId={"heroImg"}
              />
            </div>
          </FormSectionWrapper>

          {/* AboutSection */}
          <FormSectionWrapper
            activeSection={activeSection}
            section={"AboutSection"}
            sectionName={"About Section"}
          >
            <div className="mt-6 grid sm:grid-cols-2  gap-3">
              {/* Description */}
              <InputFields
                labelId={"description"}
                labelName={"Enter Your description"}
                inputType={"text"}
                inputId={"description"}
                inputName={"description"}
                placeHolder={"Ex :- i am passinate about web..."}
              />

              {/* profileImg */}
              <InputFields
                labelId={"profileImg"}
                labelName={"Enter Your Profile Img"}
                inputType={"file"}
                inputId={"profileImg"}
                inputName={"profileImg"}
              />

              {/* Hightlight */}
              <InputFields
                labelId={"highlight"}
                labelName={"Enter Your Hightlight"}
                inputType={"text"}
                inputId={"highlight"}
                inputName={"Hightlight"}
                placeHolder={"Ex :- i have worked on serval contribution..."}
              />
            </div>
          </FormSectionWrapper>

          {/* Services */}
          <FormSectionWrapper
            activeSection={activeSection}
            section={"Services"}
            sectionName={"Services"}
          >
            {/* buttons for increasing the services */}
            <div className="mt-6">
              <button
                onClick={createServices}
                className="cursor-pointer  flex gap-3 items-center bg-red-600 text-white px-4 py-2 rounded-lg transition-transform duration-150 ease-in-out active:scale-96"
              >
                <span>
                  <Plus />
                </span>
                <span>Add Services</span>
              </button>
            </div>

            {/* Showing all the services */}
            {services.map((_, index) => (
              <div key={index}>
                {/* check that service lenght */}
                <div className="mt-10 flex items-center justify-between">
                  <h4 className="font-medium">Service {index + 1}</h4>
                  {services.length > 1 && (
                    <button
                      onClick={() => deleteService(index)}
                      className="flex items-center gap-3 px-4 py-2 rounded-lg bg-red-600 active:scale-96 transition-transform ease-in-out duration-150 text-white shadow cursor-pointer"
                    >
                      <span>
                        <Trash />
                      </span>
                      <span>Delete</span>
                    </button>
                  )}
                </div>
                <div className="mt-4">
                  {/* Title Field */}
                  <InputFields
                    labelId={"title"}
                    labelName={"Enter Your Services Title"}
                    inputType={"text"}
                    inputId={"title"}
                    inputName={"title"}
                  />

                  {/* Description Field */}
                  <div className="mt-3">
                    <label htmlFor="description">
                      Enter Your Service Description
                    </label>
                    <textarea
                      name="description"
                      id="description"
                      className="w-full px-5 py-2 rounded-lg focus:outline-none bg-gray-100 text-gray-500 mt-3"
                    ></textarea>
                  </div>
                </div>
              </div>
            ))}
          </FormSectionWrapper>

          {/* Products */}
          <FormSectionWrapper
            activeSection={activeSection}
            section={"Products"}
            sectionName={"Products"}
          >
            {/* button for increasing the products */}
            <div className="mt-6">
              <button
                onClick={createProduct}
                className="cursor-pointer  flex gap-3 items-center bg-red-600 text-white px-4 py-2 rounded-lg transition-transform duration-150 ease-in-out active:scale-96"
              >
                <span>
                  <Plus />
                </span>
                <span>Add Product</span>
              </button>
            </div>

            {/* Increasing the map */}
            {products.map((_, index) => (
              <div key={index}>
                {/* buttons for deleting the product */}
                <div className="mt-10 flex items-center justify-between">
                  <h4 className="font-medium">Product {index + 1}</h4>
                  {products.length > 1 && (
                    <button
                      onClick={() => deleteProduct(index)}
                      className="flex items-center gap-3 px-4 py-2 rounded-lg bg-red-600 active:scale-96 transition-transform ease-in-out duration-150 text-white shadow cursor-pointer"
                    >
                      <span>
                        <Trash />
                      </span>
                      <span>Delete</span>
                    </button>
                  )}
                </div>

                <div className="grid sm:grid-cols-2 gap-3 mt-6">
                  {/* Product Name */}
                  <InputFields
                    labelId={"productName"}
                    labelName={"Enter Product Name"}
                    inputType={"text"}
                    inputId={"productName"}
                    inputName={"productName"}
                    placeHolder={"Ex :- MERN Chat App"}
                  />

                  {/* Product Description */}
                  <InputFields
                    labelId={"productDes"}
                    labelName={"Enter Product Description"}
                    inputType={"text"}
                    inputId={"productDes"}
                    inputName={"productDes"}
                    placeHolder={"Ex :- MERN Chat App with scalable code"}
                  />

                  {/* Product Link */}
                  <InputFields
                    labelId={"productLink"}
                    labelName={"Enter Product Link"}
                    inputType={"text"}
                    inputId={"productLink"}
                    inputName={"productLink"}
                    placeHolder={"Ex :- http://liveprojectlink.com"}
                  />
                </div>
              </div>
            ))}
          </FormSectionWrapper>

          {/* Clients */}
          <FormSectionWrapper
            activeSection={activeSection}
            section={"Clients"}
            sectionName={"Clients"}
          >
            {/* Add Clients */}
            <div className="mt-6">
              <button
                onClick={createClient}
                className="cursor-pointer  flex gap-3 items-center bg-red-600 text-white px-4 py-2 rounded-lg transition-transform duration-150 ease-in-out active:scale-96"
              >
                <span>
                  <Plus />
                </span>
                <span>Add Clients</span>
              </button>
            </div>

            {/* Client Form */}
            {clients.map((_, index) => (
              <div key={index}>
                {/* buttons for deleting client */}
                <div className="mt-10 flex items-center justify-between">
                  <h4 className="font-medium">Client {index + 1}</h4>
                  {clients.length > 1 && (
                    <button
                      onClick={() => deleteClient(index)}
                      className="flex items-center gap-3 px-4 py-2 rounded-lg bg-red-600 active:scale-96 transition-transform ease-in-out duration-150 text-white shadow cursor-pointer"
                    >
                      <span>
                        <Trash />
                      </span>
                      <span>Delete</span>
                    </button>
                  )}
                </div>

                <div className="mt-6 grid sm:grid-cols-2 gap-3">
                  {/* Client Name */}
                  <InputFields
                    labelId={"clientName"}
                    labelName={"Enter Client Name"}
                    inputType={"text"}
                    inputId={"clientName"}
                    inputName={"clientName"}
                    placeHolder={"Ex :- Keyur Panchal"}
                  />

                  {/* Client Logo */}
                  <InputFields
                    labelId={"clientName"}
                    labelName={"Enter Client Name"}
                    inputType={"text"}
                    inputId={"clientName"}
                    inputName={"clientName"}
                    placeHolder={"Ex :- http://www.google.com"}
                  />

                  {/* clientTestimonial */}
                  <InputFields
                    labelId={"clientTestimonial"}
                    labelName={"Enter Client Testimonial"}
                    inputType={"text"}
                    inputId={"clientTestimonial"}
                    inputName={"clientTestimonial"}
                    placeHolder={"Ex :- Keyur Panchal made a really good..."}
                  />
                </div>
              </div>
            ))}
          </FormSectionWrapper>

          {/* Skills */}
          <FormSectionWrapper
            activeSection={activeSection}
            section={"Skills"}
            sectionName={"Skills"}
          >
            <div className="mt-6">
              {/* Skills showing btns */}
              <div className="mb-6 flex flex-wrap gap-3">
                {skills.map((skill, index) => (
                  <button
                    key={index}
                    onClick={() => skillDelete(index)}
                    className="bg-white text-red-600 gap-3 flex items-center justify-between px-4 py-2 rounded-lg shadow"
                  >
                    <span> {skill}</span>
                    <span className="cursor-pointer">
                      <X size={18} />
                    </span>
                  </button>
                ))}
              </div>

              {/* text input field for skills */}
              <div>
                <div className="flex gap-3 flex-col">
                  <label htmlFor={"skills"}>{"Enter Your Skills"}</label>
                  <input
                    type={"text"}
                    name={"skills"}
                    id={"skills"}
                    placeholder={"Ex :- JavaScript"}
                    onKeyDown={handleKeyDown}
                    onChange={handleSkillsValue}
                    className="bg-gray-100 text-gray-500 focus:outline-none px-5 py-2 rounded-md"
                  />
                </div>
              </div>
            </div>
          </FormSectionWrapper>
        </form>

        {/* Buttons for navigating */}
        <div className="mt-10 flex flex-row-reverse">
          {activeSection !== "Skills" ? (
            <button
              onClick={() => {
                const currentIndex = sections.findIndex(
                  (s) => s.id === activeSection
                );

                if (currentIndex < sections.length - 1) {
                  setActiveSection(sections[currentIndex + 1].id);
                }
              }}
              className="bg-red-600 text-white rounded-lg px-5 py-2 transition transform duration-100 ease-in-out hover:bg-red-800 active:scale-96"
            >
              Next
            </button>
          ) : (
            <button
              disabled={pending}
              className="bg-red-600 text-white rounded-lg px-5 py-2 transition transform duration-100 ease-in-out hover:bg-red-800 active:scale-96"
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TemplateForm;
