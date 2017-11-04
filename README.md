# Javascript Library Boilerplate

This is a boilerplate for creating javascript library that requires npm publishing, code coverage, automated testing, and version control.

## Install
Modify package.json and webpack.config.babel.js to fit your needs.

```
npm install
```

Create accounts in npmjs.com, travis-ci.org, and codecov.io, link to your GitHub account associated with the library.

```
semantic-release-cli setup
```

## Building and Publishing to npm

After implementing your library,

```
git add -A
npm run commit
```

### Reference
https://egghead.io/lessons/javascript-introduction-to-how-to-write-an-open-source-javascript-library
