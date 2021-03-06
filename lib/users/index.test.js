var
    Chai = require('chai'),
    Expect = require('chai').expect,
    Instagram = require('../../index');

Chai.use(require('chai-json-schema'));

describe('Users', () => {

    describe('Info(_username)', () => {
        it('Testing schema of return object', async () => {
            const user = await Instagram.users.info('instagram');
            Expect(user).to.be.jsonSchema({
                type: 'object',
                required: ['id', 'username', 'name', 'bio', 'private', 'verified', 'followers', 'follows', 'image', 'posts'],
                properties: {
                    id: {
                        type: 'string'
                    },
                    username: {
                        type: 'string'
                    },
                    name: {
                        type: 'string'
                    },
                    bio: {
                        type: 'string'
                    },
                    private: {
                        type: 'boolean'
                    },
                    verified: {
                        type: 'boolean'
                    },
                    followers: {
                        type: 'object',
                        required: ['count'],
                        properties: {
                            count: 'number'
                        }
                    },
                    follows: {
                        type: 'object',
                        required: ['count'],
                        properties: {
                            count: 'number'
                        }
                    },
                    image: {
                        type: 'string'
                    },
                    posts: {
                        type: 'object',
                        required: ['count'],
                        properties: {
                            count: {
                                type: 'number'
                            }
                        }
                    }
                }
            });
        });
    });

    describe('Posts(_username, [_limit])', () => {
        it('Testing schema of return object', async () => {
            const posts = await Instagram.users.posts('instagram');
            Expect(posts).to.be.jsonSchema({
                type: 'array',
                required: ['id', 'caption', 'shortcode', 'image', 'dimensions', 'likes', 'comments', 'owner', 'timestamp'],
                properties: {
                    id: {
                        type: 'string'
                    },
                    caption: {
                        type: 'string'
                    },
                    shortcode: {
                        type: 'string'
                    },
                    image: {
                        type: 'string'
                    },
                    dimensions: {
                        type: 'object'
                    },
                    likes: {
                        type: 'object'
                    },
                    comments: {
                        type: 'object'
                    },
                    owner: {
                        type: 'object'
                    },
                    timestamp: {
                        type: 'number'
                    }
                }
            });
        });

        it('Testing schema and length of limited return object', async () => {
            const posts = await Instagram.users.posts('instagram', 100);
            Expect(posts).to.be.an('array');
            Expect(posts).to.have.length(100);
            Expect(posts).to.be.jsonSchema({
                type: 'array',
                required: ['id', 'caption', 'shortcode', 'image', 'dimensions', 'likes', 'comments', 'owner', 'timestamp'],
                properties: {
                    id: {
                        type: 'string'
                    },
                    caption: {
                        type: 'string'
                    },
                    shortcode: {
                        type: 'string'
                    },
                    image: {
                        type: 'string'
                    },
                    dimensions: {
                        type: 'object'
                    },
                    likes: {
                        type: 'object'
                    },
                    comments: {
                        type: 'object'
                    },
                    owner: {
                        type: 'object'
                    },
                    timestamp: {
                        type: 'number'
                    }
                }
            });
        });
    });

    describe('Username(_id)', () => {

        it('Testing with known public users', () => {
            const users = [{
                id: 25025320,
                username: 'instagram'
            }, {
                id: 247944034,
                username: 'beyonce'
            }, {
                id: 173560420,
                username: 'cristiano'
            }];

            users.map(async (user) => {
                var _username = await Instagram.users.username(user.id);
                Expect(_username).to.be.equal(user.username);
            });

        });

        it('Testing with known private users', async () => {
            // This is my personal private account :)
            const id = 511816278;

            var _username = await Instagram.users.username(id);
            Expect(_username).to.be.null;
        });

    });

});