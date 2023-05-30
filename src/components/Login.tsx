import { defineComponent,reactive} from "vue";
import "../css/index.css"
import router from '../router/index'
import { LoginAPI } from "@/api/api";
import { useStore } from 'vuex'
import {ElMessage} from 'element-plus'
type res={
    username: string,
    password: string,
}
export default defineComponent({
    setup(){
        const store = useStore()
        const result=reactive({
            // username: 'pokerdawn',
            // password: '123456789',
            username: '',
            password: '',
        })
        if(store.state.token!==''){
            router.replace('/home')
        }
        const log= async (result:res):Promise<void>=>{
            const {data:res}=await LoginAPI(result);
            console.log(res);
            if(res.code==200) {
                store.commit('GetToken',res.data.token)
                store.commit("GetUid",res.data.info.id)
                store.commit("GetUsername",res.data.info.username)
                ElMessage({
                    type: "success",
                    message: `登录成功`
                })
            }else{
                ElMessage({
                    type: "error",
                    message: `${res.message}`
                })
            }
            
            router.replace("/home")
        }
        return ()=>(
            <div id="login_box">
                <div class="box">
                    <h2>Login</h2>
                    <div class="input-box">
                        <label>用户名</label>
                        <input type="text" value={result.username} onInput={(e:Event)=>result.username=(e.target as HTMLInputElement).value} />
                    </div>
                    <div class="input-box">
                        <label>密码</label>
                        <input type="password" value={result.password} onInput={(e:Event)=>result.password=(e.target as HTMLInputElement).value}  />
                    </div>
                    <div class="btn-box">
                        <a href="#">忘记密码?</a>
                        <div>
                            <button onClick={()=>log(result)}>登录</button>
                            <button onClick={()=>{
                                router.replace('/register')
                            }}>注册</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
})