import { Router } from 'express'
import { ControladorUsuario } from '../controllers/usuario.js'

export const crearRutaUsuarios = ({ modeloUsuario }) => {
  const usuarioRuta = Router()
  const controladorUsuario = new ControladorUsuario({ modeloUsuario })
  
  usuarioRuta.post('/register', controladorUsuario.registrarUsuario)
  usuarioRuta.patch('/editarUsuario/:id', controladorUsuario.editarUsuario)
  usuarioRuta.get('/verUsuarios', controladorUsuario.verUsuarios)
  usuarioRuta.get('/verUsuario/:id', controladorUsuario.verUsuario)
  return usuarioRuta
}
