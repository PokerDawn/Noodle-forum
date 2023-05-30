import { defineComponent, reactive } from 'vue'
import '../css/details.css'
import '../css/in.css'
import { SelectByIdAPI, FindByaidAPI,AddDetails } from '../api/api'
import { useStore } from 'vuex'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'

export default defineComponent({
    setup() {
        const router = useRouter()
        const store = useStore()
        const result = reactive({
            value: {
                id: 0,
                title: '',
                context: '',
                username: '',
                time: '',
                image:'',
            },
            context:'',
            flag: 1,
        })
        const list = reactive({
            value: new Array(),
        })

        //获取评论详情数据
        const getcomment = async () => {
            const { data: res } = await FindByaidAPI(result.value.id)
            list.value = res.data
            console.log(list.value)
        }

        const getinfo = async () => {
            const { data: res } = await SelectByIdAPI(store.state.detailsID)
            result.value = res.data
            console.log(res)
            getcomment()
        }
        getinfo()
        //切换评论页
        const changeDetails=():void=>{
            if(result.flag==1){
                result.flag=2
            }else{
                result.flag=1
            }
        }
        //发表评论页面
        
        //发表评论
        const addDetails=async ()=>{
            let ret={
                aid:result.value.id,
                username: store.state.username,
                time: (new Date()).toLocaleDateString() + " " + (new Date()).toLocaleTimeString(),
                content: result.context
            }
            if(result.context==''){
                return ElMessage({
                    type: "error",
                    message: "评论不能为空"
                })
            }
            const {data:res} =await AddDetails(ret)
            if(res.code==200){
                ElMessage({
                    type: "success",
                    message: "评论成功"
                })
                router.replace("/home/index")
                await sleep(200)
                router.replace("/home/details")
            }else{
                ElMessage({
                    type: "error",
                    message: "评论失败"
                })
            }
        }
        async function sleep(time:number):Promise<number> {
            return new Promise(res=>setTimeout(res,time))
        }
        const release = (
            <div>
                <div class="detailsOpen">
                    <textarea placeholder='请发布一条友善的评论' value={result.context} onInput={(e: Event) => result.context = (e.target as HTMLInputElement).value} class="detailsText"></textarea>
                    <div class="detailBtn" onClick={addDetails}>发表评论</div>
                </div>
            </div>
        )
        return () => (
            <div class='details_box'>
                <div class='details_box_min'>
                    <div>
                        <div class="avatar_in"></div>
                        <div class="name_in">{result.value.username}</div>
                        <div class="time_in">{result.value.time}</div>
                    </div>
                    <div>
                        <div class="in_title">{result.value.title}</div>
                        <div class="in_context">{result.value.context}</div>
                        <img src={result.value.image} class="in_image" style="width:25%"/>
                    </div>
                    <div class="in_chat">
                    <i class="el-icon-chat-dot-round mouseEffect" style={{color:"white"}} onClick={changeDetails}></i>
                    </div>
                </div>
                <hr />
                <div class="comment_big_box">
                <div class="details_font">评论</div>
                    {
                        result.flag==1? 
                            list.value.map(item => (
                                <div class="comment_box">
                                    <div>
                                        <div class="avatar_comment"></div>
                                        <div class="name_comment"> {item.username} </div>
                                        <div class="time_in">{item.time}</div>
                                    </div>
                                    <div class="in_context">{item.content}</div>
                                    <hr/>
                                </div>
                            ))
                        :release
                    }
                </div>
            </div>
        )
    }
})