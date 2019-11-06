import noticelistView from '../views/notice-list.art'
import httpModel from '../models/http'


const noticelist=async(req,res,next)=>{
        let result=await httpModel.get({
            type:'post',
            url:'/api/notices/find'
        })
        if(result.ret){
            let html=noticelistView({
                result
            })
            $('.table-striped').html(html)
        
            deleteone()
        }else{
            res.go('/home')
        }
        
}
    
const deleteone=(req,res,next)=>{
        $('.delete').on('click',async function(){
            let data={name:$('.notices-list').eq($(this).index()).text()}
            console.log(data)
            let result=await httpModel.get({
                type:'post',
                url:'/api/notices/delete',
                data
            })
            // let html=noticelistView({
            //     result
            // })
            // $('.table-striped').html(html)

        // noticelist()

        })
    }


export default noticelist


