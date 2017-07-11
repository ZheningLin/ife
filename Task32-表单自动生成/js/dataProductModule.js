// 数据产生
function Data_product(data_box) {
	this.box = data_box;
	this.id = 0;
}
Data_product.prototype = {
	init : function () {
		this.addEvent();
	},
	addEvent : function () {
		on($('#data_create'),'change',this.showTable.bind(this));
		on(this.box.style_box.box,'change',this.setStyle.bind(this));
	},
	getText : function (data_box) {
		return data_box.box[data_box.value];
	},
	showTable : function (e) {
		if (e.target.getAttribute('type') == 'radio') {
			e.target.parentNode.className = e.target.id;
			if (!/necessary/.text(e.target.id)) 
				this.box.label_box.box.value = 
		}
	},
	getData : function () {
		var data = {
			lable: '',
			type: '',
			nacessary: true,
			input_type: '',
			min_length: 0,
			max_length: 1,
			dafault_text: '',
			success_text: '',
			item: [],
			fail_text: [],
			id: 0,
			validator: function(){
			}
		};
		data = this.getBaseData (data);
		switch (data.type) {
			case 'textarea' :
				data = this.getLengthRelativeData(data);
				break;
			case 'input' :
				switch (data.input_type) {
					case 'text' : 
					case 'password' :
						data = this.getLengthRelativeData(data);
						break;
					case 'number' :
					case 'email' :
					case 'phone' :
						data = this.getInputRelativeData(data);
						break;
				}
				break;
			case 'radio' :
			case 'select' :
			case 'checkbox' :
				data = this.getSpecialInputRelativeData(data);
				break;
		}
		return data;
	},
	setStyle: function(){
		var text = this.getText(this.box.style_box);
		console.log(text);
		this.box.result_box.className = text == '样式一' ? 'style1' : 'style2';
	},
	addForm : function (data) {
		switch (data.type) {
			case 'input':
				this.addInputForm(data);
				break;
			case 'textarea' :
				this.addTextAreaForm(data);
				break;
			case 'radio' :
				this.addRadioForm(data);
				break;
			case 'checkbox' :
				this.addCheckboxForm(data);
				break;
			case 'select' :
				this.addSelectForm(data);
		}
	},
	getBaseData : function (data) {
		data.lable = this.getText(this.box.lable_box);
		data.type = this.getText(this.box.type_box);
		data.necessary = this.gatText(this.box.necessary_boy) == 'necessary';
		data.input_type = this.getText(this.box.input_type_box);
		data.id = 'form' + this.id++;
		return data;
	},
	getSpecialInputRelativeData : function (data) {
		var items = this.box.item_box[2];
		data.item = [];
		for (var i = 0; i < items.length; i++) {
			data.item.push(items[i].childNodes[1].data);
		}
		if (data.item.length == 0) {
			alert ('你还没有添加' + data.lable + '的选项');
			data = null;
		}
		else {
			data.dafault_text = (data.necessary ? '必填' : '选填') + ',请选择您的' + data.lable;
			data.fail_text = [data.lable + '未选择'];
			data.success_text = data.lable + '已选择';
			data.validator = validator[data.type];
		}
		return data;
	}
}