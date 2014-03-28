(function ($, sm) {
  sm.setup({
    flashVersion: 9,
    debugMode: false,

    onready: function () {
      sm.loaded = true;
      $(window).trigger('sound_manager.loaded');
    }
  });

  var Player = function (obj, url) {
    Player.currentId += 1;

    this.initSound('sound-' + Player.currentId, url);
    this.buildDom(obj);
    this.bindEvents();
  };

  Player.currentId = 0;

  Player.prototype = {
    initSound: function (id, url) {
      var self = this;

      var createSound = function () {
        self.sound = sm.createSound({
          id: id,
          url: url,
          volume: 50,
          autoload: false,

          whileloading: function () { self.whileLoading(); },
          whileplaying: function () { self.whilePlaying(); },

          onfinish: function () { self.onFinish(); }
        });
      };

      if (sm.loaded) createSound();
      else $(window).bind('sound_manager.loaded', createSound);
    },

    buildDom: function (obj) {
      this.dom = {};

      this.dom.play = $('<div class="play"></div>').appendTo(obj);

      this.dom.timeLeft = $('<div class="time-left">00 : 00</div>').appendTo(obj);

      this.dom.progress = $('<div class="progress"></div>').appendTo(obj);
      this.dom.loaded = $('<div class="loaded"></div>').appendTo(this.dom.progress);
      this.dom.progressPointer = $('<div class="pointer"></div>').appendTo(this.dom.progress);

      this.dom.timeRight = $('<div class="time-right">00 : 00</div>').appendTo(obj);

      this.dom.mute = $('<div class="mute"></div>').appendTo(obj);

      this.dom.volume = $('<div class="volume"></div>').appendTo(obj);
      this.dom.volumePointer = $('<div class="pointer"></div>').appendTo(this.dom.volume);
    },

    bindEvents: function () {
      var self = this;

      this.dom.play.click(function () {
        $(this).toggleClass('active');
        self.sound.togglePause();
      });

      this.dom.mute.click(function () {
        $(this).toggleClass('active');
        self.sound.toggleMute();
      });

      this.dom.progress.click(function (event) {
        var offsetLeft = event.pageX - $(this).offset().left;
        var ratio = offsetLeft / $(this).width();
        var position = ratio * self.sound.durationEstimate;

        self.sound.setPosition(position);
        self.setProgressPointer();
      });

      this.dom.volume.click(function (event) {
        var offsetLeft = event.pageX - $(this).offset().left;
        var ratio = offsetLeft / $(this).width();
        var volume = ratio * 100;

        self.sound.setVolume(volume);
        self.setVolumePointer();
      });
    },

    whileLoading: function () {
      var ratio = this.sound.bytesLoaded / this.sound.bytesTotal;
      var offset = ratio * this.dom.progress.width();

      this.dom.loaded.width(offset);
    },

    whilePlaying: function () {
      this.setProgressPointer();
      this.setVolumePointer();
      this.setTimes();
    },

    onFinish: function () {
      this.dom.play.removeClass('active');

      this.sound.setPosition(0);
      this.setProgressPointer();

      this.setTimes();
    },

    setProgressPointer: function () {
      var ratio = this.sound.position / this.sound.durationEstimate;
      var offset = ratio * this.dom.progress.width();
      var radius = this.dom.progressPointer.width() / 2;
      var margin = offset - radius;

      this.dom.progressPointer.css('margin-left', margin);
    },

    setVolumePointer: function () {
      var ratio = this.sound.volume / 100;
      var offset = ratio * this.dom.volume.width();
      var radius = this.dom.volumePointer.width() / 2;
      var margin = offset - radius;

      this.dom.volumePointer.css('margin-left', margin);
    },

    setTimes: function () {
      var addZeros = function (n, w) {
        w -= n.toString().length;
        if (w > 0) return new Array(w + 1).join('0') + n;
        return n + '';
      };

      var timeLeft = this.sound.position;
      var sec = Math.floor(timeLeft / 1000) % 60;
      var min = Math.floor(timeLeft / 1000 / 60);
      this.dom.timeLeft.text(addZeros(min, 2) + ' : ' + addZeros(sec, 2));

      var timeRight = this.sound.durationEstimate - this.sound.position;
      var sec = Math.floor(timeRight / 1000) % 60;
      var min = Math.floor(timeRight / 1000 / 60);
      this.dom.timeRight.text(addZeros(min, 2) + ' : ' + addZeros(sec, 2));
    }
  };

  $.fn.player = function (url) {
    new Player(this, url);
  };
})(jQuery, soundManager);
