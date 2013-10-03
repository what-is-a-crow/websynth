function MainCtrl($scope) {
  $scope.response = null;
  $scope.numberSpoken = false;
  $scope.stars = [];

  $scope.speed = 100;
  $scope.maximum = 100;
  $scope.numberType = "plain";

  var plainNumber = null;
  var euro = null;
  var centimes = null;

  $scope.newNumber = function() {
    $scope.setNumber();
    $scope.sayNumber();
  };

  $scope.setNumber = function() {
    if ($scope.numberType === 'currency') {
      euro = getRandomNumber();
      centimes = getRandomNumber(0, 99);
    }
    else if ($scope.numberType === 'year') {
      plainNumber = getRandomNumber(1000, 2100);
    }
    else {
      plainNumber = getRandomNumber();
    }
  };

  $scope.sayNumber = function() {
    var speech;
    if ($scope.numberType === 'currency') {
      speech = euro + ' euro ' + centimes;
    }
    else {
      speech = plainNumber;
    }
    say(speech, $scope.speed);
    $scope.numberSpoken = true;
  };

  $scope.respond = function() {
    if ($scope.response === correctAnswer()) {
      say(praise());
      $scope.addStar();
      clearAnswer();
    }
    else {
      $scope.removeStar();
      say(reprimand());
    }
  };

  $scope.showAnswer = function() {
    alert(correctAnswer());
    clearAnswer();
  };

  $scope.disableMaximum = function() {
    return $scope.numberType === 'year';
  };

  $scope.addStar = function() {
    $scope.stars.push({ number: $scope.stars.length + 1 });
  };

  $scope.removeStar = function() {
    $scope.stars.pop();
  };

  function getRandomNumber(min, max) {
    var min = min || 0
      , max = max || $scope.maximum;
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  function correctAnswer() {
    if ($scope.numberType === 'currency') {
      return euro + '.' + centimes;
    }
    else {
      return String(plainNumber);
    }
  }

  function clearAnswer() {
    $scope.response = null;
    plainNumber = null;
    euro = null;
    centimes = null;

    $scope.numberSpoken = false;
  }

  function say(text, speed) {
    meSpeak.speak(String(text), { voice: 'fr', speed: speed || 175 });
  }

  function praise() {
    var index = Math.floor(Math.random() * praises.length);
    return praises[index];
  }

  function reprimand() {
    var index = Math.floor(Math.random() * reprimands.length);
    return reprimands[index];
  }

  var praises = ["exact!", "correcte!", "excellent!", "magnefique!"];
  var reprimands = ["non!", "tort!"];
}
numerosApp.controller('MainCtrl', MainCtrl);