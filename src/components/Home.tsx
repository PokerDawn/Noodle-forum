import { defineComponent,onMounted,reactive,ref } from "vue";
import '../css/home.css'
import { useStore } from "vuex";
import { ElMessage } from "element-plus";
import { RouterView } from "vue-router";
import store from "@/store";
import router from "@/router";
import Online from "./online";
import { getInfoAPI, uploadAvatarAPI } from "@/api/api";
export default defineComponent({
    setup(){
        const stroe = useStore()
        const quit=()=>{
            stroe.state.token=''
            localStorage.removeItem("data")
            router.replace('/')
            ElMessage({
                type: 'success',
                message: '已退出登录'
            })
        }
        const home = ()=>{
            store.commit("GetActive",0)
            router.push('/home/index')
        }
        const release = ()=>{
            store.commit("GetActive",1)
            router.push('/home/release')
        }
        let info = reactive({
            avatar:null
        })
        const chat = ()=>{
            store.commit("GetActive",2)
            router.push(`/home/chat`)
        }
        const result=reactive({
            avatar:null,
            id:parseInt(store.state.uid),
        })
        
        const getInfo=async ()=>{
            const {data:res}=await getInfoAPI(parseInt(store.state.uid))
            info.avatar=res.data.avatar
            store.commit("GetAvatar",res.data.avatar)
        }
        onMounted(()=>{
            getInfo()
        })
        
        const uploadAvatar=async ()=>{
            const {data:res}=await uploadAvatarAPI(result.avatar,result.id)
            if(res.code==200){
                getInfo()
                return ElMessage.success("头像已更换")
            }
            console.log(res)
        }
        const uploadIMG=async (e)=>{
            const file=e.target.files[0]
            if(file.type.substring(0,5)!=='image'){
                return ElMessage.warning("只能上传图片！")
            }
            const fileReader = new FileReader()
            fileReader.readAsDataURL(file)
            fileReader.onload = function () {
                result.avatar=this.result
                uploadAvatar()
            }
        }
        
        
        return ()=>(
            <div class="index_box">
                <div class="box1">
                    <div class="left_bar">
                        <div class="avatar">
                            <input type="file" onInput={uploadIMG}/>
                            <img src={info.avatar} />
                        </div>
                        <div class="name">{stroe.state.username}</div>
                        <ul class="menu">
                            <li onClick={home} class={store.state.active==0?'right_border':''}>
                            <img src={require("../image/index.png")} alt="" />
                            <p class="font">广场</p>
                            </li>
                            <li onClick={release} class={store.state.active==1?'right_border':''}>
                            <img src={require("../image/smil.png")} alt="" />
                            <p class="font">发表</p>
                            </li>
                            <li onClick={chat} class={store.state.active==2?'right_border':''}>
                            <img src={require("../image/cry.png")} alt="" />
                            <p class="font">聊天</p>
                            </li>
                            <li onClick={quit}>
                            <img src={require("../image/reset.png")} alt="" />
                            <p class="font">退出</p>
                            </li>
                        </ul>
                    </div>
                    <RouterView></RouterView>
                </div>
                <Online></Online>
            </div>
        )
    }
})