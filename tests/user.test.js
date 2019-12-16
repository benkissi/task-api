const request = require('supertest')
const app = require('../src/app.js')
const User = require('../src/models/users')
const { userOne, userOneId, setupDatabase } = require('./fixtures/db')

beforeEach(setupDatabase)

test('should signup a new user', async () => {
    const response = await request(app).post('/users').send({
        name: 'Ben',
        email: 'ben@ben.com',
        password: 'heheisnsnsj34'
    }).expect(201)

    // Assert that database was changed correctly
    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()

    //Assertions about the response
    expect(response.body).toMatchObject({
        user: {
            name: 'Ben',
            email: 'ben@ben.com'
        },
        token: user.tokens[0].token
    })

    expect(user.password).not.toBe('heheisnsnsj34')
})

test('should log user in', async () => {
    const response = await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)

    const user = await User.findById(userOneId)
    expect(response.body.token).toBe(user.tokens[1].token)
})

test('should not log in non-existent user', async () => {
    await request(app).post('/users/login').send({
        email: 'ahgaha@hdhdh.com',
        password: 'hshsu938bdnd'
    }).expect(400)
})

test('should get profile for user', async () => {
    await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
})

test('should not get profile for unauthenticated user', async () => {
    await request(app)
        .get('/users/me')
        .send()
        .expect(401)
})

test('should delete user when authenticated', async () => {
    await request(app)
        .delete('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)

    const user = await User.findById(userOneId)
    expect(user).toBeNull()
})

test('should fail user delete if not authenticated', async () => {
    await request(app)
        .delete('/users/me')
        .send()
        .expect(401)
})

test('should upload avatar image', async () => {
    await request(app)
        .post('/users/me/avatar')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .attach('avatar', 'tests/fixtures/profile-pic.jpg')
        .expect(200)

    const user = await User.findById(userOneId)
    expect(user.avatar).toEqual(expect.any(Buffer))
})

test('should update user', async () => {
    await request(app)
        .patch('/users')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            name: 'Maggi'
        })
        .expect(200)

    const user = await User.findById(userOneId)
    expect(user.name).toBe('Maggi')
})


test('should not update invalid field', async () => {
    await request(app)
        .patch('/users')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            location: 'Maggi'
        })
        .expect(400)

})