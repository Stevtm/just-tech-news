const { format_date, format_plural } = require("../utils/helpers");

test("format_date() returns a date string", () => {
	const date = new Date("2020-03-20 16:12:03");

	expect(format_date(date)).toBe("3/20/2020");
});

test("format_plural() correctly pluralizes words", () => {
	let word = "tiger";
	let amount = 2;

	expect(format_plural(word, amount)).toBe("tigers");

	word = "lion";
	amount = 1;

	expect(format_plural(word, amount)).toBe("lion");
});
