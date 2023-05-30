import { defineComponent } from "vue";
import { RouterView } from "vue-router";
import { useStore } from "vuex";
export default defineComponent({
    setup(){
        const store = useStore()
        window.addEventListener("beforeunload",()=>{
            const a = JSON.stringify(store.state)
            localStorage.setItem("data",a)
        })
        if(localStorage.getItem("data")){
            let a = JSON.parse(localStorage.getItem("data"))
            store.commit("GetAll",a)
        }
            
            console.log(store.state)
        document.title="面汤论坛"
        return ()=>(
            <div>
                <RouterView></RouterView>
            </div>
        )
    }
})