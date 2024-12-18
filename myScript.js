//to enable tab
function myFunction(){
var textareas = document.getElementsByName('intext');
var count = textareas.length;
for(var i=0;i<count;i++){
    textareas[i].onkeydown = function(e){
        if(e.keyCode==9 || e.which==9){
            e.preventDefault();    
            var s = this.selectionStart;
            this.value = this.value.substring(0,this.selectionStart) + "    " + this.value.substring(this.selectionEnd);
            this.selectionEnd = s+1; 
	e.preventDefault();
return false;
        }
    }
}
// Get the text field
  var copyText = document.getElementById("myInput");

  // Select the text field
  copyText.select();
  copyText.setSelectionRange(0, 99999); // For mobile devices

   // Copy the text inside the text field
  navigator.clipboard.writeText(copyText.value);

  // Alert the copied text
  alert("Copied the text: " + copyText.value);
}