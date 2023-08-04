$(function () {
    const layer = layui.layer
    const form = layui.form

    initArtCateList()

    function initArtCateList() {
        $.ajax({
            type: 'get',
            url: '/my/article/cates',
            success: function (res) {
                const htmlStr = template('artcate-table', res)
                $('tbody').html(htmlStr)
            }
        })
    }

    let indexAdd = null
    $('#btnAddCate').on('click', function () {
        indexAdd = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $('#artcate-add').html()
        })
    })

    $('body').on('submit', '#form-add', function (e) {
        e.preventDefault()
        $.ajax({
            type: 'post',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) return layer.msg(res.message)
                initArtCateList()
                layer.msg('添加分类成功')
                layer.close(indexAdd)
            }
        })
    })

    let indexEdit = null
    $('tbody').on('click','.btn-edit',function(){
        indexEdit = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '修改文章分类',
            content: $('#artcate-edit').html()
        })
        const id = $(this).attr('data-id')
        const name = $(this).parent().siblings('#editName').html()
        const alias = $(this).parent().siblings('#editAlias').html()
        form.val('form-edit',{
            id:id,
            name:name,
            alias:alias
        })
    })

    $('body').on('submit', '#form-edit', function (e) {
        e.preventDefault()
        $.ajax({
            type: 'post',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) return layer.msg(res.message)
                initArtCateList()
                layer.msg('修改分类成功')
                layer.close(indexEdit)
            }
        })
    })

    $('tbody').on('click', '.btn-delete', function () {
        const id = $(this).attr('data-id')
        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function (index) {
            $.ajax({
                type: 'get',
                url: '/my/article/deletecate/' + id,
                success: function (res) {
                    if (res.status !== 0) return layer.msg(res.message)
                    initArtCateList()
                    layer.msg('分类删除成功')
                    layer.close(index)
                }
            })
        })
    })
})