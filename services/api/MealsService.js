import ApiService from '../ApiService'


const API_ENDPOINTS = {
  MEALS: '/meals/',
}

class MealsService extends ApiService {
  getMeals = () => this.apiClient.get(API_ENDPOINTS.MEALS)
}
export default new MealsService()