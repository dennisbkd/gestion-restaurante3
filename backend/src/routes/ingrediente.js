import { Router } from 'express'
import { ControladorIngrediente } from '../controllers/ingrediente.js'

export const crearRutaIngrediente = ({ modeloIngrediente }) => {
  const router = Router()
  const controlador = new ControladorIngrediente({ modeloIngrediente })

  router.post('/crear', controlador.crearIngrediente)
  router.put('/editar', controlador.editarIngrediente)
  router.delete('/eliminar/:id', controlador.eliminarIngrediente.bind(controlador))
  router.get('/mostrar', controlador.obtenerIngredientes)
  router.get('/mostrar/:id', controlador.obtenerIngredientePorId)

  return router
}
