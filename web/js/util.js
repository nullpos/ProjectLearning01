var updateMesh;
$(init);

function updatePager() {
  if(data.num == 0) {
    $("#prev").addClass("disabled");
  } else {
    $("#prev").removeClass("disabled");
  }
  if(data.num >= data.data.length-1) {
    $("#next").addClass("disabled");
  } else {
    $("#next").removeClass("disabled");
  }
}

function init() {
  /* pager */
  $("#prev").on("click", function() {
    updateGeneration(-1);
    updateMesh();
    updatePager();
  });
  $("#next").on("click", function() {
    updateGeneration(1);
    updateMesh();
    updatePager();
  });

  /* slider */
  $("#slider").slider({
    min: 0,
    max: 0,
    value: 0,
    enabled: false,
    id: "slider"
  });

  if(data.data.length > 0) {
    $("#label").text("Generation : " + (data.num+1));
    $("#slider").slider({
      min: 1, max: data.data.length, value: 0,
      enabled: true, tooltip: 'always'
    });

    initRender();
  }

  $("#slider").slider().on('change', function(e) {
    data.num = e.value.newValue - 1;
    $("#label").text("Generation : " + (data.num + 1));
    updateMesh();
    updatePager();
  });
  updatePager();
}

function updateGeneration(d) {
  if(d == undefined) return;
  if((data.num == 0 && d < 0) ||
    (data.num == data.data.length -1 && d > 0)) return;

  var s = $("#slider").slider();
  var n = s.slider("getValue");
  s.slider("setValue", n+d);
  data.num += d;
  $("#label").text("Generation : " + (n+d));
}

function rgbToHex(r, g, b) {
  return parseInt('0x' +
    (function(n) {
      return new Array(7 - n.length).join('0') + n;
    })((r << 16 | g << 8 | b).toString(16))
  , 16);
}

function lrgb(i, c) {
  var l = rgbTable.length;
  return rgbTable[parseInt(parseFloat(i) / 255 * (l-1))][c] * 255;
}

