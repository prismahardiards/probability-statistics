//変数storageにlocalStorageを格納
var storage = localStorage;


//データをクリアする(「Clear」ボタン)
function cle() {
  localStorage.clear();
  show_result();
}


//「TOP」ボタン
function toTop(){
location.href = "index.html";
}


//「Mail」ボタン
function submission(){
var uid = "";
address = 'offjplas@gmail.com';
  $("#user input").each(function(){
  uid += $(this).val();
}); 
subject = uid + ':氏名';
location.href = 'mailto:' + address + '?subject=' + subject + '&body='+"※件名に学籍番号、氏名を入力し、この部分にテキストエリアの内容をコピーペーストして貼り付け、そのまま送信してください。";
}


//「解答の記録を表示」ボタン
function expression() { //when student clicks show-record button, their answers are shown in textarea
  var result = "";
  var uid = "";
  var hash = "";
  $("#user input").each(function(){
    uid += $(this).val();
    hash =$(this).val() + "\t" + storage.key(0);
  });
  if(uid == "r207clear") {
    cle();
  }
  hashid = hex_sha256(hash);
  //保存されているデータの数だけループ
  for(var i=0; i<localStorage.length; i++){
    //i番目のキーを取得
    var arr = storage.key(i);
    //キーと値をカンマ（, ）区切りのテキストにする
    result += uid + "\t" + arr + "" + localStorage.getItem(arr) + "&#13;";
  }
  //上のループで作成されたテキストを表示する
  if(uid != null && uid.length>0) {
    document.getElementById("show_result").innerHTML =  hashid + "&#13;" + result;
  } else {
    document.getElementById("show_result").innerHTML =  "Fill in Student ID";     //when students do not fill their ID
  }
}


//テキストエリアをクリックすると全選択になる仕組み
function textarea(){
	document.sub.answers.focus();	
	document.sub.answers.select();	
}


//データを保存する(未使用)
function set() {
    var name = document.getElementsByName('pinput');
    console.log(name);
    keyDate = new Date();
    naar = new Array();
    for (var i=0; i<name.length ; i++){
    naar[i] = name[i].value;
    }
    var str1 = naar.toString();
    localStorage.setItem(keyDate,str1);
}


//保存されているデータをリスト表示する(未使用)
function show_result() {
  var result = "";
  //保存されているデータの数だけループ
  for(var i=0; i<localStorage.length; i++){
    //i番目のキーを取得
    var arr = storage.key(i);
    //キーと値をカンマ（, ）区切りのテキストにする
    result += arr + ", " + localStorage.getItem(arr) + "<br>";
  }
  //上のループで作成されたテキストを表示する
  document.getElementById("show_result").innerHTML = result;
}


//テキストを保存
function TextSave() {
	//文字を取得
	var text = document.getElementById("show_result").value;
	var text2 = document.getElementById("nameS").value;
	//ファイル名を取得、デフォルトは「mytext」
	var name = text2;
	
	//テキストファイルを作成
	var blob = new Blob( [text], {type: 'text/plain'} )
	
	//リンクを取得
	var link = document.getElementById('DL_link') 
	//リンクにダウンロードするファイルをセット
	link.href = window.URL.createObjectURL(blob)
	
	//もしダウンロード属性に対応していたら
	if ('download' in link){
		//リンクにダウンロードする名前をセット
		link.download = name + '.txt'
		//リンクをクリックしてダウンロードさせる
		link.click()
	
	//もし対応してなかったら
	} else {
		//メッセージを表示する
		link.textContent = '右クリックから名前を付けて保存してください'
	
	}
}