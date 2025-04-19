import { ObjectType, Field, ID, Float, Int, registerEnumType } from 'type-graphql';
import { PropertyStatus, PropertyType } from '@prisma/client';
import { User } from './User';
import { PropertyImage } from './PropertyImage';

// Register the enums with GraphQL
registerEnumType(PropertyType, {
  name: 'PropertyType',
  description: 'The type of property',
});

registerEnumType(PropertyStatus, {
  name: 'PropertyStatus',
  description: 'The status of the property',
});

@ObjectType()
export class Feature {
  @Field()
  name: string;
}

@ObjectType()
export class Property {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field(() => Float)
  price: number;

  @Field()
  description: string;

  @Field()
  address: string;

  @Field()
  city: string;

  @Field()
  state: string;

  @Field()
  zipCode: string;

  @Field(() => Int)
  bedrooms: number;

  @Field(() => Float)
  bathrooms: number;

  @Field(() => Float)
  area: number;

  @Field(() => PropertyType)
  type: PropertyType;

  @Field(() => PropertyStatus)
  status: PropertyStatus;

  @Field(() => [String], { nullable: true })
  features?: string[];

  @Field(() => [PropertyImage], { nullable: true })
  images?: PropertyImage[];

  @Field(() => Float, { nullable: true })
  latitude?: number;

  @Field(() => Float, { nullable: true })
  longitude?: number;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field(() => User)
  user: User;

  @Field()
  userId: string;
}

@ObjectType()
export class PropertyPagination {
  @Field(() => [Property])
  properties: Property[];

  @Field(() => Int)
  total: number;

  @Field(() => Int)
  pages: number;

  @Field(() => Int)
  currentPage: number;
} 