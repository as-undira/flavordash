export const fetchFoods = async () => {
  const response = await fetch(
    "https://6a0474f02afe8349b4b6a830.mockapi.io/foods",
  );

  const data = await response.json();

  return data;
};
