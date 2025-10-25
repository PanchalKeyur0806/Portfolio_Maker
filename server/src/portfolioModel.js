import mongoose from "mongoose";

const portfolioSchmea = new mongoose.Schema(
  {
    basicDetails: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      phoneNumber: { type: Number, required: true },
      address: { type: String, required: true },
    },
    hero: {
      title: { type: String, required: true },
      subtitle: { type: String, required: true },
      heroImg: { type: String },
    },
    aboutSection: {
      description: { type: String, required: true },
      profileImg: { type: String },
      highlight: { type: String, required: true },
    },
    services: [
      {
        title: { type: String, required: true },
        description: { type: String, required: true },
      },
    ],
    products: [
      {
        productName: { type: String, required: true },
        productDes: { type: String, required: true },
        productLink: { type: String, required: true },
      },
    ],
    clients: [
      {
        clientName: { type: String, required: true },
        clientLogo: { type: String, required: true },
        clientTestimonial: { type: String, required: true },
      },
    ],
    skills: { type: [String], required: true },
  },
  { timestamps: true }
);

export const PortFolioModel = mongoose.model("PortFolioModel", portfolioSchmea);
