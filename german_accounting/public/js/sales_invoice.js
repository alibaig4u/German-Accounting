frappe.ui.form.on("Sales Invoice", {
	onload: function (frm) {
        frm.set_df_property('tax_category', 'reqd', 1);
	},
});