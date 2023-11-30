function DanhSachNhanVien() {
    this.userList = []
    this.addUser = function (user) {
        this.userList.push(user)
    }

    this.indexUser = function (user) {
        const index = this.userList.findIndex(item => user === item.username)
        return index
    }

    this.userNeedRemove = function (userIndex) {
        const user = this.indexUser(userIndex)
        if (user >= 0) {
            this.userList.splice(user, 1)
        }
    }
}