export const joinClasses = (styles: CSSModuleClasses, classes: string | undefined): string | null => {
	if (classes !== undefined) {
		return classes.split(' ').map(cl => styles[cl]).join(' ')
	}

	return null
}