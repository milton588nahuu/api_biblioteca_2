require('dotenv').config()
const express = require('express');
const router = express.Router();
const Libro = require('../models/Libro');

// Importamos la librería para validar scopes
const { requiredScopes } = require("express-oauth2-jwt-bearer");

//Ruta para obtener todos los libros 
router.get("/",  requiredScopes("read:libros"),async(req,res) => {
    try {
        const libros = await Libro.find();
        res.status(200).json({libros});
    } catch (error) {
        console.error('err', error);
        res.status(500).json({ error: 'Erroe al obtener libros' });
    }
});

//Ruta para crear todos los libros 
router.post("/",requiredScopes("write:libros"),async (req,res) => {
    try{
        const nuevoLibro = new Libro(req.body);
        await nuevoLibro.save();
        res.json(nuevoLibro);
    } catch(error){
        res.status(500).json({error:"Error al crear el Libro"});
    }
});

//Ruta para actualizar un libro existente

router.put("/:id",requiredScopes("write:libros"),async (req,res) => {
    try{
      console.log(req.params.id);
      console.log(req.body);
      const libro = await Libro.findByIdAndUpdate({_id:req.params.id},{$set:req.body},{upsert:true})
      res.status(200).json(libro)
    } catch(error){
        res.status(500).json({error:"Error al actualizar el Libro"});
    }
});

// //Ruta para eliminar un libro 
router.delete("/:id", requiredScopes("write:libros"),async (req,res) => {
    try {   
        await Libro.findByIdAndDelete(req.params.id); 
        res.json({Message:'Libro eliminado correctamente'});
    } catch (error) {
        res.status(500).json({ error:'Error al eliminar el Libro'});
    }
});

module.exports = router;


