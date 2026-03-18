import type { CSSProperties } from 'react';

interface FontModule {
	[fontName: string]: () => {
		style: CSSProperties;
		className: string;
		variable: string;
	};
}

function mockNextFontGoogle(fontNames: string | Array<string>): FontModule {
	const names = Array.isArray(fontNames) ? fontNames : [fontNames];
	return Object.fromEntries(
		names.map((name) => {
			const lower = name.toLowerCase();
			return [
				name,
				() => ({
					style: { fontFamily: `mocked-${lower}-font-family`, fontStyle: 'normal' },
					className: `mocked-${lower}-class-name`,
					variable: `--font-${lower}`,
				}),
			];
		}),
	);
}

export default mockNextFontGoogle;
