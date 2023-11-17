function Validation() {
    //Các phương thức
    //Kiểm tra input có trống hay ko
    this.checkEmpty = function (inputVal, spanID, message) {
        if (inputVal.trim() == "") {
            //trim : xoá khoảng trắng trước và sau khi nhập
            //Ko hợp lệ
            document.getElementById(spanID).style.display="block";
            document.getElementById(spanID).innerHTML = message;
            return false
        } else {
            //Hợp lệ
            document.getElementById(spanID).innerHTML = "";
            return true;
        }
    }

    this.checkTK = function(inputVal,spanID,message,mang) {
        var isExsit = false;
        isExsit = mang.some(function(sv) {
            return sv.taiKhoan === inputVal.trim();
        })

        if(isExsit) {
            document.getElementById(spanID).style.display="block";
            document.getElementById(spanID).innerHTML = message;
            return false;
        }else {
            document.getElementById(spanID).innerHTML = "";
            return true;
        }
    } 

    this.checkHoTen = function(inputVal,spanID,message) {
        var pattern = new RegExp("^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" + "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" + "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹý\\s]+$");
        if(pattern.test(inputVal)) {
            document.getElementById(spanID).innerHTML = "";
            return true;
        }else {
            document.getElementById(spanID).style.display="block";
            document.getElementById(spanID).innerHTML = message;
            return false;
        }
    }

    this.checkEmail = function(inputVal,spanID,message) {
        var pattern = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
        if(inputVal.match(pattern)) {
            document.getElementById(spanID).innerHTML = "";
            return true;
        }else {
            document.getElementById(spanID).style.display="block";
            document.getElementById(spanID).innerHTML = message;
            return false
        }
    }

    this.checkPass = function(inputVal,spanID,message) {
        var pattern = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,10}$/);
        if(inputVal.match(pattern)) {
            document.getElementById(spanID).innerHTML = "";
            return true;
        }else {
            document.getElementById(spanID).style.display="block";
            document.getElementById(spanID).innerHTML = message;
            return false
        }
    }

    this.checkLuong = function(inputVal,spanID,message) {
        var pattern = new RegExp(/^[0-9]+$/);
        if(inputVal.match(pattern) && inputVal>= 1e+6) {
            document.getElementById(spanID).innerHTML = "";
            return true;
        }else {
            document.getElementById(spanID).style.display="block";
            document.getElementById(spanID).innerHTML = message;
            return false
        }
    }

    this.checkChucVu = function(inputVal,spanID,message) {
        if(inputVal == "Sếp" || inputVal =="Trưởng phòng" || inputVal == "Nhân viên") {
            document.getElementById(spanID).innerHTML = "";
            return true;
        } else {
            document.getElementById(spanID).style.display="block";
            document.getElementById(spanID).innerHTML = message;
            return  false;
        }
    }

    this.checkTime = function(inputVal,spanID,message) {
        var pattern = new RegExp(/^[0-9]+$/);
        if(inputVal.match(pattern) && inputVal >= 80 && inputVal <= 200) {
            document.getElementById(spanID).innerHTML = "";
            return true;
        }else {
            document.getElementById(spanID).style.display="block";
            document.getElementById(spanID).innerHTML = message;
            return false
        }
    }
}