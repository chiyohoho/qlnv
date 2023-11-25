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

    this.changeColor = function (input, isValid) {
        const getElementID = this.domElement(input);
        if (getElementID) {
            getElementID.style.borderColor = isValid ? 'green' : 'red';
        }
    };
}