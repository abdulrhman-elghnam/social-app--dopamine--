import { Types } from 'mongoose';
import {
  GenderEnum,
  MediaTypeEnum,
  NotificationTypeEnum,
  PostVisibilityEnum,
  ProviderEnum,
  SystemRoleEnum,
} from '../value/database.enum.js';

export interface IUser {
  _id?: Types.ObjectId;

  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password?: string;

  gender: GenderEnum;
  role: SystemRoleEnum;
  provider: ProviderEnum;

  phone?: string;
  DOB?: Date;

  isEmailVerified: boolean;
  isActive: boolean;

  image?: string;
  coverImage?: string;
  bio?: string;

  changeCredentialsTime?: Date;

  createdAt?: Date;
  updatedAt?: Date;
}

export interface IFollow {
  _id?: Types.ObjectId;

  follower: Types.ObjectId;
  following: Types.ObjectId;

  createdAt?: Date;
}

export interface IPostMedia {
  url: string;
  publicId?: string;
  type: MediaTypeEnum.IMAGE;
}

export interface IPost {
  _id?: Types.ObjectId;

  author: Types.ObjectId;

  content?: string;
  media: IPostMedia[];

  visibility: PostVisibilityEnum;

  likesCount: number;
  commentsCount: number;

  commentsEnabled: boolean;

  createdAt?: Date;
  updatedAt?: Date;
}

export interface ILike {
  _id?: Types.ObjectId;

  user: Types.ObjectId;
  post: Types.ObjectId;

  createdAt?: Date;
}

export interface IComment {
  _id?: Types.ObjectId;

  post: Types.ObjectId;
  author: Types.ObjectId;

  content: string;

  createdAt?: Date;
  updatedAt?: Date;
}

export interface ISavedPost {
  _id?: Types.ObjectId;

  user: Types.ObjectId;
  post: Types.ObjectId;

  createdAt?: Date;
}

export interface IStoryMedia {
  url: string;
  publicId?: string;
  type: MediaTypeEnum.IMAGE;
}

export interface IStory {
  _id?: Types.ObjectId;

  author: Types.ObjectId;
  media: IStoryMedia;

  expiresAt: Date;

  createdAt?: Date;
}

export interface INotification {
  _id?: Types.ObjectId;

  recipient: Types.ObjectId;
  sender: Types.ObjectId;

  type: NotificationTypeEnum;

  post?: Types.ObjectId;
  comment?: Types.ObjectId;

  isRead: boolean;

  createdAt?: Date;
}

export interface IConversation {
  _id?: Types.ObjectId;

  participants: Types.ObjectId[];

  lastMessage?: Types.ObjectId;

  isGroup: boolean;

  groupName?: string;
  groupImage?: string;

  createdAt?: Date;
  updatedAt?: Date;
}

export interface IMessageMedia {
  url: string;
  publicId?: string;
  type: MediaTypeEnum;
}

export interface IMessage {
  _id?: Types.ObjectId;

  conversation: Types.ObjectId;
  sender: Types.ObjectId;

  content?: string;
  media?: IMessageMedia;

  readBy: Types.ObjectId[];

  createdAt?: Date;
  updatedAt?: Date;
}
