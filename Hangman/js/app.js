function gameOn() {
  let zufall, le, eingabe, counter, correct_word, charIndex;

  function initVaris() {
    le = wörter.length;
    zufall = Math.floor(Math.random() * le);
    eingabe = "";
    counter = 0;
    correct_word = wörter[zufall].toUpperCase();
    charIndex = [];
  }


  function loadGameField() {
    let char;
    // Unterstriche abhängig der Wortlänge erstellen
    for (let i = 0; i < correct_word.length; i++) {
      char = create("p")
      char.innerHTML = "_"
      char.id = i
      el('#word-section').append(char);
    }
  }


  function keyDown(e) {
    // Speichern des eigegebenen Buchstaben (Uppercase)
    eingabe = e.key.toUpperCase();
    checkInput();
    // showChar();
    drawSketch();

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
        document.getElementById(charIndex[i]).innerText = correct_word[charIndex[i]];
        // el(`#${charIndex[i]}`).innerText = correct_word[charIndex[i]];
      }
      // Fall für falsche Eingabe
    } else {
      // Fehler Counter wird erhöht und falsche Buchstabe im Feld hinterlegt
      counter += 1;
      char = create("li");
      char.innerText = eingabe;
      el('#kasten-buchstaben ul').append(char);
    }
  }

  function drawSketch() {
    // Abhängig der des Counter-Wertes, werden Teile der Skizze angezeigt
    if (counter > 0 && counter < 10) {
      // el(`#${counter + 100}`).classList.remove("passiv");
      document.getElementById((counter + 100)).classList.remove("passiv")
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
