const schemaList = [{
        name: 'lesson-stats',
        keyPath: 'id',
        indexes: [{
            name: 'lessonId',
            fields: [ 'id' ]
        }]
    }, {
        name: 'preferrences',
        keyPath: 'id',
        indexes: [{
            name: 'preferrenceId',
            fields: [ 'id' ]
        }]
    }
];

const version = 1;

const dbData = {
    name: 'typeggio',
    schema: schemaList,
    version: version,
};

export default dbData;