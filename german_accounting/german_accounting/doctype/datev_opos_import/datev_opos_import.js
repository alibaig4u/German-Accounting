// Copyright (c) 2024, phamos.eu and contributors
// For license information, please see license.txt

frappe.ui.form.on("DATEV OPOS Import", {
	setup(frm){
		frappe.realtime.on('update_import_status', function(data) {
			frm.reload_doc();
		});
	},
	refresh(frm) {
		$('.menu-btn-group').remove()
		frm.page.hide_icon_group();


		if (frm.doc.import_file &&
			frm.doc.status !== 'Success' && 
            frm.doc.status !== 'Partial Success' && 
            frm.doc.status !== 'Error'
		) {
			frm.disable_save();
			frm.page.set_primary_action("Start Import", () =>  {
					frm.call("start_import", {
						file_url: frm.doc.import_file,
					});
				});
		}


		if (frm.doc.status.includes("Success")) {
			frm.disable_save();
			frm.add_custom_button(__("Go to Sales Invoice List"), () =>
				frappe.set_route("List", "Sales Invoice")
			);
		}

		if (frm.doc.status.includes("Error")) {
			frm.disable_save();
			frm.page.set_primary_action("Retry", () =>  {
					frm.call("start_import", {
						file_url: frm.doc.import_file,
					});
				});
		}

		if(frm.is_new()){
			let currentDate = new Date();
            let currentYear = currentDate.getFullYear();
            let currentMonthIndex = currentDate.getMonth();

			let monthNames = [
                "January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
            ];

			let currentMonth = monthNames[currentMonthIndex];

            frm.set_value('year', currentYear);
            frm.set_value('month', currentMonth);
		}

		if(!frm.is_new()){
			frm.trigger('set_headline')
		}
	},

	set_headline(frm){
		let message='';
		let indicator='';
	
		if (frm.doc.status === 'Success') {
			message = `Successfully imported.`;
			indicator = 'blue';
		} 
		else if (frm.doc.status === 'Partial Success') {
			message = `Partially imported. Fix the error for unimported rows.`;
			indicator = 'orange';
		}
		
		frm.dashboard.set_headline(message, indicator);
	}
});