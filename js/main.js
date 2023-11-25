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
const validation = new Validation()
const addNewUser = new DanhSachNhanVien()
validation.changeColor()

const setLocalStorage = (data) => {
    localStorage.setItem('DSNV', JSON.stringify(data))
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

    let isValid = false

    isValid = validation.checkEmpty(newUserName, 'tbTKNV', 'Vui lòng nhập tài khoản', 'tknv') && validation.checkDuplicated(newUserName, 'tbTKNV', 'Username đã tồn tại', addNewUser.userList, 'tknv')
    isValid &= validation.checkEmpty(newFullName, 'tbTen', 'Vui lòng nhập họ và tên')
    isValid &= validation.checkEmpty(newEmail, 'tbEmail', 'Vui lòng nhập email')
    isValid &= validation.checkEmpty(newPassword, 'tbMatKhau', 'Vui lòng nhập mật khẩu')
    isValid &= validation.checkEmpty(newValidate, 'tbNgay', 'Vui lòng nhập ngày')
    isValid &= validation.checkEmpty(newSalary, 'tbLuongCB', 'Vui lòng nhập lương')
    isValid &= validation.checkEmpty(newPosition, 'tbChucVu', 'Vui lòng chọn chức vụ')
    isValid &= validation.checkEmpty(newOnDuty, 'tbGiolam', 'Vui lòng nhập giờ làm việc')

    if (isValid) {
        const newUser = new UserList(newFullName, newUserName, newEmail, newPassword, newValidate, newSalary, newPosition, newOnDuty)
        newUser.totalSalary = newUser.calculateSalary()
        newUser.rank = newUser.setRank()
        addNewUser.addUser(newUser)
        setLocalStorage(addNewUser.userList)
        showUI(addNewUser.userList)
    }

}
btnAddUser.addEventListener("click", addUserToList)

const showUI = (userData) => {
    let str = ``
    userData.map((user) => {
        str += `
            <tr>
                    <td>${user.username}</td>
                    <td>${user.fullname}</td>
                    <td>${user.email}</td>
                    <td>${user.validate}</td>
                    <td>${user.position}</td>
                    <td>${user.totalSalary}</td>
                    <td>${user.rank}</td>
                    <td class="d-flex"> <button onclick = "xoaNV('${user.taiKhoan}')" class="btn btn-danger mx-1">Xoá</button>
                     <button onclick = "xemNV('${user.taiKhoan}')" class="btn btn-success mx-1">Xem</button></td>
                </tr>
            `
    })
    showUserList.innerHTML = str
}


const getLocalStorage = () => {
    if (localStorage.getItem('DSNV')) {
        const DSNV = JSON.parse(localStorage.getItem('DSNV'))
        addNewUser.userList = DSNV
        showUI(DSNV)
    }
}
getLocalStorage()

