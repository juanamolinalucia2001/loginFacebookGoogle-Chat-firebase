<template>
    <v-layout>
        <v-flex>
            <v-card style="borde:1px solid black" class="mx-auto mt-5" max-width="95%">
                <h3 class="ml-3 mt-5">Bienvenido {{usuario.nombre}}</h3>
            
            <v-card-text style="height:60vh; overflow:auto" v-chat-scroll>

                <div :class="item.nombre === usuario.nombre ? 'text-md-right' : 'text-md-left'"
                v-for="(item, index) in mensajes" :key="index">
                   
                    <v-chip class=""  :color="item.nombre === usuario.nombre ? 'pink': 'blue'"  text-color="white">
                        <v-avatar left>
                            <v-img :src="item.foto"></v-img>
                         </v-avatar>
                        <p><b>{{item.nombre}}</b>: {{item.mensaje}} </p>                 
                    </v-chip>
                    <p class="caption mr-2">{{item.fecha}}</p>

                </div>

            </v-card-text>

            <v-card-text>
                <v-form @submit.prevent="enviarMensaje()" v-model="valido">
                    <v-text-field v-model="mensaje" label="Escribe tu mensaje aquí"
                    required
                    :rules="reglas"></v-text-field>
                    <button></button>
                </v-form>
            </v-card-text>
             </v-card>
        </v-flex>
    </v-layout>

</template>
<script>
import {mapState} from 'vuex';
import { db} from '@/firebase';
import moment from 'moment'

export default {
    data(){
        return{
            mensaje:'',
            valido:false,
            reglas:[
                v => !!v || 'Tienes que escribir un mensaje....'
            ],
            mensajes:[]
        }
    },
    computed:{
        ...mapState(['usuario'])
    },
    methods:{
        enviarMensaje(){
            if(this.valido){
                console.log('enviaste el mensaje', this.mensaje)

                db.collection('chats').add({
                    mensaje:this.mensaje,
                    nombre: this.usuario.nombre,
                    foto: this.usuario.foto,
                    fecha: Date.now()
                }).catch(error => console.log(error))

                this.mensaje=''
            }else{
                console.log('No escribiste nada')
            }
           
        }
    },
    created(){
        moment.locale('es');
        let ref = db.collection('chats').orderBy('fecha', "desc").limit(10)

        ref.onSnapshot(querySnapshot => {
            this.mensajes = []

            querySnapshot.forEach(doc => {
               // this.mensajes.push(doc.data())
               this.mensajes.unshift({
                    mensaje: doc.data().mensaje,
                    foto:doc.data().foto,
                    nombre:doc.data().nombre,
                    fecha:moment(doc.data().fecha).calendar()

               })
            });

            console.log('mirame',this.mensajes);
        })
    }
}
</script>