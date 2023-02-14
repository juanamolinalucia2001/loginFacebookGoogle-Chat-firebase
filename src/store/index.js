import Vue from 'vue'
import Vuex from 'vuex'
import { auth, db } from '@/firebase'
import router from '@/router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    usuario:''
  },
  getters: {
  },
  mutations: {
    nuevoUsuario(state, payload){
      if(payload === null){
        state.usuario=''
      }else{
        state.usuario = payload
      }
    }
  },
  actions: {
    //cierro sesion y redirijo al ingreso
    cerrarSesion({commit}){

      auth.signOut()
      commit('nuevoUsuario', null)
      router.push({name:'ingreso'})

    },
    async setUsuario({commit}, user){
      //pregunto si el usuario viene con un documento
      try{
        const doc = await db.collection('usuarios').doc(user.uid).get()
        if(doc.exists){
          commit('nuevoUsuario', doc.data())
        }else{
          const usuario ={
            nombre: user.displayName,
            email: user.email,
            uid: user.uid,
            foto: user.photoURL
          }

            await  db.collection('usuarios').doc(usuario.uid).set(
                usuario
            )
            console.log('usuario guardado')
                 
             commit('nuevoUsuario', usuario)
        
        }

  

      }catch(error){
       console.log(error);
      }
     
    }
  },
  modules: {
  }
})
