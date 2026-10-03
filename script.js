const numberDisplay = document.getElementById("number");
const startButton = document.getElementById("startButton");
const answerArea = document.getElementById("answerArea");
const answerInput = document.getElementById("answer");
const submitButton = document.getElementById("submitButton");
const resultDisplay = document.getElementById("result");

const digitsSelect = document.getElementById("digits");
const countSelect = document.getElementById("count");
const speedSelect = document.getElementById("speed");

let correctAnswer = 0;
let isRunning = false;


// 指定した桁数のランダムな数字を作る
function createNumber(digits) {
    const min = Math.pow(10, digits - 1);
    const max = Math.pow(10, digits) - 1;

    return Math.floor(Math.random() * (max - min + 1)) + min;
}


// フラッシュ暗算を開始
async function startGame() {

    if (isRunning) {
        return;
    }

    isRunning = true;

    // 設定を取得
    const digits = Number(digitsSelect.value);
    const count = Number(countSelect.value);
    const speed = Number(speedSelect.value);

    // 初期化
    correctAnswer = 0;
    answerArea.classList.add("hidden");
    resultDisplay.textContent = "";
    answerInput.value = "";

    startButton.disabled = true;

    // 数字を順番に表示
    for (let i = 0; i < count; i++) {

        const number = createNumber(digits);

        correctAnswer += number;

        numberDisplay.textContent = number;

        await wait(speed);
    }

    // 数字を消す
    numberDisplay.textContent = "";

    // 回答欄を表示
    answerArea.classList.remove("hidden");

    answerInput.focus();

    isRunning = false;
    startButton.disabled = false;
}


// 指定時間待つ
function wait(milliseconds) {
    return new Promise(resolve => {
        setTimeout(resolve, milliseconds);
    });
}


// 回答を判定
function checkAnswer() {

    const userAnswer = Number(answerInput.value);

    if (userAnswer === correctAnswer) {

        resultDisplay.textContent = "正解！";

    } else {

        resultDisplay.textContent =
            `不正解。正解は ${correctAnswer} です。`;
    }
}


// スタートボタン
startButton.addEventListener("click", startGame);


// 回答ボタン
submitButton.addEventListener("click", checkAnswer);


// Enterキーでも回答できるようにする
answerInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {
        checkAnswer();
    }

});