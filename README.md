# generator-shivermetimbers
Builds a WordPress starter theme for use with ACF Pro and Timber plus has SASS preprocessing and Javascript linting, concatenation, and minification.

The latest version includes installing of ACF Pro and Timber that don't update, so it may be necessary to update them.

The latest version also includes a couple configuration options for installed dependencies:

* Install Bootstrap 4 dependencies
* Install Foundation Sites 6 dependencies
* Install jQuery dependencies
* Install no dependencies

## CHANGELOG/Note about versions

### Or why you may only want to use 0.1.1 and not 2.0.1

Version 2.0.1 was published April 20th, 2020.  It includes some changes to the scaffolding that may not be desireable:

* It installs within the theme ACF Pro (you provide a key during installation for it to work) via Composer.  This may be a hassle and you may not be able to update it without using Composer.
* It installs within the theme Timber via Composer, this may be better than using the plugin but updating may not work.
* Disabled block editor by default because I'm not a fan and I don't have any desire to add support for it to this scaffolding.
* Updated gulpfile and package.json to use sourcemaps and fix error reporting etc.
* Updated functions.php to my latest version.
* Didn't totally clean up what I was working on because......

I've decided to move on from this generator.  I see some people are downloading it and I don't want to ruin it for them by completely changing the structure, which is what I'm going to do now.  Currently, you use this scaffolding on the root directory of a WordPress installation; however, with the improvements I added to install necessary plugins via Composer, I'm going to use a lot of this code in my new "artlyticlamedia-starter-theme" *theme only* scaffolding.  It'll probably be much better in the long run because dependencies on Timber and ACF Pro and disabling the block editor is all handled in the theme as opposed to being more dependent on plugin versions outside of the theme.

Feel free to contact me on github (@davidrhoderick) if you use this scaffolding and want to maintain it.  I'm going to work on the new one and add some new features on it that may be more useful.

## How to use

Type `yo shivermetimbers` and you should be prompted for most of the settings.  This is just used in-house at the moment so if your setup varies from mine, it may not work, and feel free to let me know and I'll try to take a look.  My versions are the following:

* node v10.13.0
* npm v6.4.1
* yo v2.0.5

## To Do

### Which probably won't get done because this project is moving...

* Replace site variables in wp-config.php.
* Implement testing.
* Implement copying of variables file for Bootstrap and proper set up.
* Implement copying of settings file for Foundation Sites and proper set up.
* Update screenshot.
* ~~Add sourcemaps and minified CSS compilation.~~
* ~~Add proper Javascript error handling.~~
* ~~Use optimized functions.php for Timber that strips unnecessary emoticons and demo code etc. (maybe as an option).~~
* ~~Replace "TimberSite" in functions PHP with a safe theme name.~~
