## Module World of GZ

## 
 * Magic Mirror
 * Module: TRADING
 * Version : 1.0
 *
 * By World Of GZ http://www.worldofgz.com
 * MIT Licensed.
##

##English below

# Description
Ce module affiche les taux de change avec un léger retard, le même que vous retrouvez sur l'app Bourse de votre iPhone...
Il utilise l'API Yahoo finance

# Parent
S'utilise avec le Miroir Magic de MichMich
https://github.com/MichMich/MagicMirror

## Comment utiliser le module

Pour utiliser le module, copiez en premier le dossier 'TRADING' dans le dossier 'Module' du miroir, puis
ajoutez la partie entre {} ci dessous dans le fichier 'config/config.js' :
````javascript
modules: [
		{	
			module: 'trading',
			header: 'TRADING',
			position: 'bottom_left',
			config: {
	            		apiData: '',
				apiTimeLenght: '',
				refresh: 60,
			}
		},
]
````````````````````````````````

## Options de configuration
Les propriétés suivantes peuvent être modifiées :

- apiData
Ceci défini le taux de change affiché dans le graphgique. Recherchez les codes ISO des monnaies ou suivez ce lien
https://fr.wikipedia.org/wiki/Liste_des_monnaies_en_circulation pour personnaliser votre module.

Un taux de change s'écrit comme l'exemple ci-dessous.
Exemple : EURCAD=X
"EUR" : euro (premier cours)
"CAD" : canadian dollar (second cours)
"=X"  : symbolise le taux de change

- apiTimeLenght
Ce paramètre gère la durée à afficher dans le graphique. Elle peut aller de 1 à 18 jours.

- refresh
Il pilote le taux de rafraichissement du graphique en minute. 







# Description
This module displays the exchange rate with a slight delay, the same as on the Stocks exchange app on your iPhone...
It use Yahoo API financial

# Parent
Use with magic mirror of MichMich
https://github.com/MichMich/MagicMirror

## Using the module

To use this module, firt copy 'TRADING' folder in 'Module' folder of MagicMiror, then add it to the modules array in the `config/config.js` file:
````javascript
modules: [
		{	
			module: 'trading',
			header: 'TRADING',
			position: 'bottom_left',
			config: {
	            		apiData: '',
				apiTimeLenght: '',
				refresh: 60,
			}
		},
]
````````````````````````````````

## Configuration options
The following properties can be configured:

- apiData
This will define exchange rate displayed on the graph. See ISO currency code on internet or follow https://fr.wikipedia.org/wiki/Liste_des_monnaies_en_circulation
to personalize your module.

A Exchange rate can be written as example below.
Example : EURCAD=X
"EUR" : euro (first  currency)
"CAD" : canadian dollar (second currency)
"=X"  : rate

- apiTimeLenght
Time range of the graph. Ability to display between 1 and 18 days.

- refresh
Refresh time chart in minute.





























