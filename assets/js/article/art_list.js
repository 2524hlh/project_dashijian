$(function () {
    const layer = layui.layer
    const form = layui.form
    template.defaults.imports.dataFormat = function (date) {
        function padZero(n) {
            return n > 9 ? n : '0' + n
        }
        const dt = new Date(date)

        const y = dt.getFullYear()
        const m = padZero(dt.getMonth() + 1)
        const d = padZero(dt.getDate())

        const hh = padZero(dt.getHours())
        const mm = padZero(dt.getMinutes())
        const ss = padZero(dt.getSeconds())

        return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
    }
    const q = {
        pagenum: 1,
        pagesize: 2,
        cate_id: '',
        state: '',
        start: 0,
    }

    initArtcileList()
    initArtcileCate()

    //定时器
    let debounceTimer
    $('#form-search').on('submit', function (e) {
        e.preventDefault()
        clearTimeout(debounceTimer)

        debounceTimer = setTimeout(function(){
            const cate_id = $('[name=cate_id]').val()
            const state = $('[name=state]').val()
            q.start = 0
            q.cate_id = cate_id
            q.state = state
            initArtcileList()
        },500)
    })

    $('tbody').on('click', '.btn-delete', function () {
        const len = $('.btn-delete').length
        const id = $(this).attr('data-id')
        layer.confirm('确认删除', { icon: 3, title: '提示' }, function (index) {
            $.ajax({
                type: 'get',
                url: '/my/article/deleteArticle/' + id,
                success: function (res) {
                    if (res.status !== 0) return layer.msg(res.message)
                    layer.close(index)
                    layer.msg('删除文章成功')
                    if (len === 1) {
                        if (q.pagenum > 1) {
                            q.pagenum -= 1
                            q.start = (q.pagenum - 1) * q.pagesize
                        }
                    }
                    initArtcileList()
                }
            })
        })
    })

    function initArtcileList() {
        $.ajax({
            type: 'get',
            url: '/my/article/list',
            data: q,
            success: function (res) {
                if (res.status !== 0) return layer.msg(res.message)
                const htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)
                renderPage(res.total)
            }
        })
    }

    function renderPage(total) {
        layui.use('laypage', function () {
            var laypage = layui.laypage;

            //执行一个laypage实例
            laypage.render({
                //注意，这里的 test1 是 ID，不用加 # 号
                elem: 'pageBox',
                //数据总数，从服务端得到
                count: total,
                limit: q.pagesize,
                limits: [2, 5, 8, 12],
                curr: q.pagenum,
                layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
                jump: function (obj, first) {
                    q.pagenum = obj.curr
                    q.pagesize = obj.limit
                    q.start = (q.pagenum - 1) * q.pagesize
                    if (!first) {
                        initArtcileList()
                    }
                }
            })
        })
    }

    function initArtcileCate() {
        $.ajax({
            type: 'get',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) return layer.msg(res.message)
                const htmlStr = template('tpl-cate', res)
                $('#cate1').after(htmlStr)
                form.render()
            }
        })
    }
})