function Validation() {
    this.domElement = function (id) {
        return document.getElementById(id);
    };

    this.checkEmpty = function (domInput, id, content, input) {
        const getElementID = this.domElement(id);
        if (domInput) {
            if (domInput === 'Pick') {
                getElementID.innerHTML = content;
                getElementID.style.display = 'block';
                this.changeColor(input, false)
                return false;
            }
            getElementID.innerHTML = '';
            getElementID.style.display = 'none';
            this.changeColor(input, true)
            return true;
        } else {
            getElementID.innerHTML = content;
            getElementID.style.display = 'block';
            this.changeColor(input, false)
            return false;
        }
    };

    this.checkDuplicated = function (username, id, content, DSNV, input) {
        const getElementID = this.domElement(id);

        if (DSNV) {
            const viTri = DSNV.findIndex(item => username === item.username);
            if (viTri !== -1) {
                getElementID.style.display = 'block';
                getElementID.innerHTML = content;
                this.changeColor(input, false)
                return false;
            } else {
                getElementID.style.display = 'none';
                getElementID.innerHTML = '';
                this.changeColor(input, true)
                return true;
            }
        } else {
            return true;
        }
    };

    this.checkName = function (fullName, id, content, input) {
        const getElementID = this.domElement(id);
        const regex = /^[a-zA-Z\s_-àáâãèéêễểềếệìíòóôơớờỡởợõùúưứừửữỳỹđÀÁÂÃÈÉÊẾỀỄỂỆÌÍÒÓÔƠỚỜỞỠỢÕÙÚƯỨỪỬỮỲỸĐ]+$/;
        if (regex.test(fullName)) {
            getElementID.style.display = 'none';
            getElementID.innerHTML = '';
            this.changeColor(input, true)
            return true
        } else {
            getElementID.style.display = 'block';
            getElementID.innerHTML = content;
            this.changeColor(input, false)
            return false;
        }
    }

    this.checkEmail = function (email, id, content, input) {
        const getElementID = this.domElement(id);
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (regex.test(email)) {
            getElementID.style.display = 'none';
            getElementID.innerHTML = '';
            this.changeColor(input, true)
            return true
        } else {
            getElementID.style.display = 'block';
            getElementID.innerHTML = content;
            this.changeColor(input, false)
            return false;
        }
    }

    this.checkPassword = function (password, id, content, input) {
        const getElementID = this.domElement(id);
        const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,16}$/;
        if (regex.test(password)) {
            getElementID.style.display = 'none';
            getElementID.innerHTML = '';
            this.changeColor(input, true)
            return true
        } else {
            getElementID.style.display = 'block';
            getElementID.innerHTML = content;
            this.changeColor(input, false)
            return false;
        }
    }

    this.checkSalary = function (salary, id, content, input) {
        const getElementID = this.domElement(id);
        const regex = /^\d+$/;
        if (regex.test(salary)) {
            getElementID.style.display = 'none';
            getElementID.innerHTML = '';
            this.changeColor(input, true)
            return true
        } else {
            getElementID.style.display = 'block';
            getElementID.innerHTML = content;
            this.changeColor(input, false)
            return false;
        }
    }

    this.checkOnDuty = function (onDuty, id, content, input) {
        const getElementID = this.domElement(id);
        const regex = /^(?:1[6-9]\d|200)$/;
        if (regex.test(onDuty)) {
            getElementID.style.display = 'none';
            getElementID.innerHTML = '';
            this.changeColor(input, true)
            return true
        } else {
            getElementID.style.display = 'block';
            getElementID.innerHTML = content;
            this.changeColor(input, false)
            return false;
        }
    }

    this.checkAvatar = function (avatar, id, content, input) {
        const getElementID = this.domElement(id);
        const regex = /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\\+~#?&//=]{2,256}\.[a-z]{2,6}(\/[-a-zA-Z0-9@:%._\\+~#?&//=]*)?(\?[-a-zA-Z0-9@:%._\\+~#?&//=]*)?$/;
        if (regex.test(avatar)) {
            getElementID.style.display = 'none';
            getElementID.innerHTML = '';
            this.changeColor(input, true)
            return true
        } else {
            getElementID.style.display = 'block';
            getElementID.innerHTML = content;
            this.changeColor(input, false)
            return false;
        }
    }

    this.changeColor = function (input, isValid) {
        const getElementID = this.domElement(input);
        if (getElementID) {
            getElementID.style.borderColor = isValid ? 'green' : 'red';
        }
    };
}