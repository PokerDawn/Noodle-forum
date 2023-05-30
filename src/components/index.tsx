import { defineComponent,reactive,ref,withModifiers } from "vue";
import '../css/in.css'
import {SelectAPI,DeleteAPI} from '../api/api'
import store from "@/store";
import { ElMessage } from "element-plus";
import router from "@/router";
type Item={
    image: string;
    id: number,
    uid: string,
    username: string,
    time: string,
    title: string,
    context: string
}
export default defineComponent({
    setup(){
        const list = reactive({
            data:[]
        })
        const number = ref(1)
        const select =async ()=>{
           const {data:res}=await SelectAPI(number.value,1000)
           if(res.code==200){
            list.data = res.data.records
            console.log(list.data)
            list.data.reverse()
            number.value++
           }
        }
        const scroll = async (e:Event)=>{
            const scrollDistance = (e.target as HTMLDivElement).scrollHeight - (e.target as HTMLDivElement).scrollTop-(e.target as HTMLDivElement).clientHeight
            console.log(scrollDistance);
            
            if(scrollDistance <=0.1){
                const {data:res}=await SelectAPI(number.value,4)
                if(res.code==200){
                    number.value++
                    list.data.reverse()
                    list.data=[...list.data,...res.data.records]
                    list.data.reverse()
                }
            }
        }
        window.addEventListener("scroll",scroll)
        select()
        const remove =async (id:number)=>{
            console.log(id)
            /* const {data:res} =  */await DeleteAPI(id)
            ElMessage({
                type: "success",
                message: `删除成功`
            })
            router.replace("/home/release")
            await sleep(50)
            router.replace("/home/index")
            
        }
        async function sleep(time:number) {
            return new Promise(res=>setTimeout(res,time))
        }
        const details = (id:number)=>{
            console.log(id)
            store.commit("GetdetailsID",id)
            router.push('/home/details')
        }
        return ()=>(
            <div class="in_box">
                {
                list.data.map((itme:Item)=>(
                    <div class="gc_box" onClick={()=>details(itme.id)}>
                    <div>
                        <div class="avatar_in"></div>
                        <div class="name_in">{itme.username}</div>
                        <div class="time_in">{itme.time}</div>
                    </div>
                    <div>
                        <div class="in_title">{itme.title}</div>
                        <div class="in_context">{itme.context}</div>
                        <img src={itme.image} class="in_image"/>
                    </div>
                    {store.state.uid==itme.uid? (
                        <div class="in_delete" title="删除" onClick={withModifiers(()=>remove(itme.id),['stop'])}>x</div>
                    ):''}
                </div>
            )
                    
                    )}
            </div>
        )
    }
})