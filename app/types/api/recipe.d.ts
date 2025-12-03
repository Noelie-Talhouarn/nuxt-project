type Recipe = {
  recipe_id: number
  title: string
  description: string
  image_url: string
  cuisine_name: Cuisine ['name']
  goal_name: string
  diet_name: string
  allergy_name: string
}
type RecipeIngredient = {
  ingredient_id: number;
  name: string;
  unit: string;
  quantity: string;
}

type recipeInstruction = {
  instruction_id: number;
  step_number: number;
  description: string;
}

type fullRecipe = Recipe & {
  instructions: recipeInstruction[]
  ingredients: RecipeIngredient[]
  user_id: number
}