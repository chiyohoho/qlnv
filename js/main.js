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
const showUserList = callElement("#tableDanhSach")


const addNewUser = new DanhSachNhanVien()
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
        newUser.totalSalary = newUser.calculateSalary()
        newUser.rank = newUser.setRank()
        addNewUser.addUser(newUser)
        console.log("check addNewUser : ", addNewUser.userList)
        showUI(addNewUser.userList)
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

// const showUI = (userData) => {
//     let str = ``
//     userData.map((user) => {
//         str += `
//         <tr>
//                 <td>${user.username}</td>
//                 <td>${user.fullname}</td>
//                 <td>${user.email}</td>
//                 <td>${user.validate}</td>
//                 <td>${user.position}</td>
//                 <td>${user.totalSalary}</td>
//                 <td>${user.rank}</td>
//                 <td class="d-flex"> <button onclick = "xoaNV('${user.taiKhoan}')" class="btn btn-danger mx-1">Xoá</button>
//                  <button onclick = "xemNV('${user.taiKhoan}')" class="btn btn-success mx-1">Xem</button></td>
//             </tr>
//         `
//     })
//     showUserList.innerHTML = str
// }
// showUI()
