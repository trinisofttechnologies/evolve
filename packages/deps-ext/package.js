Package.describe({
  name: 'deps-ext',
  summary: 'Extensions to Meteor Deps'
});

Package.on_use(function (api) {
  api.use('underscore');
  api.use('deps');
  api.use('ejson');
  api.add_files('utils.js', ['client'])

  api.add_files('reactive_result.js', ['client'])
  api.add_files('reactive_value.js', ['client'])
  api.add_files('native_extensions.js', ['client']);

  api.export('ReactiveResult', 'client');
  api.export('ReactiveValue', 'client');
});

Package.on_test(function (api) {
  api.use('tinytest');
  api.use('test-helpers');
  api.use('deps-ext');
  api.add_files('deps_ext_tests.js', 'client');
});
