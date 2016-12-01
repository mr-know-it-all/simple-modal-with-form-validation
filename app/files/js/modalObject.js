var _modalObject = {
  title: 'Add Product',
  subtitle: 'Second-hand Car',
  category: 'Automobiles',
  fields: ['titleOfAnouncement',
    'brand',
    'year',
    'mileage',
    'fuelType',
    'color',
    'damaged',
    'damageDescription',
    'price',
    'currency',
    'description'
  ],
  types: {
    'titleOfAnouncement': 'string',
    'brand': 'select',
    'year': 'select',
    'mileage': 'number',
    'fuelType': 'select',
    'color': 'color',
    'damaged': 'select',
    'damageDescription': 'string',
    'price': 'number',
    'currency': 'select',
    'description': 'string'
  },
  screenDependencies: {
	'damageDescription': 'damaged'  
  },
  template: '<div class="modalWrapper">' +
    '<div class="headerSection">' +
    '<div class="title">Add Product</div>' +
    '<div class="subtitle">Second-hand Car</div>' +
    '<div class="category">Automobiles</div>' +
    '</div>' +
    '<div class="contentSection">' +
    '<div class="section-1">' +
    '<div class="field">' +
    '<div class="label">Title of Anouncement</div>' +
    '<input id="titleOfAnouncement" autofocus />' +
    '</div>' +
    '<div class="field">' +
    '<div class="label">Brand</div>' +
    '<select id="brand">' +
    '<option value="" disabled selected>Select Brand</option>' +
    '<option value="volvo">Volvo</option>' +
    '<option value="mercedes">Mercedes</option>' +
    '<option value="audi">Audi</option>' +
    '<option value="jaguar">Jaguar</option>' +
    '</select>' +
    '</div>' +
    '<div class="field">' +
    '<div class="label">Manufacturing Year</div>' +
    '<select id="year">' +
    '<option value="" disabled selected>Select Year</option>' +
	 '<option value="1999">1999</option>' +
	 '<option value="2000">2000</option>' +
	 '<option value="2001">2002</option>' +
	 '<option value="2003">2003</option>' +
    '</select>' +
    '</div>' +
    '<div class="field">' +
    '<div class="label">Mileage</div>' +
    '<input id="mileage" />' +
    '</div>' +
    '<div class="field">' +
    '<div class="label">Fuel Type</div>' +
    '<select id="fuelType">' +
    '<option value="" disabled selected>Select Fuel Type</option>' +
    '<option value="diesel">Diesel</option>' +
    '<option value="gas">Gas</option>' +
    '<option value="hybrib">Hybrib</option>' +
    '<option value="electric">Electric</option>' +
    '</select>' +
    '</div>' +
    '<div class="field">' +
    '<div class="label">Color</div>' +
    '<input id="color" />' +
    '<span id="color-view"></span>' +
    '</div>' +
    '</div>' +
    '<div class="section-2">' +
    '<div class="field">' +
    '<div class="label">Damaged</div>' +
    '<select id="damaged">' +
    '<option value="" disabled selected>Yes/No</option>' +
    '<option value="true">Yes</option>' +
    '<option value="false">No</option>' +
    '</select>' +
    '</div>' +
    '<div class="field">' +
    '<div class="label">Damage Description</div>' +
    '<input id="damageDescription" />' +
    '</div>' +
    '<div class="field">' +
    '<div class="label">Price</div>' +
    '<input id="price" />' +
    '</div>' +
    '<div class="field">' +
    '<div class="label">Currency</div>' +
    '<select id="currency">' +
    '<option value="" disabled selected>Select Currency</option>' +
    '<option value="usd">USD</option>' +
    '<option value="eur">EUR</option>' +
    '<option value="lei">LEI</option>' +
    '</select>' +
    '</div>' +
    '<div class="field">' +
    '<div class="label">Description</div>' +
    '<input id="description" />' +
    '</div>' +
    '</div' +
    '</div>' +
    '</div>' +
    '</div>' +
    '<div class="footerSection">' +
    '<div class="buttonWrapper">' +
    '<button id="saveNewCarButton">Save</button>' +
    '<button id="cancelNewCarButton">Cancel</button>' +
    '</div>' +
    '</div>' +
    '</div>'
}