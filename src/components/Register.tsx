import { defineComponent,reactive } from "vue";
import "../css/index.css"
import router from '../router/index'
import {RegisterAPI} from '../api/api'
import {ElMessage} from 'element-plus'
import { useStore } from "vuex";
type register = {
    username: string,
    password: string,
    upassword: string,
}
export default defineComponent({
    setup(){
        const result = reactive({
            username:'',
            password: '',
            upassword:'',
        })
        const store=useStore()
        const reg = async (result:register)=>{
            console.log(result)
            if(result.password!==result.upassword){
                return ElMessage({
                    type: "error",
                    message: `密码不一致！`
                })
            }
            const {data:res}= await RegisterAPI(result)
            console.log(res)
            if(res.code==200){
                router.replace("/")
                ElMessage({
                    type: "success",
                    message: `注册成功`
                })
            }else{
                ElMessage({
                    type: "error",
                    message: `${res.message}`
                })
            }
        }
        if(store.state.token !== ''){
            router.replace('/home')
        }
        const changeUsername =(e:Event)=>result.username=(e.target as HTMLInputElement).value
        const changePassword=(e:Event)=>result.password=(e.target as HTMLInputElement).value
        const changeUPassword=(e:Event)=>result.upassword=(e.target as HTMLInputElement).value
        return ()=>(
            <div id="login_box">
                <div class="box" >
                    <h2>Register</h2>
                    <div class="input-box">
                        <label>用户名</label>
                        <input type="text" value={result.username} onInput={(e)=>changeUsername(e)}/>
                    </div>
                    <div class="input-box" >
                        <label>密码</label>
                        <input type="password" value={result.password} onInput={(e)=>changePassword(e)}/>
                    </div>
                    <div class="input-box">
                        <label>确认密码</label>
                        <input type="password" value={result.upassword} onInput={(e)=>changeUPassword(e)}/>
                    </div>
                    <div class="btn-box">
                        <div>
                            <button onClick={()=>{
                                router.replace("/")
                            }}>返回</button>
                            <button onClick={()=>reg(result)}>点击注册</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
})