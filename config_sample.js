/* Magic Mirror Config Sample
 *
 * By Michael Teeuw http://michaelteeuw.nl
 * MIT Licensed.
 */

var config = {
	port: 8080,

	language: 'fr',
	timeFormat: 24,
	units: 'metric',

	modules: [
		{
			module: 'alert',
		},
		{	
			module: 'trading',
			header: 'TRADING of GZ',
			position: 'bottom_left',
			config: {
	            apiData: 'EURCAD=X',  //Cours de la valeur que vous voulez suivre, voir fichier README pour plus de détail
				apiTimeLenght: '10',  //Période temps disponible : entre 1 et 18 jours.
				refresh: 10, //Temps en minutes
			}
		},
		{
			module: 'clock',
			position: 'top_left'
		},
		{
			module: 'compliments',
			position: 'lower_third'
		},
		{
			module: 'currentweather',
			position: 'top_right',
			config: {
				location: 'LOCATION',
				locationID: 'LOCATION_ID',  //ID from bulk.openweather.org/sample/
				appid: 'API_KEY'
			}
		},
		{
			module: 'weatherforecast',
			position: 'top_right',
			header: 'Weather Forecast',
			config: {
	            location: 'LOCATION',
				locationID: 'LOCATION_ID',  //ID from bulk.openweather.org/sample/
				appid: 'API_KEY'
			}
		},
	]

};

/*************** DO NOT EDIT THE LINE BELOW ***************/
if (typeof module !== 'undefined') {module.exports = config;}
