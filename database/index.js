const mongoose = require('mongoose');
const overviewsData = require('./data.js');

mongoose.connect('mongodb://localhost/cavatable_overviews');

const overviewSchema = new mongoose.Schema({
  rest_id: Number,
  rest_name: String,
  dining_style: String,
  cuisines: String,
  hours_of_operation: {
    breakfast: String,
    lunch: String,
    dinner: String,
  },
  phone_number: String,
  website: String,
  payment_options: String,
  dress_code: String,
  executive_chef: String,
  address: String,
  neighborhood: String,
  cross_street: String,
  parking_details: String,
  public_transit: String,
  tags: [{ tagName: String, voteCount: Number }],
});

const OverviewModel = mongoose.model('Overview', overviewSchema);

OverviewModel.remove({})
  .then(() => OverviewModel.insertMany(overviewsData))
  .then(() => console.log('Successfully stored in database'))
  .catch(err => console.error(err));

const retrieve = (restaurantId, handleResponse) => {
  OverviewModel.find({ rest_id: parseInt(restaurantId, 10) })
    .then(results => handleResponse(null, results))
    .catch(err => handleResponse(err, null));
};

module.exports.retrieve = retrieve;
