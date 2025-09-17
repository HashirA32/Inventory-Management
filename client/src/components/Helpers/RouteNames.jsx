export const RouteIndex = "/";
export const RouteSignUp = "/sign-up";
export const RouteSignIn = "/sign-in";
export const RouteProfile = "/profile";
export const RouteUser = "/user";
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
export const RouteAddProductByFile = "/product/upload-excel";
export const RouteEditProduct = (productid) => {
  if (productid) {
    return `/product/add/${productid}`;
  } else {
    return "/product/add/:productid";
  }
};

export const RouteProductDetails = (category, product) => {
  if (!category || !product) {
    return "/product/:category/:product";
  } else {
    return `/product/${category}/${product}`;
  }
};
export const RouteProductByCategory = (category) => {
  if (!category) {
    return "/product/:category";
  } else {
    return `/product/${category}`;
  }
};
export const RouteBuyProduct = (slug) => {
  if (slug) return `/product/buy/${slug}`;
  return "/product/buy/:slug";
};

export const RouteProductSearch = (q) => {
  if (q) {
    return `/search?q=${q}`;
  } else {
    return "/search";
  }
};
