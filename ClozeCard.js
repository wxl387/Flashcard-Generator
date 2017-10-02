var ClozeCard = function(fullText, cloze) {
	this.fullText = fullText;
	
	this.cloze = cloze;

	this.partial = function() {
		if (this.fullText.includes(this.cloze)) {
			
			return clozeDeleted = this.fullText.replace(this.cloze, '______');
			// console.log(clozeDeleted);

		} else {
			
			console.log("Error, because no \'" + this.cloze + "\'' in text")
		
		}
	};
};

module.exports = ClozeCard;