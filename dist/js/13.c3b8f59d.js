"use strict";(self["webpackChunkvue3_springboot"]=self["webpackChunkvue3_springboot"]||[]).push([[13],{4757:function(e,a,t){t.r(a);var l=t(3396),s=t(4870),n=t(387),i=t(65),c=t(1008),m=t(2483);a["default"]=(0,l.aZ)({setup(){const e=(0,m.tv)(),a=(0,i.oR)(),t=(0,s.qj)({value:{id:0,title:"",context:"",username:"",time:"",image:""},context:"",flag:1}),o=(0,s.qj)({value:new Array}),u=async()=>{const{data:e}=await(0,n.Vj)(t.value.id);o.value=e.data,console.log(o.value)},d=async()=>{const{data:e}=await(0,n.bl)(a.state.detailsID);t.value=e.data,console.log(e),u()};d();const v=()=>{1==t.flag?t.flag=2:t.flag=1},r=async()=>{let l={aid:t.value.id,username:a.state.username,time:(new Date).toLocaleDateString()+" "+(new Date).toLocaleTimeString(),content:t.context};if(""==t.context)return(0,c.z8)({type:"error",message:"评论不能为空"});const{data:s}=await(0,n.fz)(l);200==s.code?((0,c.z8)({type:"success",message:"评论成功"}),e.replace("/home/index"),await W(200),e.replace("/home/details")):(0,c.z8)({type:"error",message:"评论失败"})};async function W(e){return new Promise((a=>setTimeout(a,e)))}const g=(0,l.Wm)("div",null,[(0,l.Wm)("div",{class:"detailsOpen"},[(0,l.Wm)("textarea",{placeholder:"请发布一条友善的评论",value:t.context,onInput:e=>t.context=e.target.value,class:"detailsText"},null),(0,l.Wm)("div",{class:"detailBtn",onClick:r},[(0,l.Uk)("发表评论")])])]);return()=>(0,l.Wm)("div",{class:"details_box"},[(0,l.Wm)("div",{class:"details_box_min"},[(0,l.Wm)("div",null,[(0,l.Wm)("div",{class:"avatar_in"},null),(0,l.Wm)("div",{class:"name_in"},[t.value.username]),(0,l.Wm)("div",{class:"time_in"},[t.value.time])]),(0,l.Wm)("div",null,[(0,l.Wm)("div",{class:"in_title"},[t.value.title]),(0,l.Wm)("div",{class:"in_context"},[t.value.context]),(0,l.Wm)("img",{src:t.value.image,class:"in_image",style:"width:25%"},null)]),(0,l.Wm)("div",{class:"in_chat"},[(0,l.Wm)("i",{class:"el-icon-chat-dot-round mouseEffect",style:{color:"white"},onClick:v},null)])]),(0,l.Wm)("hr",null,null),(0,l.Wm)("div",{class:"comment_big_box"},[(0,l.Wm)("div",{class:"details_font"},[(0,l.Uk)("评论")]),1==t.flag?o.value.map((e=>(0,l.Wm)("div",{class:"comment_box"},[(0,l.Wm)("div",null,[(0,l.Wm)("div",{class:"avatar_comment"},null),(0,l.Wm)("div",{class:"name_comment"},[(0,l.Uk)(" "),e.username,(0,l.Uk)(" ")]),(0,l.Wm)("div",{class:"time_in"},[e.time])]),(0,l.Wm)("div",{class:"in_context"},[e.content]),(0,l.Wm)("hr",null,null)]))):g])])}})}}]);
//# sourceMappingURL=13.c3b8f59d.js.map