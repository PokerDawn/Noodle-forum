import request from "@/utils/request";

type register={
    username: string,
    password: string
}
type release={
    title: string,
    context: string,
    uid: Number,
    username: string,
    time: string,
    image?:string
}
type AddDetails={
    aid: number,
    username: string,
    time: string,
    content: string,
}
type uploadMessage={
    content:string,
    uid:number,
    time:string,
    username:string
}
export const RegisterAPI=({username,password}:register)=>{
    return request({
        url: "/register/register",
        method: 'POST',
        data:{
            username:username,
            password:password
        }
    })
}

export const LoginAPI=({username,password}:register)=>{
    return request({
        url: "/register/login",
        method: 'POST',
        data:{
            username:username,
            password:password
        }
    })
}

export const ReleaseAPI=({title,context,uid,username,time,image}:release)=>{
    return request({
        url: "/acticle/release",
        method: 'POST',
        data:{
            title:title,
            context: context,
            uid: uid,
            username: username,
            time: time,
            image:image,
        }
    })
}

export const SelectAPI=(Number:number,Size:number)=>{
    return request({
        url: `/acticle/select/${Number}/${Size}`,
        method: 'GET',
    })
}

export const DeleteAPI=(id:number)=>{
    return request({
        url: `/acticle/delete/${id}`,
        method: 'GET',
    })
}

export const ImgAPI=(file:any)=>{
    return request({
        url: `/someImgUpload`,
        method: 'GET',
        headers: {
            'Content-Type': 'multipart/form-data;',
        },
        data:{
            files:file
        }
    })
}

export const SelectByIdAPI=(id:number)=>{
    return request({
        url: `/acticle/select/${id}`,
        method: 'GET',
    })
}

export const FindByaidAPI=(id:number)=>{
    return request({
        url: `/comment/select/${id}`,
        method: 'GET',
    })
}

export const AddDetails=(obj:AddDetails)=>{
    return request({
        url: `comment/add`,
        method: 'POST',
        data:obj
    })
}

export const uploadMessageAPI=(obj:uploadMessage)=>{
    return request({
        url:'/chat/uploadMessage',
        method:'POST',
        data:obj
    })
}

export const selectMessageAPI=(number:number,size:number)=>{
    return request({
        url:`/chat/select/${number}/${size}`,
        method:'GET'
    })
}

export const uploadAvatarAPI=(avatar:string,id:number)=>{
    return request({
        url:'/register/uploadAvatar',
        method:'POST',
        data:{
            avatar:avatar,
            id:id
        }
    })
}

export const getInfoAPI=(id:number)=>{
    return request({
        url:`/register/getInfo/${id}`,
        method:'GET'
    })
}