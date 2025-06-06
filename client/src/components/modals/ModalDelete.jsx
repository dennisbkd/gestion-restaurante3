const ModalDelete = ({ setIsOpen, message, refresh, handleDelete }) => {
  return (
    <>
      {/* Fondo oscuro */}
      <div
        className='fixed inset-0 z-40 backdrop-blur-sm'
        onClick={() => setIsOpen(false)}
      ></div>

      {/* Contenido del modal */}
      <div className='fixed top-1/2 left-1/2 z-50 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-lg px-4'>
        <div className='bg-white rounded-md shadow-lg px-4 py-6 sm:flex'>
          {/* Icono */}
          <div className='flex items-center justify-center flex-none w-12 h-12 mx-auto bg-red-100 rounded-full'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='w-5 h-5 text-red-600'
              viewBox='0 0 20 20'
              fill='currentColor'
            >
              <path
                fillRule='evenodd'
                d='M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z'
                clipRule='evenodd'
              />
            </svg>
          </div>

          {/* Texto del modal */}
          <div className='mt-2 text-center sm:ml-4 sm:text-left'>
            <h2 className='text-lg font-medium text-gray-800'>Estas Seguro?</h2>
            <p className='mt-2 text-sm leading-relaxed text-gray-500 whitespace-pre-line'>
              {message}
            </p>

            {/* Botones */}
            <div className='items-center gap-2 mt-3 text-sm sm:flex'>
              <button
                onClick={() => {
                  handleDelete()
                  setIsOpen(false)
                  refresh()
                }}
                className='w-full mt-2 p-2.5 flex-1 text-white bg-red-600 rounded-md ring-offset-2 ring-red-600 focus:ring-2'
              >
                Eliminar
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className='w-full mt-2 p-2.5 flex-1 text-gray-800 rounded-md border ring-offset-2 ring-indigo-600 focus:ring-2'
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ModalDelete
