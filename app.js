
//Escribir aquí funciones en javascript que no se utilicen en html
//Ejemplo funciones de conexiones Get, Post, Put, Delete
//Luego podríamos exportarlas a otro archivo .js
//function nombre(){ ... }
function get (url){
    axios.get(url)
            .then(function (response) {
                // función que se ejecutará al recibir una respuesta
                console.log(response);
                return response.data;
            })
            .catch(function (error) {
                // función para capturar el error
                console.log(error);
            })
            .then(function () {
                // función que siempre se ejecuta
            });
}
//function mostrarLog(dato){
//    if (process.env.NODE_ENV === 'development'){
//        console.log(response);
//    }
//}

const app = Vue.createApp({
    data () {
        return {
            // Variables globales
            idProducto: null,
            productos: [],
            ciudades: [],
            ciudadSeleccionada: null,
            fechaHoy: new Date().getFullYear() + "/" + (new Date().getMonth() + 1).toString().padStart(2, '0') + "/" + new Date().getDate().toString().padStart(2, '0'),
            fechaSeleccionada: null,
            clinicasDisponibles: [],
            clinicaSeleccionada:null,
            diasDisponibles:[],
            bloqueSeleccionado: null,
            bloquesDisponibles:[],
            cliente:{
                nombre: null,
                apellido: null
            },
            HTMLQuestions: [],
            lastQuestionaryTitle : null
            

        };
    },
    methods:{
        // Para acceder a las variables globales en los metodos utilizar this.first
        getProductos() {
            // The view model. Se utiliza para poder acceder a los datos de vue en el otro metodo.
            var vm = this;
            axios.get(`https://api-frontend.azurewebsites.net/Disponibilidad/GetProductos?key=udl50CsG0Uj3USmLQLF9JsmK7`)
                .then(function (response) {
                    // función que se ejecutará al recibir una respuesta
                    console.log(response);
                    let lista = []
                    response.data.forEach(function(data) {                     
                        lista.push({ id: data.id, name: data.name });
                      });
                    vm.productos = lista;
                    console.log(vm.productos);
                })
                .catch(function (error) {
                    // función para capturar el error
                    console.log(error);
                })
                .then(function () {
                    // función que siempre se ejecuta
                });         
        },
        getCiudades() {
            // The view model. Se utiliza para poder acceder a los datos de vue en el otro metodo.
            var vm = this;
            axios.get(`https://api-frontend.azurewebsites.net/Disponibilidad/GetCiudades/${vm.idProducto}?key=udl50CsG0Uj3USmLQLF9JsmK7`)
                .then(function (response) {
                    // función que se ejecutará al recibir una respuesta
                    console.log(response);
                    let lista = []
                    response.data.forEach(function(data) {                     
                        lista.push(data.id);
                        console.log(data.id);
                      });
                    vm.ciudades = lista;
                    console.log(vm.ciudades);
                })
                .catch(function (error) {
                    // función para capturar el error
                    console.log(error);
                })
                .then(function () {
                    // función que siempre se ejecuta
                });         
        },
        getDiasDisponibles() {
            // The view model. Se utiliza para poder acceder a los datos de vue en el otro metodo.
            var vm = this;
            axios.get(`https://api-frontend.azurewebsites.net/Disponibilidad/GetDiasDisponibles/${vm.idProducto}/${vm.ciudadSeleccionada}?key=udl50CsG0Uj3USmLQLF9JsmK7`)
                .then(function (response) {
                    // función que se ejecutará al recibir una respuesta
                    console.log(response);
                    let lista = []
                    response.data.forEach(function(data) { 
                        const fecha = new Date(data.day).getFullYear() + "/" + (new Date(data.day).getMonth() + 1).toString().padStart(2, '0') + "/" + new Date(data.day).getDate().toString().padStart(2, '0');                    
                        lista.push(fecha);
                        console.log(fecha);
                      });
                    vm.diasDisponibles = lista;
                    //console.log(vm.diasDisponibles);
                })
                .catch(function (error) {
                    // función para capturar el error
                    console.log(error);
                })
                .then(function () {
                    // función que siempre se ejecuta
                });         
        },
        getClinicasDisponibles() {
            // The view model. Se utiliza para poder acceder a los datos de vue en el otro metodo.
            var vm = this;
            //console.log(`https://apiwp.azurewebsites.net/FormularioContratacion/GetClinicas/${vm.idProducto}/${vm.ciudadSeleccionada}/${new Date(vm.fechaSeleccionada).getFullYear() + "-" + (new Date(vm.fechaSeleccionada).getMonth() + 1).toString().padStart(2, '0') + "-" + new Date(vm.fechaSeleccionada).getDate().toString().padStart(2, '0')}?key=BXU8SFSdTdTSOPd1lzNFty7TT6`);
            axios.get(`https://api-frontend.azurewebsites.net/Disponibilidad/GetClinicas/${vm.idProducto}/${vm.ciudadSeleccionada}/${new Date(vm.fechaSeleccionada).getFullYear() + "-" + (new Date(vm.fechaSeleccionada).getMonth() + 1).toString().padStart(2, '0') + "-" + new Date(vm.fechaSeleccionada).getDate().toString().padStart(2, '0')}?key=udl50CsG0Uj3USmLQLF9JsmK7`)
                .then(function (response) {
                    // función que se ejecutará al recibir una respuesta
                    console.log(response);
                    let lista = []
                    response.data.forEach(function(data) {                    
                        lista.push(data);
                        console.log(data);
                      });
                    vm.clinicasDisponibles = lista;
                    console.log(vm.clinicasDisponibles[0].name);
                })
                .catch(function (error) {
                    // función para capturar el error
                    console.log(error);
                })
                .then(function () {
                    // función que siempre se ejecuta
                });         
        },
        getBloquesDisponibles() {
            // The view model. Se utiliza para poder acceder a los datos de vue en el otro metodo.
            var vm = this;
            let fecha = new Date(vm.fechaSeleccionada).getFullYear() + "-" + (new Date(vm.fechaSeleccionada).getMonth() + 1).toString().padStart(2, '0') + "-" + new Date(vm.fechaSeleccionada).getDate().toString().padStart(2, '0');
            //console.log(`https://apiwp.azurewebsites.net/FormularioContratacion/GetBloquesDisponibles/${vm.idProducto}/${vm.clinicaSeleccionada}/${fecha}?key=BXU8SFSdTdTSOPd1lzNFty7TT6`);
            axios.get(`https://api-frontend.azurewebsites.net/Disponibilidad/GetBloquesDisponibles/${vm.idProducto}/${vm.clinicaSeleccionada}/${fecha}?key=udl50CsG0Uj3USmLQLF9JsmK7`)
                .then(function (response) {
                    // función que se ejecutará al recibir una respuesta
                    console.log(response);
                    let lista = []
                    response.data.forEach(function(data) { 
                        let bloque= new Date(data.blockStart).getHours().toString().padStart(2, '0') + ":" + new Date(data.blockStart).getMinutes().toString().padStart(2, '0');                
                        lista.push({ label: bloque, value: bloque });
                        console.log(bloque);
                      });
                    vm.bloquesDisponibles = lista;
                    console.log(vm.bloquesDisponibles);
                })
                .catch(function (error) {
                    // función para capturar el error
                    console.log(error);
                })
                .then(function () {
                    // función que siempre se ejecuta
                });         
        },
        getQuestionaryQuestions() {
            // The view model. Se utiliza para poder acceder a los datos de vue en el otro metodo.
            var vm = this;
            axios.get(`https://api-frontend.azurewebsites.net/Formulario/Cuestionario/${vm.idProducto}?key=udl50CsG0Uj3USmLQLF9JsmK7`)
                .then(function (response) {
                    // función que se ejecutará al recibir una respuesta
                    console.log(response);
                    let lista = []
                    response.data.forEach(function(data) { 
                        let listaRespuestas = []
                        if(data.answers != null){
                            listaRespuestas = JSON.parse(data.answers);
                        }
                        lista.push({question : data.question, idQuestionType : data.idQuestiontype, translation : data.translation, answers : listaRespuestas, isObligatory : data.isObligatory, answerToSend : null});
                      });
                    vm.HTMLQuestions = lista;
                    console.log(vm.HTMLQuestions);
                })
                .catch(function (error) {
                    // función para capturar el error
                    console.log(error);
                })
                .then(function () {
                    // función que siempre se ejecuta
                });         
        },
        onClickFinalButton(){
            var vm = this;
            console.log(vm.HTMLQuestions);
        }
    },
    //Metodos que observan las variables definidas en data y se ejecutan si se ven cambios en las variables.
    watch: {
            ciudadSeleccionada(newValue, oldValue) {
                this.fechaSeleccionada=null;
                this.clinicaSeleccionada=null;
                console.log(`El valor de la variable cambió de ${oldValue} a ${newValue}`);
                console.log(this.ciudadSeleccionada);
                this.getDiasDisponibles();
                },
            fechaSeleccionada(newValue, oldValue) {
                console.log(`El valor de la variable cambió de ${oldValue} a ${newValue}`);
                this.getClinicasDisponibles();
                },
            clinicaSeleccionada(newValue, oldValue) {
                console.log(`El valor de la variable cambió de ${oldValue} a ${newValue}`);
                this.getBloquesDisponibles();
                },
            idProducto(newValue, oldValue) {
                console.log(`El valor de la variable cambió de ${oldValue} a ${newValue}`);
                this.getCiudades();
                },
            bloqueSeleccionado(newValue, oldValue){
                console.log(`El valor de la variable cambió de ${oldValue} a ${newValue}`);
                this.getQuestionaryQuestions();
                },
    },
    //Hay varios lifecycle hooks en vue, uno de ellos es para ejecutar metodos apenas se monta vue
    beforeMount() {
        //this.getCiudades();
        this.getProductos();
    }
})

app.use(Quasar)
app.mount('#q-app')




