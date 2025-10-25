import { catchAsync } from "./catchAsync.js";
import Joi from "joi";
import { PortFolioModel } from "./portfolioModel.js";

const schema = Joi.object({
  basicDetails: Joi.object({
    name: Joi.string().trim().required(),
    email: Joi.string().trim().email().required(),
    phoneNumber: Joi.number().required(),
    address: Joi.string().trim().required(),
  }),

  hero: Joi.object({
    title: Joi.string().trim().required(),
    subtitle: Joi.string().trim().required(),
    heroImg: Joi.any(),
  }),

  aboutSection: Joi.object({
    description: Joi.string().trim().required(),
    highlight: Joi.string().trim().required(),
    profileImg: Joi.any(),
  }),

  services: Joi.array().items(
    Joi.object({
      title: Joi.string().trim().required(),
      description: Joi.string().trim().required(),
    })
  ),
  products: Joi.array().items(
    Joi.object({
      productName: Joi.string().trim().required(),
      productDes: Joi.string().trim().required(),
      productLink: Joi.string().trim().uri().required(),
    })
  ),

  clients: Joi.array().items(
    Joi.object({
      clientName: Joi.string().trim().required(),
      clientLogo: Joi.string().trim().required(),
      clientTestimonial: Joi.string().trim().required(),
    })
  ),

  skills: Joi.array().items(Joi.string().trim().required()),
});

export const createPortfolio = catchAsync(async (req, res, next) => {
  const parsedBody = {
    basicDetails: JSON.parse(req.body.basicDetails),
    hero: JSON.parse(req.body.hero),
    aboutSection: JSON.parse(req.body.aboutSection),
    services: JSON.parse(req.body.services),
    products: JSON.parse(req.body.products),
    clients: JSON.parse(req.body.clients),
    skills: JSON.parse(req.body.skills),
  };

  if (req.files?.heroImg?.[0]) {
    parsedBody.hero.heroImg = req.files.heroImg[0].filename;
  }

  if (req.files?.profileImg?.[0]) {
    parsedBody.aboutSection.profileImg = req.files.profileImg[0].filename;
  }

  const { error } = schema.validate(parsedBody);
  if (error) {
    throw new Error(error.details[0].message);
  }

  const portfolio = await PortFolioModel.create(parsedBody);

  res.status(200).json({
    status: "success",
    data: portfolio,
  });
});
