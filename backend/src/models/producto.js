import sequelize from '../config/db/config.js'
import { definicionProducto } from '../services/producto.js'
import { definicionCategoria } from '../services/categoria.js'

export class ModeloProducto {
  static Producto = sequelize.define('producto', definicionProducto, {
    timestamps: false,
    freezeTableName: true
  })

  static Categoria = sequelize.define('Categoria', definicionCategoria, {
    timestamps: false,
    freezeTableName: true
  })

  static asociacion () {
    this.Producto.belongsTo(this.Categoria, { foreignKey: 'idCategoria' })
    this.Categoria.hasMany(this.Producto, { foreignKey: 'idCategoria' })
  }

  // Crear producto
  static async crearProducto ({ input }) {
    const { nombre, precio, descripcion, tiempoPreparacion, idCategoria } = input
    try {
      const nuevoProducto = await this.Producto.create({
        nombre,
        precio,
        descripcion,
        tiempoPreparacion,
        idCategoria
      })
      if (!nuevoProducto) {
        return { error: 'No se pudo crear el producto' }
      }
      return {
        nuevoProducto,
        mensaje: 'Producto creado exitosamente'
      }
    } catch (error) {
      return {
        error: 'Error al crear el producto',
        detalles: error.message
      }
    }
  }

  // Editar producto
  static async editarProducto ({ input }) {
    const { idProducto, nombre, precio, descripcion, tiempo, idCategoria, idStock } = input
    try {
      const [resultado] = await sequelize.query(
        `DECLARE @mensaje VARCHAR(200);
         EXEC set_ActualizarProducto 
           @idProducto = :idProducto, 
           @nombre = :nombre, 
           @precio = :precio, 
           @descripcion = :descripcion,
           @tiempo = :tiempo,
           @idCategoria = :idCategoria,
           @idStock = :idStock,
           @mensaje = @mensaje OUTPUT;
         SELECT @mensaje AS mensaje;`,
        {
          replacements: { idProducto, nombre, precio, descripcion, tiempo, idCategoria, idStock },
          type: sequelize.QueryTypes.SELECT
        }
      )

      if (resultado.mensaje.includes('Error')) {
        return { error: resultado.mensaje }
      }

      return {
        producto: { idProducto, nombre, precio, descripcion, tiempo, idCategoria, idStock },
        mensaje: resultado.mensaje
      }
    } catch (error) {
      return {
        error: 'Error al editar el producto',
        detalles: error.message
      }
    }
  }

  // Eliminar producto
  static async eliminarProducto (idProducto) {
    try {
      const [resultado] = await sequelize.query(
        `DECLARE @mensaje VARCHAR(200);
         EXEC set_EliminarProducto 
           @idProducto = :idProducto, 
           @mensaje = @mensaje OUTPUT;
         SELECT @mensaje AS mensaje;`,
        {
          replacements: { idProducto: Number(idProducto) },
          type: sequelize.QueryTypes.SELECT
        }
      )

      if (resultado.mensaje.includes('Error')) {
        return { error: resultado.mensaje }
      }

      return { mensaje: resultado.mensaje }
    } catch (error) {
      return {
        error: 'Error al eliminar el producto',
        detalles: error.message
      }
    }
  }

  // Obtener todos los productos
  static async ObtenerProductos ({ tipo }) {
    let resultado
    try {
      if (tipo) {
        const productos = await this.Producto.findAll({
          where: { idCategoria: tipo },
          include: [{ model: this.Categoria }]
        })

        if (!productos.length) {
          return { error: `No se encontraron productos con el filtro ${tipo || 'ninguno'}` }
        }
        resultado = productos
      } else {
        const productos = await this.Producto.findAll({
          include: [{ model: this.Categoria }]
        })
        resultado = productos
        if (!productos.length) {
          return { error: 'No se encontraron productos' }
        }
      }
      const productosLimpios = resultado.map(producto => ({
        id: producto.id,
        nombre: producto.nombre,
        precio: producto.precio,
        descripcion: producto.descripcion,
        tiempoPreparacion: producto.tiempoPreparacion,
        categoria: producto.Categorium.descripcion,
        subCategoria: producto.Categorium.idCategoria
      }))
      return productosLimpios
    } catch (error) {
      console.error('Hubo un error al obtener los productos:', error)
      throw new Error('Error en la base de datos, intente más tarde.')
    }
  }

  // Obtener producto por ID
  static async obtenerProductoPorId (idProducto) {
    try {
      const [resultado] = await sequelize.query(
        `DECLARE @mensaje VARCHAR(200);
         EXEC get_MostrarProductoPorId 
           @idProducto = :idProducto, 
           @mensaje = @mensaje OUTPUT;
         SELECT @mensaje AS mensaje;`,
        {
          replacements: { idProducto: Number(idProducto) },
          type: sequelize.QueryTypes.SELECT
        }
      )

      if (resultado.mensaje && resultado.mensaje.includes('Error')) {
        return { error: resultado.mensaje }
      }

      return resultado
    } catch (error) {
      return {
        error: 'Error al obtener producto por ID',
        detalles: error.message
      }
    }
  }
}
ModeloProducto.asociacion()
