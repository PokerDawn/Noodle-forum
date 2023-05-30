import { defineComponent, nextTick, onBeforeUnmount, onDeactivated, onMounted, onUnmounted, reactive, ref } from "vue";
import { useStore } from "vuex";
import { ElMessage } from "element-plus";
import "../css/chat.css"
import { selectMessageAPI, uploadMessageAPI } from "@/api/api";
export default defineComponent({
    setup() {
        const store = useStore()
        const date = (new Date()).toLocaleDateString() + " " + (new Date()).toLocaleTimeString()
        const result = reactive({
            uid: store.state.uid,
            username: store.state.username,
            content: null,
            time: date,
            list: Array(),
            Interval:null,
            avatar:store.state.avatar
        })
        const getMessage = async (number: number, size: number) => {
            const { data: res } = await selectMessageAPI(number, size)
            
            if(Array.from(result.list)!==Array.from(res.data.records)){
                result.list = res.data.records
            }
            if(res.code==200){
                setTimeout(()=>{
                    const dom =document.querySelector(".message_box")
                    if(dom.clientHeight+dom.scrollTop===dom.scrollHeight){
                    handleScroll()
                }
                },100)
            }
            
            
        }
        const send = async () => {
            const re={
                uid:result.uid,
                username:result.username,
                content:result.content,
                time:result.time,
                avatar:store.state.avatar
            }
            const { data: res } = await uploadMessageAPI(re)
            if (res.code == 200) {
                result.content = null
                getMessage(1, 100)
                handleScroll()
                return ElMessage.success("发送成功")
            }
            
        }
        const handleScroll=()=>{
           setTimeout(()=>{
            const box= document.querySelector(".message_box")
            window.scrollTo(0,box.clientHeight)
           },1000)     
        }

        onMounted(()=>{
            getMessage(1, 50)
            handleScroll()
            result.Interval = setInterval(()=>{
                getMessage(1, 100)
            },5000)
        })
        onBeforeUnmount(()=>{
            clearInterval(result.Interval)
        })
        return () => (
            <div class="chat_box">
                <div class="chat_rightbox">
                    <div style="text-align: center; line-height: 50px;color:white">公共聊天室</div>
                    <div style="height: 70%; overflow:auto; border-top: 1px solid white" class="message_box" >
                    {result.list.map((item) => (
                         item.uid==store.state.uid?(
                                <div class="message_box2">
                                    <div class="avatar_message1"></div>
                                    <div class="bubble_message_right">
                                        <div class="green_message">{item.content}</div>
                                    </div>
                                </div>
                         ):(
                            <div class="message_box1">
                                <label class="avatar_message"><img src={item.avatar} alt=""/></label>
                                <div class="message_box111">
                                <label class="message_name">{item.username} <label style="color:gray">{item.time}</label></label>
                                <div class="bubble_message_left">
                                        <div class="blue_message">{item.content}</div>
                                    </div>
                                </div>
                            </div>
                         )
                        ))
                        }
                    </div>
                    <div style="height: 40%" class="">
                        <textarea class="chat_textarea" value={result.content} onInput={(e: Event) => result.content = (e.target as HTMLInputElement).value}></textarea>
                        <div style="text-align: right; padding-right: 10px">
                            <button class="chat_button" onClick={send}>发送</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
})