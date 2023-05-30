import router from "@/router";
import { defineComponent, reactive, ref } from "vue";
import '../css/release.css'
import { useStore } from "vuex";
import { ReleaseAPI, ImgAPI } from "@/api/api";
import { ElButton, ElMessage, ElUpload } from 'element-plus'

type release = {
    title: string,
    context: string,
    uid: Number,
    username: string,
    time: string,
    image?:string,
}

export default defineComponent({
    setup() {
        const date = (new Date()).toLocaleDateString() + " " + (new Date()).toLocaleTimeString()
        const store = useStore()
        const back = () => {
            store.commit("GetActive", 0)
            router.push('/home/index')
        }
        const result = reactive({
            title: '',
            context: '',
            uid: store.state.uid,
            username: store.state.username,
            time: date,
            image:null,
        })
        //替换脏字
        const list: string[] = []
        const ok = async (result: release) => {
            if (result.context == "" || result.title == "") {
                ElMessage({
                    type: "error",
                    message: "标题或内容不能为空"
                })
                return
            }
            list.map((item: string | RegExp) => {
                result.context = result.context.replace(new RegExp(item, "g"), "**")
            })

            const { data: res } = await ReleaseAPI(result)
            console.log(res)
            if (res.code == 200) {
                store.commit("GetActive", 0)
                router.replace("/home/index")
                ElMessage({
                    type: "success",
                    message: "发布成功"
                })
            } else {
                ElMessage({
                    type: "error",
                    message: "发布失败"
                })
            }

        }
        const imageName = ref(null)
        const uploadIMG=async (e)=>{
            const file=e.target.files[0]
            if(file.type.substring(0,5)!=='image'){
                return ElMessage.warning("只能上传图片！")
            }
            imageName.value=file.name
            const fileReader = new FileReader()
            fileReader.readAsDataURL(file)
            console.log(fileReader)
            fileReader.onload = function () {
                result.image=this.result
            }
        }
        return () => (
            <div class="release_box">
                <h2>发表</h2>
                <div class="input-box">
                    <label>标题</label>
                    <input type="text" value={result.title} onInput={(e: Event) => result.title = (e.target as HTMLInputElement).value} />
                </div>
                <div class="input-box" >
                    <label>内容</label>
                    <textarea value={result.context} onInput={(e: Event) => result.context = (e.target as HTMLInputElement).value}></textarea>
                </div>
                <div class="file">
                    {imageName.value?imageName.value:'点击上传图片'}
                    <input type="file" onInput={uploadIMG}></input>
                </div>
                <div class="btn-box">
                    <div>
                        <button onClick={back}>返回</button>
                        <button onClick={() => ok(result)}>点击发表</button>
                    </div>
                </div>
            </div >
        )
    }
})