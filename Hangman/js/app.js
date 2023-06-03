function gameOn() {
  let zufall, le, eingabe, counter, correct_word;

  function initVaris() {
    le = wörter.length;
    zufall = Math.floor(Math.random() * le);
    eingabe = "";
    counter = 0;
    correct_word = wörter[zufall];
  }


  function loadGameField() {
    let char;
    for (let i = 0; i < correct_word.length; i++) {
      char = create("p")
      char.innerHTML = "_"
      char.id = i
      el("#word-section").append(char);
    }
  }



  initVaris();
  loadGameField();

}

gameOn();
