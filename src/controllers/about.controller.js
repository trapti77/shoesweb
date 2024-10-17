const aboutPage = async (req, res) => {
  res.render("about");
};

const cartPage = async (req, res) => {
  res.render("cart");
};
export { aboutPage, cartPage };
