function myChecked() {
    //全选框或者全不选
    $('.todo-main li').length === $('li>label>input:checked').length ?
        $('.todo-footer input').prop('checked', true) :
        $('.todo-footer input').prop('checked', false);

}