/* Module World of GZ */

/* Magic Mirror
 * Module: Trading
 * Version : 1.0
 *
 * By World Of GZ http://www.worldofgz.com
 * MIT Licensed.
 */

Module.register("trading",{

	// Default module config.
	defaults: {
		apiData: "",
		refresh: "",
		apiBase: "http://chartapi.finance.yahoo.com/instrument/1.0/",
		apiDataType: "/chartdata;type=sma;range=",
		apiTimeLenght: "",
		apiFileFormat: "d/json/",

		initialLoadDelay: 0, // 0 seconds delay
		retryDelay: 2500,
		
	},

	// Define required scripts.
	getScripts: function() {
		return ["moment.js"];
	},

	// Define required scripts.
	getStyles: function() {
		return ["trading.css", "https://www.gstatic.com/charts/loader.js", "https://code.jquery.com/jquery-2.2.4.min.js"];
	},

	// Define required translations.
	getTranslations: function() {
		return {
			fr: "translations/fr.json",
			en: "translations/en.json"
		};
	},

	// Define start sequence.
	start: function() {
		Log.info("Starting module: " + this.name);

		// Set locale.
		moment.locale(config.language);

		
		this.loaded = false;
		this.scheduleUpdate(this.config.initialLoadDelay);

		this.updateTimer = null;
		
		google.charts.load('current', {packages: ['corechart', 'line']});
		
		
	},

	// Override dom generator.
	getDom: function() {
		var wrapper = document.createElement("div");
		wrapper.id = "trading_data";
        
        //If data not loaded
		if (!this.loaded) {
			wrapper.innerHTML = this.translate('LOADING');
			wrapper.className = "dimmed light small";
			return wrapper;
		}
		
		return wrapper;
	},

	/* updateTrading(compliments)
	 * Requests new data from yahoo finance.
	 * Calls processTrading on succesfull response.
	 */
	updateTrading: function() {
        //Build URL
		var url = this.config.apiBase + this.config.apiData + this.config.apiDataType + this.config.apiTimeLenght + this.config.apiFileFormat;
		var self = this;
		var retry = true;
		
        //Download json using jquery
		$.ajax({
			url: url,

			// The name of the callback parameter, as specified by the API service
			jsonp: "callback",

			// Tell jQuery we're expecting JSONP
			dataType: "jsonp",

			// Tell YQL what we want and that we want JSON
			data: {
				format: "json"
			},

			// Work with the response
			success: function( response ) {
                //use the json
				self.processTrading(response);
				
                //Flag to true
				this.loaded = true;
				
				if (retry) {
					self.scheduleUpdate((self.loaded) ? -1 : self.config.retryDelay);
				}
				
			},
			
			error: function( response ) {
				//If apiData not set
				if (self.config.apiData === "") {
					$("#trading_data").html(self.translate('errorApiData'));
				}
				//If apiTimeLenght not set
				else if (self.config.apiTimeLenght === "") {
					$("#trading_data").html(self.translate('errorApiTimeLenght'));
				}
				//If refresh not set
				else if (self.config.refresh === "") {
					$("#trading_data").html(self.translate('errorRefresh'));
				}
				else {
				//For other error
				//console.log( response ); // server response
					$("#trading_data").html(self.translate('errorData'));
				}
				retry = false;
			}
		});
		
		
		
	},


	/* processTrading(data)
	 * Uses the received data to set the various values.
	 */
	processTrading: function(dataJson) {
		
		var self = this;
		
		//Make the array of data for google chart format
		var arrayData = new Array(dataJson.series.length);
		for (var i = 0; i < dataJson.series.length; i++) {
			arrayData[i] = new Array(2);
			arrayData[i][0] = new Date(dataJson.series[i].Timestamp*1000);
			arrayData[i][1] = dataJson.series[i].sma;
		}
		
		
		google.charts.setOnLoadCallback(drawChart);
		
        //Draw chart
		function drawChart() {
			
            //Data
			var data = new google.visualization.DataTable();
			data.addColumn('date', self.translate('date'));
			data.addColumn('number', self.translate('number'));
			
			data.addRows(arrayData);
			
			//Options
			var options = {
				title: self.config.apiData + " : " + arrayData[arrayData.length-1][1],
				titlePosition: 'out',
				titleTextStyle: {color: '#AAAAAA', fontSize: '30'},
				legend: { position: 'bottom', textStyle: {color: 'white',} },
				width: 500, 
				height: 240,
				backgroundColor: 'black',
				colors: ['white'],
				hAxis: {textStyle: {color: 'FFFFFF'}},
				vAxis: {textStyle: {color: 'FFFFFF'}},
				chartArea: {left: 50, right: 10}

			};

            //Draw the chart
			var chart = new google.visualization.LineChart(document.getElementById('trading_data'));
			chart.draw(data, options);
		}
		
		this.loaded = true;

	},

	/* scheduleUpdate()
	 * Schedule next update.
	 *
	 * argument delay number - Milliseconds before next update. If empty, this.config.updateInterval is used.
	 */
	scheduleUpdate: function(delay) {
		var nextLoad = this.config.refresh * 60 * 1000;
		
		if (typeof delay !== "undefined" && delay >= 0) {
			nextLoad = delay;
		}
		
		var self = this;
		setTimeout(function() {
			self.updateTrading();
			
		}, nextLoad);
	}

	
	
});
