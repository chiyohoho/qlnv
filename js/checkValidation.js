function Validation() {
    this.domElement = function (id) {
        return document.getElementById(id)
    }

    this.checkEmpty = function (domInput, id, content) {
        const getElementID = this.domElement(id)
        if (domInput) {
            getElementID.innerHTML = ''
            getElementID.style.display = 'none'
            return true
        } else {
            getElementID.innerHTML = content
            getElementID.style.display = 'block'
            return false
        }
    }

    this.checkDuplicated = function (username, id, content, DSNV) {
        const getElementID = this.domElement(id)

        if (DSNV) {
            const viTri = DSNV.findIndex(item => username === item.username)
            if (viTri !== -1) {
                getElementID.style.display = 'block'
                getElementID.innerHTML = content
                return false
            } else {
                getElementID.style.display = 'none'
                getElementID.innerHTML = ''
                return true
            }
        } else {
            return true
        }
    }

    this.changeColor = function (isValid, input) {
        const getElementID = this.domElement(input)
        if (isValid) {
            getElementID.style.borderColor = 'green'
            return true
        } else {
            getElementID.style.borderColor = 'else'
            return false
        }

    }

}
