import * as mongoose from 'mongoose'

    export const ReviewsSchema = new mongoose.Schema({
        name:{type:String, require:true}, 
      comments:{type:String, require:true},
        createdAt: {
          type: Date,
          default: Date.now,
        },
      });


// })

export interface Reviews {
    id:string,
   name:string,
   comments:string
    
}