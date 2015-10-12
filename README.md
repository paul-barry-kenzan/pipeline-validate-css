# Pipeline-validate-css

## Information

| Package       | Description   | Version|
| ------------- |:-------------:| -----:|
| Pipeline-validate-css| This pipeline validates CSS files using CSS Lint| 0.1.0 |

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

  + You can include your custom CSS rules adding a `.csslintrc` file in the root of your project. Using this method will overwrite the default rules predefined in this pipeline.

## Results

This pipeline returns an object. This object receives a stream with the CSS files to validate. You can call the _validateCSS_ method to run the validation. The method will report if any issues were found during the process . If no issues are present, it will return the stream.

## LICENSE

  + MIT
