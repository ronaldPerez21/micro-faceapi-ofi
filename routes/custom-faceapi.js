var express = require('express');
var router = express.Router();

const { createUserDto } = require('../dtos/user.dto');
const custom_response = require('../common/response');
var CustomFaceapiService = require("../services/custom-faceapi.serv");

customFaceapiService = new CustomFaceapiService();


/* GET users listing. */
router.get('/faces', async function(req, res) { //Get all users

  const response = await customFaceapiService.findAll();
  res.status(200).json(custom_response(200, response));

});

/* GET one user listing. */
router.get('/faces/:face_id', async function(req, res, next) { //Get one user
  try {
    const response = await customFaceapiService.findOne(req.params.face_id)
    if(!response)
      return res.status(200).json(custom_response(200, "Persona no encontrado"))
    return res.status(200).json(custom_response(200, response))
  } catch (error) {
    return res.status(500).send(custom_response(500, error));
  }

});

/* POST users listing. */
router.post('/create-face', createUserDto, async function(req, res, next) { //Create a new user
  
  try {
    const data = {
      "fullname": req.body.fullname,
      "telefono": req.body.telefono,
      "direccion": req.body.direccion,
      "sexo": req.body.sexo,
      "descriptors": req.body.descriptors,
    };
    
    const result = await customFaceapiService.create(data);
    res.status(200).json(custom_response(201, result.id));
  } catch (error) {
    console.error('Error al guardar el dato en Firebase:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }

});

module.exports = router;
