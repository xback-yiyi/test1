import SMERouter from 'sme-router'
import {home }from '../controllers/home'
import * as notice from '../controllers/notice'
import noticelistView from '../controllers/notice-list'

import users from '../controllers/uers'


const router=new SMERouter('main-panel')

console.log(users)
console.log(users.issigin)

router.use((req)=>{
    let url=req.url.slice(1)
    $(`#sidebar .nav li[data-url=${url}]`).addClass('active').siblings().removeClass('active')
})

if(users.issigin){
    router.route('/notices',(req,res,next)=>{
        console.log
        res.render('没有权限')
    })
}else{
    router.route('/notices',notice.list)
    router.route('/notices', noticelistView)

}
router.route('/home',home)



router.route('*',(req,res,next)=>{
    res.redirect('/home')
})



export default router