// import { Controller } from '@nestjs/common';

// @Controller('reviews')
// export class ReviewsController {}




import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReviewsService } from './reviews.service';


@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService : ReviewsService ) {}

  @Post()
  async create(
    
    @Body('name') name: string,
    @Body('comments') comments: string,
   )
    
    {
    const createId = await this. reviewsService.create(
    
       name,
       comments   
      );
    return {id: createId}
  }



@Get()
async getAllReviews() {
  return this.reviewsService.findAll();
}

  @Get(':id')
getReview(@Param('id') reviewId: string) {
    return this.reviewsService.getSingleReview(reviewId);
  }

}
