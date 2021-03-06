// 定义showTag构造器
function ShowTag(ipt,box){
	this.arr = [];		//存放数组
	this.box = box;		//显示tag的容器
	this.ipt = ipt;		//输入框
	this.length = 100;	//显示的tag的数目
}
// showTag构造器方法
ShowTag.prototype = {
	//去重
	trim : function(){
		var i = 0,j = 0;
		for (; i < this.arr.length; i++) {
			for (j = i + 1; j < this.arr.length; j++) {
				if (this.arr[i] == this.arr[j]) {
					this.arr.splice(j,1);
					j--;
				}
			}
		}
		while (this.arr.length > this.length) {
			this.arr.shift();
		}
		this.show();
		return this;
	},
	// 显示标签
	show : function(){
		var text = '';
		for (var index = 0;index < this.arr.length;index++) {
			text += '<div data-num = "' + index + '" class="item"><span>点击删除</span>' + this.arr[index] + '</div>';
		}
		this.box.innerHTML = text;
		return this;
	},
	// 将输入的值添加到数组中
	add : function(){
		str = this.ipt.value.split(/[ ,、， \n\t]/);
		for (var i = 0; i < str.length; i++){
			var item = str[i];
			if (item == ''){
			}
			else {
				this.arr.push(item);
			}
		}
		this.trim();
		return this;
	},
	// 点击元素删除
	deleteEvent : function (e) {
		var item = e.target.className == 'item' ? e.target : e.target.parentNode.className == 'item' ? e.target.parentNode : null;
		if (item == null) {
			return 0;
		}
		this.arr.splice(item.getAttribute('data-num'),1);
		this.show();
	},
	getData : function(){
		return this.arr;
	}
};
// 定义TagIpt构造器
function TagIpt (tag_ipt,tag_box) {
	// 调用父类构造器，确保"this" 在调用过程中设置正确
	ShowTag.call(this,tag_ipt,tag_box);
}
// 建立一个继承ShowTag.prototype 的TagIpt.prototype对象
TagIpt.prototype = Object.create(ShowTag.prototype);
// 设置"constructor"属性指向Student
TagIpt.prototype.constructor = ShowTag;
TagIpt.prototype.init = function () {
	on(this.box, 'click', this.deleteEvent.bind(this));
	on(this.ipt, 'click', this.keyUp.bind(this));
	on(this.ipt, 'keydown', this.preventDefault);
};
TagIpt.prototype.keyUp = function (e){
	if (e.keyCode == 188 || e.keyCode == 32 || e.keyCode =='13') {
		this.add();
		this.ipt.value = '';
	}
};
TagIpt.prototype.preventDefault = function (e) {
	if (e.keyCode == '13') {
		e.preventDefault ? e.preventDefault() : e.returnValue = false;
	}
};