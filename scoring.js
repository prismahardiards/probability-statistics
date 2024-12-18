//通常のJPLASで使用(offlineJPLASでは未使用)
function scoring() {
	$("#scoring-res input").each(function () {
		var stm = statement.childNodes[0].nodeValue;
		var idx = ($("input").index(this)) + 1;
		wk = hex_sha256($(this).val() + stm + idx);
		if (wk != $(this).attr("ans")) {
			$(this).css('background-color', 'pink');
		} else {
			$(this).css('background-color', 'white');
		}
	});
}

//ストレージに記録する(「Answer」ボタン)
function newScoring() {

	//统计数据：总题目数、错题数
	let totalNumber = 0;
	let correctAnswers = 0;

	vstr = "";
	$("#scoring-res input").each(function () {
		var stm = statement.childNodes[0].nodeValue;
		var idx = ($("input").index(this)) + 1;

		//flg代表每道题o或x的标志
		var flg = "[x]";

		wk = hex_sha256($(this).val() + stm + idx);
		if (wk != $(this).attr("ans")) {
			$(this).css('background-color', 'pink');
			totalNumber++;
		} else {
			$(this).css('background-color', 'white');
			flg = "[o]";
			totalNumber++;
			correctAnswers++;
		}
		//vstr代表学生的答案+flg
		vstr += (vstr.length == 0) ? "\t" : ",";
		vstr += $(this).val();
		vstr += flg;
	});

	//统计数据：正确率
	let accuracyRate = (correctAnswers / totalNumber) * 100;
	let accuracyRate_string = accuracyRate.toFixed(2) + "%";
	//在vstr的末尾加上正确率，方便之后数据的输出
	vstr += ", Accuracy:";
	vstr += accuracyRate_string;

	//获取答题时刻
	qid = document.getElementById("statement");
	var date = new Date();
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	if (month < 10) {
		month = "0" + month;
	}
	var day = date.getDate();
	if (day < 10) {
		day = "0" + day;
	}
	var hour = date.getHours();
	if (hour < 10) {
		hour = "0" + hour;
	}
	var minute = date.getMinutes();
	if (minute < 10) {
		minute = "0" + minute;
	}
	var second = date.getSeconds();
	if (second < 10) {
		second = "0" + second;
	}
	//kstr代表答题的时刻
	var kstr = qid.innerHTML + "\t" + year + "-" + month + "-" + day + "\ " + hour + ":" + minute + ":" + second;

	//在.txt文件中输出三项数据：时间、每次提交的答题记录、每次提交的正确率
	localStorage.setItem(kstr, vstr);

	//将正答数和正确率输出到前端
	$("#correctAnswers").text(correctAnswers);
	$("#accuracyRate").text(accuracyRate_string);

	//依据正确率改变前端字体颜色
	if (accuracyRate < 60) {
		$("#correctAnswers").css('color', 'red');
		$("#accuracyRate").css('color', 'red');
	}
	else if ((accuracyRate >= 60) && (accuracyRate < 100)) {
		$("#correctAnswers").css('color', 'black');
		$("#accuracyRate").css('color', 'black');
	}
	else {
		$("#correctAnswers").css('color', '#1BBC9B');
		$("#accuracyRate").css('color', '#1BBC9B');
	}
}