var days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];

var bells = [
	{"time_begin":480,"time_end":520,"type":1},
	{"time_begin":520,"time_end":530,"type":0},
	{"time_begin":530,"time_end":570,"type":2},
	{"time_begin":570,"time_end":585,"type":0},
	{"time_begin":585,"time_end":625,"type":3},
	{"time_begin":625,"time_end":640,"type":0},
	{"time_begin":640,"time_end":680,"type":4},
	{"time_begin":680,"time_end":700,"type":0},
	{"time_begin":700,"time_end":740,"type":5},
	{"time_begin":740,"time_end":760,"type":0},
	{"time_begin":760,"time_end":800,"type":6},
	{"time_begin":800,"time_end":810,"type":0},
	{"time_begin":810,"time_end":850,"type":7},
	{"time_begin":850,"time_end":860,"type":0},
	{"time_begin":860,"time_end":900,"type":8},
	{"time_begin":900,"time_end":910,"type":0},
	{"time_begin":910,"time_end":950,"type":9}
];

var housing = document.location.hash === "" ? 1 : document.location.hash.slice(1);
	
$.getJSON('https://cdn.school97.ru/api/bells/list?housing=' + housing, function(data) {
	bells = data;
});

moment.relativeTimeThreshold('ss', 3);
moment.relativeTimeThreshold('s', 40);
moment.relativeTimeThreshold('m', 60);
moment.relativeTimeThreshold('h', 24);
moment.relativeTimeThreshold('d', 25);
moment.relativeTimeThreshold('M', 12);


moment.updateLocale('en', {
    relativeTime : Object
});


moment.updateLocale('en', {
    relativeTime : {
        future: "До окончания: %s",
        past:   "%s назад",
        s  : 'несколько секунд',
        ss : '%d секунд',
        m:  "1 минута",
        mm: "%d минут",
        h:  "1 час",
        hh: "%d часов",
        d:  "1 день",
        dd: "%d день",
        M:  "a month",
        MM: "%d месяц",
        y:  "1 год",
        yy: "%d год"
    }
});


var loadDate = (new Date).getDate();
setInterval(function() {
	var bellItem = -1;
	var date = new Date();
	if(loadDate != date.getDate()) {
		location.reload();
	}
	bells.forEach(bell => {
		if (moment().isAfter([date.getFullYear(), date.getMonth(), date.getDate(), Math.floor(bell.time_begin / 60), bell.time_begin % 60, 00, 000]) && 
			moment().isBefore([date.getFullYear(), date.getMonth(), date.getDate(), Math.floor(bell.time_end / 60), bell.time_end % 60, 00, 000])) bellItem = bell;
		
	});		
	
	$("#day").html(days[moment().weekday()]);
	$("#date").html(moment(date).format('DD.MM.YYYY'));
	$("#hour").html(moment().format('HH'))
	$("#minutes").html(moment().format('mm'));
	if(bellItem == -1) {
		$("#lesson").html("Внеурочное время")
		$("#lesson-time").html("&nbsp;");	
	} else if(bellItem.type == 0) {
		$("#lesson").html("Перемена")
		$("#lesson-time").html(moment([date.getFullYear(), date.getMonth(), date.getDate(), Math.floor(bellItem.time_end / 60), bellItem.time_end % 60, 30, 000]).from(moment()));
	} else {
		$("#lesson").html("Идет " + bellItem.type + " урок");
		$("#lesson-time").html(moment([date.getFullYear(), date.getMonth(), date.getDate(), Math.floor(bellItem.time_end / 60), bellItem.time_end % 60, 30, 000]).from(moment()));
	}

}, 5000)

