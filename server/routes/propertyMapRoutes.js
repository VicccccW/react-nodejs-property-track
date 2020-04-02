const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.type('.js');
  res.send(
    `$Lightning.use(
      'c:propertyMapAuraAppContainer',
      () => {
        $Lightning.createComponent(
          "c:propertyMap",
          {},
          "propertyMap"
        )
      },
      'https://customization-ability-6375-dev-ed.lightning.force.com'
      
      );`
  );
});

module.exports = router;