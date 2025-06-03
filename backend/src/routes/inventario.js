import { Router } from 'express'
import { ControladorInventario } from '../controllers/inventario.js'

export const crearRutasInventario = ({ modeloInventario }) => {
  const InventarioRuta = Router()
  const controladorInventario = new ControladorInventario({ modeloInventario })

  InventarioRuta.post('/agregar', controladorInventario.agregarStock)
  InventarioRuta.put('/actualizar', controladorInventario.actualizarStock)
  InventarioRuta.get('/mostrarStocks', controladorInventario.mostrarStocks)
  InventarioRuta.get('/mostrarStock/:id', controladorInventario.mostrarStockPorId)
  InventarioRuta.get('/disminuir', controladorInventario.disminuirStock) // es igual que actualizarStock
  return InventarioRuta
}
