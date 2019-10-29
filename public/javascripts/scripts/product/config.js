function productColorList(form, location){
	$.ajax({
		url: '/product/colorList',
		method: 'get',
		success: (response) => {
			var html = "";
			html += "<option value=''>Color</option>";
			response.forEach((color) => {
				html += "<option value='"+color.shortcut+"'>"+color.name+"</option>";
			});
			
			document.getElementById("product-color").innerHTML = html;
		}
	});
};