var data = {
  num: 0,
  data: [
    [-61, 30, 73, 118, 115, 19, -11, 112, -63, 113, 31, 120, -117, 20, -17, -7, 23, 96, 59, -120, 42, 92, 80, 115, 103, -44, 4, 66, -52, -105, -23, 81, -108, 91, 73, 108],
[-61, 30, 73, -91, -20, -119, -11, 81, 72, 113, 118, -67, -117, 20, -17, 64, 32, -90, 49, 24, 42, 111, 80, 20, 1, 93, -23, -107, -25, -75, -23, 81, -104, 91, 35, 108],
[20, 30, -47, 120, -99, 20, -11, 118, -85, -23, 96, 7, 40, 20, 1, -90, 23, -58, 63, 40, 21, -65, 100, -55, -117, 53, 89, 83, -11, -105, -87, 73, 115, -11, -36, 61],
[20, 30, 11, 112, -99, 20, -47, -13, 117, -68, 31, -113, -96, 20, 1, -59, 23, -21, -26, -10, -59, -6, 100, -83, 28, 53, -62, 12, 80, -105, -87, 73, 58, 79, 35, -27],
[20, 30, 11, 112, -99, 20, -47, -13, 117, -68, 31, -113, -96, 20, 1, -59, 23, -21, -26, -10, -59, -6, 100, -83, 28, 53, -62, 12, 80, -105, -87, 73, 58, 79, 35, -27],
[20, 30, 11, 112, -99, 20, -47, -13, 117, -68, 31, -113, -96, 20, 1, -59, 23, -21, -26, -10, -59, -6, 100, -83, 28, 53, -62, 12, 80, -105, -87, 73, 58, 79, 35, -27],
[-38, -113, 42, -28, -20, 20, -47, -13, -122, -128, 96, -113, 84, -124, -36, -48, 23, -21, -100, -58, 42, -26, 103, -3, 28, -30, -62, 26, -25, -75, -13, -95, -42, 19, 73, 73],
[20, 30, -111, 112, -99, 20, -47, 74, 117, -68, 118, -113, -96, -78, 7, -59, 15, -15, -24, -10, -85, -6, 100, -83, 28, 53, 12, 12, 80, -36, -87, 73, 51, -71, 35, 108],
[20, 30, -111, 112, -99, 20, -47, 74, 117, -68, 118, -113, -96, -78, 7, -59, 15, -15, -24, -10, -85, -6, 100, -83, 28, 53, 12, 12, 80, -36, -87, 73, 51, -71, 35, 108],
[20, 30, -111, 112, -99, 20, -47, 74, 117, -68, 118, -113, -96, -78, 7, -59, 15, -15, -24, -10, -85, -6, 100, -83, 28, 53, 12, 12, 80, -36, -87, 73, 51, -71, 35, 108],
[20, 86, 73, -49, -99, 43, -17, -21, 57, 73, 40, -33, -96, -83, 7, -61, -50, -85, 9, -112, 42, -6, 40, 115, 124, 105, 89, 12, -64, -106, -87, 20, -42, -11, 35, 108],
[58, 84, 73, 83, -20, 20, -11, -65, 56, -42, 20, -113, 84, -106, -17, -90, 26, -90, -40, 40, 99, -26, 103, 115, 76, 105, 95, 79, 127, -88, -85, 20, 66, -72, 35, 108],
[-67, 86, 73, -49, -99, 20, 74, 74, 57, -60, -119, -33, -10, 20, 7, -108, -50, -85, 9, 40, 42, -6, 40, 115, 124, 105, 12, 83, 127, -106, -85, 20, -42, 107, 35, 108],
[-67, 86, 73, -49, -99, 20, 74, 74, 57, -60, -119, -33, -10, 20, 7, -108, -50, -85, 9, 40, 42, -6, 40, 115, 124, 105, 12, 83, 127, -106, -85, 20, -42, 107, 35, 108],
[-67, 86, 73, -49, -99, 20, 74, 74, 57, -60, -119, -33, -10, 20, 7, -108, -50, -85, 9, 40, 42, -6, 40, 115, 124, 105, 12, 83, 127, -106, -85, 20, -42, 107, 35, 108],
[-67, 86, 73, -49, -99, 20, 74, 74, 57, -60, -119, -33, -10, 20, 7, -108, -50, -85, 9, 40, 42, -6, 40, 115, 124, 105, 12, 83, 127, -106, -85, 20, -42, 107, 35, 108],
[-67, 86, 73, -49, -99, 20, 74, 74, 57, -60, -119, -33, -10, 20, 7, -108, -50, -85, 9, 40, 42, -6, 40, 115, 124, 105, 12, 83, 127, -106, -85, 20, -42, 107, 35, 108],
[-67, 86, 73, -49, -99, 20, 74, 74, 57, -60, -119, -33, -10, 20, 7, -108, -50, -85, 9, 40, 42, -6, 40, 115, 124, 105, 12, 83, 127, -106, -85, 20, -42, 107, 35, 108],
[-67, 86, 73, -49, -99, 20, 74, 74, 57, -60, -119, -33, -10, 20, 7, -108, -50, -85, 9, 40, 42, -6, 40, 115, 124, 105, 12, 83, 127, -106, -85, 20, -42, 107, 35, 108],
[-67, 86, 73, -49, -99, 20, 74, 74, 57, -60, -119, -33, -10, 20, 7, -108, -50, -85, 9, 40, 42, -6, 40, 115, 124, 105, 12, 83, 127, -106, -85, 20, -42, 107, 35, 108],
[-67, 86, 73, -49, -99, 20, 74, 74, 57, -60, -119, -33, -10, 20, 7, -108, -50, -85, 9, 40, 42, -6, 40, 115, 124, 105, 12, 83, 127, -106, -85, 20, -42, 107, 35, 108],
[24, -113, 73, -49, -99, 20, 90, 74, 57, -60, -119, -33, -96, 20, 7, 43, -50, -85, 9, 40, 42, -40, 16, 115, 124, 59, 95, 12, -64, -106, -85, 20, -42, 107, 35, 108],
[24, -113, 73, -49, -99, -28, 90, 74, 57, -60, -119, -33, -5, 20, 7, 30, -50, -85, -26, 40, 42, -40, 40, 115, 124, 105, 95, 83, -47, -106, -85, 20, -42, 107, 35, 108],
[24, -113, 73, -49, -99, -28, 90, 74, 57, -60, -119, -33, -5, 20, 7, 30, -50, -85, -26, 40, 42, -40, 40, 115, 124, 105, 95, 83, -47, -106, -85, 20, -42, 107, 35, 108],
[24, -113, 73, -49, -99, -28, 90, 74, 57, -60, -119, -33, -5, 20, 7, 30, -50, -85, -26, 40, 42, -40, 40, 115, 124, 105, 95, 83, -47, -106, -85, 20, -42, 107, 35, 108],
[24, -113, 73, -49, -99, -28, 90, 74, 57, -60, -119, -33, -5, 20, 7, 30, -50, -85, -26, 40, 42, -40, 40, 115, 124, 105, 95, 83, -47, -106, -85, 20, -42, 107, 35, 108],
[24, -113, 127, 83, -99, 15, 126, 74, 57, -60, -119, -33, 36, 20, 7, -104, -50, -90, 48, 40, 60, -77, 40, 115, 124, 105, 61, -10, -64, -106, -58, 20, -42, -11, 35, 108],
[24, -113, 127, 83, -99, 15, 126, 74, 57, -60, -119, -33, 36, 20, 7, -104, -50, -90, 48, 40, 60, -77, 40, 115, 124, 105, 61, -10, -64, -106, -58, 20, -42, -11, 35, 108],
[24, -113, 127, 83, -99, 15, 126, 74, 57, -60, -119, -33, 36, 20, 7, -104, -50, -90, 48, 40, 60, -77, 40, 115, 124, 105, 61, -10, -64, -106, -58, 20, -42, -11, 35, 108],
[24, -113, 127, 83, -99, 15, 126, 74, 57, -60, -119, -33, 36, 20, 7, -104, -50, -90, 48, 40, 60, -77, 40, 115, 124, 105, 61, -10, -64, -106, -58, 20, -42, -11, 35, 108],
[24, -113, 127, 83, -99, 15, 126, 74, 57, -60, -119, -33, 36, 20, 7, -104, -50, -90, 48, 40, 60, -77, 40, 115, 124, 105, 61, -10, -64, -106, -58, 20, -42, -11, 35, 108],
[24, -113, 127, 83, -99, 15, 126, 74, 57, -60, -119, -33, 36, 20, 7, -104, -50, -90, 48, 40, 60, -77, 40, 115, 124, 105, 61, -10, -64, -106, -58, 20, -42, -11, 35, 108],
[24, -113, 127, 83, -99, 15, 126, 74, 57, -60, -119, -33, 36, 20, 7, -104, -50, -90, 48, 40, 60, -77, 40, 115, 124, 105, 61, -10, -64, -106, -58, 20, -42, -11, 35, 108],
[24, -113, 127, 83, -99, 15, 126, 74, 57, -60, -119, -33, 36, 20, 7, -104, -50, -90, 48, 40, 60, -77, 40, 115, 124, 105, 61, -10, -64, -106, -58, 20, -42, -11, 35, 108],
[24, -113, 127, -49, -99, 20, 90, 74, 57, 26, -72, -33, 104, -106, 7, 68, -100, -90, 48, 40, 60, -77, 5, 115, 124, 32, 12, 83, -64, -106, -58, 20, -42, -11, 35, 108],
[24, -113, 127, -49, -99, 20, 90, 74, 57, 26, -72, -33, 104, -106, 7, 68, -100, -90, 48, 40, 60, -77, 5, 115, 124, 32, 12, 83, -64, -106, -58, 20, -42, -11, 35, 108],
[24, -113, 127, -49, -99, 20, 90, 74, 57, 26, -72, -33, 104, -106, 7, 68, -100, -90, 48, 40, 60, -77, 5, 115, 124, 32, 12, 83, -64, -106, -58, 20, -42, -11, 35, 108],
[24, -113, 127, -49, -99, 20, 90, 74, 57, 26, -72, -33, 104, -106, 7, 68, -100, -90, 48, 40, 60, -77, 5, 115, 124, 32, 12, 83, -64, -106, -58, 20, -42, -11, 35, 108],
[24, -113, 127, -49, -99, 20, 90, 74, 57, 26, -72, -33, 104, -106, 7, 68, -100, -90, 48, 40, 60, -77, 5, 115, 124, 32, 12, 83, -64, -106, -58, 20, -42, -11, 35, 108],
[24, -113, 127, -49, -99, 20, 90, 74, 57, 26, -72, -33, 104, -106, 7, 68, -100, -90, 48, 40, 60, -77, 5, 115, 124, 32, 12, 83, -64, -106, -58, 20, -42, -11, 35, 108],
[24, -113, 127, -49, -99, 20, 90, 74, 57, 26, -72, -33, 104, -106, 7, 68, -100, -90, 48, 40, 60, -77, 5, 115, 124, 32, 12, 83, -64, -106, -58, 20, -42, -11, 35, 108],
[24, -113, 127, -103, -99, 20, 90, 74, 57, 26, -72, -33, 15, -106, 7, 68, -100, -90, 48, 40, 60, -77, 5, 103, 114, 32, 12, 39, -64, -106, -58, 20, -42, -11, 35, 108],
[24, -113, 127, -103, -99, 20, 90, 74, 57, 26, -72, -33, 15, -106, 7, 68, -100, -90, 48, 40, 60, -77, 5, 103, 114, 32, 12, 39, -64, -106, -58, 20, -42, -11, 35, 108],
[24, -113, 127, -103, -99, 20, 90, 74, 57, 26, -72, -33, 15, -106, 7, 68, -100, -90, 48, 40, 60, -77, 5, 103, 114, 32, 12, 39, -64, -106, -58, 20, -42, -11, 35, 108],
[24, -35, 127, -49, -99, 20, 90, 74, 57, 26, -72, -33, 15, -106, 7, 68, -100, -90, 48, 40, 60, -77, 5, 103, 114, 32, 12, 39, -64, -106, -58, 20, -42, -11, 35, 108],
[24, -35, 127, -49, -99, 20, 90, 74, 57, 26, -72, -33, 15, -106, 7, 68, -100, -90, 48, 40, 60, -77, 5, 103, 114, 32, 12, 39, -64, -106, -58, 20, -42, -11, 35, 108],
[24, -35, 127, -49, -99, 20, 90, 74, 57, 26, -72, -33, 15, -106, 7, 68, -100, -90, 48, 40, 60, -77, 5, 103, 114, 32, 12, 39, -64, -106, -58, 20, -42, -11, 35, 108],
[24, -113, 127, -49, -99, 20, 90, 74, 57, 26, -72, -33, 15, -106, 7, 68, -100, -90, 48, 40, 60, -77, 5, 103, 114, 32, 12, 39, -64, -106, -58, 20, -42, -11, 35, 108],
[24, -113, 127, -49, -99, 20, 90, 74, 57, 26, -72, -33, 15, -106, 7, 68, -109, -90, 48, 40, 60, -77, 5, 103, 114, 32, 12, 39, -64, -106, -58, 20, -42, -11, 35, 108],
[24, -113, 127, -49, -99, 20, 90, 74, 57, 26, -72, -33, 15, -106, 7, 68, -109, -90, 48, 40, 60, -77, 5, 103, 114, 32, 12, 39, -64, -106, -58, 20, -42, -11, 35, 108],
[24, -113, 127, -49, -99, 20, 90, 74, 57, 26, -72, -33, 15, -106, 7, 68, -109, -90, 48, 40, 60, -77, 5, 103, 114, 32, 12, 39, -64, -106, -58, 20, -42, -11, 35, 108],
[24, -113, 127, -49, -99, 20, 90, 74, 57, 26, -72, -33, 15, -106, 7, 68, -109, -90, 48, 40, 60, -77, 5, 103, 114, 32, 12, 39, -64, -106, -58, 20, -42, -11, 35, 108],
[53, -113, 127, -49, -99, 20, 90, 74, 57, 26, -72, -33, 15, -106, 7, 68, -109, -90, 48, 40, 60, -77, 5, 103, 114, 32, 12, 39, -64, -106, -58, 20, -42, -11, 35, 108],
[53, -113, 127, -49, -99, 20, 90, 74, 57, 26, -72, -33, 15, -106, 7, 68, -109, -90, 48, 40, 60, -77, 5, 103, 114, 32, 12, 39, -64, -106, -58, 20, -42, -11, 35, 108],
[24, -113, 127, -49, -99, 20, 90, 74, 57, 26, -72, -33, 15, -106, 7, 68, -109, -90, 48, 40, 60, -77, 5, 103, 114, 32, 12, 39, -64, -106, -58, 20, -42, -11, 35, 108],
[24, -113, 127, -49, -99, 20, 90, 74, 57, 26, -72, -33, 15, -106, 7, 68, -109, -90, 48, 40, 60, -77, 5, 103, 114, 32, 12, 39, -64, -106, -58, 20, -42, -11, 35, 108],
[24, -113, 127, -49, -99, 20, 90, 74, 57, 26, -72, -33, 15, -106, 7, 68, -109, -90, 48, 40, 60, -77, 5, 103, 114, 32, 12, 39, -64, -106, -58, 20, -42, -11, 35, 108],
[24, -113, 127, -49, -99, 20, 90, 74, 57, 26, -72, -33, 15, -106, 7, 68, -109, -90, 48, 40, 60, -77, 5, 103, 114, 32, 12, 39, -64, -106, -58, 20, -42, -11, 35, 108],
[24, -86, 127, -49, -99, 20, 90, 74, 57, 26, -72, -33, 15, -106, 7, 68, -109, -90, 48, 40, 60, -77, 5, 103, 114, 32, 12, 39, -64, -106, -58, 20, -42, -11, 35, 108],
[24, -86, 127, -49, -99, 20, 90, 74, 57, 26, -72, -33, 15, -106, 7, 68, -109, -90, 48, 40, 60, -77, 5, 103, 114, 32, 12, 39, -64, -106, -58, 20, -42, -11, 35, 108],
[24, -113, 127, -49, -99, 20, 90, 74, 57, 26, -72, -33, 15, -106, 7, 68, -109, -90, 48, 40, 60, -77, 5, 103, 114, 32, 12, 45, -64, -106, -58, 20, -42, -11, 35, 108],
[24, -113, 127, -49, -99, 20, 90, 74, 57, 26, -72, -33, 15, -106, 7, 68, -109, -90, 48, 40, 60, -77, 5, 103, 114, 32, 12, 45, -64, -106, -58, 20, -42, -11, 35, 108],
[24, -113, 127, -49, -99, 20, 90, 74, 57, 26, -72, -33, 15, -106, 7, 68, -109, -90, 48, 40, 60, -77, 5, 103, 114, 32, 12, 45, -64, -106, -58, 20, -42, -11, 35, 108],
[24, -86, 127, -49, -99, 20, 90, 74, 57, 26, -72, -33, 15, -106, 7, 68, -109, -90, 48, 40, 60, -77, 5, 103, 114, 32, 12, 45, -64, -106, -58, 20, -42, -11, 35, 108],
[24, -86, 127, -49, -99, 20, 90, 74, 57, 26, -72, -33, 15, -106, 7, 68, -109, -90, 48, 40, 60, -77, 5, 103, 114, 32, 12, 45, -64, -106, -58, 20, -42, -11, 35, 108],
[24, -86, 127, -49, -99, 20, 90, 74, 57, 26, -72, -33, 15, -106, 7, 68, -109, -90, 48, 40, 60, -77, 5, 103, 114, 32, 12, 45, -64, -106, -58, 20, -42, -11, 35, 108],
[24, -86, 127, -49, -99, 20, 90, 74, 57, 26, -72, -33, 15, -106, 7, 68, -109, -90, 48, 40, 60, -77, 5, 103, 114, 32, 12, 45, -64, -106, -58, 20, -42, -11, 35, 108],
[24, -86, 127, -49, -99, 20, 90, 74, 57, 26, -72, -33, 15, -106, 7, 68, -109, -90, 48, 40, 60, -77, 5, 103, 114, 32, 12, 45, -64, -106, -58, 20, -42, -11, 35, 108],
[-103, -86, 127, -49, -99, 20, 90, 74, 57, 26, -72, -33, 15, -106, 7, 68, -109, -90, 48, 40, 60, -77, 5, 103, 114, 32, 12, 45, -64, -106, -58, 20, -42, -11, 35, 108],
[24, -86, 127, -49, -99, 20, 90, 74, 57, 26, -72, -33, 15, -106, 7, 68, -109, -90, 48, 40, 60, -77, 5, 103, 114, 32, 12, 45, -64, -106, -58, 20, -42, -11, 35, 108],
[-103, -86, 127, -49, -99, 20, 90, 74, 57, 26, -72, -33, 15, -106, 7, 68, -109, -90, 48, 40, 60, -77, 5, 103, 114, 32, 12, 45, -64, -106, -58, 20, -42, -11, 35, 108],
[24, -86, 127, -49, -99, 20, 90, 74, 57, 26, -72, -33, 15, -106, 7, 68, -109, -90, 48, 40, 60, -77, 5, 103, 114, 32, 12, 45, -64, -106, -58, 20, -42, -11, 35, 108],
[24, -86, 127, -49, -99, 20, 90, 74, 57, 26, -72, -33, 15, -106, 7, 68, -109, -90, 48, 40, 60, -77, 5, 103, 114, 32, 12, 45, -64, -106, -58, 20, -42, -11, 35, 108],
[24, -86, 127, -49, -99, 20, 90, 74, 57, 26, -72, -33, 15, -106, 7, 68, -109, -90, 48, 40, 60, -77, 5, 103, 114, 32, 12, 45, -64, -106, -58, 20, -42, -11, 35, 108],
[24, -86, 127, -49, -99, 20, 90, 74, 57, 26, -72, -33, 29, -106, 7, 68, -109, -90, 48, 40, 60, -77, 5, 103, 114, 32, 12, 45, -64, -106, -58, 20, -42, -11, 35, 108],
[24, -86, 127, -49, -99, 20, 90, 74, 57, 26, -72, -33, 15, -106, 7, 68, -109, -90, 48, 40, 60, -77, 5, 103, 114, 32, 12, 45, -64, -106, -58, 20, -42, -11, 35, 108],
[24, -86, 127, -49, -99, 20, 90, 74, 57, 26, -72, -33, 15, -106, 7, 68, -109, -90, 48, 40, 60, -77, 5, 103, 114, 32, 12, 45, -64, -106, -58, 20, -42, -11, 35, 108],
[24, -86, 127, -49, -99, 20, 90, 74, 57, 26, -72, -33, 15, -106, 7, 68, -109, -90, 48, 40, 60, -77, 5, 103, 114, 32, 12, 45, -64, -106, -58, 20, -42, -11, 35, 108],
[24, -86, 127, -49, -99, 20, 90, 74, 57, 26, -72, -33, 15, -106, 7, 68, -109, -90, 48, 40, 60, -77, 5, 103, 114, 32, 12, 45, -64, -106, -58, 20, -42, -11, 35, 108],
[24, -86, 127, -49, -99, 20, 90, 74, 57, 26, -72, -33, 15, -106, 7, 68, -109, -90, 48, 40, 60, -77, 5, 103, 114, 32, 12, 45, -64, -106, -58, 20, -42, -11, 35, 108]

  ]
};

