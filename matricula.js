Vue.component('componente-matriculas', {
    data() {
        return {
            valor:'',
            matriculas:[],
            accion:'nuevo',
            matricula:{
                idMatricula: new Date().getTime(),
                codigo:'',
                nombre:'',
                pais:'',
                Telefono:''
            }
        }
    },
    methods:{
        buscarMatricula(e){
            this.listar();
        },
        eliminarMatricula(idMatricula){
            if( confirm(`Esta seguro de elimina el matricula?`) ){
                let store = abrirStore('matriculas', 'readwrite'),
                query = store.delete(idMatricula);
            query.onsuccess = e=>{
                this.nuevoMatricula();
                this.listar();
            };
            }
        },
        modificarMatricula(matricula){
            this.accion = 'modificar';
            this.matricula = matricula;
        },
        guardarMatricula(){
            //almacenamiento del objeto Matriculas en indexedDB
            let store = abrirStore('matriculas', 'readwrite'),
                query = store.put({...this.matricula});
            query.onsuccess = e=>{
                this.nuevoMatricula();
                this.listar();
            };
            query.onerror = e=>{
                console.error('Error al guardar en matriculas', e.message());
            };
        },
        nuevoMatricula(){
            this.accion = 'nuevo';
            this.matricula = {
                idMatricula: new Date().getTime(),
                codigo:'',
                nombre:'',
                pais:'',
                Telefono:''
            }
        },
        listar(){
            let store = abrirStore('matriculas', 'readonly'),
                data = store.getAll();
            data.onsuccess = resp=>{
                this.matriculas = data.result
                    .filter(matricula=>matricula.codigo.includes(this.valor) || 
                    matricula.nombre.toLowerCase().includes(this.valor.toLowerCase()) || 
                    matricula.pais.toLowerCase().includes(this.valor.toLowerCase()) ||
                    matricula.Telefono.toLowerCase().includes(this.valor.toLowerCase()));
            };
        }
    },
    template: `
    <div class="my-4">
        <div class="row">
            <div class="col col-md-6">
                <div class="card text-bg">
                    <div class="card-header">REGISTRO DE AUTORES</div>
                    <div class="catd-body">
                        <div class="row p-1">
                            <div class="col col-md-2">Codigo</div>
                            <div class="col col-md-3">
                                <input v-model="matricula.codigo" type="text" class="form-control">
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col col-md-2">Nombre</div>
                            <div class="col col-md-5">
                                <input v-model="matricula.nombre" type="text" class="form-control">
                            </div>
                        </div>
                
                        <div class="row p-1">
                            <div class="col col-md-2">pais</div>
                            <div class="col col-md-3">
                                <input v-model="matricula.pais" type="text" class="form-control">
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col col-md-2">telefono</div>
                            <div class="col col-md-3">
                                <input v-model="matricula.telefono" type="text" class="form-control">
                            </div>
                        </div>
                        

                        <div class="row p-1">
                        <div class="col text-center">
                            <div class="d-flex justify-content-center ">
                                <button @click.prevent.default="guardarMatricula" class="btn btn-outline-primary ">GUARDAR</button>
                                <div style="margin-right: 20px;"></div>
                                <button @click.prevent.default="nuevoMatricula" class="btn btn-outline-danger">NUEVO</button>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="my-4">
            <div class="col col-md-8">
                <div class="card text-bg">
                    <div class="card-header">LISTADO DE AUTORES</div>
                    <div class="card-body">
                        <form id="frmMatricula">
                            <table class="table table table-hover">
                                <thead>
                                    <tr>
                                        <th>BUSCAR</th>
                                        <th colspan="5">
                                            <input placeholder="codigo, nombre, pais" type="search" v-model="valor" @keyup="buscarMatricula" class="form-control">
                                        </th>
                                    </tr>
                                    <tr>
                                        <th>CODIGO</th>
                                        <th>NOMBRE</th>
                                        <th>pais</th>
                                        <th>telefono</th>
                                        
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr @click="modificarMatricula(matricula)" v-for="matricula in matriculas" :key="matricula.idMatricula">
                                        <td>{{matricula.codigo}}</td>
                                        <td>{{matricula.nombre}}</td>
                                        <td>{{matricula.pais}}</td>
                                        <td>{{matricula.telefono}}</td>

                                        <td><button @click.prevent.default="eliminarMatricula(matricula.idMatricula)" class="btn btn-danger">del</button></td>
                                    </tr>
                                </tbody>
                            </table>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        </div>
    `
});