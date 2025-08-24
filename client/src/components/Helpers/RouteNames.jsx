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
export const RouteEditProduct = (productid) => {
  if (productid) {
    return `/product/add/${productid}`;
  } else {
    return "/product/add/:productid";
  }
};
