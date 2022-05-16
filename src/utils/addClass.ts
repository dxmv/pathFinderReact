const addClass = (id: string, elClass: string) => {
	document.getElementById(id)?.classList.add(elClass);
};

export default addClass;
