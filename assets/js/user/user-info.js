$(function(){
    const form = layui.form
    const layer = layui.layer

    form.verify({
        nickname:function(value){
            if(value.length>5){
                return '昵称长度必须在1~6个字符之间'
            }
        }
    })

    initUserInfo()

    $('.layui-form').on('submit',function(e){
        e.preventDefault()
        $.ajax({
            type:'post',
            url:'/my/userinfo',
            data:form.val('formUserInfo'),
            success:function(res){
                if(res.status!==0) return layer.msg('修改用户信息失败')
                layer.msg('更新用户信息成功')
                window.parent.getUserInfo()
            },
        })
    })

    $('#btnReset').on('click',function(e){
        e.preventDefault()
        initUserInfo()
    })

    function initUserInfo(){
        $.ajax({
            type:'get',
            url:'/my/userinfo',
            success:function(res){
                if(res.status!=0) return layer.msg('获取用户信息失败')
                form.val('formUserInfo',res.data)
                // console.log(form.val('formUserInfo'));
            }
        })
    }


})



