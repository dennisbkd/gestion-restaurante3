import { Router } from 'express'
import { ControladorPermisos } from '../controllers/permisos.js'

export const crearRutasPermisos = ({ modeloPermiso }) => {
  const router = Router()
  const controlador = new ControladorPermisos({ modeloPermiso })

  router.post('/crear', controlador.crearPermiso)
  router.put('/editar', controlador.editarPermiso)
  router.delete('/eliminar/:id', controlador.eliminarPermiso.bind(controlador))
  router.post('/asignar', controlador.asignarPermiso)
  return router
}
