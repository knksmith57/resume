// -----------------------------------------------------------------------------
// tried like hell to get this to work... experiencing two different problems
// that I've already spent too much time on:
// 1. phantomjs doesn't support webfonts out of the box
//   - https://github.com/ariya/phantomjs/issues/10247
//   - compiled binaries available
//     + https://drive.google.com/folderview?id=0B4Wl57IYdOIPZVl3VFU4TFdVVTg&usp=sharing#list
//   - even with the new binaries with webfont support, not all font weights
//     are rendering properly
// 2. most (maybe all?) of the floated text is displaying across two rows. it's
//    as if every floated element is being rendered @ 99% of it's natural width
//    so that it flows down across two rows.
//   - tried copying + pasting all the default Chrome UA styles I could find
//     and it didn't fix it
//
// so that's that for now-- I'm just going to render it locally since it will
// take 30 seconds and commit the new version every time I update it. Yes, it's
// a pain in the ass and sort of kills the whole "automated" deployment, but
// whatever. Choose your battles.
// -----------------------------------------------------------------------------


// -----------------------------------------------------------------------------
// script is a combination of:
// 1. "Generate PDF invoices with HTML5 and PhantomJS"
//   - http://we-love-php.blogspot.com/2012/12/create-pdf-invoices-with-html5-and-phantomjs.html
// 2. "Screen Capture" rasterize.js
//   - https://github.com/ariya/phantomjs/blob/master/examples/rasterize.js
// 3. Hacked margins, viewport size, and user agent settings
// -----------------------------------------------------------------------------

var
  page   = require('webpage').create(),
  system = require('system'),

  vw     = 764,

  URL    = system.args[1],
  output = system.args[2];

page.paperSize = {
  format: "Letter",
  orientation: "portrait",
  // default chrome margins are 0.4in. I think.
  margin: {left:"0.4in", right:"0.4in", top:"0.4in", bottom:"0.2in"},
  footer: {
    height: "24px",
    contents: phantom.callback(function(pageNum, numPages) {
      // add link to current resume version at bottom
      return "<div style='text-align:right;font-family:Lato,sans-serif;font-weight:900;font-size:8px;text-transform:uppercase;color:#CCC;'>get the always-up-to-date version at ksmith.io/resume</div>";
    })
  }
};

page.settings = {
  // maybe rendering problem is related to user agent? here's the one that
  // looks right in chrome
  userAgent: 'Mozilla/5.0 (X11; CrOS i686 3912.101.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/27.0.1453.116 Safari/537.36'
};

// page.zoomFactor = 0.9;
page.viewportSize = { width: vw, height: vw*(11/8.5) };

page.open(URL, function (status) {
  if (status !== 'success') {
    console.log('Unable to load the address!');
    phantom.exit(1);
  } else {
    console.log('page finished loading, rendering pdf to file: ' + output + ' with viewport size: ' + this.viewportSize.width + 'x' + this.viewportSize.height);
    setTimeout(function() {
      page.render(output);
      phantom.exit(0);
    }, 1500);
  }
});
