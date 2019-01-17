window.onload = function() {
  var animationElement = document.getElementById("animation");
  var textElement = animationElement.getElementsByTagName("span")[0];

  var i = 0;
  var text = textElement.innerHTML;
  textElement.innerHTML = "";

  setTimeout(function() {
    var animationInterval = setInterval(function() {
      var nextCharacter = text[i];

      if (nextCharacter === " ") {
        nextCharacter = "&nbsp;"
      }

      textElement.innerHTML += nextCharacter;
      i += 1;

      if (i >= text.length) {
        clearInterval(animationInterval);

        setTimeout(function() {
          animationElement.classList.add("done");

          document.getElementById("shield").classList.add("done");
        }, 1000);
      }
    }, 150);
  }, 250);
};
