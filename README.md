# Simple-Audio-Player

Simple-Audio-Player is a lightweight JavaScript library which is implemented as a jQuery plugin and based on flash and soundmanager2.

## <a href="http://speranskydanil.github.io/Simple-Audio-Player/demo.html">DEMO</a>

## Dependencies

* soundmanager2
* jQuery
* Font Awesome

## Installation

    bower install Simple-Audio-Player

## Usage

```html
<link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">
<link rel="stylesheet" href="../dist/player.css">

<script src="https://code.jquery.com/jquery-1.11.2.min.js"></script>
<script src="../dist/soundmanager2.js"></script>
<script src="../dist/player.js"></script>

<script>
  soundManager.setup({ url: '/dist/' }); // path to soundmanager2 files

  $(document).ready(function() {
    $('#player').player('Losing-My-Religion.mp3'); // relative path to mp3
  });
</script>
```

## Running DEMO

1. Clone the repository
2. Place the content to the root
3. Go to /demo/index.html

## Notices

* It is necessary to have a web server, you can't open it statically
* You can do `bundle install` and `ruby server.rb` to run sinatra server

![screen](https://raw.github.com/speranskydanil/Simple-Audio-Player/master/screen.png)

**Author (Speransky Danil):**
[Personal Page](http://dsperansky.info) |
[LinkedIn](http://ru.linkedin.com/in/speranskydanil/en) |
[GitHub](https://github.com/speranskydanil?tab=repositories) |
[StackOverflow](http://stackoverflow.com/users/1550807/speransky-danil)

