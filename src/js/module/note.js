require('less/note.less')

var Toast = require('./toast').Toast;
var Event = require('./event.js')
/*
  {
    id: 1,
    content: 文本,
  }
*/
function Note(opts) {
  this.initOpts(opts);
  this.createNode();
  this.setStyle();
  this.bindEvent();
}

Note.prototype = {
  colors: [
    ['#ea9b35','#efb04e'],
    ['#dd598b','#e672a2'],
    ['#eee34b','#f2eb67'],
    ['#c24226','#d15a39'],
    ['#c1c341','#5591d2'],
    ['#3f78c3','#5591d2']
  ],
  defaultOpts: {
    id: '',
    $ct: $('content').length>0 ? $('#content') : $('body'),
    content: 'input here'
  },
  initOpts: function(opts) {
    this.opts = $.extend({},this.defaultOpts, opts || {});
    if(this.opts.id) {
      this.id = this.opts.id;
    }
  },
  createNote: function() {
    var tpl = 
      `<div class="note">
        <div class="note-head">
          <span class="delete">&time;</span>
        </div>
        <div class="note-ct" contenteditable="true">
        </div>
      </div>`
    this.$node = $(tpl);
    this.$node.find('.note-ct').html(this.opts.content);
    this.opts.$ct.append(this.$node);
    if(!this.id)
      this.$node.css('bottom', '10px');
  },
  setStyle: function() {
    var color = this.color[Math.floor(Math.random()*6)];
    this.$node.find('.note-head').css('background-color', color[0]);
    this.$node.find('.note-ct').css('background-color', color[1]);    
  },
  setLayout: function() {
    var self = this;
    if(self.clk) {
      clearTimeout(self.clk);
    }
    self.clk = setTimeout(function() {
      Event.fire('waterfall');
    },100); 
  },
  bindEvent: function() {
    var self = this,
        $node = this.$node,
        $nodeHead = $node.find('.note-head'),
        $nodeCt = $node.find('.note-ct'),
        $delete = $node.find('.delete');

    $delete.on('click', function() {
      self.delete();
    })

    $nodeCt.on('focus', function() {
      if($nodeCt.html() == 'input here')
        $nodeCt.html('');
      $nodeCt.data('before', $nodeCt.html());
    }).on('blur paste',function() {
      if( $nodeCt.data('before') != $nodeCt.html() ){
        $nodeCt.data('before', $nodeCt.html());
        self.setLayout();
        if(self.id) {
          self.edit($nodeCt.html())
        } else {
          self.add($nodeCt.html())
        }
      }
    });

    //设置笔记的移动
    $noteHead.on('mousedown', function(e) {
      var evtX = e.pageX - $node.offset().left(),
          evtY = e.pageY - $node.offset().top();
      $node.addClass('draggable').data('evtPos', {x: evtX, y:evtY});
    }).on('mouseup', function(){
      $node.removeClass('draggable').removeData('pos');
    })

    $('body').on('mouseover', function(e) {
      $('.draggable').length && $('.draggable').offset({
        top: e.pageY - $('.draggable').data('evtPos').y,
        left: e.pageX - $('.draggable').data('evtPos').x,        
      });
    });
  },

  edit: function (msg) {
    var self = this;
    $.post('/api/notes/edit',{
        id: this.id,
        note: msg
      }).done(function(ret){
      if(ret.status === 0){
        Toast('update success');
      }else{
        Toast(ret.errorMsg);
      }
    })
  },

  add: function (msg){
    console.log('addd...');
    var self = this;
    $.post('/api/notes/add', {note: msg})
      .done(function(ret){
        if(ret.status === 0){
          Toast('add success');
        }else{
          self.$note.remove();
          Event.fire('waterfall')
          Toast(ret.errorMsg);
        }
      });
    //todo
  },

  delete: function(){
    var self = this;
    $.post('/api/notes/delete', {id: this.id})
      .done(function(ret){
        if(ret.status === 0){
          Toast('delete success');
          self.$note.remove();
          Event.fire('waterfall')
        }else{
          Toast(ret.errorMsg);
        }
    });

  }

};

module.exports.Note = Note;