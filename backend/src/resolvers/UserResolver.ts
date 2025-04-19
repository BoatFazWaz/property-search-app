import { Resolver, Query, Mutation, Arg, Ctx, UseMiddleware } from 'type-graphql';
import { User, AuthPayload } from '../models/User';
import { PrismaClient, UserRole } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { AuthRequest } from '../middlewares/authMiddleware';

interface Context {
  req: AuthRequest;
  prisma: PrismaClient;
}

@Resolver(User)
export class UserResolver {
  // Get current authenticated user
  @Query(() => User, { nullable: true })
  async me(@Ctx() ctx: Context): Promise<User | null> {
    if (!ctx.req.user) {
      return null;
    }

    return ctx.prisma.user.findUnique({
      where: { id: ctx.req.user.id },
      include: { properties: true },
    });
  }

  // User registration
  @Mutation(() => AuthPayload)
  async register(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Arg('name', { nullable: true }) name?: string,
    @Arg('role', { nullable: true }) role?: UserRole,
    @Ctx() ctx: Context
  ): Promise<AuthPayload> {
    // Check if user already exists
    const existingUser = await ctx.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = await ctx.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: role || UserRole.USER,
      },
    });

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'fallback_secret',
      { expiresIn: process.env.JWT_EXPIRATION || '24h' }
    );

    return {
      token,
      user,
    };
  }

  // User login
  @Mutation(() => AuthPayload)
  async login(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() ctx: Context
  ): Promise<AuthPayload> {
    // Find user by email
    const user = await ctx.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error('Invalid email or password');
    }

    // Verify password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      throw new Error('Invalid email or password');
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'fallback_secret',
      { expiresIn: process.env.JWT_EXPIRATION || '24h' }
    );

    return {
      token,
      user,
    };
  }
} 