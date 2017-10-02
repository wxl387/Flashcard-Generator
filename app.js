var inquirer = require("inquirer");
var fs = require("fs");

var BasicCard = require("./BasicCard.js");
var ClozeCard = require("./ClozeCard.js");
var BuildCards = require("./BuildCards.js");
var cards = require("./log.js");

var tempSave = "cards-library.txt";

var counter = 0;

var playBasic = function () {
	if (counter < cards.length) {
		var question = cards[counter].front;
		var answer = cards[counter].back;

		var basicFlashCard = new BasicCard(question, answer);

		inquirer.prompt ([
			{
				type: "input",
				name: "guess",
				message: String(basicFlashCard.front)
			}
		]).then(function(userAnswer) {
			console.log("Your answer: " + userAnswer.guess + "\nCorrect answer: " + basicFlashCard.back);
			if (userAnswer.guess.toLowerCase() === basicFlashCard.back.toLowerCase()) {
				console.log("You are right");
			} else {
				console.log("You are wrong");
			}	

			counter++;
			playBasic();
		});
	} 
	else {
		console.log("\nYou have played all of the cards\n");
		nextStep();
	}	
};

var playColzeDeleted = function () {
	if (counter < cards.length) {
		var fullText = cards[counter].fullText;
		var cloze = cards[counter].back;

		var clozeFlashCard = new ClozeCard(fullText, cloze);

		inquirer.prompt (
			{
				type: "input",
				name: "guess",
				message: clozeFlashCard.partial()
			}
		).then(function(userAnswer) {
			console.log("Your answer: " + userAnswer.guess + "\nCorrect answer: " + clozeFlashCard.cloze);
			if (userAnswer.guess.toLowerCase() === clozeFlashCard.cloze.toLowerCase()) {
				console.log("You are right");
			} else {
				console.log("You are wrong");
			}			

			counter++;
			playColzeDeleted();
		});
	} 
	else {
			console.log("\nYou have played all of the cards\n");
			nextStep();

	}
};

var addCards = function() {
	console.log("\nNew Card\n");
	inquirer.prompt([
		{
			type: "input",
			name: "front",
			message: "What is on the \'front\'?"
		},
		{
			type: "input",
			name: "back",
			message: "What is on the \'back\'?"
		},
		{
			type: "input",
			name: "fullText",
			message: "What is the full text?"
		}
	]).then(function(adding) {
		var newCard = new BuildCards(adding.front, adding.back, adding.fullText);

		try{
		fs.appendFileSync(tempSave, "{\nfront: " + newCard.front + "\nback: " + newCard.back + "\nfullText: " + newCard.fullText);
			console.log("\nNew card has been added to the deck.\n");
		}catch (e) {
			console.log("New card cannot be added", e)
		}
			
		cards.push({
			front: newCard.front,
			back: newCard.back,
			fullText: newCard.fullText
		});
		
		console.log(cards);
		nextStep();
	});
};

var nextStep = function() {
	inquirer.prompt ([
			{
				type: "confirm",
				name: "Next",
				message: "Do you want to \"add more cards\"?"
			}
		]).then(function(reply) {
			if (reply.Next === true) {
				addCards();
			}
			else {
				console.log("Let's try something new");
				inquirer.prompt ([
					{
						type: "confirm",
						name: "Next",
						message: "Do you want to play \"basic\" flashcards?"
					}
				]).then(function(reply) {
					if (reply.Next === true) {
						counter = 0;
						playBasic();
					}
					else {
						console.log("Ok, let's try more.");
						inquirer.prompt ([
							{
								type: "confirm",
								name: "Next",
								message: "Do you want to play \"cloze-deleted\" flashcards?"
							}
						]).then(function(reply) {
							if (reply.Next === true) {
								counter = 0;
								playColzeDeleted();
							}
							else {
								return(console.log("See you later"));
							}
						});
					}
				});
			}
		});
}

var pick = function(cardType) {
	switch (cardType) {
	   	case 'basic':
	    	playBasic();
	      	break;
	    
	    case 'cloze-deleted':
	      	playColzeDeleted();
	      	break;

	    case 'add-cards':
	    	addCards();
	    	break;

	    default:
	      	console.log("I don\'t understand, do you want to \'add-cards\' or play \'basic\', \'cloze-deleted\' flashcards?");
	}
}

var runThis = function(type) {
	pick(type);
};

runThis(process.argv[2]);

module.exports = addCards;