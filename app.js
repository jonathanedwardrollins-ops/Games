(function () {
  const qEl = document.getElementById("question");
  const aWrap = document.getElementById("answer");
  const aText = document.getElementById("answerText");
  const sourceWrap = document.getElementById("sourceWrap");
  const sourceText = document.getElementById("sourceText");
  const revealBtn = document.getElementById("revealBtn");
  const nextBtn = document.getElementById("nextBtn");
  const resetBtn = document.getElementById("resetBtn");
  const progressEl = document.getElementById("progress");

  let deck = shuffle([...QUESTIONS]);
  let index = 0;
  let revealed = false;

  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function setProgress() {
    progressEl.textContent = `Question ${index + 1} of ${deck.length}`;
  }

  function render() {
    const item = deck[index];
    qEl.textContent = item.q;
    aText.textContent = item.a;
    sourceWrap.hidden = true;
    revealed = false;
    aWrap.hidden = true;
    revealBtn.disabled = false;
    nextBtn.disabled = true;
    setProgress();
  }

  function reveal() {
    if (revealed) return;
    revealed = true;
    aWrap.hidden = false;
    nextBtn.disabled = false;
  }

  function next() {
    if (index < deck.length - 1) {
      index++;
      render();
    } else {
      qEl.textContent = "End of deck! 🎉";
      aText.textContent = "Press Reset to start over.";
      aWrap.hidden = false;
      revealBtn.disabled = true;
      nextBtn.disabled = true;
      progressEl.textContent = `All ${deck.length} questions complete`;
    }
  }

  function reset() {
    deck = shuffle([...QUESTIONS]);
    index = 0;
    render();
  }

  revealBtn.addEventListener("click", reveal);
  nextBtn.addEventListener("click", next);
  resetBtn.addEventListener("click", reset);

  render();
})();