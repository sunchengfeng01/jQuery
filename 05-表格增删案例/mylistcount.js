function listcount() {
    //未选中盒子个数
    var allCount = $('.todo-main li').length
        //选中盒子个数
    var checkedCount = $('li>label>input:checked').length

    $('.todo-footer>span').text(checkedCount + ' / 全部' + allCount)
}