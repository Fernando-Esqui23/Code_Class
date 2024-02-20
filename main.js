var app = new Vue({
    el: '#app',
    data:{
        forms:{
            matricula:{mostrar:false},
            inscripcion:{mostrar:false},
            alumnos:{mostrar:false},
        }
    },
    methods:{
        abrirFormulario(form){
            this.forms[form].mostrar = !this.forms[form].mostrar;
            this.$refs[form].listar();
        }
    }
});