# generator-shivermetimbers
Builds a WordPress starter theme for use with ACF Pro and Timber plus has SASS preprocessing and Javascript linting, concatenation, and minification.

The latest version includes installing of ACF Pro and Timber that don't update, so it may be necessary to update them.

The latest version also includes a couple configuration options for installed dependencies:

* Install Bootstrap 4 dependencies
* Install Foundation Sites 6 dependencies
* Install jQuery dependencies
* Install no dependencies

## How to use

Type `yo shivermetimbers` and you should be prompted for most of the settings.  This is just used in-house at the moment so if your setup varies from mine, it may not work, and feel free to let me know and I'll try to take a look.  My versions are the following:

* node v10.13.0
* npm v6.4.1
* yo v2.0.5

## To Do

* Implement testing
* Implement copying of variables file for Bootstrap and proper set up
* Implement copying of settings file for Foundation Sites and proper set up
* Use optimized functions.php for Timber that strips unnecessary emoticons and demo code etc. (maybe as an option)
* Replace "TimberSite" in functions PHP with a safe theme name
* Update screenshot
