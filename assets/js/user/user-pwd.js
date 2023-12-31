$(function () {
    const form = layui.form
    const layer = layui.layer

    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        rePwd: function (value) {
            if (value !== $('[name="newPwd"]').val()) {
                return '两次密码不一致'
            }
        }
    })

    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        console.log($(this).serialize());
        $.ajax({
            type: 'post',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function (res) {
                console.log(res);
                if (res.status !== 0) return layer.msg('密码修改失败')
                layer.msg('密码修改成功')
                $('.layui-form')[0].reset()
            }
        })
    })
})