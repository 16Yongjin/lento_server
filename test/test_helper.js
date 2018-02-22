const database = require('database')

beforeAll(() => {
    database.connect()
});

// beforeEach(done => {
//     const { foods } = mongoose.connection.collections;
//     foods.drop()
//         .then(() => foods.ensureIndex({ 'geometry.coordinates': '2dsphere' }))
//         .then(() => done())
//         .catch(() => done());
// })