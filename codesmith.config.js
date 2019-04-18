'use strict';
const path = require('path');

module.exports = function (codesmith) {
    codesmith.setGenerator('service', {
        description: 'create new service for ddd',
        questions: [
            {
                type: 'input',
                name: 'packageName',
                message: 'What is your new package name?',
                validate: function (value) {
                    if ((/.+/).test(value)) { return true; }
                    return 'name is required';
                }
            },
            {
                type: 'list',
                name: 'platform',
                message: 'What pizza toppings do you like?',
                choices: [
                    {name: 'None', value: 'none', checked: true},
                    {name: 'Github', value: 'github'}
                ]
            },
            {
              type: 'input',
              name: 'githubPath',
              message: 'What is your Github repository path(like sundogrd/codesmith)?',
              when: function(answers) {
                  return answers.platform === "github"
              }
            }
        ],
        actions: [
            {
                type: 'add',
                path: 'package.json',
                templateFile: 'templates/package.json',
                abortOnFail: true
            },
            {
              type: 'add',
              path: 'codesmith.config.js',
              templateFile: 'templates/codesmith.config.js',
              abortOnFail: true
          }
        ]
    });
};
