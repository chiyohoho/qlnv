function UserList(fullname, username, email, password, validate, salary, position, onduty) {
    this.fullname = fullname
    this.username = username
    this.email = email
    this.password = password
    this.validate = validate
    this.salary = salary
    this.position = position
    this.onduty = onduty
    this.totalSalary = 0
    this.rank = ""
    this.calculateSalary = function () {
        this.calculate = 0;
        if (this.position === "Sếp") {
            this.calculate = (this.salary * 2 * this.onduty).toLocaleString('vi-VN', {
                style: 'currency',
                currency: 'VND'
            });
        } else if (this.position === "Trưởng phòng") {
            this.calculate = (this.salary * 1.5 * this.onduty).toLocaleString('vi-VN', {
                style: 'currency',
                currency: 'VND'
            });
        } else if (this.position === "Nhân viên") {
            this.calculate = (this.salary * this.onduty).toLocaleString('vi-VN', {
                style: 'currency',
                currency: 'VND'
            });
        }
        return this.calculate;
    };
    this.setRank = function () {
        this.sort = ""
        if (this.onduty >= 200) {
            this.sort = "Nhân viên ưu tú"
        } else if (this.onduty < 200) {
            this.sort = "Nhân viên bình thường"
        } else if (this.onduty < 160) {
            this.sort = "Nhân viên GenZ"
        }
        return this.sort
    }
}