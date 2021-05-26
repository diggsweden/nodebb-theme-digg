define([], () => {
    "use-strict";
    function isNumeric(str) {
        if (typeof str != "string") {
            return false
        }
        return !isNaN(str) && !isNaN(parseFloat(str))
    }

    return {
        isNumeric: isNumeric
    }
})