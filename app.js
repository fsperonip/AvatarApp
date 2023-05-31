const app = Vue.createApp({
    data () {
        return {
            // Variables globales
            userName: null,
            password: null,
            asin: 'B01MSBZYQW',
            avatarTxt: null,
            showSpinner: false,
        };
    },
    methods:{
        // Para acceder a las variables globales en los metodos utilizar this.first
        generarAvatar() {
        // The view model. Se utiliza para poder acceder a los datos de vue en el otro metodo.
        var vm = this;
        vm.showSpinner=true;
        axios.get(`https://miempresaapi.azurewebsites.net/AvatarApp/${vm.asin}?key=Q284GCt%KXEZ!QJJ@Et6iDJ2mM0i9c`)
            .then(function (response) {
                // función que se ejecutará al recibir una respuesta
                console.log(response);
                console.log(response.data);
                vm.avatarTxt=response.data;
                //let lista = []
                //response.data.forEach(function(data) {                     
                //    lista.push({ id: data.id, name: data.name });
                //  });
                //vm.productos = lista;
                //console.log(vm.productos);
                vm.showSpinner=false;
            })
            .catch(function (error) {
                // función para capturar el error
                console.log(error);
            })
            .then(function () {
                // función que siempre se ejecuta
            }); 
        console.log("Botón clicado");
        }
    },
    //Metodos que observan las variables definidas en data y se ejecutan si se ven cambios en las variables.
    watch: {
            
    },
    //Hay varios lifecycle hooks en vue, uno de ellos es para ejecutar metodos apenas se monta vue
    beforeMount() {
        
    }
})

app.use(Quasar)
app.mount('#q-app')




