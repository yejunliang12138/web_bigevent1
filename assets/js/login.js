$(function() {
    //点击“去注册账号”的链接
    $('#link_reg').on('click', function() {
        $('.login-box').hide()
        $('.reg-box').show()
    })

    //点击“去登陆”的链接
    $('#link_login').on('click', function() {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    //从layui中获取form对象
    //因为导入了layui,所以就可以使用layui的form对象
    var form = layui.form
        //在layui网站的弹出层里面的msg提示找到的属性
    var layer = layui.layer
        //通过 form.verify函数自定义校验规则
    form.verify({
        //自定义了一个叫做pwd 校验规则
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位,且不能出现空格'],
        //校验两次密码是否一致的规则
        repwd: function(value) {
            //1.通过形参拿到的是确认密码框中的内容
            //2.还需要拿到密码框中的内容
            //3.然后进行一次等于的判断
            //4.如果判断失败，就return一个提示消息
            var pwd = $('.reg-box [name = password]').val()
            if (pwd !== value) {
                return '两次密码输入不一致！'
            }
        }
    })

    //监听注册表单的提交事件
    $('#form_reg').on('submit', function(e) {
            //1.阻止默认提交行为
            e.preventDefault()
                //2.发起ajax的post请求
            var data = {
                username: $('#form_reg [name="username"]').val(),
                password: $('#form_reg [name=password]').val()
            }
            $.post('http://www.liulongbin.top:3007/api/reguser', data, function(res) {
                if (res.status !== 0) {
                    // return console.log(res.message)
                    return layer.msg(res.message)
                }
                // console.log("注册成功！")
                layer.msg('注册成功，请登录！')
                    //模拟人为的点击事件
                $('#link_login').click()
            })
        })
        //监听登录表带的提交事件
    $('#form_login').submit(function(e) {
        //阻止表单的默认提交行为
        e.preventDefault()
        $.ajax({
            url: "http://www.liulongbin.top:3007/api/login",
            method: 'post',
            //快速获取表单中的数据，serialize就是获取数据的属性
            data: $(this).serialize(),
            success: (function(res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败！')
                }
                layer.msg('登录成功！')
                    // console.log(res.token)
                    //跳转到后台主页
                location.href = "./index.html"
            })
        })
    })
})