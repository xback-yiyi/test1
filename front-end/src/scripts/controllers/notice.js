import noticeView from '../views/notice.art'

export const list=(req,res,next)=>{
    res.render(noticeView())
}