const fs = require('fs');
const User = require('./models/user.model');

//JSON file
const locationData = fs.readFileSync('location.json', 'utf8');
const locationJson = JSON.parse(locationData);

//Getting an element from an array
const sectors = [];
locationJson.provinces.forEach((province) => {
  province.districts.forEach((district) => {
    district.sectors.forEach((sector) => {
      sectors.push(sector.name);
    });
  });
});


export const getUsersBySector = async (req, res) => {
    let sector = req.query.sector;
  
    if (!sector) {
      return res.status(400).json({ message: 'Invalid sector parameter' });
    }

    sector = sector.trim().toLowerCase();
      
    try {
        const usersInSector = await User.find({ sector: { $regex: new RegExp(sector, 'i') } });
        console.log(`Users in sector ${sector}:`, usersInSector);
        res.status(200).json({ message: 'Users retrieved successfully', users: usersInSector });
      } catch (error) {
        console.error(`Error querying users for sector ${sector}:`, error);
        res.status(500).json({ message: 'An error occurred while retrieving users' });
      }
      
    }      