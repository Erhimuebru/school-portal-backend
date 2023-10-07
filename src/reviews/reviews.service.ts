

import { Model } from 'mongoose';
import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Reviews } from './model/reviews.model';


@Injectable()
export class  ReviewsService {
  constructor(
    @InjectModel('Reviews') private reviewsModel:Model<Reviews>) 
    {}

 

  async create(
    name:string,
    comments:string,
   
     ) {
    const newReviews = new this.reviewsModel({
      
    name,
    comments
     });
    const result = await newReviews.save()
    return result.id as string
  }


  async getReview(){
    const review = await this.reviewsModel.find().exec()
    return review.map((review)=>({
        id:review.id,
        name:review.name,
        comments:review.comments,
      }));
  }

  async getSingleReview(reviewId: string){
    const review = await this.findReview(reviewId)
    return review;
  }
 
  private async findReview(id: string): Promise<Reviews> {
    const review = await this.reviewsModel.findById(id)
    if(!review){
      throw new NotFoundException('No comment yet....!')
    }
    return{
     
     id:review.id,
      name:review.name,
      comments:review.comments,
     
      
    }
  }


  async findAll(): Promise<Reviews[]> {
    return this.reviewsModel.find().sort({ createdAt: -1 }).exec();
  }
 
}
