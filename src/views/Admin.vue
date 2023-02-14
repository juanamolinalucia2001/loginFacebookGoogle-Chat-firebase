<template>
    <v-layout justify-center mt-5>
        <v-flex class="d-flex justify-center">
            
            <v-card class="text-center" max-width="600" >
                <h4>Editar foto de perfil</h4>
                <v-card-text>
                    <v-list-item-avatar>
                        <v-img :src="usuario.foto"></v-img>
                    </v-list-item-avatar>
                </v-card-text>
                <v-card-text>
                    <h3>{{usuario.nombre}}</h3>
                      <input type="file" ref="boton" class="d-none" @change="buscarImagen($event)">
                </v-card-text>
                <v-card-text>
    
                    <v-btn class="primary mr-5 mb-5 " @click="$refs.boton.click()">Buscar imagen</v-btn>
                    <v-btn class="secondary mr-5 mb-5" :disabled="file === null" @click="subirImagen()" :loading="loading">Subir  imagen</v-btn>
                </v-card-text>

                <v-card-text v-if="file">
                    <h4>{{file.name}}</h4>
                    <v-img :src="urlTemporal"></v-img>
                </v-card-text>

                 <v-card-text v-if="error">
                    <h4>{{error}}</h4>
                </v-card-text>
            </v-card>

        </v-flex>
    </v-layout>
</template>
<script>
import {mapState} from "vuex";
import {firebase, storage, db} from '@/firebase'

export default {
    data(){
        return{
            file:null,
            urlTemporal:'',
            loading: false,
            error:null
        }
    },
    computed:{
        ...mapState(['usuario'])
    },
    methods:{
        buscarImagen(event){
            console.log(event.target.files[0])

            const tipoArchivo = event.target.files[0].type;

            if(tipoArchivo === 'image/jpeg' || tipoArchivo === 'image/png'){
                 //guardo mi archivo
                 this.file = event.target.files[0]
                 this.error = null

            }else{
                this.error = 'Archivo no válido'
                this.file = null
                return
            }
           

            const reader = new FileReader();
            reader.readAsDataURL(this.file);
            reader.onload = (e) => {
                console.log(e.target.result);
                this.urlTemporal = e.target.result
            }
        },
        async subirImagen(){
            try{

                this.loading = true
                const refImagen= storage.ref().child(this.usuario.email).child('foto perfil')

                const res = await refImagen.put(this.file)

                console.log(res);

                const urlDescarga = await refImagen.getDownloadURL()
                this.usuario.foto = urlDescarga

                await db.collection('usuarios').doc(this.usuario.uid).update({
                    foto:urlDescarga
                })

                this.error = 'Imagen subida con exito'
                this.file = null

            }catch(error){
                console.log(error)
            }finally{
                this.loading=false
            }
        }
    }
}
</script>
<style  scoped>
    .center{
        display: flex;
        flex-wrap: wrap;

    }
</style>