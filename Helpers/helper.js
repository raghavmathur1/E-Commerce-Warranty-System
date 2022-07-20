const bcrypt = require("bcrypt");

const encrypt = async (text) => {
	const salt = await bcrypt.genSalt(10);
	const hashedText = await bcrypt.hash(text, salt);
	return hashedText;
};

module.exports = {
	encrypt,
};
