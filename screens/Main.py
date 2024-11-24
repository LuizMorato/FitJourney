import requests

food_name = "arroz"
url = f"https://taco-food-api.herokuapp.com/api/v1/food/{food_name}"

try:
    response = requests.get(url)
    response.raise_for_status()
    data = response.json()
    print(f"Informações sobre {food_name}:", data)
except requests.exceptions.RequestException as e:
    print(f"Erro ao buscar alimento: {e}")
