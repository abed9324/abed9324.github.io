var $lineDisplay = $('#lineDisplay');
var $nameDisplay_English = $('#nameDisplay_English');
var $nameDisplay_Hangul = $('#nameDisplay_Hangul');
var $nameDisplay_Location1 = $('#nameDisplay_Location1');
var $nameDisplay_LocationN = $('#nameDisplay_LocationN');
var station_name_hangul_url = "";
var station_name_english_url = "";


var onAnimStartHangulURL = function(e) {
  $('#station_name_hangul_url').prop('href', '');
  $('#station_name_hangul_url').text('');
}

var onAnimEndHangulURL = function(e) {
  $('#station_name_hangul_url').prop('href', station_name_hangul_url);
  $('#station_name_hangul_url').text(station_name_hangul_url);
}

var onAnimStartEnglishURL = function(e) {
  $('#station_name_english_url').prop('href', '');
  $('#station_name_english_url').text('');
}

var onAnimEndEnglishURL = function(e) {
  $('#station_name_english_url').prop('href', station_name_english_url);
  $('#station_name_english_url').text(station_name_english_url);
}


$lineDisplay.flapper({
  width: 32,
  chars_preset: 'alphanum',
  align: 'left',
  timing: 500,
  min_timing: 250
});

$nameDisplay_English.flapper({
  width: 32,
  chars_preset: 'alphanum',
  align: 'left',
  timing: 1000,
  min_timing: 150,
  on_anim_start: onAnimStartEnglishURL,
  on_anim_end: onAnimEndEnglishURL,
});

$nameDisplay_Hangul.flapper({
  width: 32,
  chars_preset: 'alphanum',
  align: 'left',
  timing: 1000,
  min_timing: 150,
  on_anim_start: onAnimStartHangulURL,
  on_anim_end: onAnimEndHangulURL,
});

$nameDisplay_Location1.flapper({
  width: 32,
  chars_preset: 'alphanum',
  align: 'left',
  timing: 1000,
  min_timing: 150,
});

$nameDisplay_LocationN.flapper({
  width: 32,
  chars_preset: 'alphanum',
  align: 'left',
  timing: 1000,
  min_timing: 150,
});




function random(range) {
  return Math.floor(Math.random() * range);
}


async function newpick() {

	const response = await fetch('js/seoul-subway-stations.json');
	const subway_data = await response.json();

	console.log(subway_data);

	var id = random(subway_data.length);	// pick a random station index
	var station = subway_data[id];

	var x = { line: station.subway_line, 
		station_name_english_url: station.station_name_english_url,
		station_name_hangul_url: station.station_name_hangul_url,
		station_name_english: station.station_name_english,
		station_name_hangul: station.station_name_hangul,
		location_level_1: station.location_level_1,
		location_level_n: station.location_level_n
	};

	console.log(x);

	return x;
}

async function updateDisplay() {
  const result = await newpick();
  station_name_english_url = result.station_name_english_url;
  station_name_hangul_url = result.station_name_hangul_url;
  console.log("updateDisplay: result.line " + result.line);
  console.log("updateDisplay: result.station_name_english " + result.station_name_english);
  console.log("updateDisplay: result.station_name_hangul " + result.station_name_hangul);
  console.log("updateDisplay: result.station_name_english_url " + result.station_name_english_url);
  console.log("updateDisplay: result.station_name_hangul_url " + result.station_name_hangul_url);
  console.log("updateDisplay: result.location_level_1 " + result.location_level_1);
  console.log("updateDisplay: result.location_level_n " + result.location_level_n);

  $('#lineDisplay')
    .val('Line ' + result.line)
    .change();
  $('#nameDisplay_English').val(result.station_name_english).change();
  $('#nameDisplay_Hangul').val(result.station_name_hangul).change();
  $('#nameDisplay_Location1').val(result.location_level_1).change();
  $('#nameDisplay_LocationN').val(result.location_level_n).change();
}
