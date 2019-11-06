import navView from '../views/nav.art'

import httpModel from '../models/http'

class User{
    constructor(){
        this.issigin=false
        this.username=''
        this.render()
    }

    async render(){
        await this.or()

        let html=navView({
            issigin:this.issigin,
            username:this.username
        })
        $('#nav').html(html)

        if(!this.issigin){
            this.myclick()
        }
               
        $('#login-in').on('click',this.submit.bind(this))
        $('#login-on').on('click',this.submit2.bind(this))

        $('.dropdown-item').on('click',async ()=>{
            let result=await httpModel.get({
                url:'/api/users/siginout'
            })
            if(result.ret){
                location.reload()
            }
        })    
    }

    async submit(){
        
        let data=$('#signup-form').serialize()
        let result=await httpModel.get({
            url:'/api/users/signup',
            type:'post',
            data
        })
        $('#login-in-show').css('display','none')

        this.submitsuccess(result)
    }

    async submit2(){
        let data=$('#signin-form').serialize()
        let result=await httpModel.get({
            url:'/api/users/signin',
            type:'post',
            data
        })
        $('#login-on-show').css('display','none')

        await this.or()

        let html=navView({
            issigin:this.issigin,
            username:this.username
        })
        $('#nav').html(html)

        this.submitsuccess(result)
    }

    myclick(){
        $('#w-in').on('click',function(){
            $('#login-in-show').css('display','block')
        })
        $('#w-on').on('click',function(){
            $('#login-on-show').css('display','block')
        })
    }

    async or(){
        let result=await httpModel.get({
            url: '/api/users/issigin'
        })
        let username=result.data.username
        this.issigin=username?true:false
        this.username=username
        console.log(this.issigin)

    }

    submitsuccess(result){
        alert(result.data.message)
    }
}

export default new User()

