function gameOn() {
  let zufall, le, eingabe, mistakeCounter, correct_word, charIndex, charCounter;

  function initVaris() {
    le = wörter.length;
    zufall = Math.floor(Math.random() * le);
    eingabe = "";
    mistakeCounter = 0;
    correct_word = wörter[zufall].toUpperCase();
    charIndex = [];
    charCounter = 0;
  }


  function loadGameField() {
    let char;
    // Unterstriche abhängig der Wortlänge erstellen
    for (let i = 0; i < correct_word.length; i++) {
      char = create("p")
      char.innerHTML = "_"
      // char.id = "a" + i
      char.setAttribute("data-id", i)
      el('#word-section').append(char);
    }
  }


  function keyDown(e) {
    // Speichern des eigegebenen Buchstaben (Uppercase)
    eingabe = e.key.toUpperCase();
    checkInput();
    // showChar();
    drawSketch();
    console.log(charCounter);
    checkEnd();
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
    if (charCounter === correct_word.length) {
      // Kasten Buchstaben verschwinden lassen
      el("#kasten-buchstaben").className = "passiv"
      // Text Ausgabe mit der verbrauchten Zeit
      // verbrauchte Klicks

    }
  }

  // function showChar() {
  //   for (let i = 0; i < charIndex.length; i++) {
  //     document.getElementById(charIndex[i]).innerText = correct_word[charIndex[i]];
  //     // el(`#${charIndex[i]}`).innerText = correct_word[charIndex[i]];
  //   }
  // }


  // function keyUp(e) {

  // }


  document.addEventListener("keydown", keyDown)
  // document.addEventListener("keyup", keyUp)
  initVaris();
  loadGameField();
  // checkInput();
  console.log(correct_word);


}

gameOn();
