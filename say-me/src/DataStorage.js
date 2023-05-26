export const saveData = (key, data) => {
  try {
    const serializedData = JSON.stringify(data);
    localStorage.setItem(key, serializedData);
  } catch (error) {
    console.error("Błąd podczas zapisywania danych w lokalnym:", error);
  }
};

export const loadData = (key) => {
  try {
    const serializedData = localStorage.getItem(key);
    if (serializedData === null) {
      return undefined;
    }
    return JSON.parse(serializedData);
  } catch (error) {
    console.error("Błąd podczas odczytywania danych lokalnych:", error);
    return undefined;
  }
};

export const clearLocalStorage = () => {
  try {
    localStorage.clear();
  } catch (error) {
    console.error("Błąd podczas czyszczenia danych lokalnych:", error);
  }
};
