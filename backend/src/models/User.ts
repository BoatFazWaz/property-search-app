import { ObjectType, Field, ID, registerEnumType } from 'type-graphql';
import { Property } from './Property';
import { UserRole } from '@prisma/client';

// Register the UserRole enum with GraphQL
registerEnumType(UserRole, {
  name: 'UserRole',
  description: 'The role of the user',
});

@ObjectType()
export class User {
  @Field(() => ID)
  id: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  name?: string;

  // Password field is intentionally not exposed in GraphQL
  
  @Field(() => UserRole)
  role: UserRole;

  @Field(() => [Property], { nullable: true })
  properties?: Property[];

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

@ObjectType()
export class AuthPayload {
  @Field()
  token: string;

  @Field(() => User)
  user: User;
} 