const formatStatusOutPutString = (slot, color, registrationNumber) => {
	let s = slot + 1 + '';
	let j = s.length;
	while (j < 10) {
		s += ' ';
		j++;
	}
	s += registrationNumber;
	j = s.length;
	while (j < 28) {
		s += ' ';
		j++;
	}
	s += color.charAt(0).toUpperCase() + color.slice(1);
	return s;
};

module.exports = { formatStatusOutPutString };
