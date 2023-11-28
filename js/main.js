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
        addNewUser.addUser(newUser)
        setLocalStorage(addNewUser.userList)
        showUI(addNewUser.userList)
        alert('Đã thêm thành công')
        document.getElementById('btnThemNV').setAttribute('data-dismiss', 'modal')
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
                    <td class="d-flex"> 
                    <button onclick = "removeUser('${user.username}')" class="btn btn-danger mx-1">Xoá</button>
                    <button onclick="editUser('${user.username}')" class="btn btn-success mx-1" data-toggle="modal" data-target="#editModal">Sửa</button>
                    </td>
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

const removeUser = (user) => {
    if (localStorage.getItem('DSNV')) {
        let DanhSach = JSON.parse(localStorage.getItem('DSNV'))
        let viTri = DanhSach.findIndex(item => user === item.username)
        console.log('check viTri : ', viTri)

        if (viTri !== -1) {
            DanhSach.splice(viTri, 1)
            alert(`Đã xóa thành công nhân viên ${user}`)
            setLocalStorage(DanhSach)
            showUI(DanhSach)
        }
    }
}

const editUser = (user) => {
    if (localStorage.getItem('DSNV')) {
        let DanhSach = JSON.parse(localStorage.getItem('DSNV'))
        let viTri = DanhSach.findIndex(item => user === item.username)

        if (viTri !== -1) {
            let strModal = `
            <div class="modal-dialog">
                <div class="modal-content">
    
                    <header class="head-form mb-0">
                        <h2 id="header-title">Edit thông tin nhân viên</h2>
                    </header>
    
                    <!-- Modal Header -->
                    <!-- 	<div class="modal-header">
                        <h4 class="modal-title" id="modal-title">Modal Heading</h4>
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                    </div> -->
    
                    <!-- Modal body -->
                    <div class="modal-body">
    
                        <form role="form">
    
                            <div class="form-group">
                                <div class="input-group">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text"><i class="fa fa-user"></i></span>
                                    </div>
                                    <input type="text" value="${user}" name="tk" id="edit_tknv" class="form-control input-sm"
                                        placeholder="Tài khoản">
                                </div>
    
                                <span class="sp-thongbao" id="edit_tbTKNV"></span>
                            </div>
    
                            <div class="form-group">
                                <div class="input-group">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text"><i class="fa fa-address-book"></i></span>
                                    </div>
                                    <input type="name" name="name" id="edit_name" class="form-control input-sm"
                                        placeholder="Họ và tên">
                                </div>
                                <span class="sp-thongbao" id="edit_tbTen"></span>
                            </div>
    
                            <div class="form-group">
                                <div class="input-group">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text"><i class="fa fa-envelope"></i></span>
                                    </div>
                                    <input type="email" name="email" id="edit_email" class="form-control input-sm"
                                        placeholder="Email">
                                </div>
    
                                <span class="sp-thongbao" id="edit_tbEmail"></span>
                            </div>
    
                            <div class="form-group">
                                <div class="input-group">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text"><i class="fa fa-key"></i></span>
                                    </div>
                                    <input type="password" name="password" id="edit_password" class="form-control input-sm"
                                        placeholder="Mật khẩu">
                                </div>
                                <span class="sp-thongbao" id="edit_tbMatKhau"></span>
                            </div>
    
                            <div class="form-group">
                                <div class="input-group">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text"><i class="fa fa-calendar"></i></span>
                                    </div>
                                    <input type="text" name="ngaylam" id="datepicker" class="form-control"
                                        placeholder="Ngày ký hợp đồng">
                                </div>
    
                                <span class="sp-thongbao" id="tbNgay"></span>
                            </div>
    
                            <div class="form-group">
                                <div class="input-group">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text"><i class="fa fa-money" aria-hidden="true"></i></span>
                                    </div>
                                    <input type="text" name="luongCB" id="edit_luongCB" class="form-control input-sm"
                                        placeholder="Lương cơ bản">
                                </div>
                                <span class="sp-thongbao" id="edit_tbLuongCB"></span>
                            </div>
                            <div class="form-group">
                                <div class="input-group">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text"><i class="fa fa-briefcase"></i></span>
                                    </div>
                                    <select class="form-control" id="edit_chucvu">
                                        <option selected disabled hidden value="Pick">Chọn chức vụ</option>
                                        <option value="Sếp">Sếp</option>
                                        <option value="Trưởng phòng">Trưởng phòng</option>
                                        <option value="Nhân viên">Nhân viên</option>
                                    </select>
                                </div>
    
                                <span class="sp-thongbao" id="edit_tbChucVu"></span>
                            </div>
                            <div class="form-group">
                                <div class="input-group">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text"><i class="fa fa-clock-o"
                                                aria-hidden="true"></i></span>
                                    </div>
                                    <input type="text" name="gioLam" id="edit_gioLam" class="form-control input-sm"
                                        placeholder="Giờ làm việc">
                                </div>
                                <span class="sp-thongbao" id="edit_tbGiolam"></span>
                            </div>
    
                        </form>
                    </div>
    
                    <!-- Modal footer -->
                    <div class="modal-footer" id="modal-footer">
                        <button id="btnThemNV" type="button" class="btn btn-success">Save</button>
                        <button id="btnDong" type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                    </div>
    
                </div>
            </div>
            `
            callElement('#editModal').innerHTML = strModal
        }
    }
}

