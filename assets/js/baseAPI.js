$.ajaxPrefilter(function (options) {
    options.url = 'http://127.0.0.1:3007' + options.url
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
    //无论成功还是失败都会调用complete(ajax请求成功调用success，失败调用error)
    options.complete = function(res){
        if(res.statusText === 'error'){
            localStorage.removeItem('token')
            location.href = 'login.html'
        }
        if(res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败'){
            localStorage.removeItem('token')
            location.href = 'login.html'
        }
    }
})