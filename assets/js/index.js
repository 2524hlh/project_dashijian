$(function () {
    getUserInfo()

    const layer = layui.layer
    $('#logout').on('click', function () {
        layer.confirm('是否退出', { icon: 3, title: '提示' }, function (index) {
            localStorage.removeItem('token')
            layer.close(index)
            location.href = 'login.html'
        })
    })
})

function getUserInfo() {
    $.ajax({
        url: '/my/userinfo',
        type: 'get',
        success: function (res) {
            console.log(res.data);
            if (res.status !== 0) return layui.layer.msg(res.message)
            renderAvatar(res.data)
        }
    })
}

function renderAvatar(user) {
    const name = user.nickname || user.username
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    if (user.user_pic === null) {
        $('.layui-nav-img').attr('src', 'assets/images/user.jpg')
    } else {
        $('.layui-nav-img').attr('src', user.user_pic)
    }
}
