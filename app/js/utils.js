/**
 * Created by mark on 3/13/2016.
 */
(function (utils) {
    utils.setLocalStorage = function (key,data) {
        localStorage.setItem(key, JSON.stringify(data));
    }

    utils.getLocalStorage = function (key) {
       return JSON.parse(localStorage.getItem(key));
    }
    
    utils.isEmpty= function (val) {
        if (val === undefined)
            return true;

        if (typeof (val) == 'function' || typeof (val) == 'number' || typeof (val) == 'boolean' || Object.prototype.toString.call(val) === '[object Date]')
            return false;

        if (val == null || val.length === 0)        // null or 0 length array
            return true;

        if (typeof (val) == "object") {
            // empty object

            var r = true;

            for (var f in val)
                r = false;

            return r;
        }

        return false;
    }


}(window.utils = window.utils || {}));

