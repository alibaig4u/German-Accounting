// Copyright (c) 2024, phamos.eu and contributors
// For license information, please see license.txt

frappe.ui.form.on('DATEV Export Log', {
	refresh: function(frm) {
		$('a[data-action="clear_attachment"]').remove()
		$('.attachment-row').find(".remove-btn").remove()
	}
});
