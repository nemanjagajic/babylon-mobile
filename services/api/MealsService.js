import ApiService from '../ApiService'


const API_ENDPOINTS = {
  MEALS: '/meals/',
  SIDE_DISHES: '/side_dishes/'
}

class MealsService extends ApiService {
  getMeals = () => this.apiClient.get(API_ENDPOINTS.MEALS)

  getSideDishes = () => this.apiClient.get(API_ENDPOINTS.SIDE_DISHES)
}
export default new MealsService()