export const RouteIndex = "/";
export const RouteSignUp = "/sign-up";
export const RouteSignIn = "/sign-in";
export const RouteProfile = "/profile";
export const RouteCategoryDetails = "/categories";
export const RouteAddCategory = "/category/add";
export const RouteEditCategory = (category_id) => {
  if (category_id) {
    return `/categories/add/${category_id}`;
  } else {
    return "/categories/add/:category_id";
  }
};
export const RouteProduct = "/product";
export const RouteAddProduct = "/product/add";
export const RouteEditProduct = (product_id) => {
  if (product_id) {
    return `/product/add/${product_id}`;
  } else {
    return "/product/add/:product_id";
  }
};
