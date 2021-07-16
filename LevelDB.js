const level = require('level');
const chainDB = './chaindata';

class LevelDB {

  constructor() {
    this.db = level(chainDB);
  }

  // Get data from levelDB with key
  getLevelDBData(key) {
    let self = this;
    return new Promise(function (resolve, reject) {
      self.db.get(key, function (err, value) {
        if (err) {
          reject(err);
          return console.log('getLevelDBData | Not found! key', key, err);
        }
        console.log('getLevelDBData | Value:', value);
        resolve(value);
      })
    });
  }

  // Add data to levelDB with key and value
  addLevelDBDataWithKey(key, value) {
    let self = this;
    return new Promise(function (resolve, reject) {
      self.db.put(key, value, function (err) {
        if (err) {
          reject(err);
          return console.log("addLevelDBDataWithKey | Failed:", err);
        }
        console.log("addLevelDBDataWithKey | Successful, key:", key, "value:", value);
        resolve(value);
      });
    });
  }

  // Add data to levelDB with value
  addLevelDBData(key, value) {
    let self = this;
    return new Promise(function (resolve, reject) {
        // Add your code here, remember in Promises you need to resolve() or reject()
        self.db.put(key, value)
            .then(() => resolve(true))
            .catch((err) => {
                console.log("add fail");
                reject(err);
            })
    })
}

  // Method that return the height
  getBlocksCount() {
    let self = this;
    var i = 0;
    return new Promise(function (resolve, reject) {
      self.db.createReadStream().on('data', function (data) {
        i++;
      }).on('error', function (err) {
        reject(err);
        return console.log("getBlocksCount | Failed:", err);

      }).on('close', function () {
        console.log("getBlockCount | Successful, count:", i);
        resolve(i);
      });
    });
  }
}

// Test code
function testGetLevelDBData() {
  // Put data to db
  levelDB.db.put("1", "liumingzhe", function (err) {
  });

  setTimeout(() => {
    // Get data with key 1
    levelDB.getLevelDBData("1")
      .then((block) => {
        console.log("testGetLevelDBData | Value:", block);
      }).catch((err) => {
        console.log("testGetLevelDBData | Err:", err);
      })
  }, 1000);
};

function testAddLevelDBDataWithKey() {
  levelDB.addLevelDBData("key0", "value0")
    .then((block) => {
      console.log("testAddLevelDBDataWithKey | Value:", block);
    }).catch((err) => {
      console.log("testAddLevelDBDataWithKey | Err:", err);
    })
};

function testGetBlocksCount() {
  levelDB.getBlocksCount()
    .then((count) => {
      console.log("testGetBlocksCount | Count:", count);
    }).catch((err) => {
      console.log("testGetBlocksCount | Err:", err);
    })
};

function testAddLevelDBData() {
  levelDB.addLevelDBData("test data")
    .then((value) => {
      console.log("testAddLevelDBData | Success, value:", value);
    }).catch((err) => {
      console.log("testAddLevelDBData | Err:", err);
    })
};

/**
 * Test only one function once time
 * Comment all test statements when test the others *.js code 
 */
// let levelDB = new LevelDB();
// testGetLevelDBData();
// testAddLevelDBDataWithKey();
// testGetBlocksCount();
// testAddLevelDBData();

module.exports.LevelDB = LevelDB;
