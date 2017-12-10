require('less/index.less');

var NoteManager = require('../module/note-manager.js').NoteManager;
var Event = require('../module/event.js');
var WaterFall = require('../module/waterfall.js');

NoteManager.load();

$('.add-note').on('click', function() {
  NoteManager.add();
})

Event.on('waterfall', function() {
  WaterFall.init($('#content'));
})