
export default function Validation(values) {
    const errors = {};
    const email_pattern = /^\S+@\S+\.\S{2,6}$/;
    const name_pattern = /^[\p{L}\s\d\-]+$/u;


 


    const phoneNumber_pattern = /^(0[1-9][0-9]{8,9})$/;
    const address_pattern = /.*/; // Mẫu này có thể được điều chỉnh để phù hợp với định dạng địa chỉ cụ thể
    const timeStart_pattern = /^([01]\d|2[0-3]):([0-5]\d)$/; // Matches HH:MM in 24-hour format
    const timeEnd_pattern = /^([01]\d|2[0-3]):([0-5]\d)$/; // Matches HH:MM in 24-hour format
    if (!(values.phoneNumber && phoneNumber_pattern.test(values.phoneNumber))) {
        errors.phoneNumber = "Số điện thoại không hợp lệ.";
    }

    if (!(values.email && email_pattern.test(values.email))) {
        errors.email = "Địa chỉ email không hợp lệ.";
    }

    if (!(values.name && name_pattern.test(values.name))) {
        errors.name = "Tên không hợp lệ.";
    }
    if (!(values.address && address_pattern.test(values.address))) {
        errors.address = "Địa chỉ không hợp lệ.";
    }

    if (!(values.timeStart && timeStart_pattern.test(values.timeStart))) {
        errors.timeStart = "Thời gian bắt đầu không hợp lệ.";
    }

    if (!(values.timeEnd && timeEnd_pattern.test(values.timeEnd))) {
        errors.timeEnd = "Thời gian kết thúc không hợp lệ.";
    }

    return errors;
}