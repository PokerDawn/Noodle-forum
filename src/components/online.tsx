import { defineComponent, reactive } from "vue";
import { useStore } from "vuex";
import "../css/online.css"
type user={
    username: string
}
export default defineComponent({
    setup() {
        const store = useStore()
        const info = reactive({
            username: store.state.username,
            circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
            user: {},
            isCollapse: false,
            users: [
                {
                    username: ''
                }
            ],
            chatUser: '',
            text: "",
            messages: [],
            content: [
                {
                    message: '',
                    class: ''
                },
            ]
        })
        function createContent(remoteUser: string, nowUser: string, text: string) {  // 这个方法是用来将 json的聊天消息数据转换成 html的。
            // 当前用户消息
            let html = {
                message: '',
                class: 'green_message',
            }
            if (nowUser) { // nowUser 表示是否显示当前用户发送的聊天消息，绿色气泡
                html = {
                    message: text,
                    class: 'green_message',
                }

                info.content = [...info.content, html]
                console.log(info.content)
            } else if (remoteUser) {   // remoteUser表示远程用户聊天消息，蓝色的气泡
                html = {
                    message: text,
                    class: 'blue_message',
                }
                info.content = [...info.content, html]
                console.log(info.content)
            }
            console.log(html)
        }
        let socketUrl = `ws://47.101.203.157/imserver/${info.username}`
        const socket = new WebSocket(socketUrl);
        const init = () => {
            socket.onopen = function () {
                console.log("websocket已打开")
            }
            socket.onmessage = function (msg) {
                console.log("收到数据====" + msg.data)
                // 对收到的json数据进行解析， 类似这样的： {"users": [{"username": "zhang"},{ "username": "admin"}]}
                let data = JSON.parse(msg.data)
                if (data.users) {  // 获取在线人员信息
                    info.users = data.users
                } else {
                    if (data.from === info.chatUser) {
                        info.messages.push(data)
                        createContent(data.from, null, data.text)
                    }
                }
            }
            socket.onclose = function () {
                console.log("websocket已关闭")
            }
            socket.onerror = function () {
                console.log("websocket发生了错误")
            }
        }
        init()
        
        return () => (
            <div class="online_box">
                    <div style="padding-bottom: 10px; border-bottom: 1px solid #ccc;padding-top:5px;font-weight:bold">在线用户<span style="font-size: 12px"></span></div>
                    {info.users.map(user => (
                        <div key={Math.random()} style="margin:3px">
                            <span style="color:white;">{user.username}</span>
                            {/* {user.username === info.chatUser ? (<span style="font-size: 12px;color: limegreen; margin-left: 5px">正在聊天...</span>) : ''} */}
                        </div>
                    ))}
            </div>
        )
    },

})