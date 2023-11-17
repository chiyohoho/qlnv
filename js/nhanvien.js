const callElement = id => { return document.querySelector(id) }
// ------------------------------------------------------------
const userFullName = callElement("#name")
const userName = callElement("#tknv")
const userEmail = callElement("#email")
const userPassword = callElement("#password")
const userDate = callElement("#datepicker")
const userSalary = callElement("#luongCB")
const userPosition = callElement("#chucvu")
const userOnDuty = callElement("#gioLam")

const btnAddUser = callElement("#btnThemNV")
const btnClose = callElement("#btnDong")
const searchUser = callElement("#searchName")

const tbFullName = callElement("#tbTKNV");


function UserList(fullname, username, email, password, validate, salary, position, onduty) {
    this.fullname = fullname
    this.username = username
    this.email = email
    this.password = password
    this.validate = validate
    this.salary = salary
    this.position = position
    this.onduty = onduty
}

const addUserToList = () => {
    let newFullName = userFullName.value
    let newUserName = userName.value
    let newEmail = userEmail.value
    let newPassword = userPassword.value
    let newValidate = userDate.value
    let newSalary = userSalary.value
    let newPosition = userPosition.value
    let newOnDuty = userOnDuty.value

    if (newFullName && newUserName && newEmail && newPassword && newValidate && newSalary && newPosition && newOnDuty) {
        const newUser = new UserList(newFullName, newUserName, newEmail, newPassword, newValidate, newSalary, newPosition, newOnDuty)
        localStorage.setItem("UserList", JSON.stringify(newUser))
        alert("Đã thêm thành công")
        btnAddUser.setAttribute("data-dismiss", "modal")
    } else {
        //Check validate username
        if (newUserName === "") {
            callElement("#tbTKNV").innerHTML = `Không được để trống`
            callElement("#tbTKNV").style.display = `block`
        } else {
            callElement("#tbTKNV").style.display = `none`
        }

        //Check validate fullname
        if (newFullName === "") {
            callElement("#tbTen").innerHTML = `Không được để trống`
            callElement("#tbTen").style.display = `block`
        } else {
            callElement("#tbTen").style.display = `none`
        }

        //Check validate email
        if (newEmail === "") {
            callElement("#tbEmail").innerHTML = `Không được để trống`
            callElement("#tbEmail").style.display = `block`
        } else {
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(newEmail)) {
                callElement("#tbEmail").style.display = `none`
                return (true)
            }
            callElement("#tbEmail").innerHTML = `Định dạng Email không đúng`
            callElement("#tbEmail").style.display = `block`
            return (false)
        }

        //Check validate password
        if (newPassword === "") {
            callElement("#tbMatKhau").innerHTML = `Không được để trống`
            callElement("#tbMatKhau").style.display = `block`
        } else {
            if (newPassword.length < 8) {
                callElement("#tbMatKhau").innerHTML = `Mật khẩu phải có tối thiểu 8 ký tự`
            } else {
                // Kiểm tra các điều kiện của mật khẩu
                let regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/;
                if (!regex.test(newPassword)) {
                    callElement("#tbMatKhau").innerHTML = `Mật khẩu phải bao gồm chữ, số và tối thiểu 1 chữ ghi hoa`
                    callElement("#tbMatKhau").style.display = `block`
                } else {
                    callElement("#tbMatKhau").style.display = `none`
                }
            }
        }

        //Check validate signingdate
        if (newValidate === "") {
            callElement("#tbNgay").innerHTML = `Không được để trống`
            callElement("#tbNgay").style.display = `block`
        } else {
            callElement("#tbNgay").style.display = `none`
        }

        //Check validate salary
        if (newSalary === "") {
            callElement("#tbLuongCB").innerHTML = `Không được để trống`
            callElement("#tbLuongCB").style.display = `block`
        } else {
            callElement("#tbLuongCB").style.display = `none`
        }

        //Check validate position
        if (newPosition == 0) {
            callElement("#tbChucVu").innerHTML = `Vui lòng chọn 1 vị trí`
            callElement("#tbChucVu").style.display = `block`
        } else {
            callElement("#tbChucVu").style.display = `none`
        }

        //Check validate onduty
        if (newOnDuty === "") {
            callElement("#tbGiolam").innerHTML = `Không được để trống`
            callElement("#tbGiolam").style.display = `block`
        } else {
            if (newOnDuty < 40) {
                callElement("#tbGiolam").innerHTML = `Giờ làm việc phải tối thiểu 40 giờ 1 tuần`
                callElement("#tbGiolam").style.display = `block`
            } else {
                callElement("#tbGiolam").style.display = `none`
            }
        }
    }
}
btnAddUser.addEventListener("click", addUserToList)

const showUIofUserList = () => {
    let UserList = JSON.parse(localStorage.getItem("UserList"))
    console.log("check UserList : ", UserList)
}
showUIofUserList()
