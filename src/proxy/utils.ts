import {execa} from 'execa';

export const run = (cmd: string, args: string[]): Promise<string> => new Promise((resolve, _reject) => {
	const child = execa(cmd, args);
	const buffer = {
		stdout: '',
		stderr: '',
	};

	child.stdout?.on('data', (part: Buffer) => {
		const text = part.toString();

		buffer.stdout += text;

		console.log(text);
	});
	child.stderr?.on('data', (part: Buffer) => {
		const text = part.toString();

		buffer.stderr += text;

		console.log(text);
	});

	child.stdout?.on('end', () => resolve(buffer.stderr || buffer.stdout));
});

export const parseTable = (table: string, fallbackKey: string = 'unknown') => {
	const _rows = table.split('\n');
	const rows = _rows
		.filter(row => row.startsWith('|'));
	const headings = rows
		.splice(0, 1)[0]
		.split('|')
		.map(heading => heading.trim().toLowerCase())
		.slice(1, -1);
	const items: unknown[] = [];

	for (let i = 0; i < rows.length; i++) {
		const cols = rows[i]
			.split('|')
			.map(col => col.trim())
			.slice(1, -1);
		const item = {};

		for (let k = 0; k < cols.length; k++) {
			const col = cols[k];

			item[headings[k] || fallbackKey] = col;
		}

		items.push(item);
	}

	return items;
};
