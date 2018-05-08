angular
    .module('moneyWeb')
    .filter('customSorter', function () {

        function CustomOrder(item, field) {
            if (field == 'status') {
                switch (item[field]) {
                    case 2:
                        return 2;
                    case 1:
                        return 1;
                    case 0:
                        return 3;
                }
            } else {
                return item[field];
            }
        }
        return function (items, field, fieldTwo, reverse) {
            items.sort(function (a, b) {
                itemA = CustomOrder(a, field);
                itemB = CustomOrder(b, field);
                if (itemA == itemB) {
                    return a[fieldTwo] < b[fieldTwo] ? -1 : 1;
                } else {
                    return reverse ? itemB - itemA : itemA - itemB;
                }
            });
            return items;
        };
    });