fetch('./questions.json') // Lire le fichier JSON
  .then(response => response.json()) 
  .then(data => {
    const questions = data;
    

    const questionElement = document.getElementById("questions"); 
    const answerButtons = document.getElementById("answer_buttons");
    const nextButton = document.getElementById("next-btn");


    let currentQuestionIndex = 0; 
    let score = 0; 


    // Fonction pour commencer le quizz
    function startQuiz(){
        currentQuestionIndex = 0; // index des questions à 0
        score = 0;  // score initialisé à 0
        nextButton.innerHTML = 'Suivant'; 
        showQuestion(); 
    }


    // fonction qui permet d'afficher les questions au fur et à mesure
    function showQuestion(){
        resetState(); // fonction pour supprimer les questions / réponses affichés
        let currentQuestion = questions[currentQuestionIndex]; 

        // affichage de la question 
        let questionNo = currentQuestionIndex + 1; 
        questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

        // ajout des choix de réponses
        for (var i = 0; i < currentQuestion.options.length; i++) {
            const button = document.createElement("button");
            button.innerHTML = currentQuestion.options[i];
            button.classList.add("btn");
            answerButtons.appendChild(button);
            if (i==currentQuestion.answer){ // vérifier si la réponse est correcte 
                button.dataset.correct = "true"; 
            }
            button.addEventListener("click", selectAnswer);
        }

    }


    // fonction pour effacer la question / réponse afficher (dans le but d'afficher la suivante)
    function resetState(){
        nextButton.style.display = "none"; 
        while(answerButtons.firstChild){
            answerButtons.removeChild(answerButtons.firstChild);
        }
    }


    // fonction pour vérifier si la réponse est correcte
    function selectAnswer(e){
        const selectedBtn = e.target;
        const isCorrect = selectedBtn.dataset.correct === "true";
        if(isCorrect){
            selectedBtn.classList.add("correct"); // ajouter une class "correct" qu'on utilisera dans le CSS
            score++; // si la réponse est correcte, on incremente
        }else{
            selectedBtn.classList.add("incorrect"); // ajouter une class "incorrect" qu'on utilisera dans le CSS
        }
        Array.from(answerButtons.children).forEach(button => {
            if(button.dataset.correct === "true"){
                button.classList.add("correct");
            }
            button.disabled = true;
        });
        nextButton.style.display = "block";
    }


    // fonction pour afficher le score à la fin du QUIZZ
    function showScore(){
        resetState();
        questionElement.innerHTML = `Votre Score est de ${score} sur ${questions.length}!!`;
        nextButton.innerHTML = "Nouvelle Partie";
        nextButton.style.display = "block";
    }

    // vérifier si il y'a encore des questions ou pas afin d'afficher la prochaine question ou le score si cétait la dernière question
    function handleNextButton(){
        currentQuestionIndex++;
        if(currentQuestionIndex < questions.length){
            showQuestion();
        }else{
            showScore();
        }
    }

    // gestion du click du bouton next lorsquil s'affiche
    nextButton.addEventListener("click", () =>{
        if(currentQuestionIndex <  questions.length){
            handleNextButton();
        }else{
            startQuiz();
        }
    })
    startQuiz();
  })
  .catch(error => console.error('Error reading the JSON file:', error));
