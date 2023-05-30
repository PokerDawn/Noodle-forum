import { createStore } from 'vuex'

export default createStore({
  state: {
    token: '',
    uid:'',
    username:'',
    active:0,
    detailsID:'',
    message:'',
    avatar:''
  },
  getters: {
  },
  mutations: {
    GetAll(state,obj){
      state.token = obj.token
      state.uid=obj.uid
      state.username=obj.username
      state.active=obj.active
      state.detailsID=obj.detailsID
    },
    GetMessage(state,message){
      state.message=message
    },
    GetToken(state,token){
      state.token=token
    },
    GetUid(state,uid){
      state.uid=uid
    },
    GetUsername(state,username){
      state.username=username
    },
    GetActive(state,active){
      state.active=active
    },
    GetdetailsID(state,detailsID){
      state.detailsID=detailsID
    },
    GetAvatar(state,avatar){
      state.avatar=avatar
    }
  },
  actions: {
  },
  modules: {
  }
})
