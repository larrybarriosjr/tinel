export enum ApiReducerKeys {
  CATEGORIES = "categoriesApi",
  ORDERS = "ordersApi",
  USERS = "usersApi",
  WORKSHOPS = "workshopsApi"
}

export enum Colors {
  YELLOW = "var(--yellow)",
  LIGHT_YELLOW = "var(--light-yellow)",
  BLUE = "var(--blue)",
  LIGHT_BLUE = "var(--light-blue)",
  RED = "var(--red)",
  BLACK = "var(--black)",
  WHITE = "var(--white)",
  LIGHT_GREY = "var(--light-grey)",
  LIGHTER_GREY = "var(--lighter-grey)",
  DARKER_GREY = "var(--darker-grey)"
}

export enum Genders {
  MALE = "male",
  FEMALE = "female",
  OTHER = "other"
}

export enum Routes {
  HOME = "/",
  WORKSHOP = "/workshop/",
  WORKSHOP_PATH = "/workshop/:id"
}

export enum WorkshopCategories {
  ALL = "all",
  DESIGN = "design",
  FRONTEND = "frontend",
  BACKEND = "backend",
  MARKETING = "marketing"
}
