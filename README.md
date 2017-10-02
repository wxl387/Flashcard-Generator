# Flashcard-Generator
user can play 'basic' and 'cloze-deleted' flashcards.
user can 'add-cards'

Two constructor:
(1)BasicCard.js
(2)ClozeCard.js

Two Lib:
(1)variable 'cards' in log.js, which is a array contains some pre-build questions in object form.
(2)cards-library.txt, which is a place saving new cards user added. (Could display current cards in deck.

app.js:
(1)3 operators: basic, cloze-deleted, add-cards
(2)4 functions: play-basic-cards, play-cloze-deleted-cards, add-cards, and ask user what is next step

Unsolved Problem:
unable to update 'cards' variable in log.js if user add new cards.
