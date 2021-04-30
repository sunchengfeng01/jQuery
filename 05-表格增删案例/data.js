var todolist = [{
        id: 1,
        todoName: '吃饭',
        isDone: true,
    },
    {
        id: 2,
        todoName: '睡觉',
        isDone: true,
    },
    {
        id: 3,
        todoName: '敲代码',
        isDone: false,
    },
]
var str = '<li>\
  <label>\
<input type="checkbox"/>\
<span>xxxxx</span>\
</label>\
  <button class="btn btn-danger">删除</button>\
</li>';
var arrstr = todolist.map(function(item, index) {
    if (item.isDone) {
        return '<li>\
        <label>\
      <input type="checkbox" checked/>\
      <span class="re">' + item.todoName + '</span>\
      </label>\
        <button class="btn btn-danger">删除</button>\
      </li>';
    } else {
        return '<li>\
        <label>\
      <input type="checkbox"/>\
      <span class="">' + item.todoName + '</span>\
      </label>\
        <button class="btn btn-danger">删除</button>\
      </li>';
    }
})
$('.todo-main').html(arrstr.join(''));
listcount()
    //实现添加
$('.todo-header input').on('keyup', function(e) {
        var contai = $(this).val().trim();
        if (e.keyCode === 13) {
            if (contai) {
                $('.todo-main').append('<li>\
        <label>\
      <input type="checkbox"/>\
      <span class="">' + contai + '</span>\
      </label>\
        <button class="btn btn-danger">删除</button>\
      </li>');
                //每次点击清空输入框里面的内容
                this.value = '';

            } else {
                this.value = '';
                return

            }

        }
        myChecked()
        listcount()
    })
    /*
     *
     *点击删除
     *
     */
    // 删除功能
$('.todo-main').on('click', '.btn', function() {
        //jQuery对象是一个维数组；下标丛1开始1       
        if ($('.todo-main>li').length <= 1) {
            //删除
            $('.todo-footer').remove()
            $('.todo-main').remove()
            $('.todo-container').append($('<h1>恭喜你没有任务<h1>'))

        } else {
            //事件委托this就是委托对象
            $(this).parent().remove()
        }
        listcount()
    })
    /*
     *点击选中框改变样式
     *
     *
     */
$('.todo-main').on('click', 'li>label>input', function() {
        /*
         *绑定委托事件问题：点击已经选过之后的的复选盒子不触发  解决方法调试
         *1.debug发现第二次点击复选框(未打钩)没有调用；
         *2.此时目标事件'label>inputchecked',点击事件并没有触发
         *3.所以并没有调用 myChecked()函数
         */
        // 改变字体样式
        if (!$(this).prop('checked')) {
            $(this).next().removeClass('re')
        } else {
            $(this).next().addClass('re')
        }
        //事件委托this就是委托对象
        myChecked()
        listcount()
    })
    /*
     *全选或全不选
     *
     *
     */
$('.todo-footer label>input').click(function() {
        //判断勾选框
        if ($(this).prop('checked')) {
            //全选框取消
            $(this).prop('checked', false)
                //多选框全部选中
            $('.todo-main li input').prop('checked', true)
            $('.todo-main li input').next().addClass('re')
        } else {
            //全选框选上
            $(this).prop('checked', true)
                //全部取消
            $('.todo-main li input').prop('checked', false)
            $('.todo-main li input').next().removeClass('re')
        }
        myChecked()
        listcount()
    })
    /*
     *清除已完成任务
     *
     *
     */
$('.todo-footer').on('click', '.btn-danger', function() {

    //直接绑定事件与上面点击’删除‘实现事件冒泡问题  1.阻止冒泡e.stopPropagation()尝试没成功  2.事件委托
    $('.todo-main li>label>input:checked').parent().parent().remove();
    //判断li个数
    if ($('.todo-main>li').length < 1) {
        //删除ul和footer并添加h1标题
        $('.todo-footer').remove()
        $('.todo-main').remove()
        $('.todo-container').append($('<h1>恭喜你没有任务<h1>'))

    }
    myChecked();
    listcount();
    //函数封装
})