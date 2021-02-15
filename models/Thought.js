const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');



const reactionSchema = new Schema(

    {
        // reactionId: {
        //     type: Schema.Types.ObjectId,
        //     default: () => new Types.ObjectId()

        // },
        reactionBody: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280,
        },

        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,

        },
        createdAt: {
            type: Date,
            required: true,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        },



    },
    {
        toJSON: {
            virtual: true,
            getters: true
        },
        id: false
    }
);




const thoughtSchema = new Schema({

    thoughtText: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 280
    },

    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,

    },

    reaction: [reactionSchema],

},
    {
        toJSON: {
            virtual: true,
            getters: true
        },
        id: false
    }

);


//get total count of reaction reply count
// reactionSchema.virtual('thoughtCount').get(function () {
//     return this.thought.length;

// });





const Thought = model('Thought', thoughtSchema);

module.exports = Thought;