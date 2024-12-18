function init(){

	$('div.jplas').each(function(){

		$(".sidemenu a").remove();

		var src = "pages\\list.txt";

		if(location.href.split("?").length!=1){

			src = location.href.split("?")[1].split("&")[0];

			if(location.href.split("?")[1].split("&").length!=1){

				src = src+"?"+location.href.split("?")[1].split("&")[1];

			}

		}

		if($(this).attr("src")!= undefined){

			src = $(this).attr("src");

		}

		$(this).text("LOADING ... ("+src+")");

		$(this).load(src, function(data){

			$(this).children('h2').each(function(){

				var $a = $("<a />");

				$a.attr("href","#"+$(this).attr("id"));

				$a.text($(this).text());

				$(".sidemenu").append($a);

			});

			distinction();

		});

	});
}


function compile(){

	$("#modelcode-res").text("TESTING...are you teacher?");

	var src = $("#modelcode").val();
	if(src.length>10){

		$("#modelcode-res").load("teachers/compile.jsp", {code: src});

	}else{

		$("#modelcode-res").text("No ModelCode");

	}
}
function makeRecommend(){

	$('#problemcode').text("Making problem ...");
	if($('#wl').is(':checked')){

		$('#problemcode').text("ss");

	}

	if($('#st').is(':checked')){

		var src = $("#modelcode").val();

		$('#problemcode').load("teachers/question.jsp", {code: src}, function(){

			var s = $('#problemcode').text();

			s = s.substr(5);

			$('#problemcode').text(s);

		});

	}

	if($('#el').is(':checked')){

		$('#problemcode').text("ssee");

	}
}

function toggleView(){

	alert($('#problemcode').val());
}

function scoring(){

	$("#scoring-res input").each(function(){

		if($(this).val() != $(this).attr("ans")){

			$(this).css('background-color', 'pink');

		}else{

			$(this).css('background-color', 'white');

		}

	});

	}

function testcode(){

	$('#testcode-res').text("Compile... UnitTest...");
	var src = $("#modelcode").val();

	var trc = $("#testcode").val();

	if(src.length>10){

		$("#testcode-res").load("teachers/ans.jsp", {code: src, testcode: trc});

	}else{

		$("#testcode-res").text("No ModelCode");

	}
}

function addAsAProblem(){

	$('#addAsAProblem-res').text("Making problem ...");

	var src = $("#modelcode").val();

	$('#addAsAProblem-res').load("teachers/addquestion.jsp", {code: src}, 
function(data){
}
);
}