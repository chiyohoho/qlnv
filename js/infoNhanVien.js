function UserList(fullname, username, email, password, validate, salary, position, onduty, avatar) {
    this.fullname = fullname;
    this.username = username;
    this.email = email;
    this.password = password;
    this.validate = validate;
    this.salary = salary;
    this.position = position;
    this.onduty = onduty;
    this.totalSalary = 0;
    this.rank = "";
    this.avatar = avatar

    this.calculateSalary = function () {
        this.totalSalary = 0;
        if (this.position === "Sếp") {
            this.totalSalary = (this.salary * 2 * this.onduty).toLocaleString('vi-VN', {
                style: 'currency',
                currency: 'VND'
            });
        } else if (this.position === "Trưởng phòng") {
            this.totalSalary = (this.salary * 1.5 * this.onduty).toLocaleString('vi-VN', {
                style: 'currency',
                currency: 'VND'
            });
        } else if (this.position === "Nhân viên") {
            this.totalSalary = (this.salary * this.onduty).toLocaleString('vi-VN', {
                style: 'currency',
                currency: 'VND'
            });
        }
        return this.totalSalary;
    };

    this.setRank = function () {
        this.rank = "";
        if (this.onduty >= 200) {
            this.rank = "Nhân viên ưu tú";
        } else if (this.onduty < 200 && this.onduty >= 160) {
            this.rank = "Nhân viên bình thường";
        } else if (this.onduty < 160) {
            this.rank = "Nhân viên GenZ";
        }
        return this.rank;
    };
}