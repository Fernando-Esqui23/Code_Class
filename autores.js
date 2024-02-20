// autores.js

Vue.component('componente-autores', {
    data() {
      return {
        valor: '',
        autores: [],
        autor: {
          idAutor: null,
          codigo: '',
          nombre: '',
          pais: '',
          telefono: ''
        }
      }
    },
    created() {
      this.listarAutores();
    },
    methods: {
      buscarAutores() {
        // Lógica para buscar autores por varios campos
        // Implementar según tus necesidades
      },
      guardarAutor() {
        // Verificar si es un nuevo autor o uno existente
        if (this.accion === 'nuevo') {
          // Agregar un nuevo autor
          let nuevoAutor = { ...this.autor }; // Clonar el objeto autor
          nuevoAutor.idAutor = new Date().getTime(); // Generar un ID único para el nuevo autor
          
          // Agregar el nuevo autor a la base de datos (IndexedDB)
          let request = db.transaction(['autores'], 'readwrite')
            .objectStore('autores')
            .add(nuevoAutor);
  
          // Manejar eventos de éxito y error
          request.onsuccess = () => {
            console.log('Nuevo autor agregado con éxito');
            this.nuevoAutor(); // Limpiar el formulario después de agregar el autor
            this.listarAutores(); // Actualizar la lista de autores
          };
  
          request.onerror = (event) => {
            console.error('Error al agregar el nuevo autor:', event.target.error);
          };
        } else if (this.accion === 'modificar') {
          // Actualizar un autor existente
          let autorModificado = { ...this.autor }; // Clonar el objeto autor
          
          // Obtener la transacción de lectura y escritura
          let transaction = db.transaction(['autores'], 'readwrite');
          let objectStore = transaction.objectStore('autores');
  
          // Actualizar el autor en la base de datos
          let request = objectStore.put(autorModificado);
  
          // Manejar eventos de éxito y error
          request.onsuccess = () => {
            console.log('Nuevo autor agregado con éxito');
            this.nuevoAutor(); // <-- Aquí se corrige
            this.listarAutores(); // Actualizar la lista de autores
          };
          
          request.onerror = (event) => {
            console.error('Error al actualizar el autor:', event.target.error);
          };
        }
      },
      eliminarAutor(idAutor) {
        // Lógica para eliminar un autor
        // Implementar según tus necesidades
      },
      modificarAutor(autor) {
        // Lógica para modificar un autor
        // Implementar según tus necesidades
      },
      listarAutores() {
        // Lógica para listar todos los autores
        // Implementar según tus necesidades
      }
    },
    template: `
    <div class="container">
    <h2>Registro de Autores</h2>
    <form @submit.prevent="guardarAutor">
      <div class="form-group">
        <label for="codigo">Código:</label>
        <input type="text" class="form-control" v-model="autor.codigo">
      </div>
      <div class="form-group">
        <label for="nombre">Nombre:</label>
        <input type="text" class="form-control" v-model="autor.nombre">
      </div>
      <div class="form-group">
        <label for="pais">País:</label>
        <input type="text" class="form-control" v-model="autor.pais">
      </div>
      <div class="form-group">
        <label for="telefono">Teléfono:</label>
        <input type="text" class="form-control" v-model="autor.telefono">
      </div>
      <button type="submit" class="btn btn-primary">{{ accion === 'nuevo' ? 'Guardar' : 'Actualizar' }}</button>
      <button type="button" class="btn btn-warning" @click="nuevoAutor">Nuevo</button>
    </form>
    
    <!-- Tabla de Autores -->
    <h2>Listado de Autores</h2>
    <input placeholder="Buscar por código, nombre, país, teléfono" type="search" v-model="valor" @keyup="buscarAutores" class="form-control mb-3">
    <table class="table">
      <thead>
        <tr>
          <th>Código</th>
          <th>Nombre</th>
          <th>País</th>
          <th>Teléfono</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="autor in autores" :key="autor.idAutor">
          <td>{{ autor.codigo }}</td>
          <td>{{ autor.nombre }}</td>
          <td>{{ autor.pais }}</td>
          <td>{{ autor.telefono }}</td>
          <td>
            <button @click="modificarAutor(autor)" class="btn btn-sm btn-warning">Editar</button>
            <button @click="eliminarAutor(autor.idAutor)" class="btn btn-sm btn-danger">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
    `
  });
  