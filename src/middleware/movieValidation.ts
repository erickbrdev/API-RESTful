import { body } from "express-validator";

export const movieCreateValidation = () => {
  return [
    body("title")
      .isString()
      .withMessage("Titulo obrigatório")
      .isLength({ min: 3 })
      .withMessage("O titulo deve conter no mínimo 3 caracteres"),

    body("rating")
      .isNumeric()
      .withMessage("A nota precisa ser um dado numérico")
      .custom((value: number) => {
        if (value < 0 || value > 10) {
          throw new Error("A nota precisa ser entre 0 a 10");
        }
        return true;
      }),

    body("description").isString().withMessage("A descrição é obrigatória"),

    body("director").isString().withMessage("O nome do diretor é obrigatório"),

    body("poster").isURL().withMessage("A imagem precisa ser uma URL"),
  ];
};
