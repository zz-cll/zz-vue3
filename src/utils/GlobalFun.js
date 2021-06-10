
import { message } from 'ant-design-vue';
import service  from './request'

//登录
export const login = async (data) => {
    const res = await service.post(`/api/sys/login`,{
        ...data
    })
    
    if(res.code==1){
        sessionStorage.removeItem("permissList")
        sessionStorage.setItem("token",res.data) 
        const per = await service.get("api/menu/getMenuName")
        await sessionStorage.setItem("permissList",per.data)
        message.success('登录成功');
        return true
    }else{
        message.error(res.msg);
        return false
    }
}

//导出
export const derive = async(url,data,name) => {
    service({
        url: url,
        method: "get",
        params: data,
        responseType: "blob",
    })
    .then((res) => {
        const blob = new Blob([res], { type: "application/vnd.ms-excel" });
        let filename = `${name}.xls`;
        const elink = document.createElement("a");
        elink.download = filename;
        elink.style.display = "none";
        elink.href = URL.createObjectURL(blob);
        document.body.appendChild(elink);
        elink.click();
        URL.revokeObjectURL(elink.href); // 释放URL 对象
        document.body.removeChild(elink);
    })
    .catch(() => {
        message.error("导出失败");
    });
}

//查询
export const fetch = async(url,data) => {
    const res = await service.get(url,{
        params:{
            ...data
        }
    })
    if(res.code == 1){
        return { tabledata:res.data.records,total:res.data.total,all:res } 
    }
    else{
        message.error(res.msg)
        return {tabledata:[],total:0}
    }
}

//操作
export const operation = async(url,methods,data) => {
    let res = ""
    if(methods=="post"){
        res = await service.post(url,{...data})
    }else{
        res = await service.get(url,{
            params:{
                ...data
            }
        })
    }
    if(res.code == 1){
        message.success("成功")
        return true
    }
    else{
        message.error(res.msg)
        return false
    }
}






 
