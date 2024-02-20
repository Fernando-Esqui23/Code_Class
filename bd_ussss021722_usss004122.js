var db;

const funcdb = () => {
    let indexDB = indexedDB.open('bd_ussss021722_usss004122', 1);
    indexDB.onupgradeneeded = e => {
        let req = e.target.result;

        // Crear tabla "Autor"
        let tblAutor = req.createObjectStore('Autor', { keyPath: 'idAutor', autoIncrement: true });
        tblAutor.createIndex('codigo', 'codigo', { unique: true });
        tblAutor.createIndex('nombre', 'nombre', { unique: false });
        tblAutor.createIndex('pais', 'pais', { unique: false });
        tblAutor.createIndex('telefono', 'telefono', { unique: false });

        // Crear tabla "Libros"
        let tblLibros = req.createObjectStore('Libros', { keyPath: 'idLibro', autoIncrement: true });
        tblLibros.createIndex('autor', 'autor', { unique: false });
        tblLibros.createIndex('Isbn', 'Isbn', { unique: true });
        tblLibros.createIndex('titulo', 'titulo', { unique: false });
        tblLibros.createIndex('editorial', 'editorial', { unique: false });
        tblLibros.createIndex('edicion', 'edicion', { unique: false });
    };
    indexDB.onsuccess = e => {
        db = e.target.result;
    };
    indexDB.onerror = e => {
        console.error('Error al crear la base de datos', e.message());
    };
};

funcdb();
