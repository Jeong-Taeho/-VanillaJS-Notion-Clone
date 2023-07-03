const storage = window.localStorage

export const getItem = (key, defaultValue) => {
	try {
		const storedValue = storage.getItem(key)

		return storedValue ? JSON.parse(storedValue) : defaultValue
	} catch (e) {
		alert(e.message)
		return defaultValue
	}
}

export const setItem = (key, value) => {
	storage.setItem(key, value)
}

export const removeItem = key => {
	storage.removeItem(key)
}
