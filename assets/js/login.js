$(function () {
    //点击去注册账号的链接
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    $('#link_login').on('click', function () {
        $('.reg-box').hide()
        $('.login-box').show()
    })
    //从layui中获取form对象
    var form = layui.form
    //从layui中获取layer
    var layer = layui.layer
    //通过form.verify()函数自定义校验规则
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        //判断2次密码是否一致的规则
        repwd: function (value) {
            var pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) {
                return '二次密码不一致!'
            }

        }
    })
    //监听注册表单的提交事件
    $('#form_reg').on('submit', function (e) {
        e.preventDefault()
        var data = {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val()
        }
        $.post('/api/reguser', data, function (res) {
            if (res.status !== 0) {
                // return console.log(res.message);
                return layer.msg(res.message)
            }
            layer.msg('注册成功,请登录')
            // 模拟人的点击事件
            $('#link_login').click()
        })
    })
    // 监听登录表单的提交事件
    $('#form_login').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            url: '/api/login',
            method: 'POST',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败!')
                }
                layer.msg('登录成功!')
                localStorage.setItem('token', res.token)
                location.href = '/index.html'
            }
        })
    })
})