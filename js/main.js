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
const userAvatar = callElement('#avatar')

const btnAddUser = callElement("#btnThemNV")
const btnClose = callElement("#btnDong")
const btnUpdate = callElement('#btnSuaNV')
const searchUserInput = callElement("#searchName")
const searchUserBtn = callElement('#btnTimNV')
const titleModal = callElement('#header-title')
const avatarModal = callElement('#avatar_nv')

const showUserList = callElement("#tableDanhSach")
const validation = new Validation()
const userData = new DanhSachNhanVien()

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
    let newAvatar = userAvatar.value

    let isValid = false

    isValid = validation.checkEmpty(newUserName, 'tbTKNV', 'Vui lòng nhập tài khoản', 'tknv') && validation.checkDuplicated(newUserName, 'tbTKNV', 'Username đã tồn tại', userData.userList, 'tknv')
    isValid &= validation.checkEmpty(newFullName, 'tbTen', 'Vui lòng nhập họ và tên', 'name') && validation.checkName(newFullName, 'tbTen', 'Tên không thể chứa số và ký tự đặc biệt', 'name')
    isValid &= validation.checkEmpty(newEmail, 'tbEmail', 'Vui lòng nhập email', 'email') && validation.checkEmail(newEmail, 'tbEmail', 'Định dạng Email không đúng', 'email')
    isValid &= validation.checkEmpty(newPassword, 'tbMatKhau', 'Vui lòng nhập mật khẩu', 'password') && validation.checkPassword(newPassword, 'tbMatKhau', 'Mật khẩu phải bao gồm 1 chữ ghi hoa, 1 chữ số, 1 ký tự đặc biệt, tối thiểu 8 ký tự và tối đa 16 ký tự', 'password')
    isValid &= validation.checkEmpty(newValidate, 'tbNgay', 'Vui lòng nhập ngày', 'datepicker')
    isValid &= validation.checkEmpty(newSalary, 'tbLuongCB', 'Vui lòng nhập lương', 'luongCB') && validation.checkSalary(newSalary, 'tbLuongCB', 'Vui lòng chỉ nhập số', 'luongCB')
    isValid &= validation.checkEmpty(newPosition, 'tbChucVu', 'Vui lòng chọn chức vụ', 'chucvu')
    isValid &= validation.checkEmpty(newOnDuty, 'tbGiolam', 'Vui lòng nhập giờ làm việc', 'gioLam') && validation.checkOnDuty(newOnDuty, 'tbGiolam', 'Vui lòng nhập giờ làm từ 160 đến 200', 'gioLam')
    isValid &= validation.checkEmpty(newAvatar, 'tbAvatar', 'Vui lòng bổ sung hình ảnh', 'avatar') && validation.checkAvatar(newAvatar, 'tbAvatar', 'Link ảnh không hợp lệ', 'avatar')

    if (isValid) {
        const newUser = new UserList(newFullName, newUserName, newEmail, newPassword, newValidate, newSalary, newPosition, newOnDuty, newAvatar)
        newUser.totalSalary = newUser.calculateSalary()
        newUser.rank = newUser.setRank()
        userData.addUser(newUser)
        setLocalStorage(userData.userList)
        showUI(userData.userList)
        alert(`Đã thêm thành công nhân viên ${newUser.username}`)
        btnClose.click()
    }

}
btnAddUser.addEventListener("click", addUserToList)
btnClose.addEventListener('click', function () {
    refreshInput('tbTKNV', 'tknv')
    refreshInput('tbTen', 'name')
    refreshInput('tbEmail', 'email')
    refreshInput('tbMatKhau', 'password')
    refreshInput('tbNgay', 'datepicker')
    refreshInput('tbLuongCB', 'luongCB')
    refreshInput('tbChucVu', 'chucvu')
    refreshInput('tbGiolam', 'gioLam')
    refreshInput('tbAvatar', 'avatar')
    callElement('#form_input').reset()
    toggleInput(true)
    toggleButton(false)

    callElement('.modal').classList.remove('show')
    callElement('.modal').style.display = 'none'
    titleModal.innerHTML = `Thêm nhân viên`
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
                    <td>
                    <img id="avatar_nv" src="${user.avatar}" alt="" style="width: 40px; height: 40px;">
                    </td>
                    <td style="line-height:40px">${user.username}</td>
                    <td style="line-height:40px">${user.fullname}</td>
                    <td style="line-height:40px">${user.email}</td>
                    <td style="line-height:40px">${user.validate}</td>
                    <td style="line-height:40px">${user.position}</td>
                    <td style="line-height:40px">${user.totalSalary}</td>
                    <td style="line-height:40px">${user.rank}</td>
                    <td class="d-flex"> 
                    <button onclick = "removeUser('${user.username}')" class="btn btn-danger mx-1">Xoá</button>
                    <button onclick="checkUser('${user.username}')" class="btn btn-success mx-1">Sửa</button>
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
    const index = userData.indexUser(user);
    const userList = userData.userList

    if (userList.length > 0) {
        const userNeedEdit = userList[index];
        toggleInput(false, userNeedEdit.position)
        toggleButton(true)

        userFullName.value = userNeedEdit.fullname;
        userName.value = userNeedEdit.username;
        userEmail.value = userNeedEdit.email;
        userPassword.value = userNeedEdit.password;
        userDate.value = userNeedEdit.validate;
        userSalary.value = userNeedEdit.salary;
        userPosition.value = userNeedEdit.position;
        userOnDuty.value = userNeedEdit.onduty;
        userAvatar.value = userNeedEdit.avatar

        titleModal.innerHTML = `Chỉnh sửa nhân viên ${userNeedEdit.username}`
        avatarModal.src = `${userNeedEdit.avatar}`
        avatarModal.style.display = 'block'
        callElement('.modal').classList.add('show')
        callElement('.modal').style.display = 'block'
        btnClose.addEventListener('click', function () {
            avatarModal.style.display = 'none'
            btnClose.click()
        })
    }
}

const editUser = () => {
    const newFullName = userFullName.value
    const newUserName = userName.value
    const newEmail = userEmail.value
    const newPassword = userPassword.value
    const newValidate = userDate.value
    const newSalary = userSalary.value
    const newPosition = userPosition.value
    const newOnDuty = userOnDuty.value
    const newAvatar = userAvatar.value


    let isValid = false
    isValid = validation.checkEmpty(newEmail, 'tbEmail', 'Vui lòng nhập email', 'email') && validation.checkEmail(newEmail, 'tbEmail', 'Định dạng Email không đúng', 'email')
    isValid &= validation.checkEmpty(newPassword, 'tbMatKhau', 'Vui lòng nhập mật khẩu', 'password') && validation.checkPassword(newPassword, 'tbMatKhau', 'Mật khẩu phải bao gồm 1 chữ ghi hoa, 1 chữ số, 1 ký tự đặc biệt, tối thiểu 8 ký tự và tối đa 16 ký tự', 'password')
    isValid &= validation.checkEmpty(newValidate, 'tbNgay', 'Vui lòng nhập ngày', 'datepicker')
    isValid &= validation.checkEmpty(newSalary, 'tbLuongCB', 'Vui lòng nhập lương', 'luongCB') && validation.checkSalary(newSalary, 'tbLuongCB', 'Vui lòng chỉ nhập số', 'luongCB')
    isValid &= validation.checkEmpty(newPosition, 'tbChucVu', 'Vui lòng chọn chức vụ', 'chucvu')
    isValid &= validation.checkEmpty(newOnDuty, 'tbGiolam', 'Vui lòng nhập giờ làm việc', 'gioLam') && validation.checkOnDuty(newOnDuty, 'tbGiolam', 'Vui lòng nhập giờ làm từ 160 đến 200', 'gioLam')
    isValid &= validation.checkEmpty(newAvatar, 'tbAvatar', 'Vui lòng bổ sung hình ảnh', 'avatar') && validation.checkAvatar(newAvatar, 'tbAvatar', 'Link ảnh không hợp lệ', 'avatar')

    if (isValid) {
        userData.indexUser(newUserName);
        const userUpdated = new UserList(newFullName, newUserName, newEmail, newPassword, newValidate, newSalary, newPosition, newOnDuty, newAvatar)
        userUpdated.totalSalary = userUpdated.calculateSalary()
        userUpdated.rank = userUpdated.setRank()
        userData.userUpdate(userUpdated)
        showUI(userData.userList)
        setLocalStorage(userData.userList)
        btnClose.click()
    }
}
btnUpdate.addEventListener('click', editUser)

const toggleInput = (dieuKien, position) => {
    if (dieuKien) {
        userFullName.disabled = false
        userName.disabled = false
        userEmail.disabled = false
        userPassword.disabled = false
        userDate.disabled = false
        userSalary.disabled = false
        userPosition.disabled = false
        userOnDuty.disabled = false

        userFullName.style.cursor = 'initial'
        userName.style.cursor = 'initial'
        userEmail.style.cursor = 'initial'
        userPassword.style.cursor = 'initial'
        userDate.style.cursor = 'initial'
        userPosition.style.cursor = 'initial'
        userSalary.style.cursor = 'initial'
        userOnDuty.style.cursor = 'initial'
    } else {
        if (position === 'Sếp') {
            userFullName.disabled = true
            userName.disabled = true
            userEmail.disabled = false
            userPassword.disabled = false
            userDate.disabled = true
            userSalary.disabled = false
            userPosition.disabled = false
            userOnDuty.disabled = false

            userFullName.style.cursor = 'no-drop'
            userName.style.cursor = 'no-drop'
            userDate.style.cursor = 'no-drop'
        } else if (position === 'Trưởng phòng') {
            userFullName.disabled = true
            userName.disabled = true
            userEmail.disabled = true
            userPassword.disabled = true
            userDate.disabled = true
            userSalary.disabled = false
            userPosition.disabled = true
            userOnDuty.disabled = false

            userFullName.style.cursor = 'no-drop'
            userName.style.cursor = 'no-drop'
            userEmail.style.cursor = 'no-drop'
            userPassword.style.cursor = 'no-drop'
            userDate.style.cursor = 'no-drop'
            userPosition.style.cursor = 'no-drop'
        } else {
            userFullName.disabled = true
            userName.disabled = true
            userEmail.disabled = true
            userPassword.disabled = true
            userDate.disabled = true
            userSalary.disabled = true
            userPosition.disabled = true
            userOnDuty.disabled = true

            userFullName.style.cursor = 'no-drop'
            userName.style.cursor = 'no-drop'
            userEmail.style.cursor = 'no-drop'
            userPassword.style.cursor = 'no-drop'
            userDate.style.cursor = 'no-drop'
            userPosition.style.cursor = 'no-drop'
            userSalary.style.cursor = 'no-drop'
            userOnDuty.style.cursor = 'no-drop'
        }
    }
}

const toggleButton = (dieuKien) => {
    if (dieuKien) {
        callElement('#btnThemNV').setAttribute("disabled", true)
        callElement('#btnSuaNV').removeAttribute("disabled")
    } else {
        callElement('#btnThemNV').removeAttribute("disabled")
        callElement('#btnSuaNV').setAttribute("disabled", true)
    }
}

const searchUser = () => {
    let userSearchContent = searchUserInput.value.toLowerCase();
    let UserList = userData.userList;

    if (userSearchContent !== '') {
        UserList = UserList.filter((user) => {
            return user.username.toLowerCase().includes(userSearchContent);
        });
    }
    showUI(UserList);
};
searchUserBtn.addEventListener('click', searchUser)
searchUserInput.addEventListener('keyup', searchUser)
