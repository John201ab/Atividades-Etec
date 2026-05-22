import express, { response } from 'express';
import { AppDataSource } from '../database/config.js';
import userModel from '../model/user.js';
import { IsNull, Like } from 'typeorm';

