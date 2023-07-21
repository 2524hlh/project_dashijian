$(function () {
    const layer = layui.layer
    const $image = $('#image')

    const options = {
        //纵横比
        aspectRatio: 1,
        //指定预览区域
        preview: '.img-preview'
    }
    //创建裁剪区域
    $image.cropper(options)

    $('#btnChooseImg').on('click', function () {
        $('#file').click()
    })

    $('#file').on('change', function (e) {
        const filelist = e.target.files
        if (filelist.length === 0) return

        const newImgURL = URL.createObjectURL(filelist[0])

        $image
            .cropper('destroy')//销毁旧的裁剪区域
            .attr('src', newImgURL)//重新设置图片路径
            .cropper(options)//重新初始化裁剪区域
    })

    $('#btnUpload').on('click', function () {
        const dataURL = $image
            .cropper('getCroppedCanvas', {//创建一个Canvas画布
                width: 100,
                height: 100,
            })
            .toDataURL('image/png')//将Canvas画布上的内容，转化为base64格式的字符串
        $.ajax({
            type:'post',
            url:'/my/updateAvatar',
            data:{
                avatar:dataURL,
            },
            success:function(res){
                if(res.status !== 0 )return layer.msg('更新头像失败')
                window.parent.getUserInfo()
            }
        })
    })
})

