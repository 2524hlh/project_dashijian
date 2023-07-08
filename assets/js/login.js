$(function () {
    $('#link_reg').on('click', function () {
        $('.loginBox').hide()
        $('.regBox').show()
    })
    $('#link_login').on('click', function () {
        $('.loginBox').show()
        $('.regBox').hide()
    })

    const from = layui.form
    const layer = layui.layer
    from.verify({
        password: [
            /^[\S]{6,12}$/,
            '密码必须6到12位且不能出现空格'
        ],
        repwd: function (value) {
            const pwd = $('.regBox [name=password]').val()
            if (value !== pwd) return '两次密码不一致 '
        }
    })

    $('.form-reg').on('submit', function (e) {
        e.preventDefault()
        const data = { username: $('.regBox [name=username]').val(), password: $('.regBox [name=password]').val() }
        $.post('/api/reguser', data, function (res) {
            layer.msg(res.message)
            console.log(res)
            if (res.status === 0) {
                $('#link_login').click()
            }
        })
    })

    $('.form-login').on('submit',function(e){
        e.preventDefault()
        $.ajax({
            url:'/api/login',
            type:'post',
            data:$(this).serialize(),
            success:function(res){
                layer.msg(res.message)
                if(res.status !== 0) return 
                localStorage.setItem('token',res.token)
                location.href = 'index.html'
            },
        })
    })  
})


