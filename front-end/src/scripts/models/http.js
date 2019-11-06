export default{
    get({url,type='get',data={}}){
        return $.ajax({
            url,
            type,
            data,
            dataType:'json',
            success:(result)=>{
                return result
            }
        })
    }
}