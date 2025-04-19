import { ObjectType, Field, ID } from 'type-graphql';

@ObjectType()
export class PropertyImage {
  @Field(() => ID)
  id: string;

  @Field()
  url: string;

  @Field()
  propertyId: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
} 