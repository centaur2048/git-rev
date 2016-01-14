var exec = require('child_process').exec

function _command (cmd, cb, altDir) {
  exec(cmd, { cwd: altDir ? altDir : __dirname }, function (err, stdout, stderr) {
    cb(stdout.split('\n').join(''))
  })
}

module.exports = { 
    short : function (cb, altDir) { 
      _command('git rev-parse --short HEAD', cb, altDir)
    }
  , long : function (cb, altDir) { 
      _command('git rev-parse HEAD', cb, altDir)
    }
  , branch : function (cb, altDir) { 
      _command('git rev-parse --abbrev-ref HEAD', cb, altDir)
    }
  , tag : function (cb, altDir) { 
      _command('git describe --always --tag --abbrev=0', cb, altDir)
    }
  , log : function (cb, altDir) { 
      _command('git log --no-color --pretty=format:\'[ "%H", "%s", "%cr", "%an" ],\' --abbrev-commit', function (str) {
        str = str.substr(0, str.length-1)
        cb(JSON.parse('[' + str + ']'))
      }, altDir)
    }
}
