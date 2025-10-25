import { Eye, MoveRight } from "lucide-react";
import React from "react";

const ChooseTemplate = ({ handleFormOpen }) => {
  return (
    <div className="max-w-[800px] mx-auto font-open-sans">
      {/* Heading */}
      <div className="mt-10 text-center px-3">
        <h1 className="text-3xl font-semibold">Choose Template</h1>
        <p className="text-sm mt-2 text-gray-700">
          Select a professional template that best represe
        </p>
      </div>

      {/* Cards */}
      <div className="grid sm:grid-cols-2 gap-10 px-3 md:px-10 mt-10">
        {/* card 1 */}
        <div className="flex flex-col justify-between shadow-2xl rounded-3xl text-sm">
          {/* Img */}
          <div className="overflow-hidden rounded-t-3xl border-b-2 border-gray-500">
            <img
              src="/src/assets/template-1-img.jpg"
              alt="Template 1"
              className="object-cover w-full"
            />
          </div>

          {/* Content */}
          <div className="px-5">
            <p className="my-5">
              Modern and clean design with yellow hero section and professional
              layout
            </p>

            <div>
              <p className="mb-2">Key features</p>
              <ul className="grid  gap-3 grid-cols-2 [&>li]:list-disc marker:text-red-600 px-5">
                <li>Yellow Hero Section</li>
                <li>Testimonials Carouse</li>
                <li>Grid Portfolio</li>
                <li>Contact Form</li>
              </ul>
            </div>

            {/* buttons */}
            <div className="mt-10 mb-4  [&>button]:flex  [&>button]:justify-between [&>button]:items-center [&>button]:gap-3">
              <button
                onClick={() => handleFormOpen("template1")}
                className="w-full bg-red-600 text-white px-5 py-2 rounded-lg cursor-pointer"
              >
                <span>Customize this template</span>
                <span>
                  <MoveRight />
                </span>
              </button>
              <button className="w-full mt-3 bg-white text-red-600 px-3 py-2 rounded-lg shadow cursor-pointer">
                <span>
                  <Eye />
                </span>
                <span>Preview</span>
              </button>
            </div>
          </div>
        </div>

        {/* card 2 */}
        <div className="flex flex-col justify-between shadow-2xl rounded-3xl text-sm">
          {/* Img */}
          <div className="overflow-hidden  rounded-t-3xl border-b-2 border-gray-500">
            <img
              src="/src/assets/template-2.jpg"
              alt="Template 2"
              className="object-cover w-full"
            />
          </div>

          {/* Content */}
          <div className="px-5">
            <p className="mb-10 ">
              Split-screen layout with timeline skills and masonry portfolio
              grid
            </p>

            <div>
              <p className="mb-2">Key features</p>
              <ul className="grid gap-3 grid-cols-2 list-disc marker:text-red-600 px-5">
                <li> Split Hero Layout</li>
                <li> Masonry Portfolio</li>
                <li>Timeline Skills</li>
                <li>Blog Section</li>
              </ul>
            </div>

            {/* buttons */}
            <div className="mt-10 mb-4 [&>button]:flex [&>button]:items-center [&>button]:justify-between [&>button]:gap-3">
              <button
                onClick={() => handleFormOpen("template2")}
                className="w-full bg-red-600 text-white px-5 py-2 rounded-lg cursor-pointer"
              >
                <span>Customize this template</span>
                <span>
                  <MoveRight />
                </span>
              </button>
              <button className="w-full mt-3 bg-white text-red-600 px-3 py-2 rounded-lg shadow cursor-pointer">
                <span>
                  <Eye />
                </span>
                <span>Preview</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChooseTemplate;
