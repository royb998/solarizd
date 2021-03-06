define([
    'angular'
], function () {
    return angular.module('filters', [])
    .filter('youtubeTime', function () {
        return function (input) {
            var parts = [],
                seconds = input.match(/\d+S/),
                minutes = input.match(/\d+M/),
                hours = input.match(/\d+H/);

            if (hours) parts.push(hours[0].replace('H', ''));
            if (minutes) parts.push(minutes[0].replace('M', ''));
            if (!minutes) parts.push('00');
            if (!seconds) parts.push('00');
            else if (seconds[0].length === 2) parts.push('0' + seconds[0].replace('S', ''));
            else parts.push(seconds[0].replace('S', ''));

            return parts.join(':');
        };
    })
    .filter('formatTime', function () {
        return function (input) {
            var time = Math.floor(input),
                minutes = Math.floor(time / 60),
                hours = Math.floor(minutes / 60),
                seconds = (time % 60),
                timestr = '';
            
            minutes -= hours * 60;
            if (hours >= 1)
                timestr += hours + ':';

            minutes = minutes.toString().length === 1 ?
                        '0' + minutes :
                        minutes;
            seconds = seconds.toString().length === 1 ?
                        '0' + seconds :
                        seconds;
                            
            timestr += minutes + ':';
            timestr += seconds;
            return timestr;
        };
    })
    .filter('commaNum', function () {
        return function (input) {
            var str = [],
                i;
            for (i = input.length - 1; i >= 0; i--) {
                str.unshift(input.charAt(i));
                if ((i) % 3 === 0) {
                    str.unshift(',');
                }
            }

            return input.replace(/(\d)(?=(\d{3})+$)/g, '$1,');
        };
    })
    .filter('machineRead', function () {
        return function (input) {
            var str = input.toString(),
                lc = str.toLowerCase();
                output = lc.replace(/\s+/g, '-');
            
            return output;
        };
    });
});
