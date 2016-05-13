// JavaScript Document
window.onload = function() {
 showA();
 showB();
 }
 function showA() {document.getElementById("nav-menu").innerHTML="<a class='btn btn-primary btn-sm dropdown-toggle' type='button' data-toggle='dropdown'>网站导航 <span class='caret'></span></a> <ul class='dropdown-menu'><li><a href='http://carsmart.cn' target=\'_blank\'>车网互联官网</a></li><li><a href='http://autofun.carsmart.cn' target=\'_blank\'>乐乘</a></li><li><a href='http://zc.carsmart.cn' target=\'_blank\'>智乘（即将发布）</a></li><li><a href='http://tripfun.carsmart.cn' target=\'_blank\'>纷乘</a></li><!--li><a href='http://ycb.carsmart.cn' target=\'_blank\'>养车宝</a></li--><li class='menu01'><a href='http://4s.carsmart.cn' target=\'_blank\'>车店通</a></li></ul>";}
 
 function showB() {document.getElementById("nav-cp").innerHTML="<a href='#' class='dropdown-toggle'>产&nbsp;&nbsp;品</a><ul class='dropdown-menu' role='menu'><li><b>个人产品：</b></li><li class='divider'></li><li><a href='http://autofun.carsmart.cn' target=\'_blank\'>乐乘</a></li><li><a href='http://zc.carsmart.cn' target=\'_blank\'>智乘（即将发布）</a></li><li><a href='http://tripfun.carsmart.cn' target=\'_blank\'>纷乘</a></li><!--li><a href='http://ycb.carsmart.cn' target=\'_blank\'>养车宝</a--></li><li><b>行业应用：</b></li><li class='divider'></li><li><a href='http://4s.carsmart.cn' target=\'_blank\'>车店通</a></li><li><b>硬件产品：</b></li><li class='divider'></li><li><a href='http://autofun.carsmart.cn' target=\'_blank\'>乐乘盒子</a></li><li class='menu01'><a href='http://tripfun.carsmart.cn' target=\'_blank\'>纷乘行车记录仪</a></li></ul>";}
