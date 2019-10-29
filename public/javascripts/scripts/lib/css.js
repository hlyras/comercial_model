const css = {
	displayForm: (form, table) => {
		let productForm = document.getElementById(form);
		let productTable = document.getElementById(table);
		if(productForm.style.display == "none"){
			productForm.style.display = "block";	
			productTable.style.display = "block";	
		} else if(productForm.style.display == "block"){
			productForm.style.display = "none";	
			productTable.style.display = "none";	
		};
	}
};