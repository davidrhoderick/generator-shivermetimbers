var Generator = require('yeoman-generator'),
    chalk = require('chalk');

module.exports = class extends Generator {
	constructor(args, opts) {
		super(args, opts);
	}

	async prompting() {
    this.answers = await this.prompt([{
      type   : 'input',
      name   : 'themename',
      message: 'Your theme name',
      default: 'Shiver Me Timbers Theme'
    }, {
      type   : 'input',
      name   : 'version',
      message: 'Your theme\'s version',
      default: '1.0.0'
    }, {
      type   : 'input',
      name   : 'repository',
      message: 'Your theme\'s repository',
      default: 'https://github.com/davidrhoderick/shivermetimbers-theme.git' // Default to current folder name
    }, {
      type   : 'input',
      name   : 'author',
      message: 'Your name',
      store  : true
    }, {
      type   : 'input',
      name   : 'email',
      message: 'Your email',
      store  : true
    }, {
      type   : 'input',
      name   : 'license',
      message: 'Your theme\'s license',
      default: 'MIT'
    }, {
      type   : 'confirm',
      name   : 'private',
      message: 'Is this project private?',
      default: true
    }, {
      type   : 'list',
      name   : 'bower',
      message: 'What bower dependencies do you want installed?',
      choices: [{
          name: 'Bootstrap 4',
          value: 'bootstrap'
        }, {
          name: 'jQuery',
          value: 'jquery'
        }, {
          name: 'Foundation Sites 6',
          value: 'foundation'
        }, {
          name: 'None',
          value: 'empty'
        }]
      }, {
      type   : 'input',
      name   : 'acfprokey',
      message: 'Your ACF Pro license key'
    }, {
      type   : 'input',
      name   : 'proxy',
      message: 'Your site\'s proxy server'
    }]);

    this.answers.themesafe = this.answers.themename.replace(/\s+/g, '-').toLowerCase();
    this.answers.functionsafe = this.answers.themename.replace(/\s|[0-9]/g, '');

    switch(this.answers.bower) {
      case 'bootstrap':
        this.answers.installedDependencies = 'Bootstrap 4';
        this.answers.styleSCSS = 'style-bootstrap.scss';
        this.answers.siteJS = 'site-bootstrap.js';
        break;
      case 'jquery':
        this.answers.installedDependencies = 'jQuery';
        this.answers.styleSCSS = 'style-empty.scss';
        this.answers.siteJS = 'site-jquery.js';
        break;
      case 'foundation':
        this.answers.installedDependencies = 'Foundation Sites 6';
        this.answers.styleSCSS = 'style-foundation.scss';
        this.answers.siteJS = 'site-foundation.js';
        break;
      case 'empty':
        this.answers.installedDependencies = 'None';
        this.answers.styleSCSS = 'style-empty.scss';
        this.answers.siteJS = 'site-empty.js';
    }
  }

  writing() {
    this.log(chalk.bold.green('\nCreating ' + ((this.answers.private) ? 'private' : 'public') + ' theme ' + this.answers.themename + 
      '(' + this.answers.repository + ')' +
      ' version ' + this.answers.version +
      ' by ' + this.answers.author + '(' + this.answers.email + ')' +
      ' with the ' + this.answers.license + ' license' +
      ' in folder wp-content/themes/' + this.answers.themesafe +
      ' with the following Bower dependencies installed: ' + this.answers.installedDependencies + '\n'));
  }

  install() {
    var themeDirectory = 'wp-content/themes/' + this.answers.themesafe;
    this.spawnCommandSync('git', ['clone', '-b', 'master', 'https://github.com/davidrhoderick/shivermetimbers-theme.git', themeDirectory]);
    
    this.fs.copyTpl(
      this.templatePath('composer.json'),
      this.destinationPath(themeDirectory + '/composer.json'),
      {
        acfprokey : this.answers.acfprokey
      }
    );

    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath(themeDirectory + '/package.json'),
      {
        name      : this.answers.themesafe,
        version   : this.answers.version,
        repository: this.answers.repository,
        author    : this.answers.author,
        email     : this.answers.email,
        license   : this.answers.license,
        private   : this.answers.private
      }
    );

    this.fs.copyTpl(
      this.templatePath('bower-' + this.answers.bower + '.json'),
      this.destinationPath(themeDirectory + '/bower.json'),
      {
        name      : this.answers.themesafe,
        version   : this.answers.version,
        repository: this.answers.repository,
        author    : this.answers.author,
        email     : this.answers.email,
        license   : this.answers.license,
        private   : this.answers.private
      }
    );

    this.fs.copyTpl(
      this.templatePath('functions.php'),
      this.destinationPath(themeDirectory + '/functions.php'),
      {
        themename   : this.answers.themename,
        version     : this.answers.version,
        repository  : this.answers.repository,
        functionsafe: this.answers.functionsafe
      }
    );

    this.fs.copyTpl(
      this.templatePath('template.gitignore'),
      this.destinationPath('.gitignore'),
      {
        themesafe: this.answers.themesafe
      }
    );

    this.fs.copyTpl(
      this.templatePath('.bowerrc'),
      this.destinationPath(themeDirectory + '/.bowerrc'));

    this.fs.copyTpl(
      this.templatePath('gulpfile.js'),
      this.destinationPath(themeDirectory + '/gulpfile.js'),
      { proxy: this.answers.proxy });

    this.fs.delete(themeDirectory + '/.git');
    this.fs.delete(themeDirectory + '/.gitignore');

    var workingDirectory = process.cwd() + '/' + themeDirectory;
    process.chdir(workingDirectory);
    this.installDependencies();

    this.fs.copyTpl(
      this.templatePath(this.answers.styleSCSS),
      this.destinationPath(themeDirectory + '/static/scss/style.scss'),
      {
        name      : this.answers.themename,
        version   : this.answers.version,
        author    : this.answers.author,
        license   : this.answers.license
      });

    this.fs.copyTpl(
      this.templatePath(this.answers.siteJS),
      this.destinationPath(themeDirectory + '/static/js/site.js'));
  }

  end() {
    this.spawnCommandSync('composer', ['install', '--ignore-platform-reqs']);
    // this.log(chalk.bold.red('\nPlease install Timber and Advanced Custom Fields Pro plugins now and start coding!\n'));
    this.spawnCommandSync('gulp');
  }
};