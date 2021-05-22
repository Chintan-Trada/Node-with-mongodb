const Joi = require("@hapi/joi");

function categoryValidation(req) {
  const schema = Joi.object({
    categoryname: Joi.string().required().empty().messages({
      "string.base": `Category should be a type of 'text'`,
      "string.empty": `Category is required.`,
      "any.required": `Category is required.`,
    }),
    description: Joi.string().required().empty().messages({
      "string.base": `Discription should be a type of 'text'`,
      "string.empty": `Discription is required.`,
      "any.required": `Discription is required.`,
    })
  })
  return schema.validate(req);
}

function PortfolioValidation(req) {
  const schema = Joi.object({
    projectName: Joi.string().required().empty().messages({
      "string.base": `Project name should be a type of 'text'`,
      "string.empty": `Project name is required.`,
      "any.required": `Project name is required.`,
    }),
    projectCategory: Joi.string().required().empty().messages({
      "string.base": `Project category should be a type of 'text'`,
      "string.empty": `Project category is required.`,
      "any.required": `Project category is required.`,
    }),
    discription: Joi.string().required().empty().messages({
      "string.base": `Discription should be a type of 'text'`,
      "string.empty": `Discription is required.`,
      "any.required": `Discription is required.`,
    })
  })
  return schema.validate(req);
}

function TestnomialValidation(req) {
  const schema = Joi.object({
    clientName: Joi.string().required().empty().messages({
      "string.base": `Client name should be a type of 'text'`,
      "string.empty": `Client name is required.`,
      "any.required": `Client name is required.`,
    }),
    feedback: Joi.string().required().empty().messages({
      "string.base": `Feedback should be a type of 'text'`,
      "string.empty": `Feedback is required.`,
      "any.required": `Feedback is required.`,
    })
  })
  return schema.validate(req);
}
module.exports = {
  categoryValidation,
  PortfolioValidation,
  TestnomialValidation
};
