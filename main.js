window.onload = () => {
    // Selectores
    button = document.querySelector(".button");
    text = document.querySelector(".text");
    timeDOM = document.querySelector(".time");
    record = document.querySelector(".record");
    clicks = document.querySelector(".clicks");
    reset = document.querySelector(".reset");


    // Otras variables
    time = timeDOM.value; // En segundos
    score = 0;

    
    if (localStorage.getItem("bestScore") == undefined) {
        localStorage.setItem("bestScore", 0);
    }
    
    clickado = false;
    
    // Funcionalidad
    clicks.textContent = "Clicks x segundos: 0";
    reset.onclick = () => {
        reset.style.backgroundColor = "#949494";
        reset.style.pointerEvents = "none";
        score = 0;
        timeDOM.disabled=false;
        timeDOM.value = 10;
        text.style.fontSize = "4em";
        clickado = false;
        clicks.textContent = "Clicks x segundos: " + (score / timePrincipal).toFixed(2);
        clearInterval(id);
    }


    timeDOM.onkeypress = (e) => {
        return !(e.keyCode < 48 || e.keyCode > 57);
    } 

    record.innerText = "Récord: " + localStorage.getItem("bestScore");
    
    timeDOM.onkeyup = () => {
        if (timeDOM.value == "")
            timeDOM.value = 10;
    }
    timeDOM.value = time;

    button.onmouseup = () => {
        button.classList.remove("animacion");
    }

    button.onmousedown = () => {
        button.classList.add("animacion");
    }

    button.onclick = () => {
        score++;
        text.textContent = score;

        if (!clickado) {
            timePrincipal = timeDOM.value;
            startTime();
            text.style.fontSize = "7em";
            reset.style.pointerEvents = "auto";
            reset.style.backgroundColor = "#fc4e4e";
            clickado = true;
        } 
    }
}

function startTime() {
    target = new Date();
    target = target.getSeconds();
    now = new Date();
    now = now.getSeconds()  + (timePrincipal*1);
    timeDOM.disabled=true;
    id = setInterval(updateCountdown, 1000);
    
}

function updateCountdown() {
    now--;
    res = target - now;
    timeDOM.value = -res;

    if (timeDOM.value == "0") {
        clicks.textContent = "Clicks x segundos: " + (score / timePrincipal).toFixed(2);
        clearInterval(id);

        if (score > localStorage.getItem("bestScore")) {
            localStorage.setItem("bestScore", score);
            record.innerText = "Récord: " + localStorage.getItem("bestScore");

        }

        reset.style.backgroundColor = "#949494";
        reset.style.pointerEvents = "none";
        score = 0;
        timeDOM.disabled=false;
        timeDOM.value = 10;
        text.style.fontSize = "4em";
        clickado = false;
    }
}
