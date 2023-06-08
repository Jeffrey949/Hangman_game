function gameOn() {
  let zufall, le, eingabe, mistakeCounter, correct_word, charIndex, charCounter, startTime, stopTime, timer, gameRunning;

  function initVaris() {
    le = wörter.length;
    zufall = Math.floor(Math.random() * le);
    eingabe = "";
    mistakeCounter = 0;
    correct_word = wörter[zufall].toUpperCase();
    charIndex = [];
    charCounter = 0;
    startTime = new Date();
    gameRunning = false;
    timer = el("#timer-range").value;
  }


  function loadGameField() {
    let char;
    gameRunning = !gameRunning;
    // Entferne Button
    el("#start").className = "passiv";
    // Feld für falsche Buchstaben einblenden
    el("fieldset").classList.remove("passiv");
    el("fieldset legend").innerHTML = "<strong>Deine falsch genannten Buchstaben</strong>"
    // Unterstriche abhängig der Wortlänge erstellen
    for (let i = 0; i < correct_word.length; i++) {
      char = create("p");
      char.innerHTML = "_";
      char.setAttribute("data-id", i);
      el('#word-section').append(char);
    }
    // Übergeordnete Klasse um Einzelteile wieder anzeigen zu können
    el(".galgen").classList.remove("passiv");
    // Alle komponenten des Galgenmänchen erhalten die klasse passiv
    // Falldown logik entfernen und Kopf auf default Zustand setzen
    group(".galgen div").forEach((div, index) => {
      div.classList.remove("red");
      div.classList.add("passiv");
      div.classList.remove("fall-down");
    });
    // Default Status festlegen
    el("#kasten-buchstaben").innerHTML = "<ul></ul>";
    el("#fehler").innerText = "Fehler: 0";
  }


  function keyDown(e) {
    // Speichern des eigegebenen Buchstaben (Uppercase)
    eingabe = e.key.toUpperCase();
    if (gameRunning) {
      checkInput();
      drawSketch();
      console.log(charCounter);
      // checkEnd();
      el("#fehler").innerText = `Fehler: ${mistakeCounter}`;
    }
  }

  function checkInput() {
    let char;
    // Fall für einen korrekten Buchstaben
    if (correct_word.includes(eingabe)) {
      for (let i = 0; i < correct_word.length; i++) {
        // Buchstaben prüfen und die zutreffende indizes in ein array pushen
        if (correct_word[i] === eingabe) {
          charIndex.push(i);
        }
      }
      // Platzhalter mit zutreffenden Buchstaben ersetzen
      for (let i = 0; i < charIndex.length; i++) {
        // document.getElementById(charIndex[i]).innerText = correct_word[charIndex[i]];
        // el(`#a${charIndex[i]}`).innerText = correct_word[charIndex[i]];
        if (el(`[data-id="${charIndex[i]}"]`).innerText != correct_word[charIndex[i]] ) {
          el(`[data-id="${charIndex[i]}"]`).innerText = correct_word[charIndex[i]];
          charCounter ++;
        }
      }
      // Fall für falsche Eingabe
    } else {
      // mistakeCounter wird erhöht und falscher Buchstabe im Feld hinterlegt
      mistakeCounter += 1;
      char = create("li");
      char.innerText = eingabe;
      el('#kasten-buchstaben ul').append(char);
    }
  }

  function drawSketch() {
    // Abhängig der des mistakeCounter-Wertes, werden Teile der Skizze angezeigt
    if (mistakeCounter > 0 && mistakeCounter < 10) {
      el(`[data-id="${mistakeCounter + 100}"]`).classList.remove("passiv");
    }
  }

  function checkEnd() {
    // Check ob das Wort gelöst wurde
    if (charCounter === correct_word.length) {
      gameRunning = !gameRunning;
      setTimeout(() => {
        timer = el("#timer-range").value;
        el("#timer").innerText = `${timer} Sek`;
      }, 3000);
      correctGuessEffect();
      setTimeout(() => {showResults()}, 2000);
      return
    }
    // Check auf Basis der falschen Eingabe fehlt noch
    if (mistakeCounter === 10 || timer === 0) {
      gameRunning = !gameRunning;
      setTimeout(() => {
        timer = el("#timer-range").value;
        el("#timer").innerText = `${timer} Sek`;
      }, 3000);
      makePartsFall();
      setTimeout(() => {showResults()}, 2000);
      return
    }
    setTimeout(() => {
      checkEnd();
    }, 100);
  }

  function showResults() {
    el("#kasten-buchstaben").innerHTML = "<ul></ul>";
    // Auswertung mit verschiedenen Daten anzeigen lassen
    el("fieldset legend").innerText = "Deine Auswertung"
    stopTime = new Date();
    let time = stopTime - startTime;
    let text = create("p");
    text.innerText = `
    🎲 ${correct_word} war dein zufälliges Wort
    ⏱️  ${time / 1000} sek benötigt
    ❌  ${mistakeCounter} Fehleingaben gemacht`;
    el("#kasten-buchstaben").append(text);
    // Skizze und Wort ausblenden und durch Button fürs neue Spiel ersetzen
    el("#word-section").innerHTML = "";
    el(".galgen").classList.add("passiv");
    el("#text-place").className = "passiv";
    el("#new").classList.remove("passiv");
  }

  function newGame() {
    el("#new").className = "passiv";
    initVaris();
    loadGameField();
    el("#text-place").className = "";
  }

  function countdown() {
    if (timer != 0 && gameRunning) {
      timer --;
      el("#timer").innerText = `${timer} Sek`;
    }
  }

  function makePartsFall() {
    el('[data-id="104"]').classList.add("red");
    setTimeout(() => {
      group(".galgen div").forEach((part, index) => {
      part.classList.remove("passiv")
      if (index > 3) {
        part.classList.add('fall-down');
        part.classList.add("red");
      }
    });
    }, 500);
  }

  function correctGuessEffect() {
    group("#word-section p").forEach((p) => {
      p.style.color = "green";
    })
  }

  function changeTimer() {
    timer = parseInt(this.value);

    el("#timer").innerText = `${timer} Sek`;
  }

  function changeMode() {
    if (this.innerText === "Light Mode") {
      this.innerHTML = "<strong>Dark Mode</strong>";
      el("body").style.color = "black";
      el("body").style.background = "white";
    } else {
      this.innerHTML = "<strong>Light Mode</strong>";
      el("body").style.color = "white";
      el("body").style.background = "black";
    }
  }

  //##################################################


  document.addEventListener("keydown", keyDown);

  el("#timer-range").addEventListener("input", changeTimer);

  el("#switch").addEventListener("click", changeMode);

  el("#start").addEventListener("click", function() {
    loadGameField();
    setInterval(() => {
      countdown();
    }, 1000);
  });

  el("#new").addEventListener("click", function() {
    newGame();
    checkEnd();
  });

//###########################################################
  initVaris();
  checkEnd();
  console.log(correct_word);
}

gameOn();
