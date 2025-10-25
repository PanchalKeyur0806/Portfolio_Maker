// import React, { useActionState } from "react";
import axios from "axios";
import { useState } from "react";
import FormSectionWrapper from "./parts/FormSectionWrapper";
import { Plus, Trash, X } from "lucide-react";

// For Normal Form
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

// For Multifle fields Forms
function InputField({
  labelId,
  labelName,
  inputType,
  inputId,
  placeHolder,
  onChange,
  value,
}) {
  return (
    <div className="flex gap-3 flex-col">
      <label htmlFor={labelId}>{labelName}</label>
      <input
        type={inputType}
        id={inputId}
        value={value}
        onChange={onChange}
        placeholder={placeHolder}
        className="bg-gray-100 text-gray-500 focus:outline-none px-5 py-2 rounded-md"
      />
    </div>
  );
}

const TemplateForm = ({ formOpen, formRef, selectedTemplate }) => {
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

  const [err, setError] = useState("");
  async function handleFormSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);

    const data = {
      basicDetails: {
        name: formData.get("name"),
        email: formData.get("email"),
        phoneNumber: formData.get("phoneNumber"),
        address: formData.get("address"),
      },
      hero: {
        title: formData.get("title"),
        subtitle: formData.get("subtitle"),
        heroImg: formData.get("heroImg"),
      },
      aboutSection: {
        description: formData.get("description"),
        profileImg: formData.get("profileImg"),
        highlight: formData.get("highlight"),
      },
      services,
      products,
      clients,
      skills,
    };

    try {
      setError("");

      const formPayload = new FormData();

      formPayload.append("basicDetails", JSON.stringify(data.basicDetails));
      formPayload.append(
        "hero",
        JSON.stringify({
          title: data.hero.title,
          subtitle: data.hero.subtitle,
        })
      );
      formPayload.append(
        "aboutSection",
        JSON.stringify({
          description: data.aboutSection.description,
          highlight: data.aboutSection.highlight,
        })
      );

      if (data.hero.heroImg) formPayload.append("heroImg", data.hero.heroImg);
      if (data.aboutSection.profileImg)
        formPayload.append("profileImg", data.aboutSection.profileImg);

      formPayload.append("services", JSON.stringify(data.services));
      formPayload.append("products", JSON.stringify(data.products));
      formPayload.append("clients", JSON.stringify(data.clients));
      formPayload.append("skills", JSON.stringify(data.skills));

      const response = await axios.post(
        "http://localhost:3003/portfolio",
        formPayload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Response:", response.data);
      if (response.status === "success") {
        alert("Form successfully submited");
      }
    } catch (error) {
      console.error(error);
      setError(error.response?.data?.message);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  }

  // update helper
  const updateHelper = (index, field, value, state, updateState) => {
    const update = [...state];
    update[index][field] = value;
    updateState(update);
  };

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
    setSkillVal("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && e.target.value.trim() !== "") {
      e.preventDefault();
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
      className={`max-w-[800px] mx-auto mb-10 px-3 md:px-0  mt-20 shadow-lg font-open-sans ${
        formOpen === true ? "block" : "hidden"
      }`}
    >
      {/* template name */}
      <div className="text-3xl font-semibold py-5 px-5">
        <h1>{selectedTemplate}</h1>
      </div>

      <div className="shadow rounded-xl bg-white px-5 py-3">
        {/* Show all the sections */}
        <div className="flex gap-3 flex-wrap">
          {sections &&
            sections.map((sec) => (
              <button
                type="button"
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
        <form
          onSubmit={handleFormSubmit}
          encType="multipart/form-data"
          noValidate
        >
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

              {/* Address Name */}
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
                inputName={"highlight"}
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
                type="button"
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
            {services.map((service, index) => (
              <div key={index}>
                {/* check that service lenght */}
                <div className="mt-10 flex items-center justify-between">
                  <h4 className="font-medium">Service {index + 1}</h4>
                  {services.length > 1 && (
                    <button
                      type="button"
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
                  <InputField
                    labelId={`service-title-${index}`}
                    labelName={"Enter Your Services Title"}
                    inputType={"text"}
                    inputId={`service-title-${index}`}
                    value={service.title}
                    placeHolder={"Ex :- Node.Js Developer "}
                    onChange={(e) =>
                      updateHelper(
                        index,
                        "title",
                        e.target.value,
                        services,
                        setServices
                      )
                    }
                  />

                  {/* Description Field */}
                  <div className="mt-3">
                    <label htmlFor={`service-description-${index}`}>
                      Enter Your Service Description
                    </label>
                    <textarea
                      id={`service-description-${index}`}
                      value={service.description}
                      onChange={(e) =>
                        updateHelper(
                          index,
                          "description",
                          e.target.value,
                          services,
                          setServices
                        )
                      }
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
                type="button"
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
            {products.map((product, index) => (
              <div key={index}>
                {/* buttons for deleting the product */}
                <div className="mt-10 flex items-center justify-between">
                  <h4 className="font-medium">Product {index + 1}</h4>
                  {products.length > 1 && (
                    <button
                      type="button"
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
                  <InputField
                    labelId={`product-name-${index}`}
                    labelName={"Enter Product Name"}
                    inputType={"text"}
                    inputId={`product-name-${index}`}
                    placeHolder={"Ex :- MERN Chat App"}
                    onChange={(e) =>
                      updateHelper(
                        index,
                        "productName",
                        e.target.value,
                        products,
                        setProducts
                      )
                    }
                    value={product.productName}
                  />

                  {/* Product Description */}
                  <InputField
                    labelId={`product-description-${index}`}
                    labelName={"Enter Product Description"}
                    inputType={"text"}
                    inputId={`product-description-${index}`}
                    placeHolder={"Ex :- MERN Chat App with scalable"}
                    onChange={(e) =>
                      updateHelper(
                        index,
                        "productDes",
                        e.target.value,
                        products,
                        setProducts
                      )
                    }
                    value={product.productDes}
                  />

                  {/* Product Link */}
                  <InputField
                    labelId={`product-link-${index}`}
                    labelName={"Enter Product Link"}
                    inputType={"text"}
                    inputId={`product-link-${index}`}
                    placeHolder={"Ex :- http://www.google.com"}
                    onChange={(e) =>
                      updateHelper(
                        index,
                        "productLink",
                        e.target.value,
                        products,
                        setProducts
                      )
                    }
                    value={product.productLink}
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
                type="button"
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
            {clients.map((client, index) => (
              <div key={index}>
                {/* buttons for deleting client */}
                <div className="mt-10 flex items-center justify-between">
                  <h4 className="font-medium">Client {index + 1}</h4>
                  {clients.length > 1 && (
                    <button
                      type="button"
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
                  <InputField
                    labelId={`client-name-${index}`}
                    labelName={"Enter Client Name"}
                    inputType={"text"}
                    inputId={`client-name-${index}`}
                    placeHolder={"Ex :- Keyur Panchal"}
                    onChange={(e) =>
                      updateHelper(
                        index,
                        "clientName",
                        e.target.value,
                        clients,
                        setClients
                      )
                    }
                    value={client.clientName}
                  />

                  {/* Client Logo */}
                  <InputField
                    labelId={`client-logo-${index}`}
                    labelName={"Enter Client Logo"}
                    inputType={"text"}
                    inputId={`client-logo-${index}`}
                    placeHolder={"Ex :-  http://www.google.com"}
                    onChange={(e) =>
                      updateHelper(
                        index,
                        "clientLogo",
                        e.target.value,
                        clients,
                        setClients
                      )
                    }
                    value={client.clientLogo}
                  />

                  {/* clientTestimonial */}
                  <InputField
                    labelId={`client-testimonial-${index}`}
                    labelName={"Enter Client Testimonial"}
                    inputType={"text"}
                    inputId={`client-testimonial-${index}`}
                    placeHolder={"Ex :- Keyur Panchal made a really good..."}
                    onChange={(e) =>
                      updateHelper(
                        index,
                        "clientTestimonial",
                        e.target.value,
                        clients,
                        setClients
                      )
                    }
                    value={client.clientTestimonial}
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
                    type="button"
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
                    value={skillVal}
                    placeholder={"Ex :- JavaScript"}
                    onKeyDown={handleKeyDown}
                    onChange={handleSkillsValue}
                    className="bg-gray-100 text-gray-500 focus:outline-none px-5 py-2 rounded-md"
                  />
                </div>
              </div>
            </div>
          </FormSectionWrapper>

          {/* show error message */}
          {err && (
            <div className="bg-red-600 text-white px-4 py-2 rounded-lg shadow my-5">
              <p>{err}</p>
            </div>
          )}

          {/* when formopens it will scroll to this ref */}
          <div ref={formRef} />

          {/* Buttons for navigating */}
          <div className="mt-10 flex flex-row justify-between">
            {/* Previous Button */}
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                const index = sections.findIndex((s) => s.id === activeSection);

                if (index > 0) {
                  setActiveSection(sections[index - 1].id);
                }
              }}
              className="bg-white text-red-600 rounded-lg px-5 py-2 shadow transition-transform duration-100 ease-in-out hover:bg-red-600 hover:text-white active:scale-96 cursor-pointer"
            >
              Previous
            </button>

            {activeSection !== "Skills" ? (
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
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
                type="submit"
                className="bg-red-600 text-white rounded-lg px-5 py-2 transition transform duration-100 ease-in-out hover:bg-red-800 active:scale-96"
              >
                Submit
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default TemplateForm;
