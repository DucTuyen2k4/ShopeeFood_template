export default function ValidationAddress(values) {
    const errors = {};
    const name_pattern = /^(?=.*[a-zA-Z])[\p{L}\s\-]+$/u;
    const contact_pattern = /^(0[1-9][0-9]{8,9})$/;
    const details_pattern = /.*/; // Mẫu này có thể được điều chỉnh để phù hợp với định dạng địa chỉ cụ thể

    if (!values.phoneNumber ) {
        errors.contact = "Số điện thoại không được để trống";
    }
    //  else if (!contact_pattern.test(values.contact)) {
    //     errors.contact = "Số điện thoại không hợp lệ....";
    // } 
    if (!values.nameUser ) {
        errors.name = "Tên không hợp lệ.";
    } 
    // else if (name_pattern.test(values.name)) {
    //     errors.contact = "Tên không hợp lệ...";
    // } 
    if (!(values.address && details_pattern.test(values.details))) {
        errors.details = "Địa chỉ không hợp lệ.";
    }
    return errors;
}
