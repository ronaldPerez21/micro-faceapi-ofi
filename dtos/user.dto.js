const { body, validationResult, check } = require('express-validator');

const createUserDto = [
  body('fullname').notEmpty().isString(),
  body('telefono').notEmpty().isString(),
  body('direccion').notEmpty().isString(),
  body('sexo').notEmpty().isString(),
  body('descriptors').notEmpty().isArray(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.mapped() });
    }
    next();
  },
];

const createFaceDto = [
    body('fullname', 'Nombre requerido').notEmpty().isString(),
    body('images', 'Archivos requeridos').custom(
        (value, { req }) => {
            if (!req.files || Object.keys(req.files).length === 0) {
                throw new Error('Ningún archivo fue subido.');
            }
            const files = req.files.images;
            if (!Array.isArray(files)) {
                throw new Error('Se esperaba un array de archivos.');
            }
            if (files.length < 2 || files.length > 4) {
                throw new Error('Se esperan entre 2 y 4 archivos.');
            }
            return true
        }
    ),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.mapped() });
        }
        next();
    },
];

const verifOnlyImage = [
    body('image', 'Imagen requerida').custom(
        (value, { req }) => {
            if (!req.files || Object.keys(req.files).length === 0) {
                throw new Error('Imagen no seleccionada.');
            }
            const files = req.files.image;
            
            if (files.length > 1) {
                throw new Error('Solo se permite una imagen');
            }
            return true
        }
    ),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.mapped() });
        }
        next();
    },
];

module.exports = { createUserDto, createFaceDto, verifOnlyImage };
