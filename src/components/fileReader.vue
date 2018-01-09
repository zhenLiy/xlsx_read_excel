<style type="text/css">
	span{
		display:block;
		padding:10px;
	}
</style>
<template>
	<div>
		<template>
			<!--上传文件模块-->
			<el-upload class="upload-demo" :show-file-list=false action="" drag :before-upload="acceptFile">
			  <i class="el-icon-upload"></i>
			  <div class="el-upload__text">将文件拖到此处，或<em>点击上传。</em></div>
			</el-upload>
		</template>
		<template>
			<!--excel内容展示模块-->
			<span>excel内容列表</span>
			<el-table :data="listTable" border>
			 	<el-table-column label="名字" align="center" prop="name" ></el-table-column>
			 	<el-table-column label="年龄" align="center" prop="age" ></el-table-column>
			 	<el-table-column label="性别" align="center" prop="sex" ></el-table-column>
			 	<el-table-column label="出生日期" align="center" prop="dateOfBirth" ></el-table-column>
			 	<el-table-column label="电话" align="center" prop="tel" ></el-table-column>
			 	<el-table-column label="邮箱" align="center" prop="e_mail" ></el-table-column>
			</el-table>
		</template>
	</div>
</template>
<script>
	import XLSX from 'xlsx';
	export default {
	  name: 'app',
	  data(){
	  	return{
	  		listTable:[] //存放从excel读取的内容
	  	}
	  },
	  methods:{
	  	acceptFile(f){
	  		//获取到文件名最后一个"."的位置
	  		let extStart = f.name.lastIndexOf(".");
	  		//通过未知 获取文件后缀名
	  		let filetype = f.name.substring(extStart, f.name.length).toUpperCase();
	  		//如果后缀名不是 excel文件 提示上传指定文件
	  		if (filetype != ".XLSX" && filetype != ".XLS" ){
 				alert("请上传正确的文件格式");
 				return;
 			}
	  		//格式正确后 开始对文件进行操作
	  		this.handleFile(f);
	  	},
	  	handleFile(f){
	  		if(window.FileReader) {
	  			//如果浏览器支持 创建fileReader
	  			var  reader = new FileReader();
	  		}else{
	  			this.$message.error('你的浏览器不支持fileReader,请升级您的浏览器！');
	  		}
			reader.onload =(e)=>{
				let data = e.target.result,
					//使用XLSL控件 读取文件信息
					workbook = XLSX.read(data, { type: 'binary' }),
					//获取到excel里第一个sheet文件
					sheetName = workbook.SheetNames[0],
					//获取到sheet内容
    				sheet = workbook.Sheets[sheetName];
    				//清空表格
    				this.listTable=[];
    				//开始获取excel内容
    				this.getDate(sheet);
			};
			//将文件读取为二进制码
			reader.readAsBinaryString(f);
	  	},
	  	getDate(sheet){
	  		let colArr=[], //存放A~Z
	  		    name="",  
	  		    age="",
	  		    sex="",
	  		    dateOfBirth="",
	  		    tel="",
	  		    e_mail="";
	  		//将A~Z存放至数组中
  		    for (let col = 65; col <= 90; col++) {
	        	let c = String.fromCharCode(col);
	        	colArr.push(c);
	       	}
  		    //从A1遍历至Z1 当有一个 为空时 遍历停止
		    for(var i=0;;i++){
        		if(sheet[colArr[i]+1]==null){
        			break;
        		}
        		switch (sheet[colArr[i]+1].v){
        			case "name":
        				name=colArr[i];//从excel获取到name字段所在的列 如 name 在excel表内 A列
        				break;
        			case "age":
        				age=colArr[i];//从excel获取到age字段所在的列 如 age 在excel表内 B列
        				break;
        			case "sex":
        				sex=colArr[i];//从excel获取到sex字段所在的列 如 sex 在excel表内 C列
        				break;
        			case "dateOfBirth":
        				dateOfBirth=colArr[i];//从excel获取到dateOfBirth字段所在的列 如 dateOfBirth 在excel表内 D列
        				break;	
        			case "tel":
        				tel=colArr[i];//从excel获取到tel字段所在的列 如 tel 在excel表内 E列
        				break;
        			case "e_mail":
        				e_mail=colArr[i];//从excel获取到e_mail字段所在的列 如 e_mail 在excel表内 F列
        				break;
        			default:
        				break;
        		}
        	}
		    //开始遍历每一行
		    for (var row=2; ;row++) {
        		let obj={};
				//当某一行全部为空时 遍历停止
        		if(sheet[name+row]==null&&sheet[age+row]==null&&sheet[sex+row]==null&&sheet[dateOfBirth+row]==null&&sheet[tel+row]==null&&sheet[e_mail+row]==null){
					break;
				}
        		//获取到该行name字段的值 
	        	obj.name=sheet[name+row].v;
	        	//获取到该行age字段的值
				obj.age=sheet[age+row].v;
				//获取到该行sex字段的值
				obj.sex=sheet[sex+row].v;
				//获取到该行dateOfBirth字段的值
				obj.dateOfBirth=sheet[dateOfBirth+row].v;
				//获取到该行tel字段的值
				obj.tel=sheet[tel+row].v;
				//获取到该行e_mail字段的值
				obj.e_mail=sheet[e_mail+row].v;
				//将赋值后的对象 加入到表格数组里
				this.listTable.push(obj);
        	}
	  	}
	  }
	}
</script>

<style>
</style>