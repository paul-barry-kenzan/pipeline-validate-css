# Pipeline-validate-css

## Information

| Package       | Description   | Version|
| ------------- |:-------------:| -----:|
| Pipeline-validate-css| This pipeline validates CSS files | 0.1.0 |

# Overview


_repo_: `https://github.com/kenzanmedia/pipeline-validate-css/`

_jenkins_: `TODO`

## Install
`npm install git+ssh:git@github.com:kenzanmedia/pipeline-validate-css.git`

## Usage
```javascript
var gulp = require('gulp');
var validateCssPipeline = require('pipeline-validate-css')();


gulp.task('default', function() {
  return gulp
    .src(['src/**/*.css'])
    .pipe(validateCssPipeline.validateCSS());
});
```

## Options

Pipeline options:
* _config_ -> Object that contains the configuration.



  Default:
  ```javascript
  config = {
    output: 'dist/'
  }
  ```  

## Results


## LICENSE
