const form = document.querySelector("form");
const resultat = document.querySelector(".resultats h2");
const note = document.querySelector(".note");
const aide = document.querySelector(".aide");
let tableauResultats = [];
let tableauReponses = ["c", "a", "b", "a", "c"];
let bonnesReponses = 0;
let questionBlocks = document.querySelectorAll(".question-block");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log(document.querySelector("input[name=\"q1\"]:checked").value);

    for (let i = 1 ; i <= 5; i++){
        tableauResultats.push(document.querySelector(`input[name="q${i}"]:checked`).value);
    }
    console.log(tableauResultats);
    compareReponses();
    afficherResultats();
    tableauResultats = [];
    bonnesReponses = 0;
});

questionBlocks.forEach((element) => { 
        element.addEventListener("click", () => {
            element.style.backgroundColor = "white";
        })
    })

function compareReponses(){
    for (let i = 0 ; i < 5; i++){
        if (tableauResultats[i] == tableauReponses[i]){
            bonnesReponses++;
            questionBlocks[i].style.backgroundColor = "lightGreen"
        }
        else {
            questionBlocks[i].style.backgroundColor = "pink"
            questionBlocks[i].classList.add("echec");

            setTimeout(() => {
                questionBlocks[i].classList.remove("echec");
            }, 500);
        }
    }
    
    console.log(bonnesReponses);
}

function afficherResultats(){
    switch (bonnesReponses) {
        case 0:
            resultat.innerText = `👎 Peux mieux faire ! 👎`;
            aide.innerText = 'Retentez une autre réponse dans les cases rouges, puis re-validez !';
            note.innerText = bonnesReponses + "/5";
            break;
        
        case 1:
            resultat.innerText = `😭 Peux mieux faire ! 😭`;
            aide.innerText = 'Retentez une autre réponse dans les cases rouges, puis re-validez !';
            note.innerText = bonnesReponses + "/5";
            break;

        case 2:
            resultat.innerText = `👀 Il reste quelques erreurs. 😭`;
            aide.innerText = 'Retentez une autre réponse dans les cases rouges, puis re-validez !';
            note.innerText = bonnesReponses + "/5";
            break;

        case 3:
            resultat.innerText = `✨ Encore un effort ... 👀`;
            aide.innerText = 'Retentez une autre réponse dans les cases rouges, puis re-validez !';
            note.innerText = bonnesReponses + "/5";
            break;

        case 4:
            resultat.innerText = `✨ Vous y êtes presque ! ✨`;
            aide.innerText = 'Retentez une autre réponse dans la case rouge, puis re-validez !';
            note.innerText = bonnesReponses + "/5";
            break;
        
        case 5:
            resultat.innerText = `✔️ Bravo, c'est un sans faute ! ✔️`;
            aide.innerText = '';
            note.innerText = bonnesReponses + "/5";
            break;

        default:
            'Wops, cas innatendu.';
            break;
    }
}

