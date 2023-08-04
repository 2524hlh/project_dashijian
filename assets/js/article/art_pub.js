$(function () {
    const layer = layui.layer
    const form = layui.form

    initCate()
    initEditor()

    const $image = $('#coverimg')
    const options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }
    $image.cropper(options)

    $('#chooseCover').on('click', function () {
        $('#coverfile').click()
    })

    $('#coverfile').on('change', function (e) {
        const files = e.target.files
        if (files.length === 0) return
        const imgURL = URL.createObjectURL(files[0])
        $image
            .cropper('destroy')
            .attr('src', imgURL)
            .cropper(options)
    })

    let art_state = '已发布'
    $('#save2').on('click', function () {
        art_state = '草稿'
    })

    $('#form-pub').on('submit', function (e) {
        e.preventDefault()
        const formData = new FormData();
        formData.append('title', $('[name="title"]').val())
        formData.append('cate_id', $('[name="cate"]').find(':selected').attr('id'))
        formData.append('content', $('[name="content"]').val())
        formData.append('state', art_state)
        $image
            .cropper('getCroppedCanvas', {
                width: 400,
                height: 280,
            })
            .toBlob(function (blob) {
                formData.append('cover_img', blob)
                publishArticle(formData)
            })
        
    })
    // const dataURL = $image
    //     .cropper('getCroppedCanvas', {//创建一个Canvas画布
    //         width: 400,
    //         height: 280,
    //     })
    //     .toDataURL('image/png')//将Canvas画布上的内容，转化为base64格式的字符串
    // formData.append('cover_img', dataURL)

    
    function publishArticle(formData) {
        $.ajax({
            method: 'post',
            url: '/my/article/add',
            data: formData,
            // 注意：如果向服务器提交的是 FormData 格式的数据，
            // 必须添加以下两个配置项
            contentType: false,
            processData: false,
            success: function (res) {
                if (res.status !== 0) {return layer.msg(res.message)}
                layer.msg('发布文章成功！')
                // 发布文章成功后，跳转到文章列表页面
                location.href = '/article/art_list.html'
            }
        })
    }
    function initCate() {
        $.ajax({
            type: 'get',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) return layer.msg(res.message)
                const htmlStr = template('tpl-cate', res)
                $('#cate_1').after(htmlStr)
                form.render()//重新渲染
            }
        })
    }
})