var weight = [
  [0, 1, 2, 3, 3, 2, 1, 0],
  [1, 4, 5, 6, 6, 5, 4, 1],
  [2, 5, 7, 8, 8, 7, 5, 2],
  [3, 6, 8, 9, 9, 8, 6, 3],
  [3, 6, 8, 9, 9, 8, 6, 3],
  [2, 5, 7, 8, 8, 7, 5, 2],
  [1, 4, 5, 6, 6, 5, 4, 1],
  [0, 1, 2, 3, 3, 2, 1, 0]
];

var rgbTable = [
  { R:0 ,G:0 ,B:0.99999 }
  ,{ R:0 ,G:0.0796 ,B:0.99998 }
  ,{ R:0 ,G:0.1586 ,B:0.99998 }
  ,{ R:0 ,G:0.2358 ,B:0.99998 }
  ,{ R:0 ,G:0.3108 ,B:0.99998 }
  ,{ R:0 ,G:0.383 ,B:0.99998 }
  ,{ R:0 ,G:0.4514 ,B:0.99996 }
  ,{ R:0 ,G:0.516 ,B:0.99996 }
  ,{ R:0 ,G:0.5762 ,B:0.99994 }
  ,{ R:0 ,G:0.6318 ,B:0.99994 }
  ,{ R:0 ,G:0.6826 ,B:0.9999 }
  ,{ R:0 ,G:0.7286 ,B:0.99986 }
  ,{ R:0 ,G:0.7698 ,B:0.9998 }
  ,{ R:0 ,G:0.8064 ,B:0.9996 }
  ,{ R:0 ,G:0.8384 ,B:0.9996 }
  ,{ R:0 ,G:0.8664 ,B:0.9994 }
  ,{ R:0 ,G:0.8904 ,B:0.999 }
  ,{ R:0 ,G:0.9108 ,B:0.9986 }
  ,{ R:0 ,G:0.9282 ,B:0.998 }
  ,{ R:0 ,G:0.9426 ,B:0.9974 }
  ,{ R:0 ,G:0.9544 ,B:0.9962 }
  ,{ R:0 ,G:0.9642 ,B:0.9948 }
  ,{ R:0 ,G:0.9722 ,B:0.993 }
  ,{ R:0 ,G:0.9786 ,B:0.9906 }
  ,{ R:0 ,G:0.9836 ,B:0.9876 }
  ,{ R:0 ,G:0.9876 ,B:0.9836 }
  ,{ R:0 ,G:0.9906 ,B:0.9786 }
  ,{ R:0 ,G:0.993 ,B:0.9722 }
  ,{ R:0 ,G:0.9948 ,B:0.9642 }
  ,{ R:0 ,G:0.9962 ,B:0.9544 }
  ,{ R:0 ,G:0.9974 ,B:0.9426 }
  ,{ R:0 ,G:0.998 ,B:0.9282 }
  ,{ R:0 ,G:0.9986 ,B:0.9108 }
  ,{ R:0 ,G:0.999 ,B:0.8904 }
  ,{ R:0 ,G:0.9994 ,B:0.8664 }
  ,{ R:0 ,G:0.9996 ,B:0.8384 }
  ,{ R:0 ,G:0.9996 ,B:0.8064 }
  ,{ R:0 ,G:0.9998 ,B:0.7698 }
  ,{ R:0 ,G:0.99986 ,B:0.7286 }
  ,{ R:0 ,G:0.9999 ,B:0.6826 }
  ,{ R:0 ,G:0.99994 ,B:0.6318 }
  ,{ R:0 ,G:0.99996 ,B:0.5762 }
  ,{ R:0 ,G:0.99998 ,B:0.516 }
  ,{ R:0 ,G:0.99998 ,B:0.4514 }
  ,{ R:0 ,G:0.99998 ,B:0.383 }
  ,{ R:0 ,G:0.99994 ,B:0.3108 }
  ,{ R:0 ,G:0.99996 ,B:0.2358 }
  ,{ R:0 ,G:0.99998 ,B:0.1586 }
  ,{ R:0 ,G:0.99998 ,B:0.0796 }
  ,{ R:0 ,G:0.99999 ,B:0 }
  ,{ R:0 ,G:0.999994 ,B:0 }
  ,{ R:0.0796 ,G:0.99999 ,B:0 }
  ,{ R:0.1586 ,G:0.99998 ,B:0 }
  ,{ R:0.2358 ,G:0.99998 ,B:0 }
  ,{ R:0.3108 ,G:0.99998 ,B:0 }
  ,{ R:0.383 ,G:0.99998 ,B:0 }
  ,{ R:0.4514 ,G:0.99998 ,B:0 }
  ,{ R:0.516 ,G:0.99996 ,B:0 }
  ,{ R:0.5762 ,G:0.99996 ,B:0 }
  ,{ R:0.6318 ,G:0.99994 ,B:0 }
  ,{ R:0.6826 ,G:0.99994 ,B:0 }
  ,{ R:0.7286 ,G:0.9999 ,B:0 }
  ,{ R:0.7698 ,G:0.99986 ,B:0 }
  ,{ R:0.8064 ,G:0.9998 ,B:0 }
  ,{ R:0.8384 ,G:0.9996 ,B:0 }
  ,{ R:0.8664 ,G:0.9996 ,B:0 }
  ,{ R:0.8904 ,G:0.9994 ,B:0 }
  ,{ R:0.9108 ,G:0.999 ,B:0 }
  ,{ R:0.9282 ,G:0.9986 ,B:0 }
  ,{ R:0.9426 ,G:0.998 ,B:0 }
  ,{ R:0.9544 ,G:0.9974 ,B:0 }
  ,{ R:0.9642 ,G:0.9962 ,B:0 }
  ,{ R:0.9722 ,G:0.9948 ,B:0 }
  ,{ R:0.9786 ,G:0.993 ,B:0 }
  ,{ R:0.9836 ,G:0.9906 ,B:0 }
  ,{ R:0.9876 ,G:0.9876 ,B:0 }
  ,{ R:0.9906 ,G:0.9836 ,B:0 }
  ,{ R:0.993 ,G:0.9786 ,B:0 }
  ,{ R:0.9948 ,G:0.9722 ,B:0 }
  ,{ R:0.9962 ,G:0.9642 ,B:0 }
  ,{ R:0.9974 ,G:0.9544 ,B:0 }
  ,{ R:0.998 ,G:0.9426 ,B:0 }
  ,{ R:0.9986 ,G:0.9282 ,B:0 }
  ,{ R:0.999 ,G:0.9108 ,B:0 }
  ,{ R:0.9994 ,G:0.8904 ,B:0 }
  ,{ R:0.9996 ,G:0.8664 ,B:0 }
  ,{ R:0.9996 ,G:0.8384 ,B:0 }
  ,{ R:0.9998 ,G:0.8064 ,B:0 }
  ,{ R:0.99986 ,G:0.7698 ,B:0 }
  ,{ R:0.9999 ,G:0.7286 ,B:0 }
  ,{ R:0.99994 ,G:0.6826 ,B:0 }
  ,{ R:0.99996 ,G:0.6318 ,B:0 }
  ,{ R:0.99998 ,G:0.5762 ,B:0 }
  ,{ R:0.99998 ,G:0.516 ,B:0 }
  ,{ R:0.99998 ,G:0.4514 ,B:0 }
  ,{ R:0.99994 ,G:0.383 ,B:0 }
  ,{ R:0.99996 ,G:0.3108 ,B:0 }
  ,{ R:0.99998 ,G:0.2358 ,B:0 }
  ,{ R:0.99998 ,G:0.1586 ,B:0 }
  ,{ R:0.99999 ,G:0.0796 ,B:0 }
  ,{ R:0.999994 ,G:0 ,B:0 }
];
