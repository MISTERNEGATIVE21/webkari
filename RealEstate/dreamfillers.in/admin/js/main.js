function generateUrl(baseiflds,targetfields){
    const re2 = /[^a-zA-Z0-9 ]/g
    const title =baseiflds; // store the field

    title.addEventListener("input", function() { // on any input 
        document.getElementById(targetfields).value = encodeURIComponent(
        // this.value.replace(/ /g, "-").replace(re1,"") // left out the "-"
        this.value.replace(re2,"").replace(/ /g, "-") // using re 2
        ); // encode after replace
     });
    title.dispatchEvent(new Event('input')); // trigger the change
}



$(document).on('submit','#addmmicrosections', function(e){
	e.preventDefault(0);
	debugger;
	var formData = new FormData(this);

	
	$.ajax({
		url : '__ajax.php?action=addmicrosections',
		type: "POST",
		data: formData,
		dataType: 'json',
		contentType: false,
		cache: false,
		processData: false,
		enctype: 'multipart/form-data',
		success : function(resp){
			var data=JSON.parse(JSON.stringify(resp));
			if(data.status==3){
				$('.errors').remove();
				var keys = Object.keys(data.errors);
				for (let index = 0; index < keys.length; index++) {
				   var keynam=keys[index];
					$('#'+keynam).after('<p class="errors">'+data.errors[keynam]+'<p>');
						if(index==0){
							$('#'+keynam).focus();
						}
				}
				alert(data.message);
	
			}else if(data.status==1){
			
				alert(data.message);
				window.location.reload();

	
			}else{
					window.location.reload();
					alert(data.message);
			}

		}
	});
	
});

function deleteDataFile(tablename,comparename,id,columnname){
	debugger;

	$.ajax({
		url : '__delete_record.php?action=deleteDatafile',
		type : 'POST',
			data : {'tablename' : tablename,'comparename':comparename,'id':id,'columnname':columnname},
		        success : function(resp){
			var data=JSON.parse(resp);
			if(data.status==1){
				alert(data.message);
				window.location.reload();
		
			}else{
				alert(data.message);
			}
		}
	});

}
$(document).ready(function(){
    
$('.loader-icon-head').hide();
});

function viewimage(imgsrc){
    
    $("#viewimage").modal('show');
        $("#view_img").html('<img src="'+imgsrc+'" />');
}

function viewtext(modalheading,text){
   
    $("#viewtext").modal('show');
    $('#viewtext #modal-heading-append').html(modalheading);
        $("#viewtextdata").html(text);
}


// function deleteFileFromServer(tablename,columnname,compareid){
//     $.ajax({
// 		url : '__delete_record.php?action=deleteFileFromServer',
// 		type : 'POST',
// 		data : {'tablename' : tablename,'columnname':columnname,'compareid':compareid},
// 		success : function(resp){
//             console.log(resp);
// 		}
// 	});


// }



function deleteData(tablename,comparename,id){
	let text = "Are your Sure want to delete Records ?";
	if (confirm(text) == true) {
	$.ajax({
		url : '__delete_record.php?action=deleteData',
		type : 'POST',
			data : {'tablename' : tablename,'comparename':comparename,'id':id},
		        success : function(resp){
			var data=JSON.parse(resp);
			if(data.status==1){
				$("#rowid"+data.id).remove();
				
		
			}else{
				alert(data.message);
			}
		}
	});
}

}



function  updatesignlerecord(tablename,column,keyid,value){

    $.ajax({
		url : '__ajax.php?action=updatecolumn',
		type : 'POST',
			data : {'tablename' : tablename,'column':column,'keyid':keyid,'value':value},
		        success : function(resp){
			var data=JSON.parse(resp);
			if(data.status==1){
				// alert(data.message);
				// window.location.reload();
		
			}else{
				alert(data.message);
			}
		}
	});
}

$(document).ready(function(){

    const activeKey = localStorage.getItem('keyAttr')
    console.log('activeKey', activeKey);
    
    if(activeKey){
        $('.navigation ul li a').each(function(index, link){
            console.log('link',link);
            $(this).removeClass('active');
            if($(link).attr('href') == activeKey){
                $(this).addClass('active');
            }    
        })
    }
    console.log('localstorageItem',localStorage.getItem('keyAttr'));
})


$(document).on('click', '.navigation ul li a', function(){

    const hrefAttr = $(this).attr('href')
    localStorage.setItem('keyAttr', hrefAttr)
    // console.log('hrefAttr',hrefAttr);
})


new RichTextEditor(".myeditor");
new RichTextEditor(".myeditor1");



 
function imageValidation(file){
	$(file).next('.errors').remove();
	var fileName=file.value; 
	var idxDot = fileName.lastIndexOf(".") + 1;
	var extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
  
	   if (extFile=="jpg" || extFile=="jpeg" || extFile=="png"){
		  
	    }else{
		alert("Onlye Allowed (jpg, jpg, png)"); file.value="";
		$(file).after('<p class="errors">Invalid File allowed (jpg, jpg, png,webp)</p>');
	    }
  
  
			 const fileSize = file.files[0].size / 1024 / 1024; 
			 if(fileSize > 1)
			 {
			     alert("File size should be less than 1 MB"); file.value="";
			     $(file).after('<p class="errors">File size should be less than 1 MB</p>');
			
			}
}
function imageValidationall(file){
	$(file).next('.errors').remove();
	var fileName=file.value; 
	var idxDot = fileName.lastIndexOf(".") + 1;
	var extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
  
	   if (extFile=="jpg" || extFile=="jpeg" || extFile=="png" || extFile=="avi" || extFile=="mpeg" || extFile=="mp4"){
		  
	    }else{
		alert("Onlye Allowed (jpg, jpg, png, mp4, mpeg, avi)"); file.value="";
		$(file).after('<p class="errors">Invalid File allowed (jpg, jpg, png, mp4, mpeg, avi,webp)</p>');
	    }
  
  
			 const fileSize = file.files[0].size / 5120 / 1024; 
			 if(fileSize > 1)
			 {
			     alert("File size should be less than 5 MB"); file.value="";
			     $(file).after('<p class="errors">File size should be less than 5 MB</p>');
			
			}
}
  

function videoValidation(file){
	$(file).next('.errors').remove();
	var fileName=file.value; 
	var idxDot = fileName.lastIndexOf(".") + 1;
	var extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
  
	   if (extFile=="mpeg" || extFile=="mp4" || extFile=="avi"){
		  
	    }else{
		alert("Onlye Allowed (mp4, mpeg, avi)"); file.value="";
		$(file).after('<p class="errors">Invalid File allowed (mp4, mpeg, avi)</p>');
	    }
  
  
			 const fileSize = file.files[0].size / 10240 / 1024; 
			 if(fileSize > 1)
			 {
			     alert("File size should be less than 5 MB"); file.value="";
			     $(file).after('<p class="errors">File size should be less than 5 MB</p>');
			
			}
}



function pageloader(type){
	if(type=='hide'){
		$(".loader-icon-head").hide();
	}else if(type=='show'){
		$(".loader-icon-head").show();
	}
}