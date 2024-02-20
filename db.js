var db;
const funcdb = ()=>{
    let indexDB = indexedDB.open('db_sistema',1);
    indexDB.onupgradeneeded = e=>{
        let req = e.target.result,
            tblproducto = req.createObjectStore('productos',{keyPath:'idProducto'}),
            tblcategoria = req.createObjectStore('categorias',{keyPath:'idCategoria'}),
            tblcliente = req.createObjectStore('clientes',{keyPath:'idCliente'});
        tblproducto.createIndex('idProducto','idProducto',{unique:true});
        tblproducto.createIndex('codigo','codigo',{unique:true});
        tblcategoria.createIndex('idCategoria','idCategoria',{unique:true});
        tblcategoria.createIndex('codigo','codigo',{unique:true});
        tblcliente.createIndex('idCliente','idCliente',{unique:true});
        tblcliente.createIndex('codigo','codigo',{unique:true});
    };
    indexDB.onsuccess = e=>{
        db = e.target.result;
    };
    indexDB.onerror = e=>{
        console.error('Error al crear la base de datos', e.message());
    };
}, abrirStore = (store, modo)=>{
    let ltx = db.transaction(store, modo);
    return ltx.objectStore(store);
};
funcdb();