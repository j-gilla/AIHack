const mongoose = require('mongoose');
const Group = require('./groupsSchema.js');
const async = require('async');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});

const groups = [
  { name: 'Jogging Group', location: 'Manchester', organiserName: 'Matthew Broderick', organiserPhone: 447706212658 },
  { name: 'Reading Lovers Club', location: 'Sheffield', organiserName: 'Andrew Stevenson', organiserPhone: 447706212658 },
  { name: 'Yoga Club', location: 'Nottingham', organiserName: 'Lucy Townsend', organiserPhone: 447706212658 },
  { name: 'Football Group', location: 'Northampton', organiserName: 'Andrew Stubbs', organiserPhone: 447706212658 },
  { name: 'Knitting Club', location: 'Newcastle', organiserName: 'Ali Khan', organiserPhone: 447706212658 },
  { name: 'Badminton Club', location: 'Leeds', organiserName: 'Hannah Montrose', organiserPhone: 447706212658 },
  { name: 'Pottery Group', location: 'Glasgow', organiserName: 'Mario Gibson', organiserPhone: 447706212658 },
  { name: 'Knitting Club', location: 'Bristol', organiserName: 'Jenny Lowe', organiserPhone: 447706212658 },
  { name: 'Painting Club', location: 'Leicester', organiserName: 'Katie Ashford', organiserPhone: 447706212658 },
  { name: 'Drawing Group', location: 'Fulham', organiserName: 'Anita Kaur', organiserPhone: 447706212658 },
  { name: 'Chess Club', location: 'Middlesborough', organiserName: 'Katie Ashford', organiserPhone: 447706212658 },
  { name: 'Gardeners Association', location: 'Edinburgh', organiserName: 'Jack Cooper', organiserPhone: 447706212658 },
  { name: 'Sewing Lovers', location: 'Manchester', organiserName: 'Lisa North', organiserPhone: 447706212658 },
  { name: 'Photography Association', location: 'Bradford', organiserName: 'Melissa Rasheed', organiserPhone: 447706212658 },
  { name: 'Walking', location: 'Wycombe', organiserName: 'Paula Kinross', organiserPhone: 447706212658 },
  { name: 'Golf Club', location: 'Chelsea', organiserName: 'Mary McDougall', organiserPhone: 447706212658 },
  { name: 'Archery Club', location: 'Blackpool', organiserName: 'Alisha Forrester', organiserPhone: 447706212658 },
  { name: 'Bowling Club', location: 'Liverpool', organiserName: 'Yasmin Mohammed', organiserPhone: 447706212658 },
  { name: 'Snooker Club', location: 'Enfield', organiserName: 'Jacob Jonas', organiserPhone: 447706212658 },
  { name: 'Jogging Association', location: 'Leeds', organiserName: 'Robert Grant', organiserPhone: 447706212658 },
  { name: 'Hiking Crew', location: 'Bolton', organiserName: 'Taylor Sutherland', organiserPhone: 447706212658 },
  { name: 'Quilting Club', location: 'Rhyll', organiserName: 'Anthony Olaf', organiserPhone: 447706212658 },
  { name: 'Bird-watching Group', location: 'Hull', organiserName: 'Holly Ford', organiserPhone: 447706212658 },
  { name: 'Fishing Club', location: 'Inverness', organiserName: 'Francesca Lourde', organiserPhone: 447706212658 },
  { name: 'Dancers', location: 'Dundee', organiserName: 'Pierre Sinclair', organiserPhone: 447706212658 },
  { name: 'Sailing Association', location: 'Cardiff', organiserName: 'Olly Chapman', organiserPhone: 447706212658 },
  { name: 'Football Lovers Club', location: 'Perth', organiserName: 'Sadiq Patel', organiserPhone: 447706212658 },
  { name: 'Badminton Lovers', location: 'Bristol', organiserName: 'Mike Bradbury', organiserPhone: 447706212658 },
  { name: 'Yoga Association', location: 'Camden', organiserName: 'Laurel Astbury', organiserPhone: 447706212658 }
];

mongoose.connect('mongodb://localhost:27017/meetupDB', function (err, result) {
  if(err){
    return console.log(err);
  }
  addGroups(groups);
});

// nb if group name was Wycome Walkers Club, would we still be able to return the it if caller specified 'walking.'

function addGroups (groups, callback) {
  console.log('Called');

  async.eachSeries(groups, function (group, callback) {
    console.log('Inner Called');
    const group = new Group(group);
    group.save(function (err, doc) {
      callback(err || null, doc);
    });
  }, function() {
    console.log('Done')
  })
}
