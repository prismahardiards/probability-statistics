// 回答状態確認
function statusConfirm() {
    var problem_is_correct = [];
    Object.keys(localStorage).forEach(function (key) {
        problem_id = key.split('\t')[0];
        if (localStorage.getItem(key).includes("[x]")) {
            // 不正解の問題
            if (problem_is_correct[problem_id] == undefined) { // 正解の記録がないを確認
                problem_is_correct[problem_id] = false;
            }
        }
        else {
            // 正解の問題
            problem_is_correct[problem_id] = true;
        }
    });
    return problem_is_correct;
}

// 回答状態によるTableの色を更新と「解答済み」を表示する
function distinction() {
    var problem_is_correct = statusConfirm();
    $('.table.table-bordered.table-hover').removeClass('table-striped');
    $('.table.table-bordered.table-hover tr').each(function () {
        var problem_id = $(this.cells[0]).text().trim();
        $(this).removeClass('bg-success');
        $(this).removeClass('bg-warning');
        if (problem_is_correct[problem_id] == true) {
            $(this).addClass('bg-success');
            $(this.cells[3]).text('Completed');
        }
        else if (problem_is_correct[problem_id] == false) {
            $(this).addClass('bg-warning');
            $(this.cells[3]).text('Tried');
        };
    });
}
//「解答済み」を表示するプログラム
/*function distinction(){
  var result = "";
  var grep = "";
  var grep2 = "";
  var f;
  //保存されているデータの数だけループ
  for(var i=0; i<localStorage.length; i++){
    //i番目のキーを取得
    var arr = storage.key(i);
result += arr+"s";
var grep = result.match(/.*(?=\\t20)/);
var a = grep;
var b= a.toString();
var c = b.slice(-2);
var d = c.replace("s","");
if(d.length==1){
e = "0"+d;
}else{
e = d;
}
var grep2 = grep2 + "p" + e;
$("td#p"+e).text('解答済み');
}
}*/