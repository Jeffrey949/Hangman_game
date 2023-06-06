function gameOn() {
  let zufall, le, eingabe, mistakeCounter, correct_word, charIndex, charCounter, startTime, stopTime, timer;

  function initVaris() {
    le = wörter.length;
    zufall = Math.floor(Math.random() * le);
    eingabe = "";
    mistakeCounter = 0;
    correct_word = wörter[zufall].toUpperCase();
    charIndex = [];
    charCounter = 0;
    startTime = new Date();
    timer = 30;
  }


  function loadGameField() {
    let char;
    // Entferne Button
    el("#start").className = "passiv";
    // Feld für falsche Buchstaben einblenden
    el("fieldset").classList.remove("passiv");
    el("fieldset legend").innerHTML = "<strong>Deine falsch genannten Buchstaben</strong>"
    // Unterstriche abhängig der Wortlänge erstellen
    for (let i = 0; i < correct_word.length; i++) {
      char = create("p");
      char.innerHTML = "_";
      // char.id = "a" + i
      char.setAttribute("data-id", i);
      el('#word-section').append(char);
    }

    el(".galgen").classList.remove("passiv");

    // Alle komponenten des Galgenmänchen erhalten die klasse passiv

    group(".galgen div").forEach((div) => {
      div.classList.add("passiv");
    });

    el("#kasten-buchstaben").innerHTML = "<ul></ul>";
    el("#fehler").innerText = "Fehler: 0";
  }


  function keyDown(e) {
    // Speichern des eigegebenen Buchstaben (Uppercase)
    eingabe = e.key.toUpperCase();
    checkInput();
    drawSketch();
    console.log(charCounter);
    // checkEnd();
    el("#fehler").innerText = `Fehler: ${mistakeCounter}`;
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
      // Fehler mistakeCounter wird erhöht und falsche Buchstabe im Feld hinterlegt
      mistakeCounter += 1;
      char = create("li");
      char.innerText = eingabe;
      el('#kasten-buchstaben ul').append(char);
    }
  }

  function drawSketch() {
    // Abhängig der des mistakeCounter-Wertes, werden Teile der Skizze angezeigt
    if (mistakeCounter > 0 && mistakeCounter < 10) {
      // el(`#${mistakeCounter + 100}`).classList.remove("passiv");
      // document.getElementById((mistakeCounter + 100)).classList.remove("passiv")
      el(`[data-id="${mistakeCounter + 100}"]`).classList.remove("passiv");
    }
  }

  function checkEnd() {
    // Check ob das Wort gelöst wurde
    // Check auf Basis der falschen Eingabe fehlt noch
    if (charCounter === correct_word.length || mistakeCounter === 10 || timer === 0) {
      // Buchstaben Kasten leeren
      // el("#kasten-buchstaben ul").className = "passiv"
      el("#kasten-buchstaben").innerHTML = "<ul></ul>";
      // Auswertung mit verschiedenen Daten anzeigen lassen
      el("fieldset legend").innerText = "Deine Auswertung"
      stopTime = new Date();
      let time = stopTime - startTime;
      let text = create("p");
      text.innerText = `
      🎲 ${correct_word} war dein zufälliges Wort
      ⏱️  ${time / 1000} sek benötigt
      ❌  ${mistakeCounter} Fehleingaben gemacht`
      el("#kasten-buchstaben").append(text);
      // Skizze und Wort ausblenden und durch Button fürs neue Spiel ersetzen
      el("#word-section").innerHTML = ""
      el(".galgen").classList.add("passiv")
      el("#text-place").className = "passiv"
      el("#new").classList.remove("passiv");
      return
    }
    setTimeout(() => {
      checkEnd();
    }, 100);
  }

  function newGame() {
    el("#new").className = "passiv";
    initVaris();
    loadGameField();
    el("#text-place").className = "";
  }

  function countdown() {
    if (timer != 0) {
      timer --;
      el("#timer").innerText = `${timer} Sek`;
    }
  }

  //##################################################


  document.addEventListener("keydown", keyDown);

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
