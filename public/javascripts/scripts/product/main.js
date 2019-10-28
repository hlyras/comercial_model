var product_array = [];

$(function(){
	$("#product-filter-form").on('submit', (event) => {
		event.preventDefault();
		let btn = $(this);btn.attr('disabled', true);
		let name = document.getElementById("product-filter-form").elements.namedItem('name').value;
		let code = document.getElementById("product-filter-form").elements.namedItem('code').value;
		let color = document.getElementById("product-filter-form").elements.namedItem('color').value;

		$.ajax({
			url: "http://localhost:3000/filter?name="+name+"&code="+code+"&color="+color,
			method: 'get',
			success: (products) => {
				if(products.unauthorized){
					alert(products.unauthorized);
					return window.location.href = '/login';
				};

				let pageSize = 10;
				let page = 0;

				function paging(){
					if(products.length){
						renderProducts(products, pageSize, page);
					} else {
						clearProductTable(products.location);
					};
				};

				btn.attr('disabled', false);

				function buttonsPaging(){
					$('#productNext').prop('disabled', products.length <= pageSize || page >= products.length / pageSize - 1);
					$('#productPrevious').prop('disabled', products.length <= pageSize || page == 0);
				};

				$(function(){
				    $('#productNext').click(function(){
				        if(page < products.length / pageSize - 1){
				            page++;
				            paging();
				            buttonsPaging();
				        };
				    });
				    $('#productPrevious').click(function(){
				        if(page > 0){
				            page--;
				            paging();
				            buttonsPaging();
				        };
				    });
				    paging();
				    buttonsPaging();
				});
			}
		});
	});
});

function displayProductFilterForm(form, location){
	css.displayForm(form);
	// productCategoryList(form, location);
	productColorList(form, location);
};

function showProduct(id){
	$.ajax({
		url: 'http://localhost:3000/id/'+id,
		method: 'get',
		success: (product) => {
			if(product.unauthorized){
				alert(product.unauthorized);
				window.location.href = '/login';
				return;
			};

			let html = "";
			html += "<tr>";
			html += "<td>"+product[0].code+"</td>";
			html += "<td>"+product[0].name+"</td>";
			html += "<td>"+product[0].size+"</td>";
			html += "<td>"+product[0].color+"</td>";
			html += "<td><a onclick='hideProduct()'>Esconder</a></td>";
			html += "</tr>";

			document.getElementById('product-show-tbody').innerHTML = html;
			document.getElementById('product-show-box').style.display = 'block';

			if(product[0].images.length){
				productImagePagination(product[0].images, product[0].id);
			} else {
				document.getElementById('product-image-show').innerHTML = "SEM IMAGENS";
				document.getElementById('imagePageNumber').innerHTML = '0';
				document.getElementById('imagePrevious').disabled = true;
				document.getElementById('imageNext').disabled = true;
			};
		}
	});
};