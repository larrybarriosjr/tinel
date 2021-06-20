/// <reference types="react-scripts" />

declare namespace NodeJS {
  interface ProcessEnv {
    REACT_APP_BASE_URL: string
    REACT_APP_CATEGORIES_URL: string
    REACT_APP_ORDERS_URL: string
    REACT_APP_USERS_URL: string
    REACT_APP_WORKSHOPS_URL: string
    REACT_APP_WORKSHOPS_PAGE: string
    REACT_APP_WORKSHOPS_LIMIT: string
  }
}
