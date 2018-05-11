const copyText = function (id) {
    let $temp = $("<input>");
    $("body").append($temp);
    $temp.val($(`#${id}`).html().replace(/(<br>|<br\/>|<p>|<\/p>|<strong>|<\/strong>)/img, ' ')).select();
    document.execCommand("copy");
    $temp.remove();
}

let loaderModal = null;

const loader = function () {
    if (loaderModal == null) {
        loaderModal = bootbox.dialog({
            message: '<p style="width:100% ;height:100px;" id="animation"></p>',
            closeButton: false
        });
    }
}

const closeLoader = function () {
    if (loaderModal !== null) {
        loaderModal.modal('hide');
        loaderModal = null;
    }
}
const getTotalDates = (start, end) => {
    try {
        start = new Date(start);
        end = new Date(end);
        let diferrence = Math.floor((end.getTime() - start.getTime()) / 86400000), dates = [];
        for (i = 0; i <= diferrence + 1; i++) {
            dates.push(start.toFormat().split(' ')[0]);
            start.setDate(start.getDate() + 1);
        }
        return dates;
    } catch (error) {
        return [];
    }
}

function setDatePicker(input, options) {
    if (typeof input === 'string') {
        $(`#${input}`).datetimepicker(options);
    } else if (input instanceof Array) {
        input.forEach((inp) => {
            if (typeof inp === 'string') {
                $(`#${inp}`).datetimepicker(options);
            } else {
                throw new TypeError('setDatePicker expects Array of strings');
            }
        });
    } else {
        throw new TypeError('setDatePicker expects string or Array of strings');
    }
}

function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}

Date.prototype.toFormat = function () {
    let month = this.getMonth() + 1,
        year = this.getFullYear(),
        day = this.getDate(),
        hours = this.getHours(),
        minutes = this.getMinutes(),
        seconds = this.getSeconds();
    day = day > 9 ? day : `0${day}`;
    month = month > 9 ? month : `0${month}`;
    hours = hours > 9 ? hours : `0${hours}`;
    minutes = minutes > 9 ? minutes : `0${minutes}`;
    seconds = seconds > 9 ? seconds : `0${seconds}`;
    return (`${day}-${month}-${year} ${hours}:${minutes}:${seconds}`);
};
