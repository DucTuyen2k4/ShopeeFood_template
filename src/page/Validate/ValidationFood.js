export default function Validation(values) {
    const errors = {};

    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,6}$/;
    const name_pattern = /^[\p{L}\s\d\-]+$/u;


    const price_pattern = /^\d+(\.\d{1,2})?$/;
    const quantity_pattern = /^[1-9]\d+$/;
    const detail_pattern = /.*/;
    const phoneNumber_pattern = /^(0[1-9][0-9]{8,9})$/;
 
    // Kiểm tra trường số điện thoại
    if (values.phoneNumber && !phoneNumber_pattern.test(values.phoneNumber)) {
        errors.phoneNumber = "Số điện thoại không hợp lệ.";
    }

    // Kiểm tra trường email
    if (values.email && !email_pattern.test(values.email)) {
        errors.email = "Địa chỉ email không hợp lệ.";
    }

    // Kiểm tra trường tên
    if (!values.name || !name_pattern.test(values.name)) {
        errors.name = "Tên không hợp lệ.";
    }
    // Kiểm tra trường giá
    if (!values.price || !price_pattern.test(values.price)) {
        errors.price = "Giá không hợp lệ.";
    }


    // Kiểm tra trường số lượng
    if (!values.quantity || !quantity_pattern.test(values.quantity)) {
        errors.quantity = "Số lượng không hợp lệ.";
    }

    // Kiểm tra trường chi tiết
    if (!values.detail || !detail_pattern.test(values.detail)) {
        errors.detail = "Chi tiết không hợp lệ.";
    }

    return errors;
}