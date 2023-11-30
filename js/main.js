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
const userData = new DanhSachNhanVien()
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

    isValid = validation.checkEmpty(newUserName, 'tbTKNV', 'Vui lòng nhập tài khoản', 'tknv') && validation.checkDuplicated(newUserName, 'tbTKNV', 'Username đã tồn tại', userData.userList, 'tknv')
    isValid &= validation.checkEmpty(newFullName, 'tbTen', 'Vui lòng nhập họ và tên', 'name') && validation.checkName(newFullName, 'tbTen', 'Tên không thể chứa số và ký tự đặc biệt', 'name')
    isValid &= validation.checkEmpty(newEmail, 'tbEmail', 'Vui lòng nhập email', 'email') && validation.checkEmail(newEmail, 'tbEmail', 'Định dạng Email không đúng', 'email')
    isValid &= validation.checkEmpty(newPassword, 'tbMatKhau', 'Vui lòng nhập mật khẩu', 'password') && validation.checkPassword(newPassword, 'tbMatKhau', 'Mật khẩu phải bao gồm 1 chữ ghi hoa, 1 chữ số, 1 ký tự đặc biệt, tối thiểu 8 ký tự và tối đa 16 ký tự', 'password')
    isValid &= validation.checkEmpty(newValidate, 'tbNgay', 'Vui lòng nhập ngày', 'datepicker')
    isValid &= validation.checkEmpty(newSalary, 'tbLuongCB', 'Vui lòng nhập lương', 'luongCB') && validation.checkSalary(newSalary, 'tbLuongCB', 'Vui lòng chỉ nhập số', 'luongCB')
    isValid &= validation.checkEmpty(newPosition, 'tbChucVu', 'Vui lòng chọn chức vụ', 'chucvu')
    isValid &= validation.checkEmpty(newOnDuty, 'tbGiolam', 'Vui lòng nhập giờ làm việc', 'gioLam') && validation.checkOnDuty(newOnDuty, 'tbGiolam', 'Vui lòng nhập giờ làm từ 160 đến 200', 'gioLam')

    if (isValid) {
        const newUser = new UserList(newFullName, newUserName, newEmail, newPassword, newValidate, newSalary, newPosition, newOnDuty)
        newUser.totalSalary = newUser.calculateSalary()
        newUser.rank = newUser.setRank()
        userData.addUser(newUser)
        setLocalStorage(userData.userList)
        showUI(userData.userList)
        alert(`Đã thêm thành công nhân viên ${newUser.username}`)
        callElement('#btnDong').click()
    }

}
btnAddUser.addEventListener("click", addUserToList)
callElement('#btnDong').addEventListener('click', function () {
    refreshInput('tbTKNV', 'tknv')
    refreshInput('tbTen', 'name')
    refreshInput('tbEmail', 'email')
    refreshInput('tbMatKhau', 'password')
    refreshInput('tbNgay', 'datepicker')
    refreshInput('tbLuongCB', 'luongCB')
    refreshInput('tbChucVu', 'chucvu')
    refreshInput('tbGiolam', 'gioLam')
    callElement('#form_input').reset()
    userFullName.disabled = false
    userName.disabled = false
    userEmail.disabled = false
    userPassword.disabled = false
    userDate.disabled = false
    userSalary.disabled = false
    userPosition.disabled = false
    userOnDuty.disabled = false
})

const refreshInput = (text, border) => {
    document.getElementById(text).style.display = 'none'
    document.getElementById(border).style.borderColor = '#ccc'
}


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
                    <td class="d-flex"> 
                    <button onclick = "removeUser('${user.username}')" class="btn btn-danger mx-1">Xoá</button>
                    <button onclick="checkUser('${user.username}')" class="btn btn-success mx-1" data-toggle="modal" data-target="#myModal">Sửa</button>
                    </td>
                </tr>
            `
    })
    showUserList.innerHTML = str
}

const getLocalStorage = () => {
    if (localStorage.getItem('DSNV')) {
        const DSNV = JSON.parse(localStorage.getItem('DSNV'))
        userData.userList = DSNV
        showUI(DSNV)
    }
}
getLocalStorage()

const removeUser = (user) => {
    userData.userNeedRemove(user)
    alert(`Đã xóa thành công nhân viên ${user}`)
    setLocalStorage(userData.userList)
    showUI(userData.userList)
}

const checkUser = (user) => {
    callElement('#btnThemNV').setAttribute("disabled", true)
    callElement('#btnSuaNV').removeAttribute("disabled", true)
    let listUserLocalStorage = []
    if (localStorage.getItem('DSNV') !== null) {
        listUserLocalStorage = JSON.parse(localStorage.getItem('DSNV'))
    }

    const index = userData.indexUser(user)
    const userNeedEdit = listUserLocalStorage[index]

    userFullName.value = userNeedEdit.fullname
    userName.value = userNeedEdit.username
    userEmail.value = userNeedEdit.email
    userPassword.value = userNeedEdit.password
    userDate.value = userNeedEdit.validate
    userSalary.value = userNeedEdit.salary
    userPosition.value = userNeedEdit.position
    userOnDuty.value = userNeedEdit.onduty

    userFullName.disabled = true
    userName.disabled = true
    userEmail.disabled = true
    userPassword.disabled = false
    userDate.disabled = true
    userSalary.disabled = false
    userPosition.disabled = false
    userOnDuty.disabled = false

    const btnSuaNV = callElement('#btnSuaNV');
    if (!btnSuaNV.onclick) {
        btnSuaNV.onclick = function () {
            const userUpdated = new UserList(
                userFullName.value,
                userName.value,
                userEmail.value,
                userPassword.value,
                userDate.value,
                userSalary.value,
                userPosition.value,
                userOnDuty.value);

            userUpdated.calculateSalary();
            userUpdated.setRank();

            listUserLocalStorage[index] = userUpdated
            localStorage.setItem('DSNV', JSON.stringify(listUserLocalStorage))
            alert(`Đã chỉnh sửa thành công nhân viên ${userUpdated.username}`)
            showUI(listUserLocalStorage)
            callElement('#btnDong').click()
            userFullName.disabled = false
            userName.disabled = false
            userEmail.disabled = false
            userPassword.disabled = false
            userDate.disabled = false
            userSalary.disabled = false
            userPosition.disabled = false
            userOnDuty.disabled = false
        };
    }
}