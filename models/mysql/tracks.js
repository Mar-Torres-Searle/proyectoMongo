const mongoose = require("mongoose")


const TracksScheme = new mongoose.Schema(
    {
        name: {
            type: String
        },
        album: {
            type: String
        },
        cover: {
            type: String,
            validate: {
                validator: (req) => {
                    return true; //TODO crear patrón
                },
                message: "ERROR_URL",
            }
        },
        artist: {
            name: {
                type: String,
            },
            nickname: {
                type: String
            },
            nationality: {
                type: String
            }
        },
        duration: {
            start: {
                type: Number
            },
            end: {
                type: Number
            }
        },
        mediaId: {
            type: mongoose.Types.ObjectId, // Estructura (string) especial de mongo
            ref: "storage"
        }
    },
    {
        timestamps: true, // TODO createdAt, updatedAt
        versionKey: false
    }
)

module.exports = mongoose.model("tracks", TracksScheme) // Nombre de la colección (o de la tabla en SQL)