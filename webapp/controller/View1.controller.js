sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (Controller,JSONModel) {
		"use strict";

		return Controller.extend("crudopearation.controller.View1", {
			onInit: function () {
				debugger;
				var oJSONModel = new JSONModel();
				var that = this;

				// that.getOwnerComponent().setModel(oJSONModel,"myModel");
				var sURL = "/sap/opu/odata/sap/ZUABAPTRIAL_SRV/";
				var oModel9 = new sap.ui.model.odata.ODataModel(sURL,true);
				oModel9.read("/dataSet",{
					success:function(data){
						debugger;
					 oJSONModel.setData({
						dataSet:data.results
					   
					 });
					 console.log(data.results);
					 debugger
					 that.getOwnerComponent().setModel(oJSONModel,"myModel");


			},error:function(){
				alert("Error");

			}

		});


			},
			onOpen:function(){
				debugger;
				this.getView().byId("simpleformid").setVisible(true);
				this.getView().byId("loginid1").setVisible(false);
				this.getView().byId("loginid2").setVisible(true);
			},

			onEdit:function(oEvent){
				debugger;
				var id=oEvent.getSource().oParent.mAggregations.cells[0].mProperties.value;
                var name = oEvent.getSource().oParent.mAggregations.cells[1].mProperties.value;
				var Email = oEvent.getSource().oParent.mAggregations.cells[2].mProperties.value;
				var  city = oEvent.getSource().oParent.mAggregations.cells[3].mProperties.value;
				var  num = oEvent.getSource().oParent.mAggregations.cells[4].mProperties.value;

				this.getView().byId("simpleformid").setVisible(true);
				this.getView().byId("loginid1").setVisible(true);
				this.getView().byId("loginid2").setVisible(false);

				this.getView().byId("pid").setValue(id);
				this.getView().byId("name").setValue(name);
				this.getView().byId("emailid").setValue(Email);
				this.getView().byId("cityid").setValue(city);
				this.getView().byId("phonenum").setValue(num);

        },


			onUpdate:function(){
				debugger;
				var id = this.getView().byId("pid").getValue();
				var name = this.getView().byId("name").getValue();
				var email = this.getView().byId("emailid").getValue();
				var city = this.getView().byId("cityid").getValue();
				var num = this.getView().byId("phonenum").getValue();

				
				var payLoad = {
					Empid:id,
					Empname:name,
					Emailid:email,
					City:city,
					Mblnum:num
                }

				var that= this;
              
				var sURL = "/sap/opu/odata/sap/ZUABAPTRIAL_SRV/";
                var  oModel = new sap.ui.model.odata.ODataModel( sURL,true);
				oModel.update("/dataSet('" +  id + "')", payLoad, {
				method: "PUT",
				success: function () {

					
                        alert("Updated successfully")
						that.onInit();
					 

				},
				error: function () {
	            sap.m.MessageBox.error("Not updated.");
				}

			});

			this.getView().byId("simpleformid").setVisible(false);
			this.getView().byId("pid").setValue("");
			this.getView().byId("name").setValue("");
			this.getView().byId("emailid").setValue("");
			this.getView().byId("cityid").setValue("");
			this.getView().byId("phonenum").setValue("");


			},

			onCreate:function(){
				debugger;
				var id1 = this.getView().byId("pid").getValue();
				var name1 = this.getView().byId("name").getValue();
				var email1 = this.getView().byId("emailid").getValue();
				var city1 = this.getView().byId("cityid").getValue();
				var num1 = this.getView().byId("phonenum").getValue();

				if(id1 =="" &&  name1== "" &&  email1 =="" &&  city1=="" && num1==""  ){
					alert("Please Enter All Fields");

				}else{

				

				var payLoad = {
					Empid:id1,
					Empname:name1,
					Emailid:email1,
					City:city1,
					Mblnum:num1
                }

				var oModel = this.getOwnerComponent().getModel();
                var that = this
                oModel.create('/dataSet', payLoad,{
                    method:"POST",
                    success:function(oData){
                   
					 alert("New Data Has been Created")
					 that.onInit();
                     
                     
                     

                    },
                    error:function(){
                        console.log("Error");
                        // sap.m.MessageBox.error("New Entry Not Created");
						alert("New Entry Not Created")
                    }
                });

				// this.getView().byId("loginid1").setVisible(true);
				this.getView().byId("simpleformid").setVisible(false);
				this.byId("tableid").getBinding("items").refresh();

				this.getView().byId("pid").setValue("");
				this.getView().byId("name").setValue("");
			    this.getView().byId("emailid").setValue("");
				this.getView().byId("cityid").setValue("");
				this.getView().byId("phonenum").setValue("");

			}


			},

			onCancel:function(){
				debugger;
				this.getView().byId("simpleformid").setVisible(false);

			},

			

			onDelete:function(oEvent){
				debugger;
				var id=oEvent.getSource().oParent.mAggregations.cells[0].mProperties.value;
				var oModel = this.getOwnerComponent().getModel();
				var that = this;

				oModel.remove("/dataSet('" + id + "')", {
					method: "DELETE",
					success: function (Response) {
						debugger;
	
						
							sap.m.MessageToast.show("Deleted successfully.");
							
							
							alert("Deleted successfully.")
							that.onInit();
							console.log(Response);
							
						 
	
					},
					error: function () {
						sap.m.MessageBox.error("Not able to delete.");
					}
	
				});
			},

            // onDelete: function (oEvent) {​
			// 	debugger;
			// 	var id=oEvent.getSource().oParent.mAggregations.cells[0].mProperties.value;
			// 	var oModel= this.getOwnerComponent().getModel();
				
			// 	oModel.remove("/dataSet('" + id + "')", {​
			// 	success: function (data) {​
			// 		debugger;
			// 	sap.m.MessageToast.show(" deleted Successfully " + id);
			// 	}​,
			// 	error: function (error) {​
			// 		debugger;
			// 	sap.m.MessageToast.show("  delete Failed  " + id);
			// 	}​
			// 	}​);
				
			// 	}​,
			
			

			


			

			
			// onEdit1: function (oEvent) {​
			// 	debugger;
				


			// 	var id=oEvent.getSource().oParent.mAggregations.cells[0].mProperties.value;
            //     var name = oEvent.getSource().oParent.mAggregations.cells[1].mProperties.value;
			// 	var Email = oEvent.getSource().oParent.mAggregations.cells[2].mProperties.value;
			// 	var  city = oEvent.getSource().oParent.mAggregations.cells[3].mProperties.value;

			// 	var postData = {​
			// 	 Empid : id,
			// 	 Empname :  name,
			// 	 City : city
			// 	}​;
				
			// 	var jModel= this.getOwnerComponent().getModel();

			// 	jModel.update("/dataSet('" + id +"')",postData, {​
			// 	sucess: function (data) {​
			// 		debugger;
			// 	sap.m.MessageToast.show(" updated Successfully" + oemp1);
			// 	}​,
			// 	error: function (error) {​
			// 		debugger;
			// 	sap.m.MessageToast.show("update Failed" + oemp1);
			// 	}​
			// }​);
			// 	}​

		});
	});
