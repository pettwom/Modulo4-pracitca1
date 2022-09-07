const fs = require("fs");

//Handlers
exports.getAllProducts = (req, res) => {
  const products = JSON.parse(
    fs.readFileSync(`${__dirname}/../data/products.json`)
  );

  res.status(200).json({
    status: "success",
    timeOfRequest: req.requestTime,
    results: products.length,
    data: {
      products,
    },
  });
};

exports.getProductById = (req, res) => {
  const products = JSON.parse(
    fs.readFileSync(`${__dirname}/../data/products.json`)
  );

  const foundProduct = products.find((p) => p.id == req.params.id);
  if (foundProduct) {
    res.status(200).json({
      status: "success",
      data: {
        product: foundProduct,
      },
    });
  } else {
    res.status(404).json({
      status: "not found",
    });
  }
};

exports.addProduct = (req, res) => {
  const products = JSON.parse(
    fs.readFileSync(`${__dirname}/../data/products.json`)
  );
  products.push(req.body);
  fs.writeFileSync(`${__dirname}/../data/products.json`, JSON.stringify(products));

  res.status(200).json({
    status: "success",
    data: {
      products,
    },
  });
};

exports.deleteProductById = (req, res) => {
  const products = JSON.parse(
    fs.readFileSync(`${__dirname}/../data/products.json`)
  );
  var deleteProducts = '';
  products.forEach((s, d) => {
    if (s.id == req.params.id) {
      deleteProducts = products.splice(d, 1)
    }
  });
  if (deleteProducts) {
    fs.writeFileSync(`${__dirname}/../data/products.json`, JSON.stringify(products));
    res.status(200).json({
      status: "success",
      data: {
        products,
      },
    });
  } else {
    res.status(404).json({
      status: "Error",
      message: "Algo Salio mal, Intentelo nuevamente!!"
    });
  }
};
exports.updateProductById = (req, res) => {
  const products = JSON.parse(
    fs.readFileSync(`${__dirname}/../data/products.json`)
  );

  sw = 0;
  products.forEach((s, d) => {
    if (s.id == req.params.id) {
      s.name = req.body.name
      s.price = req.body.price
      s.category = req.body.caterory
      sw = 1;
    }
  });
  fs.writeFileSync(`${__dirname}/../data/products.json`, JSON.stringify(products));
  if (sw == 1) {
    res.status(200).json({
      status: 200,
      message: products
    });
  } else {
    res.status(404).json({
      status: 404,
      message: "Algo Salio Mal, Vuelva a intentarlo"
    })
  }
}