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
        const params = {
            container: document.getElementById('animation'),
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: animationData,
        };
        bodymovin.loadAnimation(params);
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

function menuToggle() {
    var menu = document.getElementById("myTopnav");
    if (menu.className === "topnav") {
        menu.className += " responsive";
    } else {
        menu.className = "topnav";
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


const animationData = { "v": "4.12.0", "fr": 60, "ip": 0, "op": 180, "w": 90, "h": 90, "nm": "basic-thick-loader", "ddd": 0, "assets": [], "layers": [{ "ddd": 0, "ind": 1, "ty": 4, "nm": "Inner", "sr": 1, "ks": { "o": { "a": 0, "k": 100, "ix": 11 }, "r": { "a": 1, "k": [{ "i": { "x": [0.833], "y": [0.833] }, "o": { "x": [0.167], "y": [0.167] }, "n": ["0p833_0p833_0p167_0p167"], "t": 0, "s": [0], "e": [1440] }, { "t": 179 }], "ix": 10 }, "p": { "a": 0, "k": [45, 45, 0], "ix": 2 }, "a": { "a": 0, "k": [45, 45, 0], "ix": 1 }, "s": { "a": 0, "k": [100, 100, 100], "ix": 6 } }, "ao": 0, "shapes": [{ "ty": "gr", "it": [{ "ind": 0, "ty": "sh", "ix": 1, "ks": { "a": 0, "k": { "i": [[16.347, 5.952], [0.519, -1.427], [-1.428, -0.52], [4.913, -13.494], [-1.427, -0.519], [-0.52, 1.427]], "o": [[-1.428, -0.52], [-0.52, 1.427], [13.492, 4.913], [-0.519, 1.426], [1.427, 0.52], [5.951, -16.347]], "v": [[-10.364, -21.01], [-13.889, -19.367], [-12.246, -15.841], [3.289, 17.486], [4.933, 21.01], [8.458, 19.367]], "c": true }, "ix": 2 }, "nm": "Path 1", "mn": "ADBE Vector Shape - Group", "hd": false }, { "ty": "fl", "c": { "a": 0, "k": [0.089134949329, 0.811764705882, 0.718247896082, 1], "ix": 4 }, "o": { "a": 0, "k": 100, "ix": 5 }, "r": 1, "nm": "Fill 1", "mn": "ADBE Vector Graphic - Fill", "hd": false }, { "ty": "tr", "p": { "a": 0, "k": [66.141, 36.41], "ix": 2 }, "a": { "a": 0, "k": [0, 0], "ix": 1 }, "s": { "a": 0, "k": [100, 100], "ix": 3 }, "r": { "a": 0, "k": 0, "ix": 6 }, "o": { "a": 0, "k": 100, "ix": 7 }, "sk": { "a": 0, "k": 0, "ix": 4 }, "sa": { "a": 0, "k": 0, "ix": 5 }, "nm": "Transform" }], "nm": "Group 1", "np": 2, "cix": 2, "ix": 1, "mn": "ADBE Vector Group", "hd": false }], "ip": 0, "op": 180, "st": 0, "bm": 0 }, { "ddd": 0, "ind": 2, "ty": 4, "nm": "Outer", "sr": 1, "ks": { "o": { "a": 0, "k": 100, "ix": 11 }, "r": { "a": 1, "k": [{ "i": { "x": [0.833], "y": [0.833] }, "o": { "x": [0.167], "y": [0.167] }, "n": ["0p833_0p833_0p167_0p167"], "t": 0, "s": [0], "e": [-720] }, { "t": 179 }], "ix": 10 }, "p": { "a": 0, "k": [45, 45, 0], "ix": 2 }, "a": { "a": 0, "k": [45, 45, 0], "ix": 1 }, "s": { "a": 0, "k": [100, 100, 100], "ix": 6 } }, "ao": 0, "shapes": [{ "ty": "gr", "it": [{ "ind": 0, "ty": "sh", "ix": 1, "ks": { "a": 0, "k": { "i": [[22.92, 0], [7.275, -6.287], [0.17, -0.194], [0.016, -0.019], [0, -0.605], [-1.381, 0], [-0.407, 0.285], [0, 0], [-9.363, 0], [0, -20.158], [20.158, 0], [0, 20.158], [-0.137, 1.286], [0, 0], [0, 0.208], [1.381, 0], [0.259, -1.105], [0.019, -0.176], [0.004, -0.041], [0, -1.5], [-22.92, 0], [0, 22.92]], "o": [[-10.369, 0], [-0.221, 0.134], [-0.016, 0.018], [-0.358, 0.432], [0, 1.381], [0.533, 0], [0, 0], [6.461, -5.796], [20.158, 0], [0, 20.158], [-20.158, 0], [0, -1.322], [0, 0], [0.047, -0.192], [0, -1.38], [-1.184, 0], [-0.021, 0.175], [-0.004, 0.04], [-0.155, 1.459], [0, 22.92], [22.92, 0], [0, -22.92]], "v": [[0, -41.5], [-27.117, -31.401], [-27.705, -30.907], [-27.752, -30.85], [-28.333, -29.266], [-25.833, -26.766], [-24.401, -27.221], [-24.36, -27.175], [0, -36.5], [36.5, 0], [0, 36.5], [-36.5, 0], [-36.289, -3.912], [-36.33, -3.917], [-36.25, -4.516], [-38.75, -7.016], [-41.179, -5.085], [-41.246, -4.559], [-41.261, -4.438], [-41.5, 0], [0, 41.5], [41.5, 0]], "c": true }, "ix": 2 }, "nm": "Path 1", "mn": "ADBE Vector Shape - Group", "hd": false }, { "ty": "fl", "c": { "a": 0, "k": [0.702000038297, 0.702000038297, 0.702000038297, 1], "ix": 4 }, "o": { "a": 0, "k": 100, "ix": 5 }, "r": 1, "nm": "Fill 1", "mn": "ADBE Vector Graphic - Fill", "hd": false }, { "ty": "tr", "p": { "a": 0, "k": [45, 45], "ix": 2 }, "a": { "a": 0, "k": [0, 0], "ix": 1 }, "s": { "a": 0, "k": [100, 100], "ix": 3 }, "r": { "a": 0, "k": 0, "ix": 6 }, "o": { "a": 0, "k": 100, "ix": 7 }, "sk": { "a": 0, "k": 0, "ix": 4 }, "sa": { "a": 0, "k": 0, "ix": 5 }, "nm": "Transform" }], "nm": "Group 2", "np": 2, "cix": 2, "ix": 1, "mn": "ADBE Vector Group", "hd": false }], "ip": 0, "op": 180, "st": 0, "bm": 0 }] };