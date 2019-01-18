function parseCookies() {
  var cookiesList = document.cookie.split("; ");
  var cookies = {};

  for (var i = 0; i < cookiesList.length; i++) {
    var cookieParts = cookiesList[i].split("=");
    cookies[cookieParts[0]] = cookieParts[1];
  }

  return cookies;
}

function setAnimationCookie() {
  var currentTime = new Date().getTime();
  var eightHours = 1000 * 60 * 60 * 8;
  var expireDate = new Date(currentTime + eightHours);

  document.cookie = "animation=" + new Date() + "; expires=" + expireDate + "; path=/";
}

function shouldAnimate() {
  var cookies = parseCookies();

  if ("animation" in cookies) {
    var lastAnimationTime = new Date(cookies["animation"]).getTime();
    var timeSinceLastAnimation = new Date().getTime() - lastAnimationTime;
    var eightHours = 1000 * 60 * 60 * 8;

    return animation && timeSinceLastAnimation >= eightHours;
  } else {
    return animation;
  }
}

var animationElement = document.getElementById("animation");
var shieldElement = document.getElementById("shield");
var textElement = animationElement.getElementsByTagName("a")[0];

if (!shouldAnimate()) {
  animationElement.classList.add("done-fast");
  shieldElement.classList.add("hidden");
}

window.onload = function() {
  if (!shouldAnimate()) {
    return;
  }

  setAnimationCookie();

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

          shieldElement.classList.add("done");

          setTimeout(function() {
            shieldElement.classList.add("hidden");
          }, 500);
        }, 1000);
      }
    }, 150);
  }, 250);
